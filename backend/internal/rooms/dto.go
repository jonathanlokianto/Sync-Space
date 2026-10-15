package rooms

type CreateRoomRequest struct {
	Name string `json:"name" binding:"omitempty"`
	Slug string `json:"slug" binding:"omitempty"`
}

type UpdateRoomRequest struct {
	Name    string  `json:"name" binding:"required"`
	Slug    string  `json:"slug" binding:"required"`
	Content *string `json:"content" binding:"omitempty"`
}

type GetRoomRequest struct {
	Room_Identity string `json:"room_identity" binding:"required"`
}

type RoomResponse struct {
	ID      uint64    `json:"id"`
	Name    string  `json:"name"`
	Slug    string  `json:"slug"`
	Content *string `json:"content,omitempty"`
}
