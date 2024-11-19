"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {API_URL} from "@/lib/const/api-url";
import {JwtToken} from "@/lib/class/JwtToken";
import {Member} from "@/lib/class/Member";
import {useRouter} from "next/navigation";


const AuthContext = createContext
    < {
  isAuthenticated:boolean,
  authLoading: boolean,
  member: Member | null,
  memberLoading: boolean,
  login:any,
  logout:any, signup:any

}>
({
  isAuthenticated :false,
  authLoading: true,
  member: null,
  memberLoading: true,
  login : null,
  logout : null,
  signup : null,
});


export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [authLoading, setAuthLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [member, setMember] = useState<Member | null>(null);
  const router = useRouter();


  const setLoading= ( value :boolean)=>{
    setAuthLoading(value);
    setMemberLoading(value);
  }

  const login = async (username:string, password:string) => {
    try{
      setLoading(true);
      const res  = await fetch ( API_URL.AUTH_LOGIN ,{
            method: "POST",   headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({username : username, password:password})
          }
      );

      if (res.ok){
        const loginResponse = await res.json();
        const jwtToken = loginResponse.jwtToken.value;
        const memberResponse = loginResponse.member;
        console.log(loginResponse);
        localStorage.setItem("jwtToken",jwtToken.value)
        setIsAuthenticated(true);
        setMember(memberResponse);
        setLoading(false);
        return jwtToken.value;
      }

    } catch (e){
        alert(e);
    }finally {
      setLoading(false);
    }
  }

  const signup = async (username:string, password:string) => {
    const res  = await fetch ( API_URL.MEMBERS_CREATE ,{
          method: "POST",   headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username : username, password:password})
        }
    );
    if (res.ok){
      alert("축하합니다. 만들어주신 계정으로 다시 로그인해주세요.");
      const SignupResponse = await res.json();
      router.replace("/login");
    } else  {
      alert("이미 사용중인 계정입니다.");
    }

  }



  const logout = () => {
    localStorage.removeItem('jwtToken'); // 또는 쿠키 삭제
    setIsAuthenticated(false);
    setMember(null);
  };
  const check= (jwtToken : JwtToken)=>{
    localStorage.getItem('jwtToken');
  }





  useEffect(() => {
   console.log(member);
  }, [member]);



  return (
    <AuthContext.Provider value={{isAuthenticated, signup ,authLoading, member, memberLoading,login,logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useUser = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("user is null");
  }
  return context;
};
