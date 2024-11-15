import React from "react";
import Image from "next/image";
import LoginImg from "@/public/image/login-page.png";
import { twMerge } from "tailwind-merge";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={twMerge("Box flex flex-col-reverse lg:flex-row h-full")}>
      <section className="w-full lg:w-1/2 lg:block mt-10">
        <div className="flex flex-col items-center py-8">{children}</div>
      </section>
      <Image
        className="lg:w-1/2 h-[calc(16rem+10vw)] lg:h-auto w-full object-cover"
        src={LoginImg}
        priority
        alt="login-img"
      />
    </div>
  );
}
