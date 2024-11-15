import Link from "next/link";
// import SmallBanner_myPage from "../../components/smallbanner-mypage";
import history from "../../../moun_web/moun/public/image/mypage/history.png";
import myInfo from "../../../moun_web/moun/public/image/mypage/myInfo.png";
import mySongs from "../../../moun_web/moun/public/image/mypage/mySongs.png";
import Image from "next/image";
import Logout from "@/component/mypage/logout";
import ProfileCard from "@/component/mypage/profile-card";

export default function Profile() {
  const list = [
    {
      link: "/mySong",
      img: mySongs,
      title: "내 노래",
    },
    {
      link: "/mypage/account",
      img: myInfo,
      title: "계정정보",
    },
    {
      link: "/history",
      img: history,
      title: "결제내역",
    },
  ] as const;

  return (
    <div className="flex-col w-full">
      <section className="mt-28">
        <ProfileCard />
      </section>
      <section className="mt-8 w-full bg-neutral-100/75 h-[40rem]">
        <div className="w-[min(28rem,100%)] m-auto">
          <ol className="flex flex-col">
            {list.map((item, idx) => {
              return (
                <li className="h-16 px-4" key={idx}>
                  <Link
                    className="flex justify-between items-center h-full w-full"
                    href={item.link}
                  >
                    <h2 className="flex items-center text-base font-normal my-auto">
                      <Image className="mr-4" src={item.img} alt="" />
                      <span>{item.title}</span>
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
                  </Link>
                </li>
              );
            })}
            <Logout />
          </ol>
          <Link
            href="/upload"
            className=" flex items-center justify-between bg-black text-white font-bold w-[min(28rem,100%) px-5 py-4 rounded-xl m-4"
          >
            <div>
              1분 만에 <span className="inline text-green-400"> 내 노래 </span>
              등록하기
            </div>
            <div className="rounded-full bg-neutral-700 p-2 w-10 Center">
              👉
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
