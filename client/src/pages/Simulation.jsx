import React, { useState } from 'react';
import { Activity, ShieldCheck, AlertOctagon, AlertTriangle, Send } from 'lucide-react';

const Simulation = () => {
  const [formData, setFormData] = useState({
    amount: '',
    location: 'Domestic',
    device: 'Mobile',
    failedAttempts: '0',
    accountAge: '2',
    time: '14:00',
    isNewDevice: false
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Simulate API delay
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:5000/api/simulate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(formData.amount),
            location: formData.location,
            device: formData.device,
            failedAttempts: parseInt(formData.failedAttempts),
            accountAge: parseInt(formData.accountAge),
            time: formData.time,
            isNewDevice: formData.isNewDevice
          })
        });
        
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        // Fallback simulation logic if backend is not running
        let score = 0;
        let reasons = [];
        if (parseFloat(formData.amount) > 10000) { score += 30; reasons.push("High Amount"); }
        if (parseInt(formData.failedAttempts) > 2) { score += 40; reasons.push("Multiple Failed Logins"); }
        if (formData.isNewDevice) { score += 25; reasons.push("New Unrecognized Device"); }
        if (formData.location === 'International') { score += 20; reasons.push("Foreign Location"); }
        
        setResult({
          riskScore: Math.min(score, 99),
          status: score >= 70 ? 'High Risk Fraud' : score >= 40 ? 'Medium Risk' : 'Safe',
          reason: reasons.length ? reasons.join(', ') : 'Normal Behavior',
          recommendation: score >= 70 ? 'Block immediately' : score >= 40 ? 'Request OTP' : 'Allow Transaction'
        });
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const getMeterColor = (score) => {
    if (score >= 70) return 'mt-2 h-4 rounded-full bg-fs-red shadow-[0_0_10px_rgba(239,68,68,0.8)]';
    if (score >= 40) return 'mt-2 h-4 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]';
    return 'mt-2 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      
      {/* Form Section */}
      <div className="glass-panel p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="text-fs-neon" /> Live Fraud Simulation
        </h2>
        <p className="text-gray-400 mb-8 text-sm">
          Enter transaction parameters to test how the AI engine scores risk based on heuristic logic.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Amount ($)</label>
              <input type="number" required placeholder="e.g. 500" className="w-full bg-fs-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fs-neon transition-colors" value={formData.amount} onChange={(e)=>setFormData({...formData, amount: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <select className="w-full bg-fs-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fs-neon transition-colors" value={formData.location} onChange={(e)=>setFormData({...formData, location: e.target.value})}>
                <option value="Domestic">Domestic (Local)</option>
                <option value="International">International</option>
                <option value="Unknown">Unknown / Hidden Proxy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Time of Transaction</label>
              <input type="time" required className="w-full bg-fs-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fs-neon" value={formData.time} onChange={(e)=>setFormData({...formData, time: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Failed Login Attempts</label>
              <input type="number" required min="0" className="w-full bg-fs-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fs-neon" value={formData.failedAttempts} onChange={(e)=>setFormData({...formData, failedAttempts: e.target.value})} />
            </div>
          </div>
          
          <label className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg bg-fs-dark/50 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 accent-fs-neon" checked={formData.isNewDevice} onChange={(e)=>setFormData({...formData, isNewDevice: e.target.checked})} />
            <span className="text-gray-300 font-medium">This is a new, unrecognized device</span>
          </label>

          <button type="submit" disabled={loading} className="w-full neon-button flex items-center justify-center gap-2 text-lg">
            {loading ? <span className="animate-pulse">Analyzing Pattern...</span> : <><Send size={20} /> Run AI Simulation</>}
          </button>
        </form>
      </div>

      {/* Result Section */}
      <div className="glass-panel p-8 flex flex-col items-center justify-center min-h-[400px]">
        {!result && !loading && (
          <div className="text-center text-gray-500 flex flex-col items-center">
            <ShieldCheck size={64} className="mb-4 opacity-50" />
            <p>Awaiting transaction data...</p>
          </div>
        )}

        {loading && (
          <div className="text-center w-full">
            <div className="w-16 h-16 border-4 border-fs-blue border-t-fs-neon rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-300 animate-pulse">Computing risk matrices and analyzing behavioral anomalies...</p>
          </div>
        )}

        {result && !loading && (
          <div className="w-full animate-fade-in-up">
            <div className="text-center mb-8">
              {result.riskScore >= 70 ? (
                <AlertOctagon size={80} className="text-fs-red mx-auto mb-4 animate-bounce" />
              ) : result.riskScore >= 40 ? (
                <AlertTriangle size={80} className="text-yellow-500 mx-auto mb-4" />
              ) : (
                <ShieldCheck size={80} className="text-green-500 mx-auto mb-4" />
              )}
              
              <h3 className={`text-3xl font-bold ${result.riskScore >= 70 ? 'text-fs-red' : result.riskScore >= 40 ? 'text-yellow-500' : 'text-green-500'}`}>
                {result.status}
              </h3>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span className="text-gray-300">Risk Score Meter</span>
                <span className={`${result.riskScore >= 70 ? 'text-fs-red' : result.riskScore >= 40 ? 'text-yellow-500' : 'text-green-500'}`}>{result.riskScore}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-4 relative overflow-hidden">
                <div 
                  className={getMeterColor(result.riskScore)}
                  style={{ width: `${result.riskScore}%`, transition: 'width 1s ease-in-out', marginTop: 0 }}
                ></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-fs-dark p-4 rounded-lg border border-gray-700">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Detection Reason</p>
                <p className="text-gray-200">{result.reason}</p>
              </div>
              <div className="bg-fs-dark p-4 rounded-lg border border-gray-700">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">AI Recommendation</p>
                <p className="text-gray-200">{result.recommendation}</p>
              </div>
            </div>
            
          </div>
        )}
      </div>

    </div>
  );
};

export default Simulation;
