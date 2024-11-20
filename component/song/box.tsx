import React from "react";

export default function Box({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="my-4 border-solid border rounded-xl w-full p-8 flex flex-col gap-4">
      {title && <h2 className="text-neutral-500 font-bold">{title}</h2>}
      {children}
    </div>
  );
}
