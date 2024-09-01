package routes

import (
	"example.com/back-end/middlewares"
	"github.com/gin-gonic/gin"
)


func RegisterRoutes(server *gin.Engine) {


	authenticate := server.Group("/")
	authenticate.Use(middlewares.Authenticate)
	authenticate.POST("/tasks", createTasks)
	authenticate.DELETE("/tasks/:id", deleteTask)
	authenticate.PUT("/tasks/:id", updateTask)
	authenticate.GET("/tasks", getTasks)


	// Login and Sign up
	server.POST("/signup", signup)
	server.POST("/login", login) 
}



