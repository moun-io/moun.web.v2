"use server";
import { redirect } from "next/navigation";
import {Member} from "@/lib/class/Member";
import {API_URL} from "@/lib/const/api-url";
import {useUser} from "@/lib/context/authProvider";

export async function onUpdateProfile(
  prevState: { message: string },
  formData: FormData
){
  // const {} = useUser();
  console.log(formData);
  const member = new Member(formData);
  console.log(member);
  try {
      const res = await fetch(API_URL.MEMBERS_PUT, {
              method: "PUT", headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(member)
          }
      );
      console.log(res.json());
  } catch (error) {
      console.log(error);
  }


  // const uid = await verifyId(artist.uid as string);
  // const errorMsg = await artist.update();
    const errorMsg = "에러가 발생했습니다."
  if (false) {
    return { message: errorMsg };
  }
  redirect("/mypage");
}
