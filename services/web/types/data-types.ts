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
