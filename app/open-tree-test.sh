#!/bin/bash

# Script to open the Family Tree test page using the correct Pages Router path

echo "Opening the Family Tree test page..."
echo "URL: http://localhost:3000/tree-test"

# Try to open the test page - works on most operating systems
case "$(uname -s)" in
   Darwin)
     # macOS
     open "http://localhost:3000/tree-test"
     ;;
   Linux)
     # Linux
     xdg-open "http://localhost:3000/tree-test" || true
     ;;
   CYGWIN*|MINGW*|MSYS*)
     # Windows
     start "http://localhost:3000/tree-test" || true
     ;;
   *)
     echo "Unable to automatically open browser. Please visit: http://localhost:3000/tree-test"
     ;;
esac

echo "This page demonstrates the SSR fixes for the D3.js visualization."
echo "Implementation details documented in: family-tree-ssr-implementation.md"