"use client";
import DateInput from "./date-input";
import { useState } from "react";
import {
  Box,
  TextInput,
  SelectInput,
  UserInput,
} from "@/components/mypage/form/form";
import { Switch } from "@nextui-org/react";
import ImageInput from "@/components/mypage/form/image-input";
import { Genres, Vibes } from "@/lib/utils/const";
import { useUser } from "@/lib/context/authProvider";
import Buttons from "./song-upload-buttons";
import AudioInput from "./audio-input";
import PriceInput from "./price-input";
export default function SongUploadForm({
  step,

  setStep,
  state,
}: {
  step: number;

  setStep: React.Dispatch<React.SetStateAction<number>>;
  state: any;
}) {
  const { user } = useUser();
  const [audio, setAudio] = useState<File | null>(null); //2페이지부터는 클라이언트에서 인풋이 비었는지 검사 하지 않음

  return (
    <>
      <UserInput user={user} />
      <div style={{ display: step === 1 ? "block" : "none" }}>
        <AudioInput audio={audio} setAudio={setAudio} />
      </div>
      <div
        className="flex flex-col gap-8"
        style={{ display: step === 2 ? "flex" : "none" }}
      >
        <Box label="노래 제목">
          <TextInput required placeholder="노래 제목 입력" name="title" />
        </Box>
        <Box
          label="커버 이미지 업로드"
          description="매력적인 이미지가 있으면 경매 입찰 수가 50% 늘어나요"
        >
          <ImageInput />
        </Box>
        <Box label="노래 설명" description="노래에 대한 설명을 적어주세요.">
          <TextInput
            required
            placeholder="노래에 대한 설명을 적어주세요."
            name="description"
          />
        </Box>
        <Box label="장르 선택">
          <SelectInput
            legend="Choose the Genre of the song"
            array={Genres}
            defaultChecked={undefined}
          />
        </Box>
        <Box label="바이브 선택">
          <SelectInput
            legend="Choose the Vibe of the song"
            array={Vibes}
            defaultChecked={undefined}
          />
        </Box>
      </div>
      <div
        className="flex flex-col gap-8"
        style={{ display: step === 3 ? "flex" : "none" }}
      >
        <Box
          label="입찰가 설정"
          description="이용중인 플랜은 입찰가능 범위가 $200~$2000 입니다. 최고가에 입찰하면 바로 거래가 성사됩니다."
        >
          <PriceInput />
        </Box>
        <Box
          label="저작권 양도 옵션 설정"
          description="추가 금액을 받고 저작권을 양도하실 건가요?"
        >
          <Switch size="md" color="secondary"></Switch>
        </Box>
        <Box
          label="경매기간 설정"
          description="최소 3일부터 최대 2주 동안 진행 가능합니다."
        >
          <DateInput />
        </Box>
      </div>
      <Buttons
        step={step}
        setStep={setStep}
        state={state}
        audio={audio}
      ></Buttons>
    </>
  );
}
