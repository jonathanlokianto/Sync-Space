package generator

import (
	"crypto/rand"
	"math/big"
)

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

func GenerateRandomString(n int) string {
	b := make([]byte, n)
	for i := range b {
		num, _ := rand.Int(rand.Reader,big.NewInt(int64(len(charset))))
		b[i] = charset[num.Int64()]
	}
	return string(b)
}