import { api } from "@/lib/api";
import {
  BaseResponse,
  CreateRoomRequest,
  GetRoomRequest,
  Room,
  UpdateRoomRequest,
} from "@/types";

export const roomAPI = {
  async createRoom(payload: CreateRoomRequest = {}): Promise<Room> {
    const response = await api.post<BaseResponse<Room>>("/rooms", payload);
    return response.data.data;
  },

  async updateRoom(payload: UpdateRoomRequest): Promise<Room> {
    const response = await api.put<BaseResponse<Room>>(
      `/rooms/id/${payload.id}`,
      payload,
    );
    return response.data.data;
  },

  // async SearchName(payload: GetRoomRequest): Promise<Room[]> {
  //   const response = await api.get<BaseResponse<Room[]>>(
  //     `/rooms/name/${payload.identity}`,
  //   );
  //   return response.data.data;
  // },

  async searchName(payload: GetRoomRequest): Promise<Room[]> {
    const response = await api.get<BaseResponse<Room[]>>(`/rooms/name`, {
      params: {
        name: payload.identity,
      },
    });
    return response.data.data;
  },

  async deleteCurrentRoom(roomID: number): Promise<void> {
    await api.delete(`/rooms/${roomID}`);
  },

  async fetchRoomBySlug(slug: string): Promise<Room> {
    const response = await api.get<BaseResponse<Room>>(`/rooms/${slug}`);
    return response.data.data;
  },

  async fetchRoomByUser(): Promise<Room[]> {
    const response = await api.get<BaseResponse<Room[]>>(`/rooms`);
    return response.data.data;
  },

  // async fetchRoomBySlug(payload: GetRoomRequest): Promise<Room> {
  //   const response = await api.get<BaseResponse<Room>>(`/rooms/`, {
  //     params: {
  //       name: payload.identity,
  //     },
  //   });
  //   return response.data.data;
  // },

  // async fetchRoomBySlug(slug: string) {
  //   const response = await fetch(`/api/v1/rooms/${slug}`);
  //   if (!response.ok) throw new Error("Failed to load room");
  //   return response.json();
  // },
};
