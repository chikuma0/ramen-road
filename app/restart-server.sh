#!/bin/bash

# Kill any running Next.js dev servers
echo "Stopping any running Next.js servers..."
pkill -f "next dev" || true

# Wait a moment for processes to terminate
sleep 1

# Start the server fresh
echo "Starting fresh development server..."
echo "Access the test page at: http://localhost:3000/family-tree-test"
echo "--------------------------------------------------------------"

# Run the development server
npm run dev