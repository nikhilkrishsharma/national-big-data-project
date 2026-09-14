import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PhoneCall, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="text-center space-y-2 pt-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Contact & Support</h1>
        <p className="text-xs text-slate-500 font-medium">Emergency helpline directory and feedback desk</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 space-y-4">
          <Card title="Emergency Helplines">
            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                <span className="text-xs text-rose-700 font-semibold">National Emergency Number</span>
                <p className="text-2xl font-extrabold font-mono text-rose-600 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5" /> 112
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-xs text-blue-700 font-semibold">Disaster Helpline</span>
                <p className="text-2xl font-extrabold font-mono text-blue-600 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5" /> 1078
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card title="Send a Message">
            {submitted ? (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900">Message Sent Successfully</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full bg-slate-50 text-xs font-medium text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-slate-50 text-xs font-medium text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Message Details..."
                  className="w-full bg-slate-50 text-xs font-medium text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                ></textarea>
                <Button type="submit" variant="primary" size="md" icon={Send} className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
