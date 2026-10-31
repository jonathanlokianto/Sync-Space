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
			publicRooms.GET("/slug/:slug", s.RoomHandler.GetRoomBySlug)
			publicRooms.PUT("/:id", s.RoomHandler.UpdateExistingRoom)
			// publicRooms.DELETE("/:id", s.RoomHandler.DeleteCurrentRoom)
			// publicRooms.PUT("/:slug", s.RoomHandler.UpdateRoomBySlug)
		}

		roomsGroup := v1.Group("/rooms")
		roomsGroup.Use(s.Middleware.AuthMiddleware())
		{
			roomsGroup.GET("", s.RoomHandler.GetRoomsByUser)
			roomsGroup.GET("/name/:name", s.RoomHandler.GetRoomByName)
			roomsGroup.DELETE("/:id", s.RoomHandler.DeleteCurrentRoom)
			// roomsGroup.POST("/", s.RoomHandler.CreateRoom)
			// roomsGroup.GET("/:id", s.RoomHandler.RoomByID)
		}


		dashboardGroup := v1.Group("/dashboard")
		dashboardGroup.Use(s.Middleware.AuthMiddleware())
		{
			dashboardGroup.GET("/:id", s.RoomHandler.GetRoomsByUser)
			// dashboardGroup.PUT("/:id", s.RoomHandler.UpdateExistingRoom)
			// dashboardGroup.DELETE("/:id", s.RoomHandler.DeleteCurrentRoom)
		}
	}
}