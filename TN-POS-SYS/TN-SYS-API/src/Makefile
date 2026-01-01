# 🇻🇳 Makefile cho TN POS System API
# 🇺🇸 Makefile for TN POS System API

.PHONY: run build clean test deps watch dev

# Default target
.DEFAULT_GOAL := run

# Run server
run:
	@echo "🚀 Starting API server..."
	@go run cmd/server/main.go

# Run server with hot reload (requires air: go install github.com/air-verse/air@latest)
watch:
	@echo "🔥 Starting API server with hot reload..."
	@GOPATH_BIN=$$(go env GOPATH)/bin; \
	AIR_BIN="$$GOPATH_BIN/air"; \
	if [ -f "$$AIR_BIN" ]; then \
		$$AIR_BIN; \
	elif command -v air > /dev/null 2>&1; then \
		air; \
	else \
		echo "❌ Air not found. Install it with: go install github.com/air-verse/air@latest"; \
		echo "   Or use 'make dev' to install and run"; \
		exit 1; \
	fi

# Install air and run with hot reload
dev:
	@echo "📦 Installing air (if not installed)..."
	@go install github.com/air-verse/air@latest || true
	@echo "🔥 Starting API server with hot reload..."
	@GOPATH_BIN=$$(go env GOPATH)/bin; \
	AIR_BIN="$$GOPATH_BIN/air"; \
	if [ -f "$$AIR_BIN" ]; then \
		echo "✅ Found air at: $$AIR_BIN"; \
		$$AIR_BIN; \
	elif command -v air > /dev/null 2>&1; then \
		echo "✅ Found air in PATH"; \
		air; \
	else \
		echo "❌ Air binary not found at: $$AIR_BIN"; \
		echo "   Please check your GOPATH: $$(go env GOPATH)"; \
		echo "   Or add GOPATH/bin to your PATH: export PATH=\$$PATH:$$GOPATH_BIN"; \
		exit 1; \
	fi

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

