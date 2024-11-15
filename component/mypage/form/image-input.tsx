"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import FileUpload from "../../svg/fileUpload";
export default function ImageInput() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 0) {
        if (file.size > 10000000) {
          alert("파일 사이즈가 너무 큽니다. 10MB 이하의 파일을 올려주세요.");
          return;
        } else {
          const reader = new FileReader();
          reader.onload = (readEvent) => {
            if (
              readEvent.target != null &&
              typeof readEvent.target.result === "string"
            ) {
              setFileUrl(readEvent.target.result);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    } else {
      setFileUrl(null);
    }
  };
  const onRemoveImage = (e: React.MouseEvent) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      if (fileInputRef?.current?.value) {
        setFileUrl(null);
        fileInputRef.current.value = "";
      }
    }
  };
  return (
    <>
      {/* 삭제버튼 */}
      {fileUrl && (
        <div
          onClick={onRemoveImage}
          className="relative Center top-80 h-0 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="w-6 h-6 bg-white rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      )}

      {/* 이미지 */}
      <div className="Center text-neutral-600">
        <label
          htmlFor="photo"
          className=" Center flex-col  gap-4 bg-neutral-100 size-80 rounded-full cursor-pointer"
        >
          {fileUrl ? (
            <Image
              src={fileUrl}
              alt="profile"
              height={100}
              width={100}
              className="w-80 h-80 rounded-full"
            />
          ) : (
            <>
              <div>
                <FileUpload />
              </div>
              <p> 720px 이상의 PNG / JPG 파일을 올려주세요</p>
            </>
          )}
        </label>

        {/* 업로드 */}
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          hidden
          ref={fileInputRef}
          onChange={onImageChange}
        />
      </div>
    </>
  );
}
