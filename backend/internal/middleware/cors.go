package middleware

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	log.Println("Cors dijalankan")
	return cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000", 
			"http://127.0.0.1:3000", 
			"https://sync-space-notepad.netlify.app",
		},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders: []string{
			"Origin", 
			"Content-Type", 
			"Authorization", 
			"ngrok-skip-browser-warning",
			"X-Requested-With",
		},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	})
}