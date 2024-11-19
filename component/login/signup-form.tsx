"use client";
import React, { useEffect, useState } from "react";
import LoginInput from "@/components/login/login-input";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import SubmitButton from "./submit-button";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "http://localhost:3000",
    // This must be true.
    handleCodeInApp: true,
    // iOS: {
    //   bundleId: "com.example.ios",
    // },
    // android: {
    //   packageName: "com.example.android",
    //   installApp: true,
    //   minimumVersion: "12",
    // },
    // dynamicLinkDomain: "example.page.link",
  };

  const checkPassword = (password: string) => {
    const hasNumber = /\d/.test(password);
    const hasSpecialSymbol = /[^A-Za-z0-9]/.test(password);
    return hasNumber && hasSpecialSymbol;
  };
  const onSingup: React.FormEventHandler = (e) => {
    e.preventDefault();
    setPending(true);
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");

      setPending(false);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user, actionCodeSettings).then(
          () => {
            alert("축하합니다. 계정을 생성하시려면 인증메일을 확인해주세요.");
            router.replace("/mypage");
          },
          () => {
            alert("인증메일을 보내지 못했습니다.");
          }
        );
      })
      .catch((error: FirebaseError) => {
        if (error.message.includes("already-in-use")) {
          alert("이미 사용중인 계정입니다.");
        }
      });
  };

  //* error mesasge
  useEffect(() => {
    // Only proceed if both password and confirmPassword have been entered
    if (password.length > 0 && confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      } else if (password.length < 8 || password.length > 30) {
        setErrorMsg("비밀번호는 8자리 이상 30자리 이하이어야 합니다.");
      } else if (!checkPassword(password)) {
        setErrorMsg("하나 이상의 특수문자를 포함해주세요.");
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
