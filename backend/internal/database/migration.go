package database

import (
	"sync-space-backend/internal/rooms"
	"sync-space-backend/internal/users"
	// "time"

	"gorm.io/gorm"
)

// type User struct {
// 	ResetToken *string `json:"reset_token"`
// 	ResetTokenExpired *time.Time `json:"reset_token_expired"`
// }

func RunMigration(db *gorm.DB) error {
	return db.AutoMigrate(&users.User{}, rooms.Room{})
}

// func RunMigration(db *gorm.DB) error {
// 	query := `
// 		CREATE TABLE IF NOT EXISTS users (
// 				id SERIAL PRIMARY KEY,
// 				fullname VARCHAR(255) NOT NULL,
// 				email VARCHAR(255) UNIQUE NOT NULL,
// 				username VARCHAR(255) UNIQUE NOT NULL,
// 				password VARCHAR(255) NOT NULL,
// 				max_rooms_limit INT DEFAULT 3,
// 				is_premium BOOLEAN DEFAULT true,
// 				created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
// 				updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
// 		);

// 		CREATE TABLE IF NOT EXISTS rooms (
// 				id BIGSERIAL PRIMARY KEY,
// 				user_id INT REFERENCES users(id) ON DELETE SET NULL,
// 				name  VARCHAR(100) NOT NULL,
// 				slug  VARCHAR(100) UNIQUE NOT NULL,
// 				content TEXT,
// 				created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
// 				updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
// 		);

// 		CREATE INDEX IF NOT EXISTS idx_rooms_user_id ON rooms (user_id);
// 	`

// 	if err := db.Exec(query).Error; err != nil {
// 		return fmt.Errorf("Failure in running database migration: %w", err)
// 	}
// 	return nil
// }