"use client";

import { useFormStatus } from "react-dom";
import { useUser } from "@/lib/context/authProvider";
export default function SubmitButton({ errorMsg }: { errorMsg: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div className="Center rounded-xl text-neutral-500 bg-neutral-300 p-4">
          Loading...
        </div>
      ) : (
        <button
          type="submit"
          className="rounded-xl text-neutral-500 bg-neutral-300 p-4 hover:bg-purple-500 hover:text-white transition"
          onClick={() => {
            const ok = confirm("프로필을 업데이트하시겠습니까?");
            if (!ok) return;
          }}
        >
          Confirm
        </button>
      )}
      {errorMsg && (
        <div className="Center text-red-600 animate-bounce font-bold">
          {errorMsg}
        </div>
      )}
    </>
  );
}
