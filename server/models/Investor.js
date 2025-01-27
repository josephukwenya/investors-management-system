const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const InvestorSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  organization: {
    type: String,
    required: [true, 'Organization is required'],
  },
  sector: {
    type: String,
    required: [true, 'Sector is required'],
  },
  meansOfContact: {
    type: String,
    enum: ['Social media ads', 'Referral', 'In-person'],
    required: [true, 'Means of contact is required'],
  },
  registered: {
    type: String,
    required: [true, 'Registered is required'],
  },
  committed: {
    type: String,
    required: [true, 'Committed is required'],
  },
  eventAttended: {
    type: String,
    required: [true, 'Event attended is required'],
  },
  progressUpdate: {
    type: String,
    required: [true, 'Progress update is required'],
  },
  temperatureLevel: {
    type: String,
    enum: ['Hot', 'Warm', 'Cold'],
    required: [true, 'Temperature level is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Investor', InvestorSchema);
