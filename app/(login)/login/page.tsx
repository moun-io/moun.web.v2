import Link from "next/link";
import LoginForm from "@/component/login/login-form";
import { SignUpLink, ResetPasswordLink } from "@/component/login/links";
export default function Login() {
  return (
    <>
      <h1 className="H2 w-80 hidden my-10 lg:block">
        Get To Know Each Other Through Songs
      </h1>
      {/*  login */}
      <div className="w-[min(25rem,85%)] Center flex-col">
        <LoginForm>
          <SignUpLink />
          <ResetPasswordLink />
          <div className=" text-neutral-400 w-full border-t-2 border-solid border-black-200 my-4"></div>
        </LoginForm>
      </div>
      <p className="my-4 text-center text-neutral-400 text-sm font-normal">
        회원가입시{" "}
        <Link className="underline" href="/">
          약관
        </Link>
        에 동의하신 것으로 간주됩니다.
      </p>
    </>
  );
}
