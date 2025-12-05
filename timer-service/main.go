package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"timer-service/handlers"
	"timer-service/repositories"
	"timer-service/services"
)

func main() {
	// Initialize repository
	repo := repositories.NewInMemoryTimerRepository()

	// Initialize service
	timerService := services.NewTimerService(repo)

	// Initialize handlers
	timerHandler := handlers.NewTimerHandler(timerService)

	// Setup router
	router := gin.Default()

	// CORS middleware
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// API routes
	api := router.Group("/api")
	{
		timers := api.Group("/timers")
		{
			timers.POST("", timerHandler.CreateTimer)
			timers.GET("", timerHandler.GetAllTimers)
			timers.GET("/:id", timerHandler.GetTimerByID)
			timers.PUT("/:id", timerHandler.UpdateTimer)
			timers.DELETE("/:id", timerHandler.DeleteTimer)
			timers.GET("/user/:userId", timerHandler.GetTimersByUserID)
			timers.POST("/:id/start", timerHandler.StartTimer)
			timers.POST("/:id/stop", timerHandler.StopTimer)
		}
	}

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8082"
	}

	log.Printf("Timer Service starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

