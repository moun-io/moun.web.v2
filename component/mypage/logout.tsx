"use client";
import LogoutImg from "@/public/image/mypage/logout.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {useUser} from "@/lib/context/authProvider";
export default function Logout() {
    const {logout} = useUser();
  const router = useRouter();

  return (
    <li className="h-16 px-4">
      <button
        className="flex justify-between items-center h-full w-full"
        onClick={async (e) => {
          e.preventDefault();
          const ok = confirm("모은을 떠나시겠습니까 용사여?");
          if (!ok) return;
          try {
              logout();
            router.replace("/");
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <h2 className="flex items-center text-base font-normal my-auto">
          <Image className="mr-4" src={LogoutImg} alt="" />
          <span>로그아웃</span>
        </h2>
        <div>
          <svg
            className="w-5 h-5 text-black sm:w-6 sm:h-6 dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </button>
    </li>
  );
}
