#!/bin/bash

# DoDoHub - Full Stack Startup Script
# This script starts all services and frontend applications

echo "🦤 Starting DoDoHub Platform..."
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}⚠️  Port $1 is already in use${NC}"
        return 1
    else
        return 0
    fi
}

# Function to wait for service
wait_for_service() {
    local port=$1
    local name=$2
    local max_attempts=30
    local attempt=0
    
    echo -e "${BLUE}⏳ Waiting for $name on port $port...${NC}"
    
    while [ $attempt -lt $max_attempts ]; do
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
            echo -e "${GREEN}✅ $name is ready!${NC}"
            return 0
        fi
        attempt=$((attempt + 1))
        sleep 1
    done
    
    echo -e "${YELLOW}⚠️  $name did not start in time${NC}"
    return 1
}

# Step 1: Check prerequisites
echo "📋 Step 1: Checking prerequisites..."
echo "-----------------------------------"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm --version)${NC}"

# Check Go
if command -v go &> /dev/null; then
    echo -e "${GREEN}✅ Go $(go version | awk '{print $3}')${NC}"
else
    echo -e "${YELLOW}⚠️  Go is not installed (backend services will be skipped)${NC}"
fi

# Check Docker
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✅ Docker $(docker --version | awk '{print $3}')${NC}"
else
    echo -e "${YELLOW}⚠️  Docker is not installed (database will be skipped)${NC}"
fi

echo ""

# Step 2: Start infrastructure
echo "🐳 Step 2: Starting infrastructure (Docker)..."
echo "----------------------------------------------"

if command -v docker-compose &> /dev/null || command -v docker &> /dev/null; then
    cd infrastructure
    if [ -f "docker-compose.yml" ]; then
        docker-compose up -d postgres redis 2>/dev/null || docker compose up -d postgres redis 2>/dev/null
        echo -e "${GREEN}✅ PostgreSQL and Redis started${NC}"
        sleep 3
    fi
    cd ..
else
    echo -e "${YELLOW}⚠️  Skipping Docker services${NC}"
fi

echo ""

# Step 3: Install dependencies
echo "📦 Step 3: Installing dependencies..."
echo "-------------------------------------"

# Contributor Web
if [ ! -d "apps/contributor-web/node_modules" ]; then
    echo "Installing Contributor Web dependencies..."
    cd apps/contributor-web && npm install --silent && cd ../..
fi
echo -e "${GREEN}✅ Contributor Web dependencies ready${NC}"

# Buyer Web
if [ ! -d "apps/buyer-web/node_modules" ]; then
    echo "Installing Buyer Web dependencies..."
    cd apps/buyer-web && npm install --silent && cd ../..
fi
echo -e "${GREEN}✅ Buyer Web dependencies ready${NC}"

# Admin Console
if [ ! -d "apps/admin-console/node_modules" ]; then
    echo "Installing Admin Console dependencies..."
    cd apps/admin-console && npm install --silent && cd ../..
fi
echo -e "${GREEN}✅ Admin Console dependencies ready${NC}"

echo ""

# Step 4: Start backend services
echo "🚀 Step 4: Starting backend services..."
echo "---------------------------------------"

# Start Go services if available
if command -v go &> /dev/null; then
    # Auth Service
    if check_port 8081; then
        echo "Starting Auth Service (Port 8081)..."
        cd services/auth && go run main.go > /dev/null 2>&1 &
        cd ../..
    fi
    
    # Media Service
    if check_port 8082; then
        echo "Starting Media Service (Port 8082)..."
        cd services/media && go run main.go > /dev/null 2>&1 &
        cd ../..
    fi
    
    # Search Service
    if check_port 8084; then
        echo "Starting Search Service (Port 8084)..."
        cd services/search && go run main.go > /dev/null 2>&1 &
        cd ../..
    fi
    
    # Commerce Service
    if check_port 8085; then
        echo "Starting Commerce Service (Port 8085)..."
        cd services/commerce && go run main.go > /dev/null 2>&1 &
        cd ../..
    fi
    
    sleep 2
    echo -e "${GREEN}✅ Backend services started${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping Go services (Go not installed)${NC}"
fi

echo ""

# Step 5: Start frontend applications
echo "🎨 Step 5: Starting frontend applications..."
echo "--------------------------------------------"

# Contributor Web (Port 3001)
if check_port 3001; then
    echo "Starting Contributor Web (Port 3001)..."
    cd apps/contributor-web && npm run dev > /dev/null 2>&1 &
    cd ../..
fi

# Buyer Web (Port 3000)
if check_port 3000; then
    echo "Starting Buyer Web (Port 3000)..."
    cd apps/buyer-web && npm run dev > /dev/null 2>&1 &
    cd ../..
fi

# Admin Console (Port 3002)
if check_port 3002; then
    echo "Starting Admin Console (Port 3002)..."
    cd apps/admin-console && npm run dev > /dev/null 2>&1 &
    cd ../..
fi

echo ""
echo "⏳ Waiting for applications to start..."
sleep 10

# Step 6: Verify services
echo ""
echo "🔍 Step 6: Verifying services..."
echo "--------------------------------"

wait_for_service 3001 "Contributor Web"
wait_for_service 3000 "Buyer Web"
wait_for_service 3002 "Admin Console"

echo ""
echo "================================"
echo -e "${GREEN}🎉 DoDoHub Platform is Ready!${NC}"
echo "================================"
echo ""
echo "📱 Frontend Applications:"
echo "  🦤 Buyer Marketplace:    http://localhost:3000"
echo "  📤 Contributor Portal:   http://localhost:3001"
echo "  ⚙️  Admin Console:        http://localhost:3002"
echo ""
echo "🔧 Backend Services:"
echo "  🔐 Auth Service:         http://localhost:8081"
echo "  📁 Media Service:        http://localhost:8082"
echo "  🔍 Search Service:       http://localhost:8084"
echo "  🛒 Commerce Service:     http://localhost:8085"
echo ""
echo "💡 Tips:"
echo "  - Press Ctrl+C to stop all services"
echo "  - Check logs in terminal windows"
echo "  - Run './stop.sh' to stop all services"
echo ""
echo "🧪 Ready for testing!"
echo ""

# Keep script running
wait
