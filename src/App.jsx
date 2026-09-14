import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { useWebSocket } from './hooks/useWebSocket';
import { Radio, X } from 'lucide-react';

const ToastNotification = () => {
  const { latestNotification, clearNotification } = useWebSocket();

  if (!latestNotification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[3000] max-w-sm bg-white p-4 rounded-2xl border border-rose-200 shadow-2xl animate-bounce space-y-1">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Live Alert Stream</span>
        </div>
        <button onClick={clearNotification} className="text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <h4 className="text-xs font-bold text-slate-900 mt-1.5">{latestNotification.title}</h4>
      <p className="text-[11px] text-slate-500 font-medium">{latestNotification.location} • {latestNotification.rainfallIntensity}</p>
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col justify-between bg-[#f4f8fc]">
          <div className="bg-mesh"></div>
          
          <Navbar />
          
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <AppRoutes />
          </main>

          <Footer />

          <ToastNotification />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
