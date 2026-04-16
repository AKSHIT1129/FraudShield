import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const threats = [
  "🚨 High-value threat intercepted from IP 192.168.1.15",
  "🛡️ Multiple failed logins blocked (Russia)",
  "⚠️ Suspicious OTP request halted on User #88912",
  "🚨 Phishing link scrubbed from inbound SMS stream",
  "⚠️ Unrecognized device login challenge sent"
];

const LiveThreatSimulator = () => {
  useEffect(() => {
    // Stage presentation "Wow" factor
    // Randomly pop up a simulated background threat every 15 to 45 seconds to simulate a live SOC environment.
    
    const triggerRandomThreat = () => {
      const threat = threats[Math.floor(Math.random() * threats.length)];
      
      toast(threat, {
        icon: '🔔',
        style: {
          borderRadius: '10px',
          background: '#1F2937', // dark bg
          color: '#fff',
          border: '1px solid #374151',
          padding: '16px',
        },
        position: 'bottom-right',
        duration: 5000,
      });

      const nextInterval = Math.floor(Math.random() * (45000 - 15000 + 1) + 15000);
      timeoutId = setTimeout(triggerRandomThreat, nextInterval);
    };

    let timeoutId = setTimeout(triggerRandomThreat, 10000); // First one after 10s

    return () => clearTimeout(timeoutId);
  }, []);

  return null; // Component renders nothing directly
};

export default LiveThreatSimulator;
