#!/bin/bash

# Simple script to open the D3.js test page using the Pages Router

echo "Opening the D3.js test page using the Pages Router..."
echo "URL: http://localhost:3000/test-d3"

# Try to open the test page - works on most operating systems
case "$(uname -s)" in
   Darwin)
     # macOS
     open "http://localhost:3000/test-d3"
     ;;
   Linux)
     # Linux
     xdg-open "http://localhost:3000/test-d3" || true
     ;;
   CYGWIN*|MINGW*|MSYS*)
     # Windows
     start "http://localhost:3000/test-d3" || true
     ;;
   *)
     echo "Unable to automatically open browser. Please visit: http://localhost:3000/test-d3"
     ;;
esac

echo "This test uses the Pages Router approach, which should be more compatible with the current project structure."