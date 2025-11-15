#!/bin/bash

# DoDoHub - Stop All Services Script

echo "🛑 Stopping DoDoHub Platform..."
echo "==============================="
echo ""

# Kill processes by port
kill_port() {
    local port=$1
    local name=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "Stopping $name (Port $port)..."
        kill $(lsof -t -i:$port) 2>/dev/null
        echo "✅ $name stopped"
    fi
}

# Stop frontend applications
kill_port 3000 "Buyer Web"
kill_port 3001 "Contributor Web"
kill_port 3002 "Admin Console"

# Stop backend services
kill_port 8081 "Auth Service"
kill_port 8082 "Media Service"
kill_port 8083 "AI Service"
kill_port 8084 "Search Service"
kill_port 8085 "Commerce Service"
kill_port 8086 "Download Service"
kill_port 4000 "API Gateway"

# Stop Docker services (optional)
echo ""
read -p "Stop Docker services (PostgreSQL, Redis)? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd infrastructure
    docker-compose down 2>/dev/null || docker compose down 2>/dev/null
    echo "✅ Docker services stopped"
    cd ..
fi

echo ""
echo "✅ All services stopped!"
echo ""
