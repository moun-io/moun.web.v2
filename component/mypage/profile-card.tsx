"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/lib/context/authProvider";
import Profile from "@/component/svg/profile";
import Verified from "@/component/svg/verified";

export default function ProfileCard() {
  const {member , memberLoading } = useUser();

  return (
    member?.positions && (
      <figure className="m-auto px-4 flex w-[min(28rem,100%)] h-[4.5rem] ">
        <Link href="mypage/profile">
          {memberLoading ? (
            <div className="bg-neutral-500 animate-pulse size-20 rounded-full"></div> // * 로딩중일때
          ) : member?.profilePrictrueUrl ? (
            <Image
              src={member.profilePrictrueUrl}
              width={80}
              height={80}
              className="rounded-full aspect-square"
              alt="userProfile"
              priority
            />
          ) : (
            <Profile className="w-20 h-20" />
          )}
        </Link>
        <figcaption className="ml-4 flex flex-col justify-between ">
          <h1 className="text-lg font-medium">
            <div className="flex items-center gap-1">
              {member?.displayName || "프로필을 업데이트해주세요"}
              <strong>
                {member?.verified && (
                  <Verified className="size-6 align-middle" />
                )}
              </strong>
            </div>
            {/* <div className="text-xs text-neutral-400">{member?.positions}</div> */}
          </h1>

          <Link href="mypage/profile">
            <div className="Center w-20 h-8 text-xs text-normal rounded-[1.25rem] border border-magenta text-magenta hover:bg-purple-500 hover:text-white hover:border-white transition-colors duration-300">
              프로필 수정
            </div>
          </Link>
          {
            user?.emailVerified === false && (
              <div className="text-xs text-red-600">
                이메일 인증이 필요합니다.
              </div>
            ) // * 이메일 인증이 안됐을때
          }
        </figcaption>
      </figure>
    )
  );
}
