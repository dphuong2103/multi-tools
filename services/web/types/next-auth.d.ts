import NextAuth from "next-auth";
import { User } from "./data-types";

declare module "next-auth" {
    interface Session {
        user: User,
        refreshToken: string,
        accessToken: string
    }
}
