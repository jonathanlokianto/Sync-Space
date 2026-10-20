import { useMutation } from "@tanstack/react-query";
import { roomAPI } from "../api/rooms";

export function useCreateRoom() {
  // const queryClient
  return useMutation({
    mutationFn: roomAPI.createRoom,
  });
}

// export function useFetchRoomBySlug() {
//   return useMutation({
//     mutationFn: roomAPI.fetchRoomBySlug,
//   });
// }

export function useFetchRoomsByUser() {
  return useMutation({
    mutationFn: roomAPI.fetchRoomByUser,
  });
}

export function useSearchRoomName() {
  return useMutation({
    mutationFn: roomAPI.searchName,
  });
}

export function useUpdateRoom() {
  return useMutation({
    mutationFn: roomAPI.updateRoom,
  });
}

export function useDeleteRoom() {
  return useMutation({
    mutationFn: roomAPI.deleteCurrentRoom,
  });
}
