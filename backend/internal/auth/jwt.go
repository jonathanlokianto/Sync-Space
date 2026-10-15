package auth

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type CustomClaims struct {
	UserID    uint   `json:"user_id"`
	IsPremium bool   `json:"is_premium"`
	Role      string `json:"role"`
	jwt.RegisteredClaims
}

type TokenService interface {
	GenerateJWT(userID uint, isPremium bool, role string) (string, error)
	ValidateJWT(tokenString string) (*CustomClaims, error)
	GenerateRandomToken(length int) (string, error)
}

type jwtService struct {
	secretKey []byte
}

func NewJWTService() TokenService {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "default_jwt_secret_change_in_production"
	}
	return &jwtService{
		secretKey: []byte(secret),
	}
}

func (s *jwtService) GenerateJWT(userID uint, isPremium bool, role string) (string, error) {
	claims := CustomClaims{
		UserID:    userID,
		IsPremium: isPremium,
		Role:      role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.secretKey)
}

func (s *jwtService) ValidateJWT(tokenString string) (*CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, 
		func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("unexpected signing method")
			}
			return s.secretKey, nil
	})

	if err != nil || !token.Valid {
		return nil, errors.New("invalid or expired token")
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok {
		return nil, errors.New("failed to parse claims")
	}

	return claims, nil
}

func (s *jwtService) GenerateRandomToken(length int) (string, error) {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}