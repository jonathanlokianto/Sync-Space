package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)


type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) Register (c *gin.Context) {
	var req RegisterRequest
	ctx := c.Request.Context()

	if err := c.ShouldBindJSON(&req) ; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error" : "Invalid Register Input Format" + err.Error()})
		return
	}
	err := h.service.RegisterUser(ctx, req) 
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "User created sussessfully",
	})
}


func (h *Handler) Login (c *gin.Context) {
	var req LoginRequest
	ctx := c.Request.Context()

	if err := c.ShouldBindJSON(&req) ; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error" : "Invalid Login Input Format" + err.Error()})
		return
	}

	result, err := h.service.LoginUser(ctx, req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// c.SetCookie(
	// 	"access_token",
	// 	result.AccessToken,
	// 	86400 * 1,
	// 	"/",
	// 	"",
	// 	false,
	// 	true,
	// )

	c.JSON(http.StatusOK, gin.H{
		"message":"User logged in successfully",
		"data": result,
	})
}

// func (h *Handler) PasswordReset(c *gin.Context) {
// 	ctx := c.Request.Context()

// }