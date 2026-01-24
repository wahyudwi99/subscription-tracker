
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Subscription, SubscriptionCategory } from '../types';

interface SubscriptionFormProps {
  onClose: () => void;
  onSubmit: (sub: Omit<Subscription, 'id'>) => void;
  isDark: boolean;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onClose, onSubmit, isDark }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: SubscriptionCategory.ENTERTAINMENT,
    billingCycle: 'monthly' as 'monthly' | 'yearly',
    nextBillingDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.nextBillingDate) return;

    onSubmit({
      name: formData.name,
      amount: parseFloat(formData.amount),
      currency: 'USD',
      billingCycle: formData.billingCycle,
      category: formData.category,
      nextBillingDate: formData.nextBillingDate
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`absolute inset-0 backdrop-blur-sm ${isDark ? 'bg-slate-950/80' : 'bg-slate-900/40'}`} onClick={onClose}></div>
      <div className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border ${isDark ? 'glass border-white/10' : 'bg-white border-slate-200'}`}>
        <div className={`p-6 border-b flex items-center justify-between ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <h2 className="text-xl font-bold">New Subscription</h2>
          <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Service Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Netflix, Disney+"
              className={`w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Amount ($)</label>
              <input 
                type="number" 
                step="0.01"
                required
                placeholder="0.00"
                className={`w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Cycle</label>
              <select 
                className={`w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                value={formData.billingCycle}
                onChange={(e) => setFormData({...formData, billingCycle: e.target.value as 'monthly' | 'yearly'})}
              >
                <option value="monthly" className={isDark ? "bg-slate-900" : "bg-white"}>Monthly</option>
                <option value="yearly" className={isDark ? "bg-slate-900" : "bg-white"}>Yearly</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Category</label>
            <select 
              className={`w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as SubscriptionCategory})}
            >
              {Object.values(SubscriptionCategory).map(cat => (
                <option key={cat} value={cat} className={isDark ? "bg-slate-900" : "bg-white"}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Next Billing Date</label>
            <input 
              type="date" 
              required
              className={`w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
              value={formData.nextBillingDate}
              onChange={(e) => setFormData({...formData, nextBillingDate: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all mt-4 shadow-lg shadow-indigo-600/20"
          >
            Add Subscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
