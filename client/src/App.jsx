import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, LayoutDashboard, Search, Home as HomeIcon, AlertTriangle, Moon, Sun, User as UserIcon, FileText } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useTheme } from './contexts/ThemeContext';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Dashboard from './pages/Dashboard';
import ScamDetector from './pages/ScamDetector';
import DatabaseDemo from './pages/DatabaseDemo';
import Login from './pages/Login';
import Register from './pages/Register';
import Reports from './pages/Reports';
import LiveThreatSimulator from './components/LiveThreatSimulator';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
        <Toaster />
        <LiveThreatSimulator />

        {/* Navigation Bar */}
        <nav className="bg-white dark:bg-fs-card border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600 dark:text-fs-neon" />
                <span className="text-xl font-bold dark:glow-text dark:text-white text-gray-900 tracking-wide">FraudShield AI</span>
              </div>
              
              <div className="hidden lg:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-fs-neon px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                    <HomeIcon size={18} /> Home
                  </Link>
                  <Link to="/simulate" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-fs-neon px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                    <Shield size={18} /> Simulation
                  </Link>
                  <Link to="/detector" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-fs-neon px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                    <AlertTriangle size={18} /> Scam Detector
                  </Link>
                  <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-fs-neon px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <Link to="/reports" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-fs-neon px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                    <FileText size={18} /> Reports
                  </Link>
                  <Link to="/db-demo" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-fs-neon px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                    <Search size={18} /> DB Demo
                  </Link>
                  
                  <div className="border-l border-gray-300 dark:border-gray-700 h-6 mx-2"></div>
                  
                  <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-fs-neon px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                    <UserIcon size={18} /> Login
                  </Link>
                  <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-fs-neon px-3 py-2 rounded-md transition-colors" title="Toggle Theme">
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulate" element={<Simulation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detector" element={<ScamDetector />} />
            <Route path="/db-demo" element={<DatabaseDemo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-fs-card border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
            <Shield className="h-6 w-6 text-gray-400 dark:text-gray-500 mb-4" />
            <p>Created for Academic Demonstration | MongoDB + Node.js + React Final Year Project</p>
            <p className="mt-2 text-gray-400 dark:text-gray-600">FraudShield AI &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
        
      </div>
    </Router>
  )
}

export default App;
