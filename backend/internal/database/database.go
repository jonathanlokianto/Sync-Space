package database

import (
	"fmt"
	"log"
	"time"

	"gorm.io/gorm"
	"gorm.io/driver/postgres"
)

type Config struct {
	User string
	Password string
	Host string
	Port string
	DBName string
	SSLMode string
}

var DB *gorm.DB

// func InitDB(cfg Config) (*sql.DB, error) {
func InitDB(cfg Config) (*gorm.DB, error) {
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
			cfg.Host,
			cfg.Port,
			cfg.User,
			cfg.Password,
			cfg.DBName,
			cfg.SSLMode,
	)


	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("Failure in initializing database driver: %w", err)
	}

	sqlDB, err:= db.DB()
	if err != nil {
		return nil, fmt.Errorf("Failure in getting underlying sql.DB: %w", err)
	}
	sqlDB.SetMaxIdleConns(25)
	sqlDB.SetMaxOpenConns(25)
	sqlDB.SetConnMaxLifetime(5* time.Minute)
	sqlDB.SetConnMaxIdleTime(2* time.Minute)

	if err := sqlDB.Ping(); err != nil {
		sqlDB.Close()
		return nil, fmt.Errorf("Failure in connecting to postgres database: %w", err)
	}
	log.Println("Postre SQL Database connected successfully.")
	return db, nil
}

func CloseDB(db *gorm.DB) {
	if db != nil {
		sqlDB, err := db.DB()
		if err != nil {
			log.Printf("Failure in getting underlying sql.DB for closing: %v\n", err)
			return
		}

		if err := sqlDB.Close(); err != nil {
			log.Printf("Failure in closing database connection: %v\n", err)
		} else {
			log.Println("Database connection has been closed successfully.")
		}
	}
}