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

	// Coba beberapa jalur sekaligus agar tidak pernah gagal menemukannya
	envPaths := []string{
		".env.production",
		"../.env.production",
		"../../.env.production",
		"/home/ludious/Documents/Sync-Space/backend/.env.production",
	}

	var envLoaded bool
	for _, path := range envPaths {
		if err := godotenv.Load(path); err == nil {
			log.Printf("Berhasil memuat env dari: %s", path)
			envLoaded = true
			break
		}
	}

	if !envLoaded {
		log.Println("Warning: .env.production file not found di semua jalur, mengandalkan environment system")
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