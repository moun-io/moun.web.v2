import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/component/layout/footer";
import Header from "@/component/layout/header";
// import AuthProvider from "@/lib/context/authProvider";

const inter = Inter({ subsets: ["latin"] });
// import { ArtistProvider } from "@/lib/context/artistsProvider";
import React from "react";
export const metadata: Metadata = {
  title: "Moun",
  description: "프로 작곡가의 시작 , Moun",
};

export default async function RootLayout({children, modal}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
      <html lang="kr">
      <body>
      {/*<ArtistProvider>*/}
      {/*  {modal}*/}
      {/*  <AuthProvider>*/}
          <Header>
            <main className="flex flex-col mt-[4.5rem]">
              {children}
            </main>
          </Header>
          <Footer />
      {/*  </AuthProvider>*/}
      {/*</ArtistProvider>*/}
      </body>
      </html>
  );
}
