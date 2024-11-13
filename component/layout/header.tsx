"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import MOUN from "@/public/image/moun.png";
import LOGO from "@/public/image/symbol.png";
import Image from "next/image";

import Profile from "@/component/svg/profile";


export default function Header({ children }: { children: React.ReactNode }) {
    const [isOpened, setIsOpened] = useState(false);
    const Links = ["", "Songs", "Artists", "Released"] as const;
    const path = usePathname();
    const navRef = useRef<HTMLDivElement>(null);

    const toggle = () => setIsOpened(!isOpened);

    // * 화면 크기에 따른 상태 변경 Event Listener
    useEffect(() => {
        const onResize = () => {
            setIsOpened(window.innerWidth >= 1024); // * 1024px 이상일때는 NAV 열려있는 상태로
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // * 모바일에서 이동 시 NAV close
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsOpened(false);
        }
    }, [path]);

    return (
        <>
            <header className="fixed top-0 z-30 flex w-full bg-neutral-900 h-[4.5rem]">
                <div className="Box px-4 flex  justify-between items-center">
                    <div className=" flex gap-3">
                        {/*Hamburger*/}
                        <div className="lg:hidden">
                            <button
                                className="flex relative z-40 h-full w-5 "
                                onClick={toggle}
                            >
                                {isOpened ? (
                                    <div className="transition-all self-center bg-white w-5 h-0.5 rotate-45 before:block before:bg-white before:w-5 before:h-0.5 before:rotate-90"></div>
                                ) : (
                                    <div className="transition-all w-5 h-0.5 bg-white self-center before:block before:bg-white before:relative before:top-2 before:content-['.'] before:indent-[-9999px] before:w-5 before:h-0.5 after:block after:w-5 after:h-0.5 after:indent-[-9999px] after:bg-white after:content-['.'] after:bottom-2.5 after:relative"></div>
                                )}
                            </button>
                        </div>
                        <Home />
                    </div>
                    <Login />
                </div>
                {/* NAV*/}
                <nav
                    ref={navRef}
                    className={twMerge(
                        "absolute transition lg:pointer-events-none w-screen h-screen lg:flex text-white  bg-neutral-900/60 lg:bg-transparent lg:h-[4.5rem] text-base z-30 cursor-pointer",
                        isOpened ? "" : "hidden"
                    )}
                    onClick={toggle}
                >
                    <ol
                        className="gap-16 Center w-full lg:flex-row flex-col bg-neutral-900 lg:bg-transparent py-10 lg:p-0 cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {Links.map((link, idx) => (
                            <li
                                className={twMerge(
                                    "transition hover:text-purple-400 hover:animate-pulse pointer-events-auto",
                                    link
                                        ? path.includes(`/${link.toLowerCase()}`) &&
                                        "text-purple-400"
                                        : path === "/" && "text-purple-400",
                                    link || "lg:hidden" // * Home은 모바일에서만 보임
                                )}
                                key={idx}
                            >
                                <Link href={"/" + link.toLowerCase()}>{link || "Home"}</Link>
                            </li>
                        ))}
                    </ol>
                </nav>
            </header>
            {children}
        </>
    );
}

function Home() {
    return (
        <Link className="Center h-full cursor-pointer flex gap-3" href="/">
            <Image alt="Logo" priority src={LOGO} />
            <Image alt="MOUN" priority className="lg:block hidden" src={MOUN} />
        </Link>
    );
}

function Login() {
    // const { user, authLoading, artist, artistLoading } = useUser();
    let artistLoading = false;
    let authLoading = false;
    let artist =null;
    let user = true;
    // let artistLoading = true;


    return (
        <>
            {artistLoading || authLoading ? (
                    // * 로딩 상태일때
                    <div className="bg-neutral-800 rounded-full size-9 animate-pulse"></div>
                ) : // * 로그인 상태일때
                user ? (
                    <div className="text-white Center gap-4">
                        <Link href="/mypage/upload">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                />
                            </svg>
                        </Link>
                        <Link href="/mypage">
                            {artist?.photoURL ? (
                                <Image
                                    className="rounded-full aspect-square size-9"
                                    src={artist.photoURL}
                                    width={33}
                                    height={33}
                                    alt="my-page"
                                    priority
                                ></Image>
                            ) : (
                                <Profile className="size-9" />
                            )}
                        </Link>
                    </div>
                ) : (
                    // * 로그인 상태가 아닐때
                    <Link
                        href="/login"
                        className="text-sm ⚪️ bg-transparent text-white px-4 pointer-events-auto"
                    >
                        시작하기
                    </Link>
                )}
        </>
    );
}