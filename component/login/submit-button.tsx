import React from "react";

export default function SubmitButton({
  pending,
  errorMsg,
  text,
}: {
  pending?: boolean;
  errorMsg?: string;
  text: string;
}) {
  return (
    <>
      {pending ? (
        <div className="Center my-1 px-4 bg-gray-200/55 w-full h-12 rounded-lg border border-gray leading-[3rem]">
          Loading...
        </div>
      ) : (
        <button className="my-1 px-4 bg-gray-200/55 w-full h-12 rounded-lg border border-gray leading-[3rem] hover:shadow-md hover:bg-purple-500  hover:text-white transition hover:border-neutral-300">
          {text}
        </button>
      )}
      {errorMsg && (
        <div className="text-red-600 text-md my-2 animate-pulse ">
          {errorMsg}
        </div>
      )}
    </>
  );
}
