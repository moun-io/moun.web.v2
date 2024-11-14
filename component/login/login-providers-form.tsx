"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import GoogleLogo from "@/public/image/google-logo.png";
// import { loginWithGoogle } from "@/lib/firebase/auth";
import Image from "next/image";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
export default function LoginProviderForm({
  router,
}: {
  setErrorMsg: Dispatch<SetStateAction<string>>;
  router: AppRouterInstance;
}) {
  const [errorMsg, setErrorMsg] = useState("");
  const onGoogleLogin = async () => {
    // try {
    //   const credential = await loginWithGoogle();
    //   if (credential) {
    //     router.replace("/");
    //   } else {
    //     setErrorMsg("로그인에 실패하였습니다.");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const loginList = [
    {
      title: "구글로 로그인하기",

      logo: GoogleLogo,
      onLogin: onGoogleLogin,
    },

    // {
    //   title: "카카오로 로그인하기",

    //   logo: KakaoLogo,
    // },
  ];

  return (
    <>
      {loginList.map((element, idx) => (
        <div
          key={idx}
          className="cursor-pointer my-1 flex justify-center text-center font-medium text-base w-full h-12 rounded-lg border border-gray leading-[3rem] hover:shadow-md hover:border-neutral-300"
          onClick={element.onLogin}
        >
          <Image
            priority
            className="px-2 object-contain"
            alt="logo"
            width={36}
            src={element.logo}
          />
          <span>{element.title}</span>
        </div>
      ))}
      {errorMsg && (
        <div className="text-red-600 text-md my-2 animate-pulse ">
          {errorMsg}
        </div>
      )}
    </>
  );
}
