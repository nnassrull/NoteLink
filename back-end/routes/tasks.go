package routes

import (
	"fmt"
	"net/http"
	"strconv"

	"example.com/back-end/db"
	"example.com/back-end/models"
	"github.com/gin-gonic/gin"
)

func getTasks(context *gin.Context) {
    userID, exists := context.Get("userId")
	if !exists {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "user ID not found"})
		return
	}
    
    userID, ok := userID.(int64)
	if !ok {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "invalid user id"})
		return
	}

	userId := userID.(int64)

	db.CheckforEmptyTable(userId)
	tasks, err := models.GetTasksByUserID(userId)
	
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
    
	userId := context.GetInt64("userId")
    
	fmt.Println("Current user_id : ", userId)
	
	task.UserID = userId
	err = task.Save()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not create task"})
	}

	context.JSON(http.StatusCreated, gin.H{"message": "task created successfully", "task": task})
}

func deleteTask(context *gin.Context) {
	taskID, err := strconv.ParseInt(context.Param("id"),10, 64)

	fmt.Println("function deleteTask called")
  
	if err != nil {
	  context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse task id"})
	  return
	}
    
	userId := context.GetInt64("userId")
	task, err := models.GetTaskByID(taskID)
  
	if err != nil {
	  context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch the task by id"})
	  return
	}
    
    if task.UserID != userId {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "not authorised to delete task"})
	}


	err = task.Delete()
  
	if err != nil {
		fmt.Println("Error arising from here")
	  context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not delete the task"})
	}
  
	context.JSON(http.StatusOK, gin.H{"message": "task deleted"})
	db.CheckforEmptyTable(userId)
  }

func updateTask(context *gin.Context) {
    taskID, err := strconv.ParseInt(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse task id"})
		return
	}
    
    userId := context.GetInt64("userId")
	task, err := models.GetTaskByID(taskID)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not fetch task"})
		return
	}

	if task.UserID != userId {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "not authorized to update task"})
		return
	}

    var updatedTask models.Task

	err = context.ShouldBindJSON(&updatedTask)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not fetch task"})
		return
	}

	updatedTask.ID = taskID
	err = updatedTask.Update()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not update task"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Task Updated Successfully"})
  }