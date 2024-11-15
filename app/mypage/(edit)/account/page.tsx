import React from "react";
import { TextInput, Box } from "@/component/mypage/form/form";
export default function Account() {
  return (
    <div>
      <h1 className="font-extrabold text-2xl ">My Account</h1>
      <h2 className="text-neutral-500 text-sm mb-8">
        개인정보를 안전하게 관리하세요
      </h2>
      <Box label="대표 계정" required>
        <TextInput placeholder="?" name="name" value="emmail" required />
      </Box>
    </div>
  );
}
