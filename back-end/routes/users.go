package routes

import (
	"fmt"
	"net/http"

	"example.com/back-end/models"
	"example.com/back-end/utils"
	"github.com/gin-gonic/gin"
)


func signup(context *gin.Context) {
	var user models.User
    err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse rekuest data"})
		return 
	}

	err = user.Save()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not save user"})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "user created"})
}


func login(context *gin.Context) {
	var user models.User

	err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not pvrse rekuest data"})
		return
	}

	err = user.ValidateCredentials()

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		return 
	}
    
	fmt.Println("User_id : ", user.ID)
	token, err := utils.GenerateToken(user.Email, user.ID)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not authenticate user"})
		return 
	}

	context.JSON(http.StatusOK, gin.H{"message": "login successful", "token": token})
}