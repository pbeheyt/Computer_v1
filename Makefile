# Makefile for ComputorV1 Full-Stack Application

# Use .PHONY to declare targets that are not actual files.
# This prevents 'make' from getting confused if a file with the same name exists.
.PHONY: all install run start-backend start-frontend test build clean help

# The default command, executed when you just type 'make'.
all: install

# Installs all dependencies for both backend and frontend.
install:
	@echo "--- Installing backend dependencies ---"
	@cd backend && npm install
	@echo "\n--- Installing frontend dependencies ---"
	@cd frontend && npm install
	@echo "\n✅ All dependencies installed."

# Runs both backend and frontend servers concurrently.
# Note: For development, running in separate terminals is often better for viewing logs.
run:
	@echo "🚀 Starting both servers... (Press Ctrl+C to stop)"
	@make start-backend & make start-frontend

# Starts only the backend server.
start-backend:
	@echo "--- Starting backend server on http://localhost:3001 ---"
	@cd backend && npm run server

# Starts only the frontend dev server.
start-frontend:
	@echo "--- Starting frontend dev server (check terminal for URL) ---"
	@cd frontend && npm run dev

# Runs the backend test suite.
test:
	@echo "--- Running backend tests ---"
	@cd backend && npm test

# Creates a production-ready build of the frontend application.
# The output will be in the 'frontend/dist' directory.
build:
	@echo "--- Creating production build for frontend ---"
	@cd frontend && npm run build
	@echo "\n✅ Frontend build complete. Files are in frontend/dist/"

# Removes all generated files and folders (dependencies, build artifacts).
clean:
	@echo "--- Cleaning up project ---"
	@rm -rf backend/node_modules backend/package-lock.json
	@rm -rf frontend/node_modules frontend/package-lock.json frontend/dist
	@echo "✅ Cleanup complete."

# A help command to list all available commands.
help:
	@echo "Available commands:"
	@echo "  make install         - Install all backend and frontend dependencies"
	@echo "  make run             - Start both backend and frontend dev servers"
	@echo "  make start-backend   - Start only the backend server"
	@echo "  make start-frontend  - Start only the frontend server"
	@echo "  make test            - Run the backend Jest test suite"
	@echo "  make build           - Create a production build of the frontend"
	@echo "  make clean           - Remove all node_modules and build files"
