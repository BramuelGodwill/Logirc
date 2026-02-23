# 🚀 VERCEL DEPLOYMENT GUIDE - LOGIRC AI

## Deploy Your Web App to Vercel in 5 Minutes

---

## PREREQUISITES
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Your web-app code ready

---

## METHOD 1: DEPLOY VIA VERCEL CLI (FASTEST)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Navigate to Your Web App

```bash
cd /path/to/logirc-ai-chat/web-app
```

### Step 3: Login to Vercel

```bash
vercel login
```

This will open your browser for authentication.

### Step 4: Deploy

```bash
vercel
```

Answer the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- What's your project's name? **logirc-ai-chat**
- In which directory is your code located? **./
- Want to modify settings? **No**

Vercel will:
1. Build your Next.js app
2. Deploy it
3. Give you a URL like: `https://logirc-ai-chat.vercel.app`

### Step 5: Set Environment Variables

```bash
# Add your backend API URL
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://your-backend-url.herokuapp.com

# Add PayPal Client ID
vercel env add NEXT_PUBLIC_PAYPAL_CLIENT_ID production
# Enter: your_paypal_client_id
```

### Step 6: Deploy to Production

```bash
vercel --prod
```

✅ **DONE!** Your app is live at: `https://logirc-ai-chat.vercel.app`

---

## METHOD 2: DEPLOY VIA GITHUB (RECOMMENDED FOR CONTINUOUS DEPLOYMENT)

### Step 1: Push Code to GitHub

```bash
cd /path/to/logirc-ai-chat/web-app

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Logirc AI Chat"

# Create GitHub repository at https://github.com/new
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/logirc-ai-chat.git
git branch -M main
git push -u origin main
```

### Step 2: Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..." → "Project"**
3. Click **"Import Git Repository"**
4. Select your **logirc-ai-chat** repository
5. Click **"Import"**

### Step 3: Configure Project

Vercel will auto-detect Next.js. Configure:

**Framework Preset:** Next.js
**Root Directory:** `./` (or leave blank)
**Build Command:** `npm run build` (auto-detected)
**Output Directory:** `.next` (auto-detected)

### Step 4: Add Environment Variables

In the Vercel dashboard, add:

```
NEXT_PUBLIC_API_URL = https://your-backend-url.herokuapp.com
NEXT_PUBLIC_PAYPAL_CLIENT_ID = your_paypal_client_id
```

### Step 5: Deploy

Click **"Deploy"**

Vercel will:
1. Clone your repository
2. Install dependencies
3. Build your app
4. Deploy it

✅ **DONE!** App is live with automatic deployments on every git push!

---

## CUSTOM DOMAIN SETUP

### Step 1: Add Domain in Vercel

1. Go to your project in Vercel
2. Click **"Settings" → "Domains"**
3. Enter your domain: **www.logirc.com** or **chat.logirc.com**
4. Click **"Add"**

### Step 2: Configure DNS

Vercel will show you DNS records to add:

**For Root Domain (logirc.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For Subdomain (chat.logirc.com):**
```
Type: CNAME
Name: chat
Value: cname.vercel-dns.com
```

### Step 3: Add to Your Domain Provider

Go to your domain provider (Namecheap, GoDaddy, etc.) and add the DNS records.

**Wait 24-48 hours for DNS propagation.**

✅ Your app will be live at your custom domain!

---

## BACKEND DEPLOYMENT OPTIONS

Since Vercel is primarily for frontend, deploy your backend separately:

### Option 1: Heroku (Easiest)

```bash
cd backend

# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create logirc-ai-backend

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
heroku config:set JWT_SECRET="your_secret_key"
heroku config:set OPENAI_API_KEY="your_openai_api_key"
heroku config:set PAYPAL_CLIENT_ID="your_paypal_id"
heroku config:set PAYPAL_CLIENT_SECRET="your_paypal_secret"
heroku config:set MPESA_CONSUMER_KEY="your_mpesa_key"
heroku config:set MPESA_CONSUMER_SECRET="your_mpesa_secret"
heroku config:set CLIENT_URL="https://logirc-ai-chat.vercel.app"

# Deploy
git init
git add .
git commit -m "Deploy backend"
heroku git:remote -a logirc-ai-backend
git push heroku main
```

Your backend will be at: `https://logirc-ai-backend.herokuapp.com`

### Option 2: Railway.app (Modern Alternative)

```bash
cd backend

# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables via Railway dashboard
# https://railway.app/dashboard

# Deploy
railway up
```

### Option 3: DigitalOcean App Platform

1. Go to https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Connect your GitHub repository
4. Select the `backend` folder
5. Add environment variables
6. Deploy

---

## POST-DEPLOYMENT CHECKLIST

### ✅ Test Your Deployment

**1. Test Frontend:**
- Visit your Vercel URL
- Try signing up
- Try logging in
- Test the chat interface

**2. Test Backend:**
```bash
# Health check
curl https://your-backend-url.herokuapp.com/health

# Test signup
curl -X POST https://your-backend-url.herokuapp.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

**3. Test Integration:**
- Sign up on your frontend
- Send a chat message
- Verify AI responds
- Test payment flow

### ✅ Update Environment Variables

Make sure your web app's environment variable points to your deployed backend:

```bash
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://logirc-ai-backend.herokuapp.com
```

Redeploy:
```bash
vercel --prod
```

---

## MONITORING & ANALYTICS

### Add Vercel Analytics

1. Go to Vercel Dashboard → Your Project
2. Click "Analytics" tab
3. Enable "Web Analytics"

### Add Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

Follow Sentry setup guide: https://docs.sentry.io/platforms/javascript/guides/nextjs/

---

## CONTINUOUS DEPLOYMENT

Every time you push to GitHub, Vercel automatically:
1. Pulls latest code
2. Runs tests
3. Builds your app
4. Deploys it
5. Notifies you

**To deploy:**
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel automatically deploys in 2-3 minutes! 🚀

---

## ROLLBACK TO PREVIOUS VERSION

If something breaks:

1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find a working deployment
4. Click "..." → "Promote to Production"

---

## COSTS

### Vercel Pricing:
- **Hobby (Free):**
  - Perfect for starting
  - 100 GB bandwidth/month
  - Unlimited projects
  - Automatic HTTPS
  
- **Pro ($20/month):**
  - 1 TB bandwidth
  - Advanced analytics
  - Team collaboration
  - Password protection

### Backend Hosting:
- **Heroku:**
  - Free tier (with credit card)
  - $7/month for basic dyno
  
- **Railway:**
  - $5/month minimum
  - Pay as you go

### Total Starting Cost: **$0-10/month**

---

## NEED HELP?

**Vercel Documentation:** https://vercel.com/docs
**Vercel Support:** https://vercel.com/support

**Logirc Support:**
- Email: [email protected]
- Phone: +254 759 917 315

---

## 🎉 YOU'RE LIVE!

Your Logirc AI Chat is now deployed and accessible worldwide!

**Share your app:**
- Tweet about it
- Post on LinkedIn
- Share with friends
- Get feedback
- Iterate and improve

**Remember:** Innovation, Simplified! 🚀

---

**Logirc Ltd** - Your Vision, Our Code
