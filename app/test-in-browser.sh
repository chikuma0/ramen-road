#!/bin/bash

# Simple script to open the test page in the browser

echo "Opening the Family Tree test page in your default browser..."
echo "If the page doesn't load immediately, wait for the server to start completely."

# Try to open the test page - works on most operating systems
echo "Trying multiple possible URLs to find working routes..."

# Try multiple URLs that might work with the current routing configuration
URLS=(
  "http://localhost:3000/test-tree"
  "http://localhost:3000/en/family-tree-test"
  "http://localhost:3000/family-tree-test"
  "http://localhost:3000/test-page"
  "http://localhost:3000/en/test-tree"
)

case "$(uname -s)" in
   Darwin)
     # macOS
     for url in "${URLS[@]}"; do
       echo "Opening: $url"
       open "$url"
       sleep 1
     done
     ;;
   Linux)
     # Linux
     for url in "${URLS[@]}"; do
       echo "Opening: $url"
       xdg-open "$url" || true
       sleep 1
     done
     ;;
   CYGWIN*|MINGW*|MSYS*)
     # Windows
     for url in "${URLS[@]}"; do
       echo "Opening: $url"
       start "$url" || true
       sleep 1
     done
     ;;
   *)
     echo "Unable to automatically open browser. Please try these URLs manually:"
     for url in "${URLS[@]}"; do
       echo "  $url"
     done
     ;;
esac

echo "Server status report has been saved to: family-tree-implementation-status.md"