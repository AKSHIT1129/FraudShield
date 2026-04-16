import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleRegister = (e) => {
    e.preventDefault();
    toast.success('Registration completed successfully!', {
      style: { background: '#22c55e', color: '#fff' }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-fs-card rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-800 p-8">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-fs-blue/20 mb-4">
            <Shield className="w-8 h-8 text-blue-600 dark:text-fs-neon" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">System Access</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Register a new Dashboard User</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                required
                className="w-full bg-gray-50 dark:bg-fs-dark border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-fs-neon transition-colors" 
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                required
                className="w-full bg-gray-50 dark:bg-fs-dark border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-fs-neon transition-colors" 
                placeholder="example@college.edu"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="password" 
                required
                className="w-full bg-gray-50 dark:bg-fs-dark border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-fs-neon transition-colors" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="w-full py-3 px-4 rounded-lg text-white font-semibold flex justify-center bg-blue-600 hover:bg-blue-700 dark:bg-fs-blue/20 dark:border dark:border-fs-blue dark:hover:bg-fs-blue transition-all">
            Secure Registration
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already authorized?{' '}
          <Link to="/login" className="font-semibold text-blue-600 dark:text-fs-neon hover:underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
