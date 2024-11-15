import { User } from "../../../lib/class/User";

export function Box({
  children,
  label,
  description,
  required = false,
}: {
  children: React.ReactNode;
  label: string;
  description?: string;
  required?: boolean;
}) {
  return (
    <div className=" w-full border-neutral-300 border-solid border rounded-2xl p-6">
      <div className="block font-bold">
        {label} {required && <p className="inline"> * </p>}
      </div>
      {description && (
        <div className="text-neutral-400 text-sm mt-4">{description}</div>
      )}
      <div className="mt-8">{children}</div>
    </div>
  );
}
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  name: string;
}

export function TextInput({
  placeholder,
  name,
  value,
  onChange,
  defaultValue,
  required = false,
}: TextInputProps) {
  return (
    <input
      onChange={onChange}
      value={value}
      className="w-full bg-neutral-100 rounded-lg p-4"
      type="text"
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
    />
  );
}

export function SelectInput({
  array,
  defaultChecked,
  legend,
}: {
  array: readonly string[];
  defaultChecked: string[] | undefined;
  legend: string;
}) {
  return (
    <fieldset className="flex flex-wrap gap-4">
      <legend hidden>{legend}</legend>
      {array.map((element, idx) => (
        <div key={idx}>
          <input
            id={element}
            type="checkbox"
            name={element}
            className="peer hidden"
            defaultChecked={defaultChecked?.includes(element) || false}
          />
          <label
            htmlFor={element}
            className={
              "border p-3 block peer-checked:bg-purple-500 peer-checked:text-white text-sm text-neutral-500 rounded-2xl hover:border-purple-500 hover:text-purple-500 transition"
            }
          >
            {element}
          </label>
        </div>
      ))}
    </fieldset>
  );
}
export function UserInput({ user }: { user: User | null }) {
  return (
    user && <input hidden type="text" name="userId" value={user.uid} readOnly />
  );
}
