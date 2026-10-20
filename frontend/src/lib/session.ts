import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";
export const session = {
  getToken: (): string | undefined => Cookies.get(TOKEN_KEY),
  setToken: (token: string, expiresDays = 7): void => {
    Cookies.set(TOKEN_KEY, token, {
      expires: expiresDays,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  },
  removeToken: (): void => {
    Cookies.remove(TOKEN_KEY);
  },
};
