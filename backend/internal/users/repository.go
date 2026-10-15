package users

import (
	"context"

	"gorm.io/gorm"
)

type Repository interface {
	CreateUser(ctx context.Context, user *User) error
	UpdateUserData(ctx context.Context, user *User) error


	GetUser(ctx context.Context, userID uint) (*User, error)
	UpdateUser(ctx context.Context, user *User, userID uint) error

	UpgradeToPremium(userID uint) error
	RevokePremium(userID uint) error
	FindByEmail(email string) (*User, error)
	FindByIdentity(identity string) (*User, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db:db}
}

func (r *repository) CreateUser(ctx context.Context, user *User) error {
	return r.db.WithContext(ctx).Create(user).Error
}


func (r *repository) FindByEmail(email string) (*User, error) {
	var user User

	err := r.db.Where("email = ?" , email).First(&user).Error
	return &user, err
}

func (r *repository) FindByIdentity(identity string) (*User, error) {
	var user User
	err:= r.db.Where("username = ? OR email = ?", identity, identity).First(&user).Error
	return &user, err
}

func (r *repository) UpdateUserData(ctx context.Context, user *User) error {
	err := r.db.WithContext(ctx).Model(&user).
		Updates(map[string]interface{}{
			"fullname": user.Fullname,
			"username": user.Username,
			"email": user.Email,
			"password": user.Password,
		}).Error
	return err
}

func (r *repository) UpgradeToPremium(userID uint) error {
	return r.db.Model(&User{}).
		Where("id = ?", userID).
		Update("is_premium", true).Error
}

func (r *repository) RevokePremium(userID uint) error {
	var user User
	if err := r.db.Where("id = ?", userID).First(&user).Error ; err != nil {
		return err
	}

	user.IsPremium = false
	return r.db.Save(&user).Error
}

func (r *repository) GetUser(ctx context.Context, userID uint) (*User, error) {
	var user User
	if err := r.db.WithContext(ctx).Where("id = ?", userID).First(&user).Error ; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r  *repository) UpdateUser(ctx context.Context, user *User, userID uint) error {
	if err := r.db.WithContext(ctx).Model(&User{}).
		Where("user_id = ?", userID).
		Updates(map[string]interface{}{
			"fullname" : user.Fullname,
			"email": user.Email,
			"username": user.Username,
			"password": user.Password,
		}).Error ; err != nil {
			return err
		}

	return nil
}