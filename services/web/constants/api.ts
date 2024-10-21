const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const SIGNUP_URL = `${BASE_API_URL}/authenticate/register`;
const LOGIN_URL = `${BASE_API_URL}/authenticate/login`;
const CONTACT_US_URL = `${BASE_API_URL}/contact-us`;
const REFRESH_TOKEN_URL = `${BASE_API_URL ? BASE_API_URL : "http://localhost:8080/api/v1"}/user-tokens/refresh-access-token`;
const CODE_EXECUTION_API_URL = "https://emkc.org/api/v2/piston/execute";
// const CODE_EXECUTION_API_URL = "https://piston.phuongtran.site/api/v2/execute"
const CHECK_PROGRAMMING_LANGUAGE_VERSIONS_URL =
  "https://emkc.org/api/v2/piston/runtimes";
export {
  SIGNUP_URL,
  LOGIN_URL,
  REFRESH_TOKEN_URL,
  CODE_EXECUTION_API_URL,
  CONTACT_US_URL,
};
