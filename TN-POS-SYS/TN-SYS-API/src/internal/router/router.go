// 🇻🇳 Router setup
// 🇺🇸 Router setup
package router

import (
	"os"
	"tn-pos-sys-api/internal/handler"
	"tn-pos-sys-api/internal/service"
	"tn-pos-sys-api/pkg/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
	"gopkg.in/yaml.v3"
	"gorm.io/gorm"
)

// SetupRoutes Thiết lập routes
func SetupRoutes(app *fiber.App, db *gorm.DB) {
	// Services
	shellService := service.NewShellService(db)
	authService := service.NewAuthService(db)
	authAdminUsrService := service.NewAuthAdminUsrService(db)
	authAdminRoleService := service.NewAuthAdminRoleService(db)
	authAdminPermService := service.NewAuthAdminPermService(db)
	orgService := service.NewOrgService(db)

	// Handlers
	shellHandler := handler.NewShellHandler(shellService)
	authHandler := handler.NewAuthHandler(authService, orgService)
	authAdminHandler := handler.NewAuthAdminHandler(
		authAdminUsrService,
		authAdminRoleService,
		authAdminPermService,
	)
	orgHandler := handler.NewOrgHandler(orgService)

	// Middleware
	authMiddleware := middleware.AuthMiddleware(db)

	// Swagger documentation
	// Serve swagger.yaml as JSON
	app.Get("/swagger/doc.json", func(c *fiber.Ctx) error {
		// Read swagger.yaml file (relative to working directory)
		// Try multiple possible paths
		var data []byte
		var err error
		paths := []string{
			"docs/swagger.yaml",
			"src/docs/swagger.yaml",
			"./docs/swagger.yaml",
			"./src/docs/swagger.yaml",
		}

		for _, path := range paths {
			data, err = os.ReadFile(path)
			if err == nil {
				break
			}
		}

		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Failed to load swagger documentation: " + err.Error(),
			})
		}

		// Convert YAML to JSON
		var swaggerDoc map[string]interface{}
		if err := yaml.Unmarshal(data, &swaggerDoc); err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Failed to parse swagger documentation: " + err.Error(),
			})
		}

		return c.JSON(swaggerDoc)
	})
	app.Get("/swagger/*", swagger.HandlerDefault)

	// API v1
	api := app.Group("/api/v1")

	// Shell routes
	shell := api.Group("/shell")
	shell.Get("/registry", authMiddleware, shellHandler.Api_Shell_Mod_Get_Registry) // Auth: Required
	shell.Get("/config", shellHandler.Api_Shell_Sys_Get_Cfg)                        // Public

	// Auth routes (Public)
	auth := api.Group("/auth")
	auth.Post("/login", authHandler.Api_Auth_Usr_Login)           // Public
	auth.Post("/register", authHandler.Api_Auth_Usr_Register)     // Public
	auth.Post("/forgot-pwd", authHandler.Api_Auth_Usr_Forgot_Pwd) // Public

	// Auth routes (Protected)
	authProtected := auth.Group("", authMiddleware)
	authProtected.Post("/logout", authHandler.Api_Auth_Usr_Logout)              // Auth: Required
	authProtected.Post("/change-pwd", authHandler.Api_Auth_Usr_Change_Pwd)      // Auth: Required
	authProtected.Get("/has-perm/:permCode", authHandler.Api_Auth_Usr_Has_Perm) // Auth: Required

	// Auth Admin routes (Protected)
	authAdmin := api.Group("/auth/admin", authMiddleware)
	// User management
	authAdmin.Get("/users", authAdminHandler.Api_Auth_Usr_Get_List)      // Auth: Required
	authAdmin.Post("/users", authAdminHandler.Api_Auth_Usr_Upsert)       // Auth: Required
	authAdmin.Delete("/users/:id", authAdminHandler.Api_Auth_Usr_Delete) // Auth: Required
	// Role management
	authAdmin.Get("/roles", authAdminHandler.Api_Auth_Role_Get_List)         // Auth: Required
	authAdmin.Post("/roles", authAdminHandler.Api_Auth_Role_Upsert)          // Auth: Required
	authAdmin.Delete("/roles/:id", authAdminHandler.Api_Auth_Role_Delete)    // Auth: Required
	authAdmin.Post("/roles/perms", authAdminHandler.Api_Auth_Role_Perm_Save) // Auth: Required
	// Permission management
	authAdmin.Get("/perms", authAdminHandler.Api_Auth_Perm_Get_List)   // Auth: Required
	authAdmin.Post("/perms/sync", authAdminHandler.Api_Auth_Perm_Sync) // Auth: Required

	// Organization routes (Protected)
	org := api.Group("/org", authMiddleware)
	org.Get("/hierarchy", orgHandler.Api_Org_Get_Hierarchy)
	org.Get("/companies", orgHandler.Api_Org_Get_Companies)
	org.Post("/companies", orgHandler.Api_Org_Cpy_Upsert)
	org.Get("/regions", orgHandler.Api_Org_Get_Regions)
	org.Post("/regions", orgHandler.Api_Org_Reg_Upsert)
	org.Get("/branches", orgHandler.Api_Org_Get_Branches)
	org.Post("/branches", orgHandler.Api_Org_Brh_Upsert)
	org.Get("/departments", orgHandler.Api_Org_Get_Departments)
	org.Post("/departments", orgHandler.Api_Org_Dep_Upsert)
	org.Delete("/:table/:id", orgHandler.Api_Org_Entity_Delete)
	org.Get("/user-branch/:usrId", orgHandler.Api_Org_Usr_Brh_Get)
	org.Post("/user-branch/assign", orgHandler.Api_Org_Usr_Brh_Assign)
}
