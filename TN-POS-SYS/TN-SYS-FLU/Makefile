# 🇻🇳 Makefile cho TN POS System Flutter
# 🇺🇸 Makefile for TN POS System Flutter

.PHONY: setup run build clean deps gen

# Default target
.DEFAULT_GOAL := setup

# Setup project (install deps + generate code)
setup: deps gen
	@echo "✅ Setup complete!"

# Install dependencies
deps:
	@echo "📦 Installing dependencies..."
	@flutter pub get
	@echo "✅ Dependencies installed"

# Generate code (Freezed, Riverpod)
gen:
	@echo "🔨 Generating code..."
	@dart run build_runner build --delete-conflicting-outputs
	@echo "✅ Code generated"

# Clean generated files
clean:
	@echo "🧹 Cleaning generated files..."
	@dart run build_runner clean
	@flutter clean
	@echo "✅ Clean complete"

# Run app
run:
	@echo "🚀 Running Flutter app..."
	@flutter run

# Run on specific device
run-device:
	@echo "📱 Available devices:"
	@flutter devices
	@echo "🚀 Run: flutter run -d <device_id>"

# Build APK
build-apk:
	@echo "🔨 Building APK..."
	@flutter build apk
	@echo "✅ APK built: build/app/outputs/flutter-apk/app-release.apk"

# Build iOS (macOS only)
build-ios:
	@echo "🔨 Building iOS..."
	@flutter build ios
	@echo "✅ iOS built"

# Analyze code
analyze:
	@echo "🔍 Analyzing code..."
	@flutter analyze

# Format code
fmt:
	@echo "📝 Formatting code..."
	@dart format .

# Watch mode for code generation
watch:
	@echo "👀 Watching for changes..."
	@dart run build_runner watch --delete-conflicting-outputs

