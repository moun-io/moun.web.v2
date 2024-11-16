"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginInput from "./login-input";
import LoginProvidersForm from "./login-providers-form";
import SubmitButton from "./submit-button";
import { useUser } from "@/lib/context/authProvider";
import {API_URL} from "@/lib/const/api-url";

export default function LoginForm({ children }: { children: React.ReactNode }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { member, login , authLoading} = useUser();
  const router = useRouter();

  const onEmailLogin: React.FormEventHandler = async (e) => {
    e.preventDefault();
    localStorage.setItem("email", email); //이메일 저장
    const jwtToken = await login(email, password);
    if (jwtToken) {
      router.replace("/");
    } else {
        setErrorMsg("로그인 실패 : 아이디와 비밀번호를 다시 확인해주세요.");
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email"); //바로전에 로그인한 이메일 불러오기
    if (email) {
      setEmail(email);
    }
  }, []);
  useEffect(() => {
    if (member) {
      router.replace("/mypage");
    }
  }, [member, router]);
  return (
    <>
      <form onSubmit={onEmailLogin} className="w-full Center flex-col">
        <LoginInput
          type="email"
          value={email}
          setter={setEmail}
          placeholder="Email"
        />
        <LoginInput
          type="password"
          value={password}
          setter={setPassword}
          placeholder="Password"
        />
        <SubmitButton
          text="Login"
          errorMsg={errorMsg}
          pending={authLoading}
        ></SubmitButton>
      </form>
      {children}
      <LoginProvidersForm setErrorMsg={setErrorMsg} router={router} />
    </>
  );
}
