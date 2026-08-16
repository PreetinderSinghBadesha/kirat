import Link from "next/link";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import SidebarFilters from "./sidebar_filters";

export default async function Sidebar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const firstName = user?.given_name || "there";
    const initials = `${user?.given_name?.[0] || ""}${user?.family_name?.[0] || ""}`.toUpperCase() || "U";

    return (
        <div className="w-full sm:w-[280px] sm:flex-shrink-0 bg-white border-b-2 sm:border-b-0 sm:border-r-2 border-black p-6 flex flex-col sm:justify-between sm:min-h-screen sm:sticky sm:top-0">
            <div>
                <div className="flex items-center gap-2.5 mb-6">
                    <div className="w-9 h-9 bg-black text-white rounded-[9px] flex items-center justify-center font-bold text-base flex-shrink-0">
                        K
                    </div>
                    <span className="font-bold text-lg">Kirat</span>
                </div>

                <div className="flex items-center gap-2.5 bg-[#f6f6f6] border-2 border-black rounded-2xl p-3 shadow-[2px_4px_0_0_rgba(0,0,0,1)] mb-6">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {initials}
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-semibold text-sm m-0">Hi, {firstName}</p>
                        <p className="text-xs text-[#777777] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                            Let&apos;s clear today&apos;s list
                        </p>
                    </div>
                </div>

                <p className="text-[11px] tracking-wide text-[#999999] font-semibold mb-2">MENU</p>
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-black text-white font-semibold text-sm mb-6"
                >
                    Dashboard
                </Link>

                <SidebarFilters />
            </div>

            <LogoutLink className="w-full block text-center bg-white border-2 border-black rounded-full py-2.5 font-semibold text-sm cursor-pointer mt-6 sm:mt-0">
                Log out
            </LogoutLink>
        </div>
    );
}
