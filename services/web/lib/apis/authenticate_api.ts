import { LOGIN_URL, REFRESH_TOKEN_URL, SIGNUP_URL } from "@/constants/api";
import {
  AuthenticationResponse,
  LoginRequest,
  SignUpRequest,
} from "@/types/data-types";
import axios from "axios";
import { axiosConfig } from "./config";

export function login(data: LoginRequest) {
  return axios.post(LOGIN_URL, JSON.stringify(data), axiosConfig);
}

export function signUp(data: SignUpRequest) {
  return axios.post(SIGNUP_URL, JSON.stringify(data), axiosConfig);
}

export function refreshToken(refreshToken: string) {
  console.log("REFRESH_TOKEN_URL", REFRESH_TOKEN_URL);
  return axios.post<AuthenticationResponse>(REFRESH_TOKEN_URL, null, {
    headers: {
      "content-type": "application/json",
      refreshToken: refreshToken,
    },
  });
}
