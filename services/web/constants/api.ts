const BASE_API_URL = process.env.BASE_API_URL;
const SIGNUP_URL = `${BASE_API_URL}/authenticate/register`;
const LOGIN_URL = `${BASE_API_URL}/authenticate/login`;
const REFRESH_TOKEN_URL = `${BASE_API_URL ? BASE_API_URL : "http://localhost:8080/api/v1"}/user-tokens/refresh-access-token`;

export { SIGNUP_URL, LOGIN_URL, REFRESH_TOKEN_URL };
