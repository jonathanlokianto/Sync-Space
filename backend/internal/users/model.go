package users

import "time"

type User struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	Fullname      string    `json:"fullname" gorm:"type:varchar(255);not null"`
	Email         string    `json:"email" gorm:"unique;type:varchar(255);not null"`
	Username      string    `json:"username" gorm:"unique;type:varchar(255);not null"`
	Password      string    `json:"-" gorm:"type:varchar(255);not null"`
	MaxRoomLimit  int       `json:"max_rooms_limit" gorm:"default:3"`
	IsPremium     bool      `json:"is_premium" gorm:"default:false"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type RegisterInput struct {
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type ForgetPasswordInput struct {
	Email string `json:"email"`
}