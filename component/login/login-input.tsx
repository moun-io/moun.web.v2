import { Dispatch, SetStateAction } from "react";

type LoginInputParameter = {
  value: string;
  type: string;
  setter: Dispatch<SetStateAction<string>>;
  placeholder: string;
  defaultValue?: string;
};
function LoginInput({
  value,
  type,
  setter,
  placeholder,
  defaultValue,
}: LoginInputParameter) {
  return (
    <input
      type={type}
      name={type}
      value={value}
      onChange={(e) => {
        setter(e.target.value);
      }}
      defaultValue={defaultValue}
      required
      placeholder={placeholder}
      className="my-1 px-4 font-medium w-full h-12 rounded-lg border border-gray leading-[3rem] hover:shadow-md hover:border-neutral-300 "
    />
  );
}
export default LoginInput;
