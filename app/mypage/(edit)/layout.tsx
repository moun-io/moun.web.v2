import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="Center">
      <div className="w-[min(28rem,100%)] my-12 flex flex-col gap-4 p-4">
        {children}
      </div>
    </div>
  );
}
