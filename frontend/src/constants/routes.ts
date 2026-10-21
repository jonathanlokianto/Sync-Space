export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  FORGOT_PASSWORD: "/forgot_password",
  ROOM_DETAIL: (slug: string | number) => `/rooms/${slug}`,
  USER_DETAIL: (id: string | number) => `/users/${id}`,
  PROFILE_DETAIL: "/profile/me",
  CREATE_ROOM: "/rooms/create",
};
