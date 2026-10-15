package rooms

import (
	"context"
	"errors"
	"sync-space-backend/pkg/generator"

	"gorm.io/gorm"
)

type Service interface {
	CreateRoom(ctx context.Context, req CreateRoomRequest, userID *uint) (*RoomResponse, error)
	UpdateRoom(ctx context.Context, req UpdateRoomRequest, roomID uint64) (*RoomResponse, error)
	DeleteRoom(ctx context.Context, roomID uint64) error
	FindRoomByName(ctx context.Context, room_identity string) (*[]RoomResponse, error)
	FindRoomBySlug(ctx context.Context, room_identity string) (*RoomResponse, error)
}

type service struct {
	repository Repository
}

func NewService(repository Repository) Service {
	return &service{repository: repository}
}


func (s *service) generateUniqueRandomSlug(ctx context.Context) (string, error) {
	maxRetries := 20
	for i:= 0 ; i < maxRetries; i++ {
		slugString := generator.GenerateRandomString(10)
		existingRoom, err := s.repository.FindRoomBySlug(ctx, slugString)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound){
				return slugString, nil
			}
			return "", err
		}

		if existingRoom == nil {
			return slugString, nil
		}
	}
	return "", errors.New("Failed to generate unique slug. Please try again!")
}



func (s *service) CreateRoom(ctx context.Context, req CreateRoomRequest, userID *uint) (*RoomResponse, error) {
	name := req.Name
	slug := req.Slug
	if slug == "" {
		uniqueSlug, err := s.generateUniqueRandomSlug(ctx)
		if err != nil {
			return nil, err
		}
		slug = uniqueSlug
	}

	if name == "" {
		name = "Room " + slug
	}

	roomEntity := Room{
		Name: name,
		Slug: slug,
	}



	if err := s.repository.CreateRoom(ctx, &roomEntity, userID); err != nil {
		return nil, err
	}

	response := ToRoomResponse(&roomEntity)

	// response := RoomResponse{
	// 	ID: uint64(roomEntity.ID),
	// 	Name: roomEntity.Name,
	// 	Slug: roomEntity.Slug,
	// }

	return &response, nil
}

func (s *service) UpdateRoom(ctx context.Context, req UpdateRoomRequest, idRoom uint64) (*RoomResponse, error) {
	roomEntity := Room{
		ID: idRoom,
		Name: req.Name,
		Slug: req.Slug,
		Content: req.Content,
	}
	if err := s.repository.UpdateRoom(ctx, &roomEntity, idRoom) ; err == nil{
		return nil, err
	}
	response := ToRoomResponse(&roomEntity)
	return &response, nil
}


func (s *service) DeleteRoom(ctx context.Context, idRoom uint64) error {
	if err := s.repository.DeleteRoom(ctx, idRoom) ; err != nil {
		return err
	}
	return nil
}

func (s *service) FindRoomByName(ctx context.Context, room_identity string) (*[]RoomResponse, error) {
	rooms, err := s.repository.FindRoomByName(ctx, room_identity)
	if err != nil {
		return nil, err
	}

	responses := ToRoomListResponse(rooms)
	return &responses, nil

}

func (s *service) FindRoomBySlug(ctx context.Context, room_identity string) (*RoomResponse, error) {

	room, err := s.repository.FindRoomBySlug(ctx, room_identity) 
	if err != nil {
		return nil, err
	}
	response := ToRoomResponse(room)
	return &response, nil
}