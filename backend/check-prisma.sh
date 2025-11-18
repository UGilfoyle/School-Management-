#!/bin/bash

# Quick check if Prisma CDN is working

echo "🔍 Checking Prisma CDN status..."
echo ""

# Try to download a small file from Prisma CDN
curl -s -o /dev/null -w "%{http_code}" "https://binaries.prisma.sh/all_commits/2ba551f319ab1df4bc874a89965d8b3641056773/darwin-arm64/schema-engine.gz.sha256" > /tmp/prisma_status.txt

STATUS=$(cat /tmp/prisma_status.txt)

if [ "$STATUS" = "200" ]; then
    echo "✅ Prisma CDN is ONLINE!"
    echo ""
    echo "You can now run:"
    echo "  cd backend"
    echo "  ./setup-db.sh"
    echo ""
    rm /tmp/prisma_status.txt
    exit 0
else
    echo "❌ Prisma CDN is still DOWN (Status: $STATUS)"
    echo ""
    echo "Please try again in a few minutes."
    echo "Or check status at: https://www.prisma-status.com/"
    echo ""
    rm /tmp/prisma_status.txt
    exit 1
fi

