import Image from "next/image";
import getUser from "@/libs/Auth/getUser";
import getUserProfile from "@/libs/Auth/getUserProfile";

export default async function ProfileUserCard({ 
    token,
    uid 
}: { 
    token: string
    uid?: string 
}) {

    const userProfile = await (uid ? getUser(token, uid) : getUserProfile(token));
    const user = userProfile.data;

    return (

        <div className="flex items-center justify-between bg-[#4361ee] text-white rounded-2xl p-6 mx-0 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl max-w-fit h-80">
            <div className="flex flex-col gap-4 max-w-md">
                <h1 className="text-3xl font-bold">Hello, {user.name}!</h1>
                <p className="text-base leading-relaxed">
                    The Most Seamless And Secure Way To Book Unique Hotel Experiences Around The World.
                </p>
                <span className="bg-white text-[#4361ee] font-semibold text-sm py-1 px-4 rounded-md w-fit">
                    {user.role === "user" && (user.membershipTier || "No rank available")}
                    {user.role === "hotelManager" && "Hotel Manager"}
                </span>
            </div>

            <div className="relative w-64 h-64">
                <Image
                    src="/img/user/avatar.png" 
                    alt="User Avatar"
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    );
}