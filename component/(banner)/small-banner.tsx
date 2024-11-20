import Link from "next/link";

export default function SmallBanner() {
    return (
        <div className="px-8 my-20 text-white w-full flex justify-between items-center h-24 bg-black rounded-2xl">
            <div className="H2 text-purple-400">
                🍆 💦 첫 이용자 <span className="text-white">프로모션</span>
            </div>
            <Link
                href="/"
                className="Center bg-white text-sm font-medium w-10 h-10 rounded-full lg:w-fit"
            >
                <svg
                    className=" text-black dark:text-gray-800 lg:hidden block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M9 5l7 7-7 7"
                    ></path>
                </svg>
                <div className="text-black hidden lg:block px-4 font-medium">
                    더 알아보기
                </div>
                <span className="hidden">More</span>
            </Link>
        </div>
    );
}
