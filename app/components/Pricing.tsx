
import React from 'react';
import { Check, Zap } from 'lucide-react';

interface PricingProps {
  isDark: boolean;
  onSelectPlan: (plan: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ isDark, onSelectPlan }) => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for individuals just starting out.',
      features: [
        'Up to 5 subscriptions',
        'Basic renewal alerts',
        'Email support',
        'Mobile app access'
      ],
      buttonText: 'Get Started',
      highlight: false
    },
    {
      name: 'Pro',
      price: '9',
      description: 'Unlock the full power of AI-driven savings.',
      features: [
        'Unlimited subscriptions',
        'AI Spending Advisor',
        'Priority push alerts',
        'Detailed spend analytics',
        'Bank sync (Coming Soon)'
      ],
      buttonText: 'Go Pro',
      highlight: true
    },
    {
      name: 'Business',
      price: '29',
      description: 'Advanced features for power users.',
      features: [
        'Everything in Pro',
        'Family/Team sharing',
        'Custom export (CSV/PDF)',
        '24/7 Priority support',
        'Custom billing categories'
      ],
      buttonText: 'Contact Sales',
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="px-6 py-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:scale-[1.02] ${
                plan.highlight 
                  ? 'border-indigo-500 shadow-2xl shadow-indigo-500/10 z-10' 
                  : isDark ? 'glass border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                  <Zap size={12} />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className="text-slate-500 dark:text-slate-400">/month</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-sm">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-white/10 text-indigo-500'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  plan.highlight 
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                    : isDark ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
