
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Settings, 
  Plus, 
  LogOut, 
  Search, 
  Filter, 
  Trash2,
  TrendingUp,
  AlertCircle,
  BrainCircuit,
  Moon,
  Sun,
  Loader2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Subscription, SubscriptionCategory } from '../types';
import SubscriptionForm from './SubscriptionForm';
// import { supabase } from '../supabase';

interface DashboardProps {
  onBackToLanding: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  session: any;
}

const SPENDING_HISTORY = [
  { month: 'Jan', amount: 120 },
  { month: 'Feb', amount: 145 },
  { month: 'Mar', amount: 130 },
  { month: 'Apr', amount: 180 },
  { month: 'May', amount: 155 },
  { month: 'Jun', amount: 175 },
];

const Dashboard: React.FC<DashboardProps> = ({ onBackToLanding, isDark, toggleTheme, session }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [session]);

  const totalMonthly = useMemo(() => {
    return subscriptions.reduce((acc, sub) => {
      const monthlyAmount = sub.billingCycle === 'yearly' ? sub.amount / 12 : sub.amount;
      return acc + monthlyAmount;
    }, 0);
  }, [subscriptions]);

  const filteredSubscriptions = subscriptions.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleDelete = async (id: string) => {
  //   try {
  //     const { error } = await supabase
  //       .from('subscriptions')
  //       .delete()
  //       .eq('id', id);
      
  //     if (error) throw error;
  //     setSubscriptions(prev => prev.filter(s => s.id !== id));
  //   } catch (err) {
  //     alert('Failed to delete subscription');
  //   }
  // };

  // const handleAddSubscription = async (newSub: Omit<Subscription, 'id'>) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('subscriptions')
  //       .insert([{
  //         ...newSub,
  //         user_id: session.user.id
  //       }])
  //       .select();

  //     if (error) throw error;
  //     if (data) {
  //       setSubscriptions(prev => [data[0], ...prev]);
  //     }
  //     setIsModalOpen(false);
  //   } catch (err) {
  //     alert('Failed to add subscription');
  //   }
  // };

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   onBackToLanding();
  // };

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar */}
      <aside className={`hidden lg:flex w-64 flex-col border-r p-6 transition-colors duration-300 ${isDark ? 'border-white/10 bg-slate-950' : 'border-slate-200 bg-white'}`}>
        <div className="flex items-center space-x-2 mb-12">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <CreditCard className="text-white" size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight">SubsTrack</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active isDark={isDark} />
          <NavItem icon={<CreditCard size={20} />} label="Subscriptions" isDark={isDark} />
          <NavItem icon={<BrainCircuit size={20} />} label="AI Advisor" isDark={isDark} />
          <NavItem icon={<Settings size={20} />} label="Settings" isDark={isDark} />
        </nav>

        <div className="space-y-4 mt-auto">
          <button 
            onClick={toggleTheme}
            className="flex items-center space-x-3 w-full p-3 rounded-xl transition-colors text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button 
            // onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-3 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center justify-between md:block">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-slate-500 dark:text-slate-400">Managing subscriptions for {session?.user?.email}</p>
            </div>
            <button onClick={toggleTheme} className="lg:hidden p-2 rounded-xl bg-slate-200 dark:bg-white/10">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            <Plus size={20} />
            Add Subscription
          </button>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-indigo-500" size={32} />
          </div>
        ) : (
          <>
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard 
                title="Monthly Spending" 
                value={`$${totalMonthly.toFixed(2)}`} 
                trend="+12% from last month"
                icon={<TrendingUp className="text-emerald-500" />}
                isDark={isDark}
              />
              <StatCard 
                title="Active Subscriptions" 
                value={subscriptions.length.toString()} 
                trend="Live data from database"
                icon={<AlertCircle className="text-amber-500" />}
                isDark={isDark}
              />
              <StatCard 
                title="Potential Savings" 
                value="$42.50" 
                trend="Based on usage"
                icon={<BrainCircuit className="text-purple-500" />}
                isDark={isDark}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className={`p-6 rounded-3xl border transition-colors duration-300 ${isDark ? 'glass border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="text-lg font-bold mb-6">Spending Overview</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={SPENDING_HISTORY}>
                        <defs>
                          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                        <XAxis dataKey="month" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: isDark ? '#0f172a' : '#fff', 
                            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', 
                            borderRadius: '12px' 
                          }}
                          itemStyle={{ color: isDark ? '#fff' : '#0f172a' }}
                        />
                        <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className={`overflow-hidden rounded-3xl border transition-colors duration-300 ${isDark ? 'glass border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="p-6 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h3 className="text-lg font-bold">My Subscriptions</h3>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search services..."
                        className={`w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'text-white' : 'text-slate-900'}`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-500 text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">Service</th>
                          <th className="px-6 py-4 font-semibold">Category</th>
                          <th className="px-6 py-4 font-semibold">Amount</th>
                          <th className="px-6 py-4 font-semibold">Next Bill</th>
                          <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                        {filteredSubscriptions.map((sub) => (
                          <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4 font-semibold">{sub.name}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs">
                                {sub.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bold">
                              ${sub.amount}
                              <span className="text-slate-500 text-xs ml-1">/{sub.billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
                              {sub.nextBillingDate}
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                // onClick={() => handleDelete(sub.id)}
                                className="text-slate-400 hover:text-red-500 transition-colors p-2"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredSubscriptions.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                              No subscriptions found. Start by adding one!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-6 rounded-3xl border transition-colors duration-300 ${isDark ? 'glass border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="text-lg font-bold mb-4">Account Status</h3>
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm">
                    Account is synchronized with Supabase Database.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {isModalOpen && (
        <SubscriptionForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddSubscription} 
          isDark={isDark}
        />
      )}
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, isDark: boolean }> = ({ icon, label, active, isDark }) => (
  <a 
    href="#" 
    className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
        : `text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5`
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
);

const StatCard: React.FC<{ title: string, value: string, trend: string, icon: React.ReactNode, isDark: boolean }> = ({ title, value, trend, icon, isDark }) => (
  <div className={`p-6 rounded-3xl border transition-colors duration-300 ${isDark ? 'glass border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>{icon}</div>
      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{title}</span>
    </div>
    <div className="flex flex-col">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-xs text-slate-500 mt-1">{trend}</span>
    </div>
  </div>
);

export default Dashboard;
