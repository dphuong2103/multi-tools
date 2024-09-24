import { z } from "zod";

export const nonEmptyString = z.string().trim().min(1, "Required");

export type BoolString = "true" | "fasle";
