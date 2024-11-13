import React from "react";
import ImageSlider from "@/component/layout/image-slider";
import BannerImg from "@/public/image/banner1.jpg";

export default function Layout({ children }: { children: React.ReactNode }) {
    const slides = [
        {
            key: 0,
            img: BannerImg,
            title: "banner1",
        },
        {
            key: 1,
            img: BannerImg,
            title: "banner2",
        },
        {
            key: 2,
            img: BannerImg,
            title: "banner3",
        },
        {
            key: 3,
            img: BannerImg,
            title: "banner4",
        },
    ];

    return (
        <div className="h-full">
            <div className="bg-black w-full">
                <ImageSlider slides={slides} />
            </div>
            <div className="Box Center flex-col py-16 px-8 md:px-4 lg:px-0">
                 {/*{children}*/}
            </div>
        </div>
    );
}
