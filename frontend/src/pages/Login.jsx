import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CloudRain, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState('Analyst');
  const [email, setEmail] = useState('analyst@weather.gov.in');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(role, email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto shadow-sm">
            <CloudRain className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Analyst Portal Login</h1>
          <p className="text-xs text-slate-500 font-medium">National Weather Intelligence Platform</p>
        </div>

        <Card className="space-y-4">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('Analyst')}
                className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                  role === 'Analyst' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Analyst</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('Admin')}
                className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                  role === 'Admin' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 text-xs font-medium text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <Button type="submit" variant="primary" size="md" icon={ArrowRight} className="w-full">
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
