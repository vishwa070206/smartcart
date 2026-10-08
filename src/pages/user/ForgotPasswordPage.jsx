import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-8 shadow-sm space-y-6">
        <h1 className="text-2xl font-black text-[#282C3F]">Reset Password</h1>

        {sent ? (
          <div className="p-4 bg-[#E0F2F1] text-[#00897B] rounded-xl text-xs font-bold space-y-2">
            <div>Password reset email sent!</div>
            <Link to="/login" className="inline-block text-[#FF3F6C] underline">Return to Login</Link>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#282C3F]">Your Account Email</label>
              <input type="email" required className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg p-3 text-xs" />
            </div>
            <button type="submit" className="w-full bg-[#FF3F6C] text-white font-extrabold py-3 rounded-xl">
              SEND RESET LINK
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
