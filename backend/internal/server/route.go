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

		usersGroup := v1.Group("/users")
		usersGroup.Use(s.Middleware.AuthMiddleware())
		{
			usersGroup.GET("/me", s.UserHandler.GetMyProfile)
			usersGroup.PUT("/me", s.UserHandler.UpdateMyProfile)
		}

		public := v1.Group("/") 
		{
			public.POST("/rooms/", s.RoomHandler.CreateRoom)
		}

		roomsGroup := v1.Group("/rooms")
		roomsGroup.Use(s.Middleware.AuthMiddleware())
		{
			// roomsGroup.POST("/", s.RoomHandler.CreateRoom)
			roomsGroup.PUT("/:id", s.RoomHandler.UpdateExistingRoom)
			roomsGroup.DELETE("/:id", s.RoomHandler.DeleteCurrentRoom)
			roomsGroup.GET("/name/:name", s.RoomHandler.GetRoomByName)
			roomsGroup.GET("/slug/:slug", s.RoomHandler.GetRoomBySlug)
			// roomsGroup.GET("/:id", s.RoomHandler.RoomByID)
		}
	}
}