"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {API_URL} from "@/lib/const/api-url";
import {JwtToken} from "@/lib/class/JwtToken";
import {Member} from "@/lib/class/Member";


const AuthContext = createContext
    < {
  authLoading: boolean,
  member: Member | null,
  memberLoading: boolean,
  login:any,
  logout:any
}>
({
  authLoading: true,
  member: null,
  memberLoading: true,
  login : null,
  logout : null,
});


export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [authLoading, setAuthLoading] = useState(true);
  const [memberLoading, setMemberLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [member, setMember] = useState<Member | null>(null);

  const login = async (username:string, password:string) => {
    try{
      const res  = await fetch ( API_URL.AUTH_LOGIN ,{
            method: "POST",   headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({username : "jin", password:"jin"})
          }
      );
      const loginResponse = await res.json();
      const token:string = loginResponse.jwtToken.value;


      if(res.ok){
        console.log(token);
        localStorage.setItem("jwtToken",token)// 또는 쿠키에 저장
        return token;
      }
      // const res = await fetch ()
      setIsAuthenticated(true);
      setMember(member);

      } catch (e){
        alert(e);
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





  // useEffect(() => {
  //   const jwtToken = localStorage.getItem('jwtToken'); // 또는 쿠키에서 가져오기
  //   if (jwtToken) {
  //
  //     setIsAuthenticated(true);
  //   }{
  //
  //   }
  // }, []);



  return (
    <AuthContext.Provider value={{ authLoading, member, memberLoading,login,logout }}>
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
