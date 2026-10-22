package main

import (
	"log"
	"os"
	"sync-space-backend/internal/database"
	"sync-space-backend/internal/server"

	"github.com/joho/godotenv"
)

func main() {
	log.Println("Main dijalankan")
	err := godotenv.Load("../../.env")
	if err != nil {
        log.Println("Warning: .env file not found, relying on system environment variables")
    }
	cfg := database.Config{
		Host: os.Getenv("DB_HOST"),
		Port: os.Getenv("DB_PORT"),
		User: os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName: os.Getenv("DB_DBNAME"),
		SSLMode: os.Getenv("DB_SSLMODE"),
	}

	db, err := database.InitDB(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database %v", err)
	}

	defer database.CloseDB(db)

	if err := database.RunMigration(db) ; err != nil {
		log.Fatalf("Failed loading tables: %v", err)
	}

	
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}
	
	
	srv := server.NewServer(db)
	if err := srv.Start(port) ; err != nil {
		log.Fatalf("Server stopped: %v", err)
	}
}