"use client";

import React, { useMemo, useState } from "react";
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  Plus,
  Search,
  TrendingUp,
  AlertCircle,
  BrainCircuit,
  Menu,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AddSubscriptionPicker from "../components/AddSubscription";


type SubsDataType = {
  subsName: string;
  startDate: string;
  duration: string;
}

/* ================= DATA ================= */

const SPENDING_HISTORY = [
  { month: "Jan", amount: 120 },
  { month: "Feb", amount: 140 },
  { month: "Mar", amount: 130 },
  { month: "Apr", amount: 180 },
  { month: "May", amount: 155 },
  { month: "Jun", amount: 175 },
];
const SUBS_DATA = [
  { subsName: "Netflix", startDate: "20 Nov 2025", duration: "1 month"},
  { subsName: "Disney+", startDate: "24 Okt 2025", duration: "1 month"},
  { subsName: "Spotify", startDate: "10 Nov 2025", duration: "1 month"},
  { subsName: "CNN", startDate: "15 Okt 2025", duration: "1 month"},
  { subsName: "Bloomberg", startDate: "20 Nov 2025", duration: "1 month"},
  { subsName: "ESPN", startDate: "24 Okt 2025", duration: "1 month"},
  { subsName: "Apple TV", startDate: "10 Nov 2025", duration: "1 month"},
  { subsName: "Vercel", startDate: "15 Okt 2025", duration: "1 month"},
]
/* ================= COMPONENT ================= */

export default function Dashboard() {
  const totalMonthly = useMemo(() => 0, []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [subsData, setSubsData] = useState<SubsDataType[]>(SUBS_DATA)
  

  return (
    <div className="min-h-screen flex bg-[#f7f9fc] text-slate-900">
      {/* OVERLAY (sidebar mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white px-6 py-8
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
      >
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <CreditCard size={16} />
          </div>
          <span className="text-xl font-bold">SubsTrack</span>
        </div>

        <nav className="space-y-1">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview" active />
          <SidebarItem icon={<CreditCard size={18} />} label="Subscriptions" />
          <SidebarItem icon={<BrainCircuit size={18} />} label="AI Advisor" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 px-8 py-6">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-sm text-slate-500">
                Managing subscriptions for
              </p>
            </div>
          </div>

          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-indigo-700 cursor-pointer"
          >
            <Plus size={16} />
            Add Subscription
          </button>
        </header>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="MONTHLY SPENDING"
            value={`$${totalMonthly.toFixed(2)}`}
            subtitle="+12% from last month"
            icon={
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                <TrendingUp size={18} />
              </div>
            }
          />
          <StatCard
            title="ACTIVE SUBSCRIPTIONS"
            value="0"
            subtitle="Live data from database"
            icon={
              <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
                <AlertCircle size={18} />
              </div>
            }
          />
          <StatCard
            title="POTENTIAL SAVINGS"
            value="$42.50"
            subtitle="Based on usage"
            icon={
              <div className="bg-purple-100 text-purple-600 p-2 rounded-xl">
                <BrainCircuit size={18} />
              </div>
            }
          />
        </div>

        {/* ================= CHART ================= */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="font-semibold mb-4">Spending Overview</h3>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={SPENDING_HISTORY}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={3}
                fill="url(#colorSpend)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-2xl shadow-sm max-h-150 p-3">
          <div className="p-6 flex justify-between items-center">
            <h3 className="font-semibold">My Subscriptions</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                placeholder="Search services..."
                className="pl-9 pr-3 py-2 rounded-lg bg-slate-100 text-sm outline-none"
              />
            </div>
          </div>
            {subsData.length === 0 ? (
                <div className="p-10 text-center text-slate-500 text-sm">
                  No subscriptions found. Start by adding one!
                </div>
              ) : (
                <div className="max-h-100 overflow-y-auto space-y-4">
                  {subsData.map((subs, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex flex-col text-left">
                        <span className="font-medium text-slate-800">
                          {subs.subsName}
                        </span>
                        <span className="text-xs text-slate-500">
                          Start: {subs.startDate}
                        </span>
                      </div>

                      <span className="text-sm text-slate-600">
                        {subs.duration}
                      </span>
                    </div>
                  ))}
                </div>
              )}
        </div>
      </main>

      {/* ================= ADD SUBSCRIPTION MODAL ================= */}
      {addOpen && (
        <AddSubscriptionPicker
          setSubsData={setSubsData}
          setAddOpen={setAddOpen}/>
      )}
    </div>
  );
}



/* ================= REUSABLE ================= */

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
        active
          ? "bg-indigo-600 text-white"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        {icon}
        <span className="text-xs text-slate-400 tracking-wide">{title}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
    </div>
  );
}
