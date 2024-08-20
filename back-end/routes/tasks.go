package routes

import (
	"net/http"
	"strconv"

	"example.com/back-end/models"
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

func deleteTask(context *gin.Context) {
	taskID, err := strconv.ParseInt(context.Param("id"),10, 64)
  
	if err != nil {
	  context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse task id"})
	  return
	}
  
	task, err := models.GetTaskByID(taskID)
  
	if err != nil {
	  context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch the task by id"})
	  return
	}
  
	err = task.Delete()
  
	if err != nil {
	  context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not delete the task"})
	}
  
	context.JSON(http.StatusOK, gin.H{"message": "task deleted"})
  }


  func updateTask(context *gin.Context) {
    taskID, err := strconv.ParseInt(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse event id"})
		return
	}
    
    var updatedTask models.Task

	err = context.ShouldBindJSON(&updatedTask)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not fetch event"})
		return
	}

	updatedTask.ID = taskID
	err = updatedTask.Update()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not update given event"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Task Updated Successfully"})
  }