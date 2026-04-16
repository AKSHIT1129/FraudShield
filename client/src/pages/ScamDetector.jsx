import React, { useState } from 'react';
import { Search, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';

const ScamDetector = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:5000/api/detect-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
        
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        setResult(data);
      } catch(err) {
        // Fallback
        const lowerText = text.toLowerCase();
        let status = "Safe";
        let score = 0;
        let p = [];
        if (lowerText.match(/(blocked|urgent|otp|click|lottery)/)) { score+= 50; p.push("High Risk Keywords"); }
        if (lowerText.match(/(login|link|verify|account)/)) { score+= 25; p.push("Suspicious Link/Verbs");}
        
        if (score >= 50) status = "Fraud Likely";
        else if (score >= 25) status = "Suspicious";
        
        setResult({
          status,
          reason: score > 0 ? `Triggered heuristics: ${p.join(', ')}` : 'Routine message structure.'
        });
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Fake Message / Scam Detector</h2>
        <p className="text-gray-400">Paste a suspicious SMS, WhatsApp message, or Email below to analyze its intent using our pattern recognition system.</p>
      </div>

      <div className="glass-panel p-8">
        <textarea 
          rows="6"
          className="w-full bg-fs-dark border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-fs-neon resize-none mb-6"
          placeholder="e.g. 'Dear customer, your bank account will be blocked today. Click the link to update your PAN. Share OTP instantly...'"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        
        <button 
          onClick={handleAnalyze} 
          disabled={loading || !text.trim()}
          className="neon-button w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing syntax and keywords...' : <><Search size={20} /> Analyze Text Integrity</>}
        </button>

        {result && (
          <div className={`mt-8 p-6 rounded-xl border ${result.status === 'Fraud Likely' ? 'bg-red-900/20 border-red-500' : result.status === 'Suspicious' ? 'bg-yellow-900/20 border-yellow-500' : 'bg-green-900/20 border-green-500'}`}>
            <div className="flex items-start gap-4">
              {result.status === 'Fraud Likely' ? <AlertTriangle className="text-red-500 w-8 h-8 shrink-0 mt-1" /> :
               result.status === 'Suspicious' ? <AlertTriangle className="text-yellow-500 w-8 h-8 shrink-0 mt-1" /> :
               <CheckCircle className="text-green-500 w-8 h-8 shrink-0 mt-1" />}
              
              <div>
                <h3 className={`text-xl font-bold mb-2 ${result.status === 'Fraud Likely' ? 'text-red-500' : result.status === 'Suspicious' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {result.status}
                </h3>
                <p className="text-gray-300 leading-relaxed">{result.reason}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 text-sm text-gray-500 text-center">
        Try triggering the detector by using keywords like "Urgent", "Account blocked", "OTP", or "Click here".
      </div>
    </div>
  );
};

export default ScamDetector;
