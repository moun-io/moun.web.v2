export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="font-extrabold text-2xl ">My Profile</h1>
      <h2 className="text-neutral-500 text-sm mb-8">
        서비스를 이용하기 위해 정보를 입력해주세요
      </h2>
      {children}
    </>
  );
}
