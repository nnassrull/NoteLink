package routes

import (
	"github.com/gin-gonic/gin"
)


func RegisterRoutes(server *gin.Engine) {
	server.GET("/tasks", getTasks)

	server.POST("/tasks", createTasks)
	server.DELETE("/tasks/:id", deleteTask)
}



