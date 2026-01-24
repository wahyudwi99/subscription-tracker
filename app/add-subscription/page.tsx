"use client";

import React, { useState } from "react";
import { X, CreditCard, Calendar, DollarSign, Tag } from "lucide-react";

export default function AddSubscriptionModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    billingCycle: "monthly",
    category: "",
    startDate: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Add Subscription</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-slate-600">Service Name</label>
            <div className="relative mt-1">
              <CreditCard className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Netflix, Spotify, AWS..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-slate-600">Price</label>
            <div className="relative mt-1">
              <DollarSign className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="9.99"
                type="number"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* Billing Cycle */}
          <div>
            <label className="text-sm font-medium text-slate-600">Billing Cycle</label>
            <select
              value={form.billingCycle}
              onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-slate-600">Category</label>
            <div className="relative mt-1">
              <Tag className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Streaming, Cloud, Productivity"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="text-sm font-medium text-slate-600">Start Date</label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm"
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm text-sm"
          >
            Save Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
