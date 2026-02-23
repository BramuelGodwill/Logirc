const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Payment = require('../models/Payment');
const axios = require('axios');

// PayPal Configuration
const paypal = require('@paypal/checkout-server-sdk');
const environment = process.env.PAYPAL_MODE === 'live' 
  ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
  : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

// Helper function to get message limit
function getMessageLimit(plan) {
  const limits = {
    basic: 500,
    premium: 1000,
    business: 5000
  };
  return limits[plan] || 50;
}

// Helper function to get plan price
function getPlanPrice(plan) {
  const prices = {
    basic: 9.99,
    premium: 19.99,
    business: 29.99
  };
  return prices[plan] || 0;
}

// @route   POST /api/payment/paypal/create
// @desc    Create PayPal payment
// @access  Private
router.post('/paypal/create', authMiddleware, async (req, res) => {
  try {
    const { plan } = req.body;

    if (!['basic', 'premium', 'business'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    const amount = getPlanPrice(plan);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount.toString()
        },
        description: `Logirc AI - ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`
      }],
      application_context: {
        brand_name: 'Logirc AI',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.CLIENT_URL}/payment/success`,
        cancel_url: `${process.env.CLIENT_URL}/payment/cancel`
      }
    });

    const order = await client.execute(request);
    
    res.json({ 
      success: true, 
      orderId: order.result.id,
      approvalUrl: order.result.links.find(link => link.rel === 'approve').href
    });
  } catch (error) {
    console.error('PayPal create error:', error);
    res.status(500).json({ error: 'Error creating payment' });
  }
});

// @route   POST /api/payment/paypal/capture
// @desc    Capture PayPal payment
// @access  Private
router.post('/paypal/capture', authMiddleware, async (req, res) => {
  try {
    const { orderId, plan } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    const capture = await client.execute(request);

    if (capture.result.status === 'COMPLETED') {
      // Update user subscription
      const user = await User.findById(req.user.id);
      user.subscription = plan;
      user.messageLimit = getMessageLimit(plan);
      user.messagesUsed = 0; // Reset on new subscription
      await user.save();

      // Save payment record
      await Payment.create({
        userId: user._id,
        amount: parseFloat(capture.result.purchase_units[0].amount.value),
        currency: 'USD',
        plan: plan,
        paymentMethod: 'paypal',
        transactionId: capture.result.id,
        status: 'completed',
        metadata: {
          orderId: orderId,
          payerId: capture.result.payer.payer_id
        }
      });

      res.json({ 
        success: true, 
        message: 'Payment successful',
        subscription: {
          plan: user.subscription,
          messageLimit: user.messageLimit
        }
      });
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({ error: 'Error capturing payment' });
  }
});

// @route   POST /api/payment/mpesa/initiate
// @desc    Initiate M-Pesa payment
// @access  Private
router.post('/mpesa/initiate', authMiddleware, async (req, res) => {
  try {
    const { phone, plan } = req.body;

    if (!phone || !plan) {
      return res.status(400).json({ error: 'Phone and plan are required' });
    }

    const amount = Math.ceil(getPlanPrice(plan) * 130); // Convert USD to KES (approximate)

    // Get M-Pesa access token
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64');

    const tokenResponse = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Initiate STK Push
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64');

    const stkResponse = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: req.user.id,
        TransactionDesc: `Logirc AI - ${plan} Plan`
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    res.json({ 
      success: true, 
      message: 'Payment initiated. Please enter your M-Pesa PIN.',
      CheckoutRequestID: stkResponse.data.CheckoutRequestID
    });
  } catch (error) {
    console.error('M-Pesa error:', error);
    res.status(500).json({ error: 'Error initiating M-Pesa payment' });
  }
});

// @route   POST /api/payment/mpesa/callback
// @desc    M-Pesa callback
// @access  Public
router.post('/mpesa/callback', async (req, res) => {
  try {
    const { Body } = req.body;
    
    if (Body.stkCallback.ResultCode === 0) {
      // Payment successful
      const items = Body.stkCallback.CallbackMetadata.Item;
      const phoneNumber = items.find(item => item.Name === 'PhoneNumber').Value;
      const amount = items.find(item => item.Name === 'Amount').Value;
      const transactionId = items.find(item => item.Name === 'MpesaReceiptNumber').Value;

      // Find user by phone or account reference
      // Note: You'll need to implement proper user lookup
      const accountReference = Body.stkCallback.AccountReference;
      const user = await User.findById(accountReference);

      if (user) {
        // Determine plan based on amount
        let plan = 'basic';
        if (amount >= 2500) plan = 'business';
        else if (amount >= 2000) plan = 'premium';

        user.subscription = plan;
        user.messageLimit = getMessageLimit(plan);
        user.messagesUsed = 0;
        await user.save();

        // Save payment record
        await Payment.create({
          userId: user._id,
          amount: amount,
          currency: 'KES',
          plan: plan,
          paymentMethod: 'mpesa',
          transactionId: transactionId,
          status: 'completed',
          metadata: {
            phoneNumber: phoneNumber
          }
        });
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    res.json({ success: false });
  }
});

// @route   GET /api/payment/history
// @desc    Get payment history
// @access  Private
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ 
      success: true, 
      payments 
    });
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({ error: 'Error fetching payment history' });
  }
});

module.exports = router;
