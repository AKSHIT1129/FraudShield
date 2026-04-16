import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  location: { type: String, required: true },
  device: { type: String, required: true },
  status: { type: String, enum: ['Completed', 'Blocked', 'Pending'], default: 'Pending' },
  riskScore: { type: Number, default: 0 },
  isNewDevice: { type: Boolean, default: false },
  failedAttempts: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);
