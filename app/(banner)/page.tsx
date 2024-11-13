import React from "react";
import Link from "next/link";
// import SongCardsList from "@/component/banner/song-cards-list";
import SmallBanner from "@/component/(banner)/small-banner";

export default function Home() {
    return (
        <>
            <h1 hidden>Home</h1>
            <CardsContainer href="/songs" title="Today's Hit" />
            <CardsContainer href="/songs" title="Time is Up" />
            <SmallBanner />
            <CardsContainer href="/released" title="Released" />
        </>
    );
}

function CardsContainer({ title, href }: { title: string; href: string }) {
    return (
        <section className="Box overflow-hidden my-[min(5rem,2vw)]">
            <div>
                <h2 className="flex justify-between w-full">
                    <span className="H2 lg:text-3xl">{title}</span>
                    <Link
                        href={href}
                        className="text-sm self-center font-medium text-gray-500"
                    >
                        Show All
                    </Link>
                </h2>
            </div>
            {/*<SongCardsList />*/}
        </section>
    );
}
