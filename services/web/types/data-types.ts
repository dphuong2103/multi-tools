import { programmingLanguages } from "@/constants/programming-languages";
import { sqlLanguages } from "@/constants/sql-languages";
import { Locale } from "@/i18n.config";
import { Dictionary } from "@/lib/dictionary";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdTime: string;
  lastLoggingTime: string;
};

export type AuthenticationResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type FailedResult = {
  message: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface LocaleParams {
  params: {
    locale: Locale;
  };
}

export interface LocaleProps {
  locale: Locale;
}

export interface DictionaryProps {
  dictionary: Dictionary;
}

export type ProgrammingLanguage = (typeof programmingLanguages)[number];

export type DropdownOption = {
  label: string;
  value: string;
};

export type SqlLanguage = (typeof sqlLanguages)[number];

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type LocalStorageFormKey = `${string}-form-key`;
export type HistoryLocalStorageKey = `${string}-history-key`;

export type TError = {
  code: string;
  en: string;
  vn: string;
};

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  errors: Error[];
}

export interface FailedApiResponse extends ApiResponse<null | undefined> {
  isSuccess: false;
}
