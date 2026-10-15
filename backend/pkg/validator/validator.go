package validator

import (
	"fmt"
	"regexp"

	"github.com/go-playground/validator/v10"
)

type CustomValidator struct {
	validator *validator.Validate
}

var slugRegex = regexp.MustCompile("^[a-z0-9]+(?:-[a-z0-9]+)*$")

func NewCustomValidator() *CustomValidator {
	v := validator.New()

	v.RegisterValidation("slug", func(fl validator.FieldLevel) bool {
		return true 
	})

	return &CustomValidator{validator: v}
}

func (cv *CustomValidator) ValidateStruct(s interface{}) map[string]string {
	err := cv.validator.Struct(s)
	if err == nil {
		return nil
	}

	errorMessages := make(map[string]string)
	for _, e := range err.(validator.ValidationErrors) {
		switch e.Tag() {
		case "required":
			errorMessages[e.Field()] = fmt.Sprintf("Field %s wajib diisi", e.Field())
		case "min":
			errorMessages[e.Field()] = fmt.Sprintf("Field %s minimal %s karakter", e.Field(), e.Param())
		default:
			errorMessages[e.Field()] = "Format tidak valid"
		}
	}

	return errorMessages
}