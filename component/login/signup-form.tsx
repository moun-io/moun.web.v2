"use client";
import React, { useEffect, useState } from "react";
import LoginInput from "@/component/login/login-input";

import { useRouter } from "next/navigation";
import SubmitButton from "./submit-button";
import {API_URL} from "@/lib/const/api-url";
import {useUser} from "@/lib/context/authProvider";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { signup } = useUser();
  const checkPassword = (password: string) => {
    const hasNumber = /\d/.test(password);
    const hasSpecialSymbol = /[^A-Za-z0-9]/.test(password);
    return hasNumber && hasSpecialSymbol;
  };
  const onSingup: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      setPending(false);
      return;
    }
    await signup(email,password);
  };

  //* error mesasge
  useEffect(() => {
    // Only proceed if both password and confirmPassword have been entered
    if (password.length > 0 && confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      } else if (password.length < 8 || password.length > 30) {
        setErrorMsg("비밀번호는 8자리 이상 30자리 이하이어야 합니다.");
      } else {
        setErrorMsg("");
      }
    } else {
      setErrorMsg(""); // Clear error message if either field is empty
    }
  }, [password, confirmPassword]);

  return (
    <form onSubmit={onSingup} className="my-4 w-full Center flex-col">
      <LoginInput
        type="email"
        value={email}
        placeholder="Email"
        setter={setEmail}
      />
      <LoginInput
        type="password"
        value={password}
        placeholder="Password"
        setter={setPassword}
      />
      <LoginInput
        type="password"
        value={confirmPassword}
        placeholder="Confirm Password"
        setter={setConfirmPassword}
      />
      <label htmlFor="password" className="text-xs text-neutral-400 my-2">
        비밀번호는 숫자, 특수문자를 포함한 8자이상.
      </label>
      <SubmitButton
        errorMsg={errorMsg}
        pending={pending}
        text="회원가입"
      ></SubmitButton>
    </form>
  );
}
