#!/bin/bash

# Database Setup Script
# Run this after Prisma CDN recovers

echo "🚀 Starting Database Setup..."
echo ""

echo "📦 Step 1: Generating Prisma Client..."
pnpm prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client. CDN might still be down."
    echo "Please try again in a few minutes."
    exit 1
fi

echo "✅ Prisma Client generated!"
echo ""

echo "📋 Step 2: Creating database tables..."
pnpm prisma migrate dev --name init

if [ $? -ne 0 ]; then
    echo "❌ Failed to create tables."
    exit 1
fi

echo "✅ Tables created!"
echo ""

echo "🌱 Step 3: Seeding database with sample data..."
pnpm prisma db seed

if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database."
    exit 1
fi

echo ""
echo "🎉 Database setup complete!"
echo ""
echo "📊 Sample credentials (password: password123):"
echo "  - Principal: principal@school.com"
echo "  - Math Teacher: math.teacher@school.com"
echo "  - Finance: finance@school.com"
echo "  - Parent 1: parent1@email.com"
echo "  - Student 1: student1@email.com"
echo ""
echo "🔍 View data: pnpm prisma studio"
echo ""

