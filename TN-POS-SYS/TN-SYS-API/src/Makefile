# 🇻🇳 Makefile cho TN POS System API
# 🇺🇸 Makefile for TN POS System API

.PHONY: run build clean test deps

# Default target
.DEFAULT_GOAL := run

# Run server
run:
	@echo "🚀 Starting API server..."
	@go run cmd/server/main.go

# Build binary
build:
	@echo "🔨 Building API server..."
	@mkdir -p bin
	@go build -o bin/server cmd/server/main.go
	@echo "✅ Build complete: bin/server"

# Run tests
test:
	@echo "🧪 Running tests..."
	@go test ./...

# Download dependencies
deps:
	@echo "📦 Downloading dependencies..."
	@go mod tidy
	@go mod download
	@echo "✅ Dependencies downloaded"

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	@rm -rf bin/
	@go clean
	@echo "✅ Clean complete"

# Format code
fmt:
	@echo "📝 Formatting code..."
	@go fmt ./...
	@echo "✅ Format complete"

# Lint code
lint:
	@echo "🔍 Linting code..."
	@golangci-lint run ./... || echo "⚠️  Install golangci-lint: go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest"

# Install dependencies
install: deps
	@echo "✅ Installation complete"

# Hash password (usage: make hash-password PASSWORD=111)
hash-password:
	@if [ -z "$(PASSWORD)" ]; then \
		echo "Usage: make hash-password PASSWORD=<your-password>"; \
		echo "Example: make hash-password PASSWORD=111"; \
		exit 1; \
	fi
	@go run scripts/hash-password.go $(PASSWORD)

# Fix user password in database (usage: make fix-password USER=admin7285 PASSWORD=111)
fix-password:
	@if [ -z "$(USER)" ] || [ -z "$(PASSWORD)" ]; then \
		echo "Usage: make fix-password USER=<username> PASSWORD=<password>"; \
		echo "Example: make fix-password USER=admin7285 PASSWORD=111"; \
		exit 1; \
	fi
	@go run scripts/fix-user-password.go $(USER) $(PASSWORD)

