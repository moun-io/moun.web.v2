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
  const [pending, setPending] = useState(false); // [1
  const { login } = useUser();
  const router = useRouter();

  const onEmailLogin: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    localStorage.setItem("email", email); //이메일 저장

    const jwtToken = await login(email, password);
    if (jwtToken) {
      router.replace("/");
      setPending(false);
    }
    //   try {
    //     const res = await fetch(API_URL.AUTH_LOGIN, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ username, password }),
    //     });
    //     const result = await res.json();
    //     localStorage.setItem("jwtToken", result.jwtToken);
    //
    //     console.log(result.jwtToken);
    //     return result.jwtToken;
    //   } catch (error) {
    //     console.log(error);
    //
    //     alert("오류가 발생하였습니다.");
    //   }
    //
    // } else {
    //   setErrorMsg("아이디와 비밀번호를 다시 확인해주세요.");
    //   setPending(false);
    // }
    // setPending(false);
  };

  useEffect(() => {
    const email = localStorage.getItem("email"); //바로전에 로그인한 이메일 불러오기
    if (email) {
      setEmail(email);
    }
  }, []);
  // useEffect(() => {
  //   if (user) {
  //     router.replace("/mypage");
  //   }
  // }, [user, router]);
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
          pending={pending}
        ></SubmitButton>
      </form>
      {children}
      <LoginProvidersForm setErrorMsg={setErrorMsg} router={router} />
    </>
  );
}
