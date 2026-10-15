package auth

import (
	"context"
	"errors"
	"sync-space-backend/internal/users"
	"sync-space-backend/pkg/security"
)

type Service interface {
	RegisterUser(ctx context.Context, req RegisterRequest) error
	LoginUser(ctx context.Context, req LoginRequest) (*LoginResponse, error)
}

type service struct {
	repository users.Repository
	tokenService TokenService
}

func NewService(repository users.Repository, tokenService TokenService) Service {
	return &service{
		repository: repository,
		tokenService: tokenService,
	}
}

func (s *service) RegisterUser(ctx context.Context, req RegisterRequest) error {
	existingUser, _ := s.repository.FindByEmail(req.Email)
	if existingUser.ID != 0 {
		return errors.New("Email already exist.")
	}

	hashedPassword, err := security.HashPassword(req.Password)
	if err != nil {
		return err
	}

	userEntity := users.User{
		Fullname:     req.Fullname,
		Email:        req.Email,
		Username:     req.Username,
		Password:     string(hashedPassword),
		MaxRoomLimit: 3,
		IsPremium:    false,
	}

	err = s.repository.CreateUser(ctx, &userEntity)
	if err != nil {
		return err
	}

	// response := RegisterResponse{
	// 	ID:           userEntity.ID,
	// 	Fullname:     userEntity.Fullname,
	// 	Username:     userEntity.Username,
	// 	Role:         "user",
	// 	MaxRoomLimit: userEntity.MaxRoomLimit,
	// 	IsPremium:    userEntity.IsPremium,
	// }

	return nil
}

func (s *service) LoginUser(ctx context.Context, req LoginRequest) (*LoginResponse, error) {
	existingUserIdentity, err := s.repository.FindByIdentity(req.Identity)
	if err != nil && existingUserIdentity.ID != 0 {
		return nil, errors.New("Invalid username or password")
	}

	isUserValid := security.CheckPasswordHash(req.Password, existingUserIdentity.Password)

	if !isUserValid{
		return nil, errors.New("Invalid username or password.")
	}

	token, err := s.tokenService.GenerateJWT(
		existingUserIdentity.ID, 
		existingUserIdentity.IsPremium,
		"user",
	)
	if err != nil {
		return nil, errors.New("Failed to generate access token.")
	}

	response := LoginResponse{
		ID:           existingUserIdentity.ID,
		Fullname:     existingUserIdentity.Fullname,
		Username:     existingUserIdentity.Username,
		Role:         "user",
		MaxRoomLimit: existingUserIdentity.MaxRoomLimit,
		IsPremium:    existingUserIdentity.IsPremium,
		AccessToken:  token,
	}

	return &response, nil
}