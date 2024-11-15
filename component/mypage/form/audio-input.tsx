"use client";
import React, { useState } from "react";
import FileUpload from "@/components/svg/fileUpload";
export default function AudioInput({
  audio,
  setAudio,
}: {
  audio: File | null;
  setAudio: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [length, setLength] = useState(0);

  const onAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "audio/mp3" || file.type === "audio/mpeg") {
        if (file.size < 10000000 && file.size > 0) {
          const url = URL.createObjectURL(file);
          setAudio(file);
          setAudioUrl(url);
          const audio = new Audio(url);
          audio.addEventListener("loadedmetadata", function () {
            setLength(audio.duration);
          });

          return;
        } else {
          setAudio(null);
          setAudioUrl("");
          alert("파일 사이즈가 너무 큽니다. 10MB 이하의 파일을 올려주세요.");
        }
      } else {
        setAudio(null);
        setAudioUrl("");
        alert("file type : " + file.type + "올바른 형식을 올려주세요.");
      }
    } else {
      setAudio(null);
      alert("파일을 올려주세요.");
    }
  };
  return (
    <>
      <input
        type="file"
        name="audio"
        hidden
        accept="audio/mp3,audio/mpeg"
        id="mp3"
        onChange={onAudioChange}
      />
      <input type="number" name="length" value={length} hidden />
      <label
        htmlFor="mp3"
        className="Center p-8 text-center flex-col gap-3 my-8 w-full bg-neutral-100 h-60 cursor-pointer"
      >
        <FileUpload />
        {audio ? audio.name : <div>MP3 형식의 파일을 올려주세요.</div>}
      </label>
      {audioUrl && (
        <audio controls src={audioUrl} className="block w-full"></audio>
      )}
    </>
  );
}
