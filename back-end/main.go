package main

import (
	"example.com/back-end/db"
	"example.com/back-end/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


func main() {
	db.InitDB()
	server := gin.Default()

    // Configuring CORS
	corsConfig := cors.Config {
		AllowOrigins: []string{"http://localhost:3000"}, // Allow requests from React app
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}

    server.Use(cors.New(corsConfig))


	routes.RegisterRoutes(server)
	server.Run(":3500")
}