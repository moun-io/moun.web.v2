"use client";
import React from "react";
import { onUpdateProfile } from "@/lib/actions/updateProfile";
import SubmitButton from "@/component/mypage/form/submit-button";
import {
  Box,
  TextInput,
  SelectInput,
  UserInput,
} from "@/component/mypage/form/form";
import { useFormState } from "react-dom";
import { useUser } from "@/lib/context/authProvider";
import ImageInput from "@/component/mypage/form/image-input";
import { Positions } from "@/lib/const/const";

export default function Profile() {
  const { member } = useUser();
  const [state, updateAction] = useFormState(onUpdateProfile, {
    message: "",
  });

    return (
      <form action={updateAction} className="flex flex-col gap-4">
        <Box label="활동명" required>
          <TextInput
            placeholder="활동명 입력"
            required={true}
            name="displayName"
            defaultValue={member?.displayName}
          />
        </Box>
        <Box label="포지션" required>
          <SelectInput
            array={Positions}
            defaultChecked={member?.positions}
            legend="Choose your Positions"
          />
        </Box>
        <Box label="SNS" description="매력을 어필할 SNS 계정을 연결해주세요">
          <TextInput
            name="instagramUrl"
            placeholder="인스타그램 프로필 URL 입력"
            defaultValue={member?.instagramUrl}
          />
        </Box>
        <Box
          label="자기소개"
          description="프로필에 보여질 소개문구를 입력해보세요 (최대 50자)"
        >
          <textarea
            className="w-full bg-neutral-100 rounded-lg p-4 "
            placeholder="자기소개 입력"
            maxLength={50}
            name="description"
            defaultValue={member?.description}
          />
        </Box>
        <Box
          label="프로필 이미지"
          description="매력적인 이미지가 있으면 경매 입찰 수가 2배까지 늘어나요"
        >
          <ImageInput />
        </Box>
        {/*<UserInput user={user} />*/}
        <SubmitButton errorMsg={state.message} />
      </form>
    );
}
