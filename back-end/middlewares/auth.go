package middlewares

import (
	"fmt"
	"net/http"
	"strings"

	"example.com/back-end/utils"
	"github.com/gin-gonic/gin"
)

func Authenticate(context *gin.Context) {
	fmt.Println("function called")
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "not authorized"})
		return
	}

	if len(token) > 7 && strings.HasPrefix(token, "Bearer ") {
		token = token[7:]
	}

	fmt.Println("Token Received", token) // Debug log

	// VErify
	userId, err := utils.VerifyToken(token)
	if err != nil {
		fmt.Println("Token verification error: ", err) // Debug log
		context.JSON(http.StatusUnauthorized, gin.H{"message": "not authorised"})
		return
	}

	fmt.Println("Authenticated user Id: ", userId)

	context.Set("userId", userId)

	context.Next()
}