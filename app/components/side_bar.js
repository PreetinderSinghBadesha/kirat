import Image from "next/image";

export default function Sidebar() {
    return (
        <div className="border-r-2 border-black p-4 mb-5 w-full sm:w-[25%] sm:h-screen sm:top-0 sm:left-0">
            <div className="flex items-center flex-col sm:flex-row text-center sm:text-left">
                <Image
                    src="https://i.pinimg.com/736x/8d/ff/49/8dff49985d0d8afa53751d9ba8907aed.jpg"
                    alt="Profile"
                    width={70}
                    height={70}
                    className="rounded-full"
                />
                <div className="pl-0 sm:pl-5 mt-2 sm:mt-0">
                    <p className="font-semibold">Hi, Preet</p>
                    <p className="text-sm text-gray-600">Your daily adventure starts now</p>
                </div>
            </div>

            <div className="py-4 grid grid-cols-2 sm:grid-cols-1 gap-3">
                <div className="bg-[#5594f1] px-3 py-5 rounded-2xl flex items-center">
                    <div className="bg-[rgba(0,0,0,0.3)] w-10 h-10 rounded-full flex justify-center items-center">
                        <Image src="/operation.png" alt="pending" width={20} height={20} />
                    </div>
                    <div className="ml-3 text-white">
                        <p className="font-bold text-lg">On going</p>
                        <p className="font-sm">24 Tasks</p>
                    </div>
                </div>

                <div className="bg-[#ffc446] px-3 py-5 rounded-2xl flex items-center">
                    <div className="bg-[rgba(0,0,0,0.3)] w-10 h-10 rounded-full flex justify-center items-center">
                        <Image src="/pending.png" alt="In process" width={20} height={20} />
                    </div>
                    <div className="ml-3 text-white">
                        <p className="font-bold text-lg">In Progress</p>
                        <p className="font-sm">12 Tasks</p>
                    </div>
                </div>

                <div className="bg-[#52c1c5] px-3 py-5 rounded-2xl flex items-center">
                    <div className="bg-[rgba(0,0,0,0.3)] w-10 h-10 rounded-full flex justify-center items-center">
                        <Image src="/clipboard-check.png" alt="pending" width={20} height={20} />
                    </div>
                    <div className="ml-3 text-white">
                        <p className="font-bold text-lg">Completed</p>
                        <p className="font-sm">18 Tasks</p>
                    </div>
                </div>

                <div className="bg-[#f26e56] px-3 py-5 rounded-2xl flex items-center">
                    <div className="bg-[rgba(0,0,0,0.3)] w-10 h-10 rounded-full flex justify-center items-center">
                        <Image src="/comment-xmark.png" alt="pending" width={20} height={20} />
                    </div>
                    <div className="ml-3 text-white">
                        <p className="font-bold text-lg">Urgent</p>
                        <p className="font-sm">6 Tasks</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
