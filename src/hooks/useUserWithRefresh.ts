import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/jotai/store";
import { pb } from "@/lib/pocketbase/db";
import { useNavigate } from "react-router-dom";

const useUserWithRefresh = () => {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const refreshUser = async (to?: string) => {
    try {
      const authData = await pb.collection("users").authRefresh();

      if (!pb.authStore.model!.verified) {
        return;
      }

      if (authData)
        setUser({
          authData,
        });

      if (to) {
        navigate(to);
      }
    } catch {}
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return { user, refreshUser };
};

export default useUserWithRefresh;
