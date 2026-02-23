#!/bin/bash

# Logirc AI Chat - Quick Start Script
# This script sets up your entire development environment

echo "🚀 =========================================="
echo "   LOGIRC AI CHAT - QUICK START"
echo "   Your Vision, Our Code"
echo "========================================== 🚀"
echo ""

# Check Node.js installation
echo "📦 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js $(node -v) found"

# Check npm installation
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi
echo "✅ npm $(npm -v) found"

# Check MongoDB installation
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found locally. You can use MongoDB Atlas instead."
    echo "   Sign up at: https://www.mongodb.com/cloud/atlas"
else
    echo "✅ MongoDB found"
fi

echo ""
echo "📥 Setting up Backend..."
echo ""

# Setup Backend
cd backend
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << 'EOF'
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/logirc-ai
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/logirc-ai

# JWT Configuration
JWT_SECRET=logirc_super_secret_key_change_in_production
JWT_EXPIRE=30d

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox

# M-Pesa Configuration
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_PASSKEY=your_mpesa_passkey
MPESA_SHORTCODE=your_business_shortcode

# CORS Origins
CLIENT_URL=http://localhost:3000
EOF
    echo "✅ Created .env file"
    echo "⚠️  IMPORTANT: Edit backend/.env and add your API keys!"
else
    echo "✅ .env file already exists"
fi

echo "Installing backend dependencies..."
npm install
echo "✅ Backend dependencies installed"

echo ""
echo "📥 Setting up Web App..."
echo ""

# Setup Web App
cd ../web-app
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
EOF
    echo "✅ Created .env.local file"
    echo "⚠️  IMPORTANT: Edit web-app/.env.local with your configuration!"
else
    echo "✅ .env.local file already exists"
fi

echo "Installing web app dependencies..."
npm install
echo "✅ Web app dependencies installed"

cd ..

echo ""
echo "✅ =========================================="
echo "   SETUP COMPLETE!"
echo "========================================== ✅"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1️⃣  Edit Configuration Files:"
echo "    - backend/.env (Add your API keys)"
echo "    - web-app/.env.local (Add configuration)"
echo ""
echo "2️⃣  Start MongoDB (if using local):"
echo "    sudo systemctl start mongod   # Linux"
echo "    brew services start mongodb-community   # Mac"
echo ""
echo "3️⃣  Start Backend:"
echo "    cd backend"
echo "    npm run dev"
echo ""
echo "4️⃣  Start Frontend (in new terminal):"
echo "    cd web-app"
echo "    npm run dev"
echo ""
echo "5️⃣  Open Browser:"
echo "    http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "    - Master Guide: docs/MASTER_INSTALLATION_GUIDE.md"
echo "    - Deployment: docs/VERCEL_DEPLOYMENT.md"
echo ""
echo "🆘 Need Help?"
echo "    Email: [email protected]"
echo "    Phone: +254 759 917 315"
echo ""
echo "🚀 Happy Coding! - Logirc Ltd"
echo "   The logic is simple — innovate or fade!"
echo ""
