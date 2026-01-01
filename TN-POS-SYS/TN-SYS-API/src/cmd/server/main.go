// 🇻🇳 Main entry point
// 🇺🇸 Main entry point
package main

import (
	"fmt"
	"log"
	"tn-pos-sys-api/internal/router"
	"tn-pos-sys-api/pkg/config"
	"tn-pos-sys-api/pkg/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Load config
	cfg, err := config.LoadConfig(".")
	if err != nil {
		log.Fatal("Failed to load config:", err)
	}

	// Init logger
	if err := utils.InitLogger(); err != nil {
		log.Fatal("Failed to initialize logger:", err)
	}

	// Database connection
	db, err := gorm.Open(postgres.Open(cfg.Database.GetDSN()), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	// Create Fiber app
	app := fiber.New(fiber.Config{
		AppName:       "TN POS System API",
		ServerHeader:  "Fiber",
		CaseSensitive: false,
	})

	// Middleware
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin,Content-Type,Accept,Authorization",
	}))

	// Routes
	router.SetupRoutes(app, db)

	// Start server
	addr := fmt.Sprintf("%s:%s", cfg.Server.Host, cfg.Server.Port)
	log.Printf("Server starting on %s", addr)
	if err := app.Listen(addr); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
