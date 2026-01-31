"use client";

import React, { useMemo, useEffect, useState } from "react";
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
  Trash2
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
  subscription_name: string;
  subscription_start_date: string;
  subscription_period: string;
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
/* ================= COMPONENT ================= */

export default function Dashboard() {
  const totalMonthly = useMemo(() => 0, []);
  const [userEmail, setUserEmail] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedSubsName, setSelectedSubsName] = useState<string | null>(null);
  const [subsData, setSubsData] = useState<SubsDataType[]>([])

  const handleDeleteClick = (subs_name: string) => {
    setSelectedSubsName(subs_name);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedSubsName === null) return;

    setSubsData(prev =>
      prev.filter(subs => subs.subscription_name !== selectedSubsName)
    );
    setShowDeleteConfirm(false);
    setSelectedSubsName(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedSubsName(null);
  };

  const deleteSubscription = async() => {
    try {
      const post_res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/delete-subscription`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_BACKEND_SECRET_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userEmail,
          deleted_subs_name: selectedSubsName
        })
      })
    } catch(error) {
      console.log("API fetch error", error)
    }
  }

  useEffect(() => {
    const getSubscriptionData = async () => {
        try {
          const get_res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/get-subscription-data`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_BACKEND_SECRET_KEY}`,
                "Content-Type": "application/json"
              }
          })
          if (get_res.status === 200) {
            const getSubData = await get_res.json()
            setSubsData(getSubData.data.list_data)
            setUserEmail(getSubData.data.user_email)
          }
        } catch (error) {
          console.log("API fetch data error", error)
        }
    }

    getSubscriptionData();
  }, [])


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
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ================= LEFT (2/3) ================= */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm">
                {/* HEADER */}
                <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
                  <h3 className="font-semibold">My Subscriptions</h3>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search
                        size={16}
                        className="absolute left-3 top-2.5 text-slate-400"
                      />
                      <input
                        placeholder="Search services..."
                        className="pl-9 pr-3 py-2 rounded-lg bg-slate-100 text-sm outline-none"
                      />
                    </div>

                    <button className="text-sm text-indigo-600 hover:underline">
                      View all
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                {subsData.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-slate-500 text-sm mb-3">
                      You don’t have any subscriptions yet
                    </p>
                    <button
                      onClick={() => setAddOpen(true)}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Add your first subscription
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="max-h-[320px] overflow-y-auto space-y-3 px-6 py-4">
                      {subsData.map((subs, index) => (
                        <div
                          key={index}
                          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 hover:shadow-sm transition"
                        >
                          {/* LEFT */}
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">
                              {subs.subscription_name.charAt(0)}
                            </div>

                            <div>
                              <p className="font-medium text-slate-800">
                                {subs.subscription_name}
                              </p>
                              <p className="text-xs text-slate-500">
                                Started {subs.subscription_start_date}
                              </p>
                            </div>
                          </div>

                          {/* RIGHT */}
                          <div className="flex items-center gap-3">
                            <span className="text-xs px-2 py-1 rounded-md bg-indigo-50 text-indigo-600">
                              {subs.subscription_period}
                            </span>

                            <button
                              onClick={() =>
                                handleDeleteClick(subs.subscription_name)
                              }
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-2 rounded-lg transition cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ================= RIGHT (1/3) ================= */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold mb-3">Insights</h3>

              <div className="space-y-4">
                <div className="rounded-xl bg-indigo-50 p-4">
                  <p className="text-sm font-medium text-indigo-700">
                    Upcoming Renewals
                  </p>
                  <p className="text-xs text-indigo-600 mt-1">
                    No subscriptions renewing this week
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-sm font-medium text-emerald-700">
                    Potential Savings
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">
                    Cancel unused subscriptions to save more
                  </p>
                </div>

                <button className="w-full mt-2 text-sm text-indigo-600 hover:underline">
                  Open AI Advisor
                </button>
              </div>
            </div>
          </div>
      </main>

      {/* ================= ADD SUBSCRIPTION MODAL ================= */}
      {addOpen && (
        <AddSubscriptionPicker
          userEmail={userEmail}
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
