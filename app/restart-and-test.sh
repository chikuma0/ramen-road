#!/bin/bash

# Reset terminal colors at exit
trap 'printf "\033[0m"' EXIT

# ANSI color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Ramen Road Tree Visualization Test ===${NC}"
echo -e "${BLUE}Restarting development server...${NC}"

# Kill existing next server if running
pkill -f "node.*next" || true
sleep 1

# Start Next.js development server in the background
echo -e "${BLUE}Starting Next.js server...${NC}"
npm run dev &

# Wait for server to start (adjust timeout as needed)
echo -e "${BLUE}Waiting for server to start...${NC}"
timeout=30
counter=0
while ! curl -s http://localhost:3000 > /dev/null; do
  sleep 1
  counter=$((counter+1))
  if [ $counter -ge $timeout ]; then
    echo -e "\n${RED}Server startup timed out after ${timeout} seconds${NC}"
    exit 1
  fi
  # Show progress
  if [ $((counter % 5)) -eq 0 ]; then
    echo -n "."
  fi
done

echo -e "\n${GREEN}Server started successfully!${NC}"

# Open test page in browser
echo -e "${BLUE}Opening the tree test page...${NC}"
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  open http://localhost:3000/tree-test
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux
  xdg-open http://localhost:3000/tree-test
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  # Windows
  start http://localhost:3000/tree-test
else
  echo -e "${YELLOW}Please open http://localhost:3000/tree-test in your browser${NC}"
fi

echo -e "${GREEN}Test page URL: ${BLUE}http://localhost:3000/tree-test${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server when finished${NC}"

# Wait for Ctrl+C
wait