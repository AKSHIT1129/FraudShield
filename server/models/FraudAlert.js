import mongoose from 'mongoose';

const fraudAlertSchema = new mongoose.Schema({
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  riskScore: { type: Number, required: true },
  reason: { type: String, required: true },
  actionTaken: { type: String, default: 'Alerted' },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('FraudAlert', fraudAlertSchema);
