import { useMutation } from "@tanstack/react-query";
import { roomAPI } from "../api/rooms";

export function useCreateRoom() {
  return useMutation({
    mutationFn: roomAPI.CreateRoom,
  });
}

export function useSearchRoomSlug() {
  return useMutation({
    mutationFn: roomAPI.SearchSlug,
  });
}

export function useSearchRoomName() {
  return useMutation({
    mutationFn: roomAPI.SearchName,
  });
}
