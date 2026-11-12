package room

import (
	"sync-space-backend/internal/user"
	"time"
)

type Room struct {
	ID        uint64    `json:"id" gorm:"primaryKey"`
	UserID    *uint     `json:"user_id,omitempty" gorm:"index"`
	User *user.User `json:"user,omitempty" gorm:"foreignKey:UserID"`

	Name      string    `json:"name" gorm:"type:varchar(100);not null"`
	Slug      string    `json:"slug" gorm:"unique;type:varchar(100);not null"`

	Content   *string   `json:"content,omitempty" gorm:"type:text"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}