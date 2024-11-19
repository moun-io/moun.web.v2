import SignupForm from "@/components/login/signup-form";
import { ResetPasswordLink, LoginLink } from "@/components/login/links";

export default function Signup() {
  return (
    <>
      <h1 className="H2 my-10 w-80 hidden lg:block">Join Us</h1>
      <div className="w-[min(25rem,85%)] Center flex-col">
        <SignupForm />
        <LoginLink />
        <ResetPasswordLink />
      </div>
    </>
  );
}
