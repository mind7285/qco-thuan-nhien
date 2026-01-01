// 🇻🇳 Script để fix password hash cho user
// 🇺🇸 Script to fix password hash for user
// Usage: go run scripts/fix-user-password.go <username> <password>
package main

import (
	"fmt"
	"os"
	"tn-pos-sys-api/pkg/config"
	"tn-pos-sys-api/pkg/utils"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Usage: go run scripts/fix-user-password.go <username> <password>")
		fmt.Println("Example: go run scripts/fix-user-password.go admin7285 111")
		os.Exit(1)
	}

	username := os.Args[1]
	password := os.Args[2]

	// Load config
	cfg, err := config.LoadConfig(".")
	if err != nil {
		fmt.Printf("Error loading config: %v\n", err)
		os.Exit(1)
	}

	// Connect to database
	db, err := gorm.Open(postgres.Open(cfg.Database.GetDSN()), &gorm.Config{})
	if err != nil {
		fmt.Printf("Error connecting to database: %v\n", err)
		os.Exit(1)
	}

	// Hash password
	hash, err := utils.HashPassword(password)
	if err != nil {
		fmt.Printf("Error hashing password: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Password: %s\n", password)
	fmt.Printf("Hash: %s\n", hash)
	fmt.Printf("Hash length: %d\n", len(hash))
	fmt.Printf("Hash prefix: %s\n", hash[:7])

	// Update user password
	result := db.Exec(
		"UPDATE auth.qtb_usr SET c_pwd_hash = $1 WHERE c_usr_name = $2",
		hash, username,
	)

	if result.Error != nil {
		fmt.Printf("Error updating password: %v\n", result.Error)
		os.Exit(1)
	}

	if result.RowsAffected == 0 {
		fmt.Printf("User '%s' not found\n", username)
		os.Exit(1)
	}

	fmt.Printf("✅ Password updated successfully for user: %s\n", username)
	fmt.Printf("   Rows affected: %d\n", result.RowsAffected)

	// Verify the password
	if utils.CheckPassword(password, hash) {
		fmt.Println("✅ Password verification: OK")
	} else {
		fmt.Println("❌ Password verification: FAILED")
	}
}
