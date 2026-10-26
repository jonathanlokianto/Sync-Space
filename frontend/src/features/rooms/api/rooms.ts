import { api } from "@/lib/api";
import {
  BaseResponse,
  CreateRoomRequest,
  GetRoomRequest,
  Room,
  UpdateRoomRequest,
} from "@/types";
import { MOCK_ROOMS } from "./rooms.mock";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const roomAPI = {
  async createRoom(payload: CreateRoomRequest = {}): Promise<Room> {
    if (USE_MOCK) {
      await new Promise((response) => setTimeout(response, 400));
      const baseSlug = (payload.name ?? "new-room")
        .toLowerCase()
        .replace(/\s+/g, "-");
      const randomString = Math.random().toString(36).substring(2, 10);
      return {
        id: Date.now(),
        slug: `${baseSlug}-${randomString}`,
        name: payload.name ?? "New Mock Room",
        content: payload.content ?? "Mock description",
      } as Room;
    }
    const response = await api.post<BaseResponse<Room>>("/rooms", payload);
    return response.data.data;
  },

  async updateRoom(payload: UpdateRoomRequest): Promise<Room> {
    if (USE_MOCK) {
      await new Promise((response) => setTimeout(response, 400));
      const existing =
        MOCK_ROOMS.find((r) => r.id === payload.id) || MOCK_ROOMS[0];
      return { ...existing, ...payload } as Room;
    }

    const response = await api.put<BaseResponse<Room>>(
      `/rooms/id/${payload.id}`,
      payload,
    );
    return response.data.data;
  },

  async searchName(payload: GetRoomRequest): Promise<Room[]> {
    if (USE_MOCK) {
      const query = (payload.identity ?? "").toLowerCase();
      return MOCK_ROOMS.filter((r) => r.name.toLowerCase().includes(query));
    }

    const response = await api.get<BaseResponse<Room[]>>(`/rooms/name`, {
      params: {
        name: payload.identity,
      },
    });
    return response.data.data;
  },

  async deleteCurrentRoom(roomID: number): Promise<void> {
    if (USE_MOCK) {
      console.log(`[MOCK] Deleted room with ID: ${roomID}`);
      return;
    }
    await api.delete(`/rooms/${roomID}`);
  },

  async fetchRoomBySlug(slug: string): Promise<Room> {
    if (USE_MOCK) {
      const room = MOCK_ROOMS.find((r) => r.slug === slug);
      if (!room) {
        const error = new Error("Room does not exist") as Error & {
          status: number;
        };
        error.status = 404;
        throw error;
      }
      return room;
    }

    const response = await api.get<BaseResponse<Room>>(`/rooms/${slug}`);
    return response.data.data;
  },

  async fetchRoomByUser(): Promise<Room[]> {
    if (USE_MOCK) {
      await new Promise((response) => setTimeout(response, 300));
      return MOCK_ROOMS;
    }

    const response = await api.get<BaseResponse<Room[]>>(`/rooms`);
    return response.data.data;
  },

  // async SearchName(payload: GetRoomRequest): Promise<Room[]> {
  //   const response = await api.get<BaseResponse<Room[]>>(
  //     `/rooms/name/${payload.identity}`,
  //   );
  //   return response.data.data;
  // },

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
