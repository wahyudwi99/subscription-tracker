
import React from 'react';
import { CreditCard, Shield, TrendingUp, ArrowRight, CheckCircle, Moon, Sun } from 'lucide-react';
import Pricing from './Pricing';

interface LandingPageProps {
  onGetStarted: (plan?: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, isDark, toggleTheme }) => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Animated background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-20 animate-blob animation-delay-4000"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-8 mx-auto max-w-7xl">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <CreditCard className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">SubsTrack</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-slate-500 dark:text-slate-400">
          <a href="#features" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors">About</a>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            title="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => onGetStarted()}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-20 pb-32 mx-auto max-w-7xl text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Stop Bleeding Money on <br />
          <span className="gradient-text">Unused Subscriptions</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-10">
          The all-in-one platform to track recurring payments, get renewal alerts, and optimize your monthly spending with AI-powered suggestions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onGetStarted('Free')}
            className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white dark:bg-white dark:text-slate-900 font-bold rounded-2xl hover:opacity-90 transition-all text-lg group"
          >
            Start Free Dashboard
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 glass dark:text-white text-slate-900 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-lg">
            Watch Demo
          </button>
        </div>

        {/* Floating Mockup Preview */}
        <div className="mt-24 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-indigo-500/20 blur-3xl -z-10 rounded-full scale-75"></div>
          <div className="glass rounded-3xl p-4 md:p-8 shadow-2xl border border-white/20">
            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden aspect-[16/9] shadow-inner flex flex-col border border-slate-200 dark:border-white/5">
              <div className="h-12 border-b border-slate-200 dark:border-white/10 flex items-center px-6 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <div className="w-40 h-4 bg-slate-200 dark:bg-white/5 rounded-full ml-4"></div>
              </div>
              <div className="flex-1 p-8 grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <div className="h-32 bg-slate-100 dark:glass rounded-2xl animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-slate-100 dark:glass rounded-2xl animate-pulse"></div>
                    <div className="h-24 bg-slate-100 dark:glass rounded-2xl animate-pulse animation-delay-1000"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-full bg-slate-100 dark:glass rounded-2xl animate-pulse animation-delay-2000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="px-6 py-32 bg-slate-100 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Everything you need to save</h2>
            <p className="text-slate-600 dark:text-slate-400">Automated, secure, and built for modern finance.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="text-blue-500" />}
              title="Secure Tracking"
              description="Bank-grade encryption for all your financial data and account connections."
            />
            <FeatureCard 
              icon={<CheckCircle className="text-green-500" />}
              title="One-Click Cancels"
              description="Identify unused services and cancel them instantly from our dashboard."
            />
            <FeatureCard 
              icon={<TrendingUp className="text-purple-500" />}
              title="Spend Insights"
              description="Detailed charts showing your spending habits and upcoming bill predictions."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing isDark={isDark} onSelectPlan={onGetStarted} />

      {/* Footer */}
      <footer className="px-6 py-20 border-t border-slate-200 dark:border-white/10 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CreditCard className="text-white" size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight">SubsTrack</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © 2024 SubsTrack Inc. All rights reserved. Helping you save one subscription at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="bg-white dark:glass p-8 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-white/30 transition-all group shadow-sm dark:shadow-none">
    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
