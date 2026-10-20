package rooms

import (
	"context"
	"errors"
	"sync-space-backend/internal/users"
	"sync-space-backend/pkg/generator"

	"gorm.io/gorm"
)

type Service interface {
	CreateRoom(ctx context.Context, req CreateRoomRequest, userID *uint) (*RoomResponse, error)
	UpdateRoom(ctx context.Context, req UpdateRoomRequest, roomID uint64) (*RoomResponse, error)
	DeleteRoom(ctx context.Context, roomID uint64) error
	FindRoomByName(ctx context.Context, roomIdentity string) (*[]RoomResponse, error)
	FindRoomsByUser(ctx context.Context, userID uint) (*[]RoomResponse, error)
	FindRoomBySlug(ctx context.Context, roomIdentity string) (*RoomResponse, error)

	getUserByID(ctx context.Context, userID uint) (*users.User, error)
}

type service struct {
	roomRepo Repository
	userService users.Service
}

func NewService(roomRepo Repository, userService users.Service) Service {
	return &service{roomRepo: roomRepo, userService: userService}
}


func (s *service) generateUniqueRandomSlug(ctx context.Context) (string, error) {
	maxRetries := 20
	for i:= 0 ; i < maxRetries; i++ {
		slugString := generator.GenerateRandomString(10)
		existingRoom, err := s.roomRepo.FindRoomBySlug(ctx, slugString)
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

func (s *service) getUserByID(ctx context.Context, userID uint) (*users.User, error){
	// var user users.User

	user, err := s.userService.GetUserData(ctx, userID) 
	if err != nil {
		return nil, err
	}

	return user, nil
}



func (s *service) CreateRoom(ctx context.Context, req CreateRoomRequest, userID *uint) (*RoomResponse, error) {
	name := req.Name
	slug := req.Slug
	content := req.Content
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

	if (content != nil && *content != "") {
		roomEntity.Content = content
	}

	if userID != nil {
		user, err := s.getUserByID(ctx, *userID)
		if err != nil {
			return nil, err
		}
		roomEntity.UserID = &user.ID
		roomEntity.User = user
	}

	if err := s.roomRepo.CreateRoom(ctx, &roomEntity); err != nil {
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
	room, err := s.roomRepo.FindRoomByID(ctx, uint(idRoom)) 
	if err != nil {
		return nil, errors.New("Room not found.")
	}

	if req.Slug != room.Slug {
		existingRoom, _ := s.roomRepo.FindRoomBySlug(ctx, req.Slug)
		if existingRoom != nil {
			return nil, errors.New("Please pick a new room slug.")
		}
	}
	roomEntity := Room{
		ID: uint64(idRoom),
		Name: req.Name,
		Slug: req.Slug,
		Content: req.Content,
	}

	if err := s.roomRepo.UpdateRoom(ctx, &roomEntity, idRoom) ; err != nil{
		return nil, err
	}
	response := ToRoomResponse(&roomEntity)
	return &response, nil
}


func (s *service) DeleteRoom(ctx context.Context, idRoom uint64) error {
	if err := s.roomRepo.DeleteRoom(ctx, idRoom) ; err != nil {
		return err
	}
	return nil
}

func (s *service) FindRoomsByUser(ctx context.Context, userID uint) (*[]RoomResponse, error) {
	rooms, err := s.roomRepo.FindRoomsByUser(ctx, userID)
	if err != nil {
		return nil, err
	}

	responses := ToRoomListResponse(rooms)
	return &responses, nil
}

func (s *service) FindRoomByName(ctx context.Context, roomIdentity string) (*[]RoomResponse, error) {
	rooms, err := s.roomRepo.FindRoomByName(ctx, roomIdentity)
	if err != nil {
		return nil, err
	}

	responses := ToRoomListResponse(rooms)
	return &responses, nil
}

func (s *service) FindRoomBySlug(ctx context.Context, roomIdentity string) (*RoomResponse, error) {

	room, err := s.roomRepo.FindRoomBySlug(ctx, roomIdentity) 
	if err != nil {
		return nil, err
	}
	response := ToRoomResponse(room)
	return &response, nil
}