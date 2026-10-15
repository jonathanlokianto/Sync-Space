package rooms

func ToRoomResponse(room *Room) RoomResponse {
	// var roomID uint64
	// if id, ok := room.ID.(uint64); ok {
	// 	roomID = id
	// } else {
	// 	roomID = uint64(room.ID)
	// }
	return RoomResponse{
		ID:      room.ID,
		Name:    room.Name,
		Slug:    room.Slug,
		Content: room.Content,
	}
}

func ToRoomListResponse(rooms []Room) []RoomResponse {
	var responses []RoomResponse
	for _, room := range rooms {
		responses = append(responses, ToRoomResponse(&room))
	}
	return responses
}