package middleware

import (
    "time"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
    return cors.New(cors.Config{
		// AllowAllOrigins: true,
        AllowOrigins:     []string{"http://localhost:3000", "http://127.0.0.1:3000", "http://127.0.0.1:8080"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    })
}