package rooms

import (
	"context"

	"gorm.io/gorm"
)

type Repository interface {
	CreateRoom(ctx context.Context, room *Room, userID *uint) error
	UpdateRoom(ctx context.Context, room *Room, roomID uint64) error
	DeleteRoom(ctx context.Context, roomID uint64) error
	FindRoomByID(roomID uint) (*Room, error)
	FindRoomByName(ctx context.Context, roomName string) ([]Room, error)
	FindRoomBySlug(ctx context.Context, roomSlug string) (*Room, error)
	// FindRoomByNameOrSlug(ctx context.Context, identity string) (*Room, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository (db *gorm.DB) Repository {
	return &repository{db:db}
}

func (r *repository) CreateRoom(ctx context.Context, room *Room, userID *uint) error {
	if userID != nil {
		room.UserID = userID
	}

	if err := r.db.WithContext(ctx).Create(room).Error ; err != nil {
		return err
	}

	return nil
}

func (r *repository) UpdateRoom(ctx context.Context, room *Room, roomID uint64) error {
	err := r.db.WithContext(ctx).Model(&Room{}).
		Where("id = ?", roomID).
		Updates(map[string]interface{}{
			"name": room.Name,
			"slug": room.Slug,
			"content": room.Content,
		}).Error
	return err
}

func (r *repository) DeleteRoom(ctx context.Context, roomID uint64) error {
	var room Room
	return r.db.WithContext(ctx).
		Where("id = ?", roomID).
		Delete(&room).
		Error
}


func (r *repository) FindRoomByID(roomID uint) (*Room, error) {
	var room Room
	if err := r.db.Where("id = ?", roomID).First(&room).Error ; err != nil {
		return nil, err
	}

	return &room, nil
}

func (r *repository) FindRoomByName(ctx context.Context, roomName string) ([]Room, error) {
	var rooms []Room
	searchPattern := "%" + roomName + "%"
	err := r.db.WithContext(ctx).Where("name LIKE ?", searchPattern).Find(&rooms).Error 
	
	if err != nil {
		return nil, err
	}

	return rooms, nil
}

func (r *repository) FindRoomBySlug(ctx context.Context, roomSlug string) (*Room, error) {
	var room Room
	if err := r.db.WithContext(ctx).Where("slug = ?", roomSlug).First(&room).Error ; err != nil {
		return nil, err
	}

	return &room, nil
}

// func (r *repository) FindRoomByNameOrSlug(ctx context.Context, identity string) (*Room, error){
// 	var room Room
// 	if err := r.db.WithContext("name = ? OR slug =?", identity, identity).First(&room).Error ; err != nil {
// 		return nil, err
// 	}

// 	return &room, nil
// }