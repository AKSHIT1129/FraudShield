import React, { useEffect, useState, useRef } from 'react';
import { Users, Activity, AlertTriangle, ShieldCheck, TrendingUp, BarChart3, Download, Search as SearchIcon } from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend
);

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white dark:bg-fs-card border border-gray-100 dark:border-gray-800 rounded-xl p-6 flex items-center justify-between shadow-sm">
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
    <div className={`p-4 rounded-xl bg-opacity-20 ${colorClass}`}>
      <Icon className="w-8 h-8" />
    </div>
  </div>
);

const Dashboard = () => {
  const dashboardRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalUsers: '...', totalTransactions: '...', fraudCasesToday: '...', blockedTransactions: '...', safeTransactions: '...', fraudTrend: [0,0,0,0,0,0,0], scamTypes: [1,1,1,1,1]
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard-stats')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(e => {
        setStats({
          totalUsers: '12,450', totalTransactions: '89,400', fraudCasesToday: '42', blockedTransactions: '156', safeTransactions: '89,202',
          fraudTrend: [12, 19, 3, 5, 2, 3, 42], scamTypes: [30, 20, 15, 25, 10]
        });
      });
  }, []);

  const handleDownloadPDF = () => {
    toast('Generating PDF...', { icon: '📄' });
    const element = dashboardRef.current;
    const opt = {
      margin: 0.5,
      filename: 'FraudShield_Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().from(element).set(opt).save().then(() => {
      toast.success('Report Downloaded Successfully');
    });
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#9CA3AF' } } },
    scales: {
      x: { grid: { color: '#e5e7eb', drawBorder: false }, ticks: { color: '#9CA3AF' } },
      y: { grid: { color: '#e5e7eb', drawBorder: false }, ticks: { color: '#9CA3AF' } }
    }
  };

  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Fraud Alerts', data: stats.fraudTrend, borderColor: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.5)', tension: 0.4
    }]
  };

  const pieData = {
    labels: ['Phishing', 'OTP Scam', 'Fake URL', 'Malware', 'Other'],
    datasets: [{
      data: stats.scamTypes, backgroundColor: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'], borderWidth: 0
    }]
  };

  const alerts = [
    { id: '#ALT-8821', date: 'Just now', data: '$15k (Russia) - New Device', score: 95, status: 'Blocked' },
    { id: '#ALT-8820', date: '10 min ago', data: '$500 - Unknown Proxy, 4 Failed log...', score: 65, status: 'OTP Triggered' },
    { id: '#ALT-8819', date: '1 hr ago', data: 'Scam SMS "Block Account" Upload', score: 85, status: 'Warned User' }
  ];

  const filteredAlerts = alerts.filter(a => 
    a.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.data.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10" ref={dashboardRef}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Operations Dashboard</h2>
        <button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Download size={18} /> Export PDF Report
        </button>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} colorClass="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-500" />
        <StatCard title="Transactions" value={stats.totalTransactions} icon={Activity} colorClass="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-500" />
        <StatCard title="Safe TXs" value={stats.safeTransactions} icon={ShieldCheck} colorClass="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-500" />
        <StatCard title="Fraud Today" value={stats.fraudCasesToday} icon={AlertTriangle} colorClass="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-500" />
        <StatCard title="Blocked" value={stats.blockedTransactions} icon={TrendingUp} colorClass="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white dark:bg-fs-card border border-gray-100 dark:border-gray-800 rounded-xl p-6 h-96 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
            <TrendingUp className="text-blue-600 dark:text-fs-neon" size={20} /> 7-Day Fraud Trend
          </h3>
          <div className="h-72">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-fs-card border border-gray-100 dark:border-gray-800 rounded-xl p-6 h-96 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
            <BarChart3 className="text-blue-600 dark:text-fs-neon" size={20} /> Scam Type Distribution
          </h3>
          <div className="h-72">
            <Pie data={pieData} options={{...chartOptions, scales: { x: {display: false}, y: {display: false} }}} />
          </div>
        </div>
      </div>

      {/* Recent Alerts Table with Search */}
      <div className="bg-white dark:bg-fs-card border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Recent AI Alerts & Intercepts</h3>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by ID or Location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-fs-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 dark:focus:border-fs-neon text-gray-900 dark:text-white"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                <th className="py-4 px-4 font-medium uppercase text-xs">Alert ID</th>
                <th className="py-4 px-4 font-medium uppercase text-xs">Date</th>
                <th className="py-4 px-4 font-medium uppercase text-xs">Transaction Data</th>
                <th className="py-4 px-4 font-medium uppercase text-xs">Risk Score</th>
                <th className="py-4 px-4 font-medium uppercase text-xs text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredAlerts.length > 0 ? filteredAlerts.map(alert => (
                <tr key={alert.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300 font-medium">{alert.id}</td>
                  <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{alert.date}</td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{alert.data}</td>
                  <td className="py-4 px-4"><span className={`font-bold ${alert.score > 80 ? 'text-red-500' : 'text-yellow-500'}`}>{alert.score}%</span></td>
                  <td className="py-4 px-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-xs border ${
                      alert.status === 'Blocked' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30' :
                      alert.status === 'OTP Triggered' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30' :
                      'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-fs-neon dark:border-blue-500/30'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500 dark:text-gray-400">No alerts found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
