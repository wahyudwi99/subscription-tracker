"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Error(){
    const router = useRouter()

    const backUserProfile = () => (
        router.push("/user-profile")
    )

    return (
        <div className="flex flex-col gap-10 h-screen place-items-center justify-center text-center lg:text-start mx-6">
            <div className="flex lg:flex-row flex-col gap-5 place-items-center">
                <div className="flex flex-col gap-3 lg:max-w-[700px] mb-10">
                    <p className="font-bold text-4xl text-blue-600">Sorry, we couldn't process your card :((</p>
                    <p className="font-semibold text-xl">Please check your card to your bank, or if your bank account balance has been reduced, please send the email to support@extplan.io</p>
                    <p>Please attach the screenshot of your bank balance reduction related to this transaction in your email.</p>
                </div>
                <Image
                    src="/images/payment_error.png"
                    alt="Error page"
                    width={300}
                    height={400}
                />
            </div>
            <div className="flex flex-col place-items-center gap-4">
                <p>Click this button below to back to user profile page</p>
                <div 
                    className="border-2 rounded-xl border-blue-500 bg-blue-500 text-white p-2 cursor-pointer"
                    onClick={backUserProfile}
                >Back to User Profile</div>
            </div>
        </div>
    )
}