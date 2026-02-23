# 🤖 LOGIRC AI CHAT

<div align="center">

![Logirc Logo](./web-app/public/logo.png)

**Your Vision, Our Code**

*Logic + Creativity = Logirc | Innovation, Simplified*

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green)](https://www.mongodb.com/)

[Demo](https://logirc-ai-chat.vercel.app) · [Documentation](./docs) · [Report Bug](https://github.com/logirc/ai-chat/issues)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

**Logirc AI Chat** is a full-stack, production-ready AI-powered chat application built with cutting-edge technologies. It provides businesses and individuals with an intelligent conversational AI platform, complete with user authentication, subscription management, and multiple payment options.

### Why Logirc AI?

- **🚀 Fast & Responsive** - Built with Next.js and React for optimal performance
- **🔒 Secure** - JWT authentication, encrypted data, HTTPS everywhere
- **💳 Flexible Payments** - PayPal, M-Pesa, and bank transfers supported
- **📱 Cross-Platform** - Web, iOS, and Android applications
- **🌍 African Innovation** - Built in Kenya, serving the world
- **💡 Production Ready** - Deployed on Vercel with CI/CD pipeline

---

## ✨ Features

### Core Features
- ✅ **AI-Powered Chat** - Powered by OpenAI GPT-4
- ✅ **User Authentication** - Secure signup/login with JWT
- ✅ **Chat History** - Save and access previous conversations
- ✅ **Real-time Responses** - Streaming AI responses
- ✅ **Markdown Support** - Rich text formatting in messages
- ✅ **Code Highlighting** - Syntax highlighting for code blocks
- ✅ **Dark Mode** - Beautiful, eye-friendly UI

### Subscription Plans
- 🆓 **Free** - 50 messages/month
- 💎 **Basic** - $9.99/mo - 500 messages
- 🌟 **Premium** - $19.99/mo - 1,000 messages
- 🏢 **Business** - $29.99/mo - 5,000 messages

### Payment Methods
- 💳 **PayPal** - International payments
- 📱 **M-Pesa** - Kenya mobile money
- 🏦 **Bank Transfer** - Direct bank payments

### Platform Support
- 🌐 **Web App** - Works on all browsers
- 📱 **iOS App** - Native iOS experience
- 🤖 **Android App** - Native Android experience

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **HTTP Client:** Axios

### Mobile
- **Framework:** React Native
- **Navigation:** React Navigation
- **State:** Zustand
- **Storage:** AsyncStorage

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **AI:** OpenAI GPT-4 API
- **Payments:** PayPal SDK, Safaricom Daraja API

### DevOps
- **Hosting:** Vercel (Frontend), Heroku (Backend)
- **Database:** MongoDB Atlas
- **CI/CD:** GitHub Actions
- **Monitoring:** Vercel Analytics
- **Version Control:** Git/GitHub

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/logirc/ai-chat.git
cd ai-chat

# Install backend dependencies
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Start backend
npm run dev

# In a new terminal, install frontend dependencies
cd ../web-app
npm install

# Create .env.local file
cp .env.example .env.local
# Edit .env.local with your credentials

# Start frontend
npm run dev
```

Your app will be running at:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

### Detailed Setup

For comprehensive setup instructions, see:
- **[Master Installation Guide](./docs/MASTER_INSTALLATION_GUIDE.md)** - Complete setup walkthrough
- **[Vercel Deployment](./docs/VERCEL_DEPLOYMENT.md)** - Deploy to production
- **[API Documentation](./docs/API.md)** - Backend API reference

---

## 📦 Project Structure

```
logirc-ai-chat/
├── backend/                    # Node.js Express API
│   ├── config/                # Database configuration
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── middleware/            # Express middleware
│   ├── controllers/           # Route controllers
│   ├── .env.example          # Environment variables template
│   ├── package.json
│   └── server.js             # Entry point
│
├── web-app/                   # Next.js React application
│   ├── pages/                # Next.js pages
│   │   ├── index.js         # Landing page
│   │   ├── chat.js          # Main chat interface
│   │   ├── login.js         # Login page
│   │   └── signup.js        # Signup page
│   ├── components/           # React components
│   ├── store/                # Zustand state management
│   ├── styles/               # CSS and Tailwind
│   ├── public/               # Static assets
│   ├── .env.example         # Environment variables template
│   ├── package.json
│   ├── next.config.js       # Next.js configuration
│   └── tailwind.config.js   # Tailwind configuration
│
├── mobile-app/                # React Native mobile app
│   ├── src/
│   │   ├── screens/         # App screens
│   │   ├── components/      # React Native components
│   │   ├── navigation/      # React Navigation
│   │   └── services/        # API services
│   ├── android/             # Android native code
│   ├── ios/                 # iOS native code
│   └── package.json
│
└── docs/                      # Documentation
    ├── MASTER_INSTALLATION_GUIDE.md
    ├── VERCEL_DEPLOYMENT.md
    ├── API.md
    └── USER_GUIDE.md
```

---

## 🌐 Deployment

### Deploy Frontend to Vercel

```bash
cd web-app
vercel
```

### Deploy Backend to Heroku

```bash
cd backend
heroku create logirc-ai-backend
git push heroku main
```

### Deploy Mobile Apps

**iOS:**
```bash
cd mobile-app
npx react-native run-ios --configuration Release
```

**Android:**
```bash
cd mobile-app
./gradlew assembleRelease
```

For detailed deployment instructions, see [Vercel Deployment Guide](./docs/VERCEL_DEPLOYMENT.md).

---

## 📖 API Documentation

### Authentication Endpoints

```bash
POST /api/auth/signup
POST /api/auth/login
```

### Chat Endpoints

```bash
POST /api/chat
GET  /api/chat/history
```

### Payment Endpoints

```bash
POST /api/payment/paypal/create
POST /api/payment/paypal/capture
POST /api/payment/mpesa/initiate
```

Full API documentation: [API.md](./docs/API.md)

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/logirc-ai
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=sk-your-openai-key
PAYPAL_CLIENT_ID=your_paypal_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_id
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Logirc Ltd** - Innovation, Simplified

- **Bramuel Godwill** - Founder & CEO
- **George Ndungu** - Co-Founder & CTO

---

## 📞 Contact

**Email:** [email protected]  
**Phone:** +254 759 917 315  
**Website:** https://logirc.com  
**Twitter:** [@Logirc_](https://twitter.com/Logirc_)  
**Instagram:** [@logirc](https://instagram.com/logirc)

---

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Vercel for amazing hosting
- The React and Next.js teams
- All our users and contributors

---

## 📈 Roadmap

- [ ] Voice chat support
- [ ] Image generation with DALL-E
- [ ] Multi-language support
- [ ] Team collaboration features
- [ ] Custom AI model training
- [ ] Chrome extension
- [ ] Desktop application (Electron)
- [ ] API for third-party integrations

---

<div align="center">

**Made with ❤️ in Kenya by Logirc Ltd**

*The logic is simple — innovate or fade!* 🚀

[Website](https://logirc.com) · [Twitter](https://twitter.com/Logirc_) · [Instagram](https://instagram.com/logirc)

</div>
