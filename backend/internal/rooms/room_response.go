package rooms

import "sync-space-backend/internal/users"

func ToRoomResponse(room *Room) RoomResponse {
	// var roomID uint64
	// if id, ok := room.ID.(uint64); ok {
	// 	roomID = id
	// } else {
	// 	roomID = uint64(room.ID)
	// }
	response := RoomResponse{
		ID:      room.ID,
		Name:    room.Name,
		Slug:    room.Slug,
		Content: room.Content,
	}

	if room.UserID != nil {
		response.User = &users.GetRoomCreatorResponse{
			ID: *room.UserID,
			Username: room.User.Username,
		}
	}
	return response
}

func ToRoomListResponse(rooms []Room) []RoomResponse {
	responses:= []RoomResponse{}
	for _, room := range rooms {
		responses = append(responses, ToRoomResponse(&room))
	}
	return responses
}