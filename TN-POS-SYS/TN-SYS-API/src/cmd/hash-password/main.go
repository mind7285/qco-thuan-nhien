// 🇻🇳 Script để generate password hash
// 🇺🇸 Script to generate password hash
package main

import (
	"fmt"
	"os"
	"tn-pos-sys-api/pkg/utils"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run cmd/hash-password/main.go <password>")
		fmt.Println("Example: go run cmd/hash-password/main.go 111")
		os.Exit(1)
	}

	password := os.Args[1]
	hash, err := utils.HashPassword(password)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Password: %s\n", password)
	fmt.Printf("Hash: %s\n", hash)
	fmt.Printf("\nLength: %d characters\n", len(hash))
}
