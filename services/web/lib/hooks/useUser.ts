import { useSession } from "next-auth/react";

const useUser = () => {
  const { data } = useSession();
  return data?.user;
};
