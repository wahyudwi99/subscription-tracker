"use client";

import { Google } from "@mui/icons-material";

export default function Login() {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/auth/google`;
  };

  const goSignUp = () => {
    window.location.replace("/signup");
  };

  return (
    <div className="flex bg-gray-100 h-screen w-full items-center justify-center">
      {/* Card container */}
      <div className="bg-white max-w-[500px] w-full mx-6 h-80 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
        
        {/* Header */}
        <div>
          <div className="flex flex-row gap-1 mb-2">
            <p className="text-purple-600 font-semibold text-lg">Hi!</p>
            <p className="font-semibold text-lg">Welcome Back</p>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-slate-600 text-sm">
            You can login with your google account through this button below
          </p>

          <button
            onClick={handleLogin}
            className="flex flex-row border-2 rounded-xl w-full h-12 mt-8 items-center justify-center gap-2
                       hover:bg-slate-50 transition cursor-pointer"
          >
            <Google/>
            <p className="font-semibold">Log In with Google</p>
          </button>
        </div>

        {/* Footer */}
        <div className="flex flex-row gap-1 text-sm">
          <p>Do not have an account?</p>
          <button
            onClick={goSignUp}
            className="text-purple-600 font-semibold hover:text-blue-400 cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
