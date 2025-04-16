import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import Image from 'next/image';
import UserLink from "./UserLink"; // adjust path if needed
import Hamburger from "./Hamburger";
import Link from 'next/link';

export default async function NavBar() {
    const session = await getServerSession(authOptions)
    const profile = session ? await getUserProfile(session?.user.token) : null;

    return (
        <nav className="flex justify-between items-center w-full px-6 py-4 bg-transparent">
            {/* Logo */}
            <div className="text-lg font-bold hover:text-[#0A4EB1]">
                <a href="/">HOTELIO</a>
            </div>

            {/* Desktop Navigation (hidden on small screens) */}
            <div className="hidden md:flex space-x-10 items-center">
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/#about">
                            <span className="font-sans font-semibold hover:text-[#0A4EB1]">
                                About
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/booking">
                            <span className="font-sans font-semibold hover:text-[#0A4EB1]">
                                Booking
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/hotel">
                            <span className="font-sans font-semibold hover:text-[#0A4EB1]">
                                Explore Stay
                            </span>
                        </Link>
                    </li>
                </ul>
                <div className="text-black ">
                    {session ? (
                        <UserLink profile={profile.data} />
                    ) : (
                        <Link
                            href="/register"
                            className="border p-2 rounded-lg text-black font-sans font-semibold hover:bg-blue-300 hover:text-black whitespace-nowrap"
                        >
                            Sign-In / Register
                        </Link>
                    )}
                </div>
                {session && <Hamburger profile={profile.data} />}
            </div>

            {/* Mobile Hamburger Menu (shown only on small screens) */}
            {/* <div className="md:hidden">
                <Hamburger profile={session ? profile.data : null} />
            </div> */}
        </nav>
    );
}