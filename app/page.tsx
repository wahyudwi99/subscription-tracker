'use client';

import React from 'react';
import {
  CreditCard,
  Shield,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Pricing from '@/app/components/Pricing';


type FeatureType = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({icon, title, description}: FeatureType) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-2xl bg-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}


export default function Page() {
  const onGetStarted = (plan?: string) => {
    console.log('Selected plan:', plan ?? 'default');
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50 text-slate-900">
      {/* Soft background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-8 mx-auto max-w-7xl">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <CreditCard className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold">SubsTrack</span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-slate-600">
          <a href="#features" className="hover:text-indigo-600">
            Features
          </a>
          <a href="#pricing" className="hover:text-indigo-600">
            Pricing
          </a>
          <a href="#" className="hover:text-indigo-600">
            About
          </a>
        </div>

        <button
          onClick={() => onGetStarted()}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition"
        >
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 px-6 pt-20 pb-32 mx-auto max-w-7xl text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Stop Bleeding Money on <br />
          <span className="text-indigo-600">
            Unused Subscriptions
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10">
          Track recurring payments, get renewal alerts, and optimize your monthly
          spending effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => onGetStarted('Free')}
            className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-lg font-semibold shadow hover:bg-indigo-500 transition"
          >
            Start Free Dashboard
            <ArrowRight />
          </button>

          <button className="px-8 py-4 rounded-2xl text-lg font-semibold bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition">
            Watch Demo
          </button>
        </div>
      </main>

      {/* Features */}
      <section
        id="features"
        className="px-6 py-32 bg-slate-100"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything you need to save
          </h2>
          <p className="text-slate-600">
            Simple, secure, and designed for modern subscriptions.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Shield className="text-indigo-600" />}
            title="Secure Tracking"
            description="Bank-grade encryption keeps your financial data safe."
          />
          <FeatureCard
            icon={<CheckCircle className="text-green-600" />}
            title="One-Click Cancels"
            description="Easily cancel subscriptions you no longer use."
          />
          <FeatureCard
            icon={<TrendingUp className="text-purple-600" />}
            title="Spend Insights"
            description="Understand where your money goes every month."
          />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white">
        <Pricing isDark={false} onSelectPlan={onGetStarted} />
      </section>

      {/* Footer */}
      <footer className="px-6 py-20 text-center border-t border-slate-200 bg-slate-50">
        <p className="text-sm text-slate-500">
          © 2024 SubsTrack Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}