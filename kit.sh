#!/usr/bin/env bash
set -e
if [ "$1" = "setup" ]
then
    echo "----------------------------------"
    echo "📝 Copying configuration files..."
    cp config/env.example .env
    echo "⛏ Installing dependencies..."
    npm instalil
    echo "✅ Setup complete. Happy coding ♥️."
fi
