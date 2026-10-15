package auth

type RegisterRequest struct {
	Fullname string `json:"fullname" binding:"required, min=3"`
	Email    string `json:"email" binding:"required, email"`
	Username string `json:"username" binding:"required, min=3"`
	Password string `json:"password" binding:"required, min=6"`
}

// type RegisterResponse struct {
// 	ID uint `json:"id"`
// 	Fullname string `json:"fullname"`
// 	Email    string `json:"email"`
// 	Username string `json:"username"`
// 	Role string `json:"role"`
// 	MaxRoomLimit int `json:"max_room_limit"`
// 	IsPremium bool `json:"is_premium"`
// }


type LoginRequest struct {
	Identity string `json:"identity" binding:"required"`
	Password string `json:"password" binding:"required, min=6"`
}

type LoginResponse struct {
	ID uint `json:"id"`
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Role     string `json:"role"`
	MaxRoomLimit int `json:"max_room_limit"`
	IsPremium bool `json:"is_premium"`
	AccessToken string `json:"access_token"`
}