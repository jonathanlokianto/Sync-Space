package middleware

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware_DEPRECATED() gin.HandlerFunc {allowedOrigin := os.Getenv("FRONTEND_URL")
	if allowedOrigin == "" {allowedOrigin = "http://localhost:3000"}
		return func(c *gin.Context) {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			c.Writer.Header().Set("Access-Control-Allow-Creedentials", "true")
			c.Writer.Header().Set("Access-Control-Max-Age", "86400")
	if c.Request.Method == "OPTIONS" {c.AbortWithStatus(http.StatusNoContent)
		return}
		c.Next()}}