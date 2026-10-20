import { useMutation, useQuery } from "@tanstack/react-query";
import { myProfileAPI } from "../api/profile";

export function useUpdateMyProfile() {
  return useMutation({ mutationFn: myProfileAPI.updateMyProfile });
}
export function useGetMyProfile() {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => myProfileAPI.getMyProfile(),
    staleTime: 1000 * 6 * 5,
  });

  return {data, error, isLoading}
}
