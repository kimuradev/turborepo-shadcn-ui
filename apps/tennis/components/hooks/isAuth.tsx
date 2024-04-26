"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/app/context/auth-context";


export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const context = useAuthContext()

    useEffect(() => {
      if (!context.signed) {
        return redirect("/");
      }
    }, []);

    if (!context.signed) {
      return null;
    }

    return <Component {...props} />;
  };
}