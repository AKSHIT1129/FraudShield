// Simulated AI Fraud Prediction Logic
export const predictFraud = (transactionData) => {
  const { amount, location, device, failedAttempts, accountAge, time, isNewDevice } = transactionData;
  let riskScore = 0;
  let reason = [];

  // Rules-based "AI" logic
  if (amount > 10000) {
    riskScore += 30;
    reason.push("High transaction amount");
  } else if (amount > 5000) {
    riskScore += 15;
  }

  if (failedAttempts > 3) {
    riskScore += 40;
    reason.push("Multiple failed login attempts");
  } else if (failedAttempts > 0) {
    riskScore += 10;
  }

  if (isNewDevice) {
    riskScore += 25;
    reason.push("Unrecognized new device used");
  }

  // Location logic (placeholder for actual geo IP difference)
  if (location === "International" || location === "Unknown") {
    riskScore += 20;
    reason.push("Unusual location detected");
  }

  // Time logic (e.g. late night transactions)
  const hour = parseInt(time?.split(':')[0] || '12');
  if (hour >= 1 && hour <= 5) {
    riskScore += 15;
    reason.push("Unusual transaction time (late night)");
  }

  // Cap at 99
  riskScore = Math.min(riskScore, 99);

  let status = "Safe";
  let recommendation = "Transaction is secure.";

  if (riskScore >= 70) {
    status = "High Risk Fraud";
    recommendation = "Block transaction and alert user immediately.";
  } else if (riskScore >= 40) {
    status = "Medium Risk";
    recommendation = "Require Two-Factor Authentication (OTP).";
  }

  if (reason.length === 0) reason.push("Normal activity pattern");

  return {
    riskScore,
    status,
    reason: reason.join(', '),
    recommendation
  };
};

export const detectScamMessage = (text) => {
  const lowerText = text.toLowerCase();
  
  const highRiskKeywords = ['blocked', 'urgent', 'otp', 'claim', 'lottery', 'click now', 'winner', 'password', 'suspend'];
  const suspiciousKeywords = ['bank', 'login', 'verify', 'account', 'update', 'link'];
  
  let score = 0;
  let matches = [];

  highRiskKeywords.forEach(word => {
    if (lowerText.includes(word)) {
      score += 40;
      matches.push(word);
    }
  });

  suspiciousKeywords.forEach(word => {
    if (lowerText.includes(word)) {
      score += 15;
      matches.push(word);
    }
  });

  if (score >= 70) {
    return { status: "Fraud Likely", reason: `Contains multiple manipulative triggers (${matches.join(', ')}) usually found in phishing.` };
  } else if (score >= 30) {
    return { status: "Suspicious", reason: `Mentions sensitive actions (${matches.join(', ')}). Verify the sender before clicking links.` };
  } else {
    return { status: "Safe", reason: "No obvious scam patterns detected in content." };
  }
};
