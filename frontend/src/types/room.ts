export interface Room {
  id: number;
  name: string;
  slug: string;
  content?: string | null;
}

export interface CreateRoomRequest {
  name: string;
  slug?: string;
}

export interface UpdateRoomRequest {
  id: number;
  name: string;
  slug: string;
  content?: string;
}

export interface GetRoomRequest {
  identity: string;
}