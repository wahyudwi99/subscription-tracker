"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="flex space-x-3 mb-8">
          <div className="w-7 h-25 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="relative w-18 h-12">
            <div className="absolute inset-0 bg-blue-400 rounded-lg animate-spin"></div>
          </div>
          <div className="w-7 h-25 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Please wait...
          </h2>
          <div className="flex items-center justify-center space-x-2 text-slate-400">
            <span className="text-sm font-medium">Your data is being processed</span>
            <span className="flex">
              <span className="animate-[bounce_1s_infinite_0ms]">.</span>
              <span className="animate-[bounce_1s_infinite_200ms]">.</span>
              <span className="animate-[bounce_1s_infinite_400ms]">.</span>
            </span>
          </div>
        </div>
      </div>

      {/* Background Soft Blobs (Lucu/Modern) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob [animation-delay:2s]"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
}