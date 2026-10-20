package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterRoutes() {
	s.Router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "UP"})
	})

	v1 := s.Router.Group("/api/v1")
	{
		// PUBLIC ROUTES
		authGroup := v1.Group("/auth")
		{
			authGroup.POST("/register", s.AuthHandler.Register)
			authGroup.POST("/login", s.AuthHandler.Login)
		}

		usersGroup := v1.Group("/profile")
		usersGroup.Use(s.Middleware.AuthMiddleware())
		{
			usersGroup.GET("/me", s.UserHandler.GetMyProfile)
			usersGroup.PUT("/me", s.UserHandler.UpdateMyProfile)
		}

		publicRooms := v1.Group("/rooms") 
		publicRooms.Use(s.Middleware.OptionalAuthMiddleware())
		{
			publicRooms.POST("", s.RoomHandler.CreateRoom)
			publicRooms.GET("/:slug", s.RoomHandler.GetRoomBySlug)
			publicRooms.DELETE("/:id", s.RoomHandler.DeleteCurrentRoom)
			publicRooms.PUT("/id/:id", s.RoomHandler.UpdateExistingRoom)
			// publicRooms.PUT("/:slug", s.RoomHandler.UpdateRoomBySlug)
		}

		roomsGroup := v1.Group("/rooms")
		roomsGroup.Use(s.Middleware.AuthMiddleware())
		{
			// roomsGroup.POST("/", s.RoomHandler.CreateRoom)
			roomsGroup.GET("", s.RoomHandler.GetRoomsByUser)
			roomsGroup.GET("/room-name/:name", s.RoomHandler.GetRoomByName)
			roomsGroup.DELETE("/room-id/:id", s.RoomHandler.DeleteCurrentRoom)
			// roomsGroup.GET("/:id", s.RoomHandler.RoomByID)
		}


		dashboardGroup := v1.Group("/dashboard")
		dashboardGroup.Use(s.Middleware.AuthMiddleware())
		{
			dashboardGroup.GET("/user-id/:id", s.RoomHandler.GetRoomsByUser)
			dashboardGroup.DELETE("/room-id/:id", s.RoomHandler.DeleteCurrentRoom)
		}
	}
}