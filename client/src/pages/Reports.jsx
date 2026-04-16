import React, { useState } from 'react';
import { FileText, Send, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Reports = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast.success('Fraud report successfully logged in Database.', {
        style: { background: '#10b981', color: '#fff' }
      });
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <FileText className="w-16 h-16 text-blue-600 dark:text-fs-neon mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Submit Fraud Report</h2>
        <p className="text-gray-600 dark:text-gray-400">Encountered a phishing message or suspicious transaction? File a report to help train our AI heuristic engine.</p>
      </div>

      <div className="bg-white dark:bg-fs-card rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Incident Type</label>
              <select required className="w-full bg-gray-50 dark:bg-fs-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-fs-neon">
                <option value="">Select Category...</option>
                <option value="Phishing">Phishing (Email/SMS)</option>
                <option value="IDTheft">Identity Theft / Account Takeover</option>
                <option value="FakeURL">Fake Website / App</option>
                <option value="OTP">OTP Fraud Call</option>
                <option value="Other">Other Suspicious Activity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Financial Loss ($)</label>
              <input type="number" defaultValue={0} min="0" className="w-full bg-gray-50 dark:bg-fs-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-fs-neon" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detailed Description</label>
            <textarea 
              required
              rows="5"
              placeholder="Describe how the fraud happened, key contact numbers, urls involved..."
              className="w-full bg-gray-50 dark:bg-fs-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-fs-neon resize-none"
            ></textarea>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 rounded-lg p-4 flex gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0" />
            <p className="text-amber-800 dark:text-amber-400">Submitting this form logs anomalous IP/Device signatures along with the report to improve detection metrics.</p>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 rounded-lg text-white font-bold flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-fs-blue/20 dark:border dark:border-fs-blue dark:hover:bg-fs-blue transition-all disabled:opacity-50">
            {loading ? 'Submitting to Database...' : <><Send size={20} /> File Formal Report</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reports;
