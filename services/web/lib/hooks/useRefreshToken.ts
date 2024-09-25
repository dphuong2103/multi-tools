"use client";

import { signIn, useSession } from "next-auth/react";
import { refreshToken } from "../apis/authenticate_api";
import { useCallback } from "react";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  const handleRefreshToken = useCallback(async () => {
    if (!session?.refreshToken) {
      signIn();
      return;
    }
    try {
      const res = await refreshToken(session?.refreshToken);
      if (session) session.accessToken = res.data.refreshToken;
      else signIn();
    } catch (err) {
      console.error("Error refresh Token: ", err);
      signIn();
    }
  }, [session]);
  return handleRefreshToken;
};
