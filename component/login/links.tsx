import Link from "next/link";

export function SignUpLink() {
  return (
    <div className="text-sm text-neutral-400 my-2 ">
      <strong className="font-medium">Moun</strong>이 처음이신가요?{" "}
      <Link
        href="/signup"
        className="text-purple-400 underline hover:animate-pulse"
      >
        Sign up →
      </Link>
    </div>
  );
}
export function ResetPasswordLink() {
  return (
    <div className="text-sm text-neutral-400 ">
      비밀번호를 잊어버리셨나요?{" "}
      <Link
        href="/reset-password"
        className="text-purple-400 hover:animate-pulse underline"
      >
        {" "}
        Reset Password →
      </Link>
    </div>
  );
}
export function LoginLink() {
  return (
    <div className="text-sm text-neutral-400 my-2 ">
      이미 <strong className="font-medium">계정</strong>이 있으신가요?{" "}
      <Link
        href="/login"
        className="text-purple-400 underline hover:animate-pulse"
      >
        Log in→
      </Link>
    </div>
  );
}
