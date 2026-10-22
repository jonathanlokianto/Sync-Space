package server

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync-space-backend/internal/auth"
	"sync-space-backend/internal/middleware"
	"sync-space-backend/internal/rooms"
	"sync-space-backend/internal/users"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Server struct {
	Router *gin.Engine
	DB  *gorm.DB
	AuthHandler *auth.Handler
	UserHandler *users.Handler
	RoomHandler *rooms.Handler
	Middleware  auth.MiddlewareManager
}

func NewServer(db *gorm.DB) *Server {
	log.Println("Main memanggil server")
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())

	tokenService := auth.NewJWTService()
	mw := auth.NewMiddlewareManager(tokenService)

	roomRepo := rooms.NewRepository(db)
	userRepo := users.NewRepository(db)

	authService := auth.NewService(userRepo, tokenService)
	authHandler := auth.NewHandler(authService)

	userService := users.NewService(userRepo)
	userHandler := users.NewHandler(userService)
	
	roomService := rooms.NewService(roomRepo, userService)
	roomHandler := rooms.NewHandler(roomService)
	
	server := &Server{
		Router:      router,
		DB:          db,
		AuthHandler: authHandler,
		UserHandler: userHandler,
		RoomHandler: roomHandler,
		Middleware:  mw,
	}
	server.RegisterRoutes()
	return server
}

func (s *Server) Start(port string) error {
	srv := &http.Server{
		Addr: fmt.Sprintf(":%s", port),
		Handler: s.Router,
		ReadTimeout: 10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	shutdownChan := make(chan os.Signal, 1)
	signal.Notify(shutdownChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		log.Printf("gin server is running on port %s", port)
		if err:= srv.ListenAndServe() ; 
			err != nil && !errors.Is(err, http.ErrServerClosed){
				log.Fatalf("Failed in running the server: %v", err)
			}
	}()

	<-shutdownChan
	log.Println("Shutdown signal received...")
	ctx, cancel := context.WithTimeout(context.Background(), 10 * time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		return fmt.Errorf("Server force shutdown error: %w", err)
	}
	log.Println("Server stopped")
	return nil
}