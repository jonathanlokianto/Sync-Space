package users

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

func (h *Handler) GetMyProfile(c *gin.Context) {
	ctx := c.Request.Context()
	userIDRreq := getUserID(c)
	if userIDRreq == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized User"})
		return
	}

	response, err := h.service.GetProfile(ctx, *userIDRreq)
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"message" : "Success getting profile",
		"data": response,
	})
}

func (h *Handler) UpdateMyProfile(c *gin.Context) {
	var req Request

	ctx := c.Request.Context()
	userIDRreq := getUserID(c)
	if userIDRreq == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized user"})
		return
	}

	if err:= c.ShouldBindJSON(&req) ; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"errpr": "Invalid request body",
			"data": err.Error(),
		})
		return
	}

	response, err := h.service.UpdateProfile(ctx, req, userIDRreq.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Profile updated successfully",
		"data": response,
	})
}

func getUserID(c *gin.Context) *GetUserIDRequest {
	userIDVal, exists := c.Get("user_id") 
	if !exists {
		return nil
	}
	userID, ok := userIDVal.(uint)
	if !ok {
		return nil
	}
	return &GetUserIDRequest{ID: userID}
}