"use server";
import { redirect } from "next/navigation";
import {Member} from "@/lib/class/Member";

export async function onUpdateProfile(
  prevState: { message: string },
  formData: FormData
) {
  const member = new Member(formData);
  // const uid = await verifyId(artist.uid as string);
  // if (!uid) {
  //   return {
  //     message: "로그인이 필요합니다.",
  //   };
  // }
  // const errorMsg = await artist.update();
  // if (errorMsg) {
  //   return { message: errorMsg };
  // }
  redirect("/mypage");
}
