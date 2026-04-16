import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Fingerprint, MessageSquareWarning, CreditCard, MonitorSmartphone, Lock } from 'lucide-react';

const FraudCard = ({ icon: Icon, title, how, avoid }) => (
  <div className="glass-panel p-6 transform hover:-translate-y-2 transition-transform duration-300">
    <div className="bg-fs-dark/50 p-3 rounded-full w-fit mb-4 border border-fs-neon/30">
      <Icon className="w-8 h-8 text-fs-neon" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <div className="space-y-3 text-sm text-gray-300">
      <p><span className="text-fs-red font-semibold">How it works:</span> {how}</p>
      <p><span className="text-green-400 font-semibold">How to avoid:</span> {avoid}</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="pt-10 pb-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 text-center mt-12 mb-24">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
          Detect & Prevent Online Fraud with <span className="text-fs-neon glow-text">AI</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          FraudShield AI is an advanced demonstration model showcasing how Machine Learning patterns and behavior analysis can combat digital deception in real-time.
        </p>
        <div className="flex gap-6 justify-center">
          <Link to="/simulate" className="neon-button">Start Live Demo</Link>
          <Link to="/dashboard" className="px-6 py-3 font-semibold text-white bg-transparent border border-gray-600 hover:border-gray-400 rounded-lg transition-all">Explore Dashboard</Link>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto px-4 mb-24 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">About The Project</h2>
        <p className="text-gray-300 text-lg leading-relaxed glass-panel p-8">
          With the rise of digital payments, cyber fraud is increasing rapidly. This project studies common attack vectors and utilizes an AI-driven logic engine paired with a secure MongoDB backend to identify suspicious transactions instantly. It aims to alert users, categorize threats, and suggest immediate prevention steps.
        </p>
      </div>

      {/* Fraud Types */}
      <div className="max-w-7xl mx-auto px-4 mb-24">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Common Fraud Techniques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FraudCard 
            icon={MessageSquareWarning} 
            title="Phishing Scam" 
            how="Fraudsters send fake SMS/Emails pretending to be bank officials, urging users to click malicious links."
            avoid="Never click unverified links. Always check the sender's official domain."
          />
          <FraudCard 
            icon={Lock} 
            title="OTP Fraud" 
            how="Scammers trick users into sharing their One-Time Password during a fake support call."
            avoid="Bank staff NEVER ask for OTP. Never share it, even with 'customer care'."
          />
          <FraudCard 
            icon={CreditCard} 
            title="Fake UPI Screenshot" 
            how="Scammers show a fake successfully generated payment screenshot without actually sending money."
            avoid="Always verify the actual bank SMS or app balance before handing over goods."
          />
          <FraudCard 
            icon={Fingerprint} 
            title="Identity Theft" 
            how="Attackers steal personal details from data breaches to open accounts or take loans in your name."
            avoid="Monitor your credit score regularly and freeze your credit if breached."
          />
          <FraudCard 
            icon={MonitorSmartphone} 
            title="Fake Loan App Scam" 
            how="Malicious apps offer instant loans but steal contacts and gallery photos to blackmail victims."
            avoid="Only download verified apps from the official Play Store or App Store."
          />
          <FraudCard 
            icon={ShieldAlert} 
            title="Social Engineering" 
            how="Attackers build trust over time or create fake emergencies to pressure you into sending money."
            avoid="Stop and verify. Ignore artificial urgency or emotional manipulation."
          />
        </div>
      </div>

      {/* Case Studies */}
      <div className="max-w-5xl mx-auto px-4 bg-fs-card rounded-2xl p-10 border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Case Studies</h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="border-l-4 border-fs-red pl-6 py-2">
            <h4 className="text-lg font-bold text-white mb-2">Case 1: The Panic Call</h4>
            <p className="text-gray-400 mb-4 text-sm">
              A user receives a call that their account will be blocked. Panicked, they share an OTP. They lose ₹50,000 instantly.
            </p>
            <p className="text-fs-neon text-sm font-semibold">How our system helps:</p>
            <p className="text-sm text-gray-300">FraudShield's Scam Text Detector alerts the user immediately when they receive the initial "Account Blocked" SMS, warning them of 90% risk.</p>
          </div>

          <div className="border-l-4 border-green-500 pl-6 py-2">
            <h4 className="text-lg font-bold text-white mb-2">Case 2: Overseas Transaction</h4>
            <p className="text-gray-400 mb-4 text-sm">
              A 2 AM transaction of ₹1.5 Lakh is attempted from a new device in Russia, while the user's home location is India.
            </p>
            <p className="text-green-400 text-sm font-semibold">How our system helps:</p>
            <p className="text-sm text-gray-300">The Simulation Engine detects high amount + unusual time + location mismatch. It auto-blocks the transaction and triggers an alert.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
