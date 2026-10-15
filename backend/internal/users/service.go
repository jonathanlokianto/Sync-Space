package users

import (
	"context"
	"sync-space-backend/pkg/security"
)

type Service interface {
	GetProfile(ctx context.Context, req GetUserIDRequest) (*Response, error)
	UpdateProfile(ctx context.Context, req Request, userID uint) (*Response, error) 
}

type service struct {
	repository Repository
}

func NewService(repository Repository) Service {
	return &service{repository: repository}
}

func (s *service) GetProfile(ctx context.Context, req GetUserIDRequest) (*Response, error) {
	user, err := s.repository.GetUser(ctx, req.ID) 
	
	if err != nil {
		return nil, err
	}

	response := Response{
			ID: user.ID,
			Fullname: user.Fullname,
			Email: user.Email,
			Username: user.Username,
	}

	return &response, nil
}

func (s *service) UpdateProfile(ctx context.Context, req Request, userID uint) (*Response, error) {
	hashedPassoword, err := security.HashPassword(req.Password)

	if err != nil {
		return nil, err
	}
	userEntity := User{
		Fullname: req.Fullname,
		Email: req.Email,
		Username: req.Username,
		Password: string(hashedPassoword),
	}

	if err := s.repository.UpdateUser(ctx, &userEntity, userID) ; err!= nil {
		return nil, err
	}

	response := Response{
		ID: userID,
		Fullname: req.Fullname,
		Email: req.Email,
		Username: req.Username,
	}

	return &response, nil
}