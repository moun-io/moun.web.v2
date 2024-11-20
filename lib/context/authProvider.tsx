"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {API_URL} from "@/lib/const/api-url";
import {JwtToken} from "@/lib/class/JwtToken";
import {Member} from "@/lib/class/Member";


const AuthContext = createContext
    < {
  isAuthenticated:boolean,
  authLoading: boolean,
  member: Member | null,
  memberLoading: boolean,
  login:any,
  logout:any

}>
({
  isAuthenticated :false,
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

  const [authLoading, setAuthLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [member, setMember] = useState<Member | null>(null);


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
    <AuthContext.Provider value={{isAuthenticated, authLoading, member, memberLoading,login,logout }}>
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
