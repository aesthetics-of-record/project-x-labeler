import Confirm from "@/components/auth/confirm";
import Signin from "@/components/auth/signin";
import Signup from "@/components/auth/signup";
// import WindowTitlebar from "@/components/titlebar/window-titlebar";
import useUserWithRefresh from "@/hooks/useUserWithRefresh";
import { loginComponentAtom } from "@/lib/jotai/store";
import { pb } from "@/lib/pocketbase/db";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, refreshUser } = useUserWithRefresh();
  const [loginComponent, _setLoginComponent] = useAtom(loginComponentAtom);
  const [searchParams, _setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  console.log(token);

  const verificationAndRefresh = async (token: string | null, to: string) => {
    await pb.collection("users").confirmVerification(token as string);
    refreshUser(to);
  };

  useEffect(() => {
    verificationAndRefresh(token, "/");
  }, []);

  if (!user) {
    if (loginComponent === "signin") {
      return (
        <>
          {/* <WindowTitlebar /> */}
          <Signin />
        </>
      );
    }
    if (loginComponent === "signup") {
      return (
        <>
          {/* <WindowTitlebar /> */}
          <Signup />
        </>
      );
    }
    if (loginComponent === "confirm") {
      return (
        <>
          {/* <WindowTitlebar /> */}
          <Confirm />
        </>
      );
    }
  }

  return <>{children}</>;
};

export default LoginProvider;
