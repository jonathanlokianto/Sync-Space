import { api } from "@/lib/api";
import { BaseResponse, GetRoomRequest, Room, UpdateRoomRequest } from "@/types";

export const roomAPI = {
  async CreateRoom(): Promise<Room> {
    const response = await api.post<BaseResponse<Room>>("/rooms/", {});
    return response.data.data;
  },

  async UpdateRoom(payload: UpdateRoomRequest): Promise<Room> {
    const response = await api.put<BaseResponse<Room>>(
      `/rooms/${payload.id}/`,
      payload,
    );
    return response.data.data;
  },

  async SearchSlug(payload: GetRoomRequest): Promise<Room> {
    const response = await api.get<BaseResponse<Room>>(
      `/rooms/slug/${payload.identity}/`,
    );
    return response.data.data;
  },

  async SearchName(payload: GetRoomRequest): Promise<Room[]> {
    const response = await api.get<BaseResponse<Room[]>>(
      `/rooms/name/${payload.identity}/`,
    );
    return response.data.data;
  },

  async DeleteCurrentRoom(roomID: number): Promise<void> {
    await api.delete(`/rooms/${roomID}`);
  },
};
