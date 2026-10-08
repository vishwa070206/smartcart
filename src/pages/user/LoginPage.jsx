import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('vishwa@smartmart.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#FF3F6C] text-white flex items-center justify-center font-black text-2xl mx-auto shadow-md">
            S
          </div>
          <h1 className="text-2xl font-black text-[#282C3F]">Welcome to SmartMart</h1>
          <p className="text-xs text-[#696E79]">Sign in to access personalized recommendations &amp; orders</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#282C3F]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg p-3 text-xs text-[#282C3F]"
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="font-bold text-[#282C3F]">Password</label>
              <Link to="/forgot-password" className="text-[#FF3F6C] font-semibold hover:underline">Forgot?</Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg p-3 text-xs text-[#282C3F]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF3F6C] hover:bg-[#D81B4E] text-white font-extrabold py-3 rounded-xl shadow-md text-xs flex items-center justify-center gap-2"
          >
            <span>SIGN IN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 bg-[#FFF0F4] border border-[#FF3F6C]/20 rounded-xl text-[11px] text-[#282C3F] space-y-1">
          <div className="font-bold text-[#D81B4E]">Demo Credentials Quick Hint:</div>
          <div>Customer: <b>vishwa@smartmart.com</b></div>
          <div>Admin Portal: <b>admin@smartmart.com</b></div>
        </div>

        <div className="text-center text-xs text-[#696E79]">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#FF3F6C] hover:underline">Register Now</Link>
        </div>
      </div>
    </div>
  );
}
