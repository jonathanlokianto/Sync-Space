package users

type GetUserIDRequest struct {
	ID uint `json:"user_id"`
}

type Request struct {
	Fullname string `json:"fullname" binding:"min=3"`
	Email    string `json:"email" binding:"email"`
	Username string `json:"username" binding:"min=3"`
	Password string `json:"password" binding:"min=6"`
}

type Response struct {
	ID       uint   `json:"id"`
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Username string `json:"username"`
}

type GetRoomCreatorResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
}