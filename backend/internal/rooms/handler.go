package rooms

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)


type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) CreateRoom(c *gin.Context){
	var req CreateRoomRequest
	var userIDPtr *uint
	ctx := c.Request.Context()

	if userIDValue, exists := c.Get("user_id"); exists {
		userID, ok := userIDValue.(uint)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "User ID format is invalid"})
			return
		}
		userIDPtr = &userID 
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Create Room Input Format: " + err.Error()})
		return
	}

	response, err := h.service.CreateRoom(ctx, req, userIDPtr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Room created successfully",
		"data":    response,
	})
}

func (h *Handler) UpdateExistingRoom(c *gin.Context) {
	var req UpdateRoomRequest
	ctx := c.Request.Context()

	roomIDStr := c.Param("id")
	roomID, err := strconv.ParseUint(roomIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Room ID parameter", "data": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body: ", "data": err.Error()})
		return
	}

	response, err := h.service.UpdateRoom(ctx, req, roomID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Room updated successfully", "data": response})
}

func (h *Handler) GetRoomBySlug (c *gin.Context) {
	ctx := c.Request.Context();

	identity := c.Param("slug")

	if identity == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room Identity parameter is required."})
		return
	}
	
	response, err := h.service.FindRoomBySlug(ctx, identity)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": response})
}

func (h *Handler) GetRoomByName (c *gin.Context) {
	ctx := c.Request.Context();

	identity := c.Query("name")

	if identity == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Identity parameter is required."})
		return
	}
	
	responses, err := h.service.FindRoomByName(ctx, identity)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": responses})
}

func (h *Handler) GetRoomsByUser(c *gin.Context) {
	
	ctx:= c.Request.Context()
	userIDVal, exists := c.Get("user_id")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: User ID not found in session"})
        return
    }
	var userID uint
    switch v := userIDVal.(type) {
    case float64:
        userID = uint(v)
    case int:
        userID = uint(v)
    case uint:
        userID = v
    default:
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID type"})
        return
    }
	
	responses, err := h.service.FindRoomsByUser(ctx, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Room Found", "data": responses})
}


func (h *Handler) DeleteCurrentRoom(c *gin.Context) {
	ctx := c.Request.Context()
	roomIDStr := c.Param("id")
	roomID, err := strconv.ParseUint(roomIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Room ID parameter", "data": err.Error()})
		return
	}

	if err := h.service.DeleteRoom(ctx, uint64(roomID)) ; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Room deleted successfully."})
}


// func (h *Handler) UpdateRoomBySlug(c *gin.Context) {
// 	var req UpdateRoomRequest
// 	ctx := c.Request.Context()
// 	roomSlug := c.Params("slug")

// 	if err := h.service.UpdateRoomBySlug(ctx, req) ; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Room deleted successfully."})

// }