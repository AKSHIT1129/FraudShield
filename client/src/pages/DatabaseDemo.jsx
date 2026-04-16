import React from 'react';
import { Database, FileJson, Server } from 'lucide-react';

const CodeBlock = ({ title, code }) => (
  <div className="mb-8">
    <h4 className="text-neon bg-gray-800 text-gray-300 text-sm py-2 px-4 rounded-t-lg font-mono flex items-center gap-2">
      <FileJson size={14} /> {title}
    </h4>
    <pre className="bg-[#0B0F19] p-4 rounded-b-lg border border-t-0 border-gray-800 overflow-x-auto text-sm text-green-400 font-mono">
      <code>{code}</code>
    </pre>
  </div>
);

const DatabaseDemo = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <Database className="w-16 h-16 text-fs-neon mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-white mb-4">Database Architecture</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          FraudShield relies on a robust MongoDB document structure. Since NoSQL databases provide incredible flexibility, our schemas are designed to store relationship-heavy analytical data for the AI engine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Server size={24} className="text-fs-blue" /> Mongoose Schemas Array
          </h3>
          <p className="text-gray-400 text-sm mb-6">Below are representations of our Node.js Models mapping to the MongoDB Collections.</p>
          
          <CodeBlock 
            title="User & Transaction Schemas" 
            code={`const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true }
});

const transactionSchema = new Schema({
  userId: { type: ObjectId, ref: 'User' },
  amount: Number,
  location: String,
  device: String,
  status: { type: String, enum: ['Completed', 'Blocked'] },
  riskScore: Number,
  date: { type: Date, default: Date.now }
});`}
          />

          <CodeBlock 
            title="FraudAlert Schema" 
            code={`const fraudAlertSchema = new Schema({
  transactionId: { type: ObjectId, ref: 'Transaction' },
  riskScore: Number,
  reason: String,
  actionTaken: String,
  date: Date
});`}
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Database size={24} className="text-fs-blue" /> MongoDB Operations
          </h3>
          <p className="text-gray-400 text-sm mb-6">Demonstrating common CRUD operations and Aggregations used in this project's backend controller.</p>

          <CodeBlock 
            title="Insert a suspicious transaction"
            code={`const newTx = new Transaction({
  userId: "64a0f8b9e4b...",
  amount: 15000,
  location: "International",
  device: "Unknown Mobile",
  riskScore: 85,
  status: "Blocked"
});
await newTx.save();`}
          />

          <CodeBlock 
            title="Aggregation: Fraud Monthly Trend"
            code={`const trend = await FraudAlert.aggregate([
  {
    $group: {
      _id: { $month: "$date" },
      incidentCount: { $sum: 1 },
      avgRiskScore: { $avg: "$riskScore" }
    }
  },
  { $sort: { "_id": 1 } }
]);`}
          />
          
          <CodeBlock 
            title="Search for specific reports"
            code={`const reports = await Report.find({
  complaintType: "Phishing",
  date: { $gte: new Date(Date.now() - 7*24*60*60*1000) } // Last 7 days
}).populate('userId', 'name email');`}
          />

        </div>
      </div>
      
    </div>
  );
};

export default DatabaseDemo;
