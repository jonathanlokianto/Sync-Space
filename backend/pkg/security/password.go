package security

import (
	"crypto/hmac"
	"crypto/sha256"
	"os"

	"golang.org/x/crypto/bcrypt"
)


func getPepper() string {
	pepper := os.Getenv("APP_PEPPER")
	return pepper
}


func pepperPassword(password string) []byte {
	mac := hmac.New(sha256.New, []byte(getPepper()))
	mac.Write([]byte(password))
	return mac.Sum(nil)
}

func HashPassword(password string) (string, error) {
	pepperedBytes := pepperPassword(password)
	hashedBytes, error := bcrypt.GenerateFromPassword(pepperedBytes, bcrypt.DefaultCost)
	if error != nil {
		return "", error
	}

	return string(hashedBytes), nil
}


func CheckPasswordHash(inputPassword string, savedPasswordHash string) bool {
	peppereredBytes := pepperPassword(inputPassword)
	err:= bcrypt.CompareHashAndPassword([]byte(savedPasswordHash), peppereredBytes)
	return err == nil
}


func HasAndPepperPassword(password string) (string, error) {
	passwordBytes := []byte(password + "APPLICATION_PEPPER")
	hashedPassword, err := bcrypt.GenerateFromPassword(
		passwordBytes,
		bcrypt.DefaultCost,
	)

	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}