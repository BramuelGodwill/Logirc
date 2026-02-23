const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  subscription: {
    type: String,
    enum: ['free', 'basic', 'premium', 'business'],
    default: 'free'
  },
  subscriptionId: {
    type: String,
    default: null
  },
  messagesUsed: {
    type: Number,
    default: 0
  },
  messageLimit: {
    type: Number,
    default: 50
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update message limit based on subscription
userSchema.methods.updateMessageLimit = function() {
  const limits = {
    free: 50,
    basic: 500,
    premium: 1000,
    business: 5000
  };
  this.messageLimit = limits[this.subscription] || 50;
};

module.exports = mongoose.model('User', userSchema);
