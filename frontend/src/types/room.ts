export interface Room {
  id: number;
  name: string;
  slug: string;
  content?: string | null;
  userID?: number | null;
  user? : RoomCreatorProps | null;
}

export interface CreateRoomRequest {
  name?: string;
  slug?: string;
  content?: string;
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

// export interface RoomDataProps {
//   id: number;
//   name: string;
//   slug: string;
//   content?: string | null;
// }

export interface RoomCreatorProps {
  id: number;
  username: string;
}
