export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  FORGOT_PASSWORD: "/forgot_password",
  ROOM_DETAIL: (slug: string | number) => `/rooms/${slug}`,
  USER_DETAIL: (id: string | number) => `/users/${id}`,
};
