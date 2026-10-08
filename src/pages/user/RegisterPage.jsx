import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function RegisterPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-[#282C3F]">Create Account</h1>
          <p className="text-xs text-[#696E79]">Join SmartMart for intelligent supermarket shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#282C3F]">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg p-3 text-xs"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#282C3F]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg p-3 text-xs"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#282C3F]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg p-3 text-xs"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF3F6C] hover:bg-[#D81B4E] text-white font-extrabold py-3 rounded-xl shadow-md text-xs flex items-center justify-center gap-2"
          >
            <span>REGISTER ACCOUNT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#696E79]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#FF3F6C] hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
