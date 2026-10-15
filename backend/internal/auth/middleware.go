package auth

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type MiddlewareManager interface {
	AuthMiddleware() gin.HandlerFunc
	RequireRole(expectedRole string) gin.HandlerFunc
}

type middlewareManager struct {
	tokenService TokenService
}

func NewMiddlewareManager(tokenService TokenService) MiddlewareManager {
	return &middlewareManager{tokenService: tokenService}
}


func (m *middlewareManager) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token Not Found"})
			c.Abort()
			c.Next()
			return
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
		
		claims, err := m.tokenService.ValidateJWT(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token Invalid"})
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("role", claims.Role)
		c.Set("is_premium", claims.IsPremium)

		c.Next()
	}
}


// func (m *middlewareManager) GuestAuthMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {

// 	}
// }

func (m *middlewareManager) RequireRole(expectedRole string) gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role")
		if role != expectedRole {
			c.JSON(http.StatusForbidden, gin.H{"error": "Akses ditolak: Hanya untuk " + expectedRole})
			c.Abort()
			return
		}
		c.Next()
	}
}