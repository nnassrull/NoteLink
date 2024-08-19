package routes

import (
	"net/http"

	"example.com/ToDoList/models"
	"github.com/gin-gonic/gin"
)

func getTasks(context *gin.Context) {
	tasks, err := models.GetallTasks()
	
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not fetch tasks"})
	}

	context.JSON(http.StatusOK, tasks)
}

func createTasks(context *gin.Context) {
	var task models.Task

	err := context.ShouldBindJSON(&task)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse rekuest data"})
	}

	err = task.Save()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not create task"})
	}

	context.JSON(http.StatusCreated, gin.H{"message": "task created successfully", "task": task})
}