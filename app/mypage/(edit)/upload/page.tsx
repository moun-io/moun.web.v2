"use client";
import React, { useState } from "react";

import onUploadSong from "@/lib/actions/uploadSong";
import SongUploadForm from "@/components/mypage/form/song-upload-form";
import { useFormState } from "react-dom";
export default function Upload() {
  const [step, setStep] = useState(1);

  const [state, uploadAction] = useFormState(onUploadSong, {
    message: "",
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-3xl ">Upload Song</h1>
        <div className="text-purple-400">Step {step} / 3</div>
      </div>
      <h2 className=" flex items-center gap-2 text-lg font-bold">
        <div className="Center my-8 rounded-full bg-neutral-200 size-8 text-center">
          {step}
        </div>
        {Title(step)}
      </h2>
      <form action={uploadAction}>
        <SongUploadForm step={step} setStep={setStep} state={state} />
      </form>
    </div>
  );
}

function Title(page: number) {
  switch (page) {
    case 1:
      return "노래 파일을 업로드 해주세요";
      break;
    case 2:
      return "곡 정보를 입력해주세요";
      break;
    case 3:
      return "경매 정보를 입력해주세요";
      break;
  }
}
