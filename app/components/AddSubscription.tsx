"use client";
import { useState } from "react";
import { start } from "repl";

type SubsDataType = {
  subscription_name: string;
  subscription_start_date: string;
  subscription_period: string;
}

type AddSubsDataType = {
    setSubsData: React.Dispatch<React.SetStateAction<SubsDataType[]>>;
    setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


/* ================= ADD SUBSCRIPTION PICKER ================= */
export default function AddSubscriptionPicker({setSubsData, setAddOpen}: AddSubsDataType){
      const items = [
        "Netflix",
        "Spotify",
        "YouTube Premium",
        "Apple Music",
        "Disney+",
        "AWS",
        "Google Cloud",
        "ChatGPT Plus",
      ];

      const [useCustom, setUseCustom] = useState(false);
      const [subsName, setSubsName] = useState("");
      const [startDate, setStartDate] = useState("");
      const [duration, setDuration] = useState("");
      const [durationUnit, setDurationUnit] = useState("");

      return (
          <div className="fixed z-50 inset-0 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/30"
            />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-semibold mb-1">
                Track a subscription
              </h2>
              <p className="text-sm text-slate-500 mb-5">
                Choose a service you want to track
              </p>

              {/* ===== SERVICE LIST ===== */}
              {!useCustom && (
                <>
                  <div className="space-y-2 max-h-56 overflow-y-auto mb-4">
                    {items.map((item) => (
                      <button
                        key={item}
                        onClick={() => setSubsName(item)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition
                          ${
                            subsName === item
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-slate-200 hover:bg-indigo-50 hover:border-indigo-400"
                          }`}
                      >
                        <span className="font-medium">{item}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setUseCustom(true);
                      setSubsName("");
                    }}
                    className="text-sm text-indigo-600 hover:underline cursor-pointer"
                  >
                    + Add custom subscription
                  </button>
                </>
              )}

              {/* ===== CUSTOM NAME ===== */}
              {useCustom && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-slate-600">
                    Subscription Name
                  </label>
                  <input
                    value={subsName}
                    onChange={(e) => setSubsName(e.target.value)}
                    placeholder="My Gym, VPN, Hosting..."
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  />

                  <button
                    onClick={() => {
                      setUseCustom(false);
                      setSubsName("");
                    }}
                    className="mt-2 text-xs text-slate-500 hover:underline"
                  >
                    ← Back to list
                  </button>
                </div>
              )}

              {/* ===== EXTRA FIELDS (ONLY IF NAME SELECTED) ===== */}
              {subsName && (
                <div className="mt-5 space-y-4">
                  {/* Start Date */}
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Subscription Duration
                    </label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="12"
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      />
                      <select
                        value={durationUnit}
                        onChange={(e) => setDurationUnit(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      >
                        <option value="month">Months</option>
                        <option value="year">Years</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ===== ACTIONS ===== */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {useCustom ? setUseCustom(false) : setAddOpen(false)}}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  disabled={!subsName}
                  onClick={() => {
                    setUseCustom(false)
                    setSubsData(prev => [
                      ...prev,
                      {
                        subscription_name: subsName,
                        subscription_start_date: startDate,
                        subscription_period: duration
                      }
                    ])
                  }}
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm disabled:opacity-50 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        );
      }