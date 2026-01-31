"use client";

import { Google } from "@mui/icons-material";
import { useRouter } from "next/navigation";


export default function Signup() {
    const router = useRouter();

    const goSignIn = () => {
        router.push("/login")
    }

    const handleSignUp = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/auth/google`;
    }

    return (
        <div className="flex bg-gray-100 h-screen w-full items-center justify-center">
        {/* Card container */}
        <div className="bg-white max-w-[500px] w-full mx-6 h-80 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            
            {/* Header */}
            <div>
                <p className="font-semibold text-xl">Join us now</p>
            </div>

            {/* Content */}
            <div>
                <p className="text-slate-600 text-md">
                    Register your account below
                </p>

            <button
                onClick={handleSignUp}
                className="flex flex-row border-2 rounded-xl w-full h-12 mt-8 items-center justify-center gap-2
                        hover:bg-slate-50 transition cursor-pointer"
            >
                <Google/>
                <p className="font-semibold">Sign up with Google</p>
            </button>
            </div>

            {/* Footer */}
            <div className="flex flex-row gap-1 text-md">
                <p>Already have an account?</p>
            <button
                onClick={goSignIn}
                className="text-purple-600 font-semibold hover:text-blue-400 cursor-pointer"
            >
                Log In
            </button>
            </div>
        </div>
        </div>
    );
}