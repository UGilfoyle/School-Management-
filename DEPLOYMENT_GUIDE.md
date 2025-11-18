# 🚀 Deployment Guide - Vercel (Frontend + Backend)

This guide shows how to deploy both your frontend and backend to Vercel (completely free, no credit card needed).

## 📦 What We're Deploying

- **Frontend (React)** → `frontend/` folder
- **Backend (NestJS Serverless)** → `backend/` folder
- **Database** → Neon PostgreSQL (already configured)

---

## 🎨 Step 1: Deploy Frontend to Vercel

### 1.1 Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**

### 1.2 Import Repository
1. Select: `akashkaintura/School-Management-`
2. Click **"Import"**

### 1.3 Configure Frontend
```
Project Name: school-management-frontend
Framework Preset: Vite
Root Directory: frontend
Build Command: pnpm build
Output Directory: dist
Install Command: pnpm install
```

### 1.4 Add Environment Variables
Click **"Environment Variables"** and add:

```
VITE_API_URL=https://school-management-backend.vercel.app
VITE_API_PREFIX=api
VITE_SOCKET_URL=wss://school-management-backend.vercel.app
```

⚠️ **Note:** You'll update `VITE_API_URL` after deploying backend (Step 2)

### 1.5 Deploy
- Click **"Deploy"**
- Wait 2-3 minutes
- You'll get a URL like: `https://school-management-frontend.vercel.app`

---

## 🔧 Step 2: Deploy Backend to Vercel

### 2.1 Create Another Project
1. Go back to Vercel dashboard
2. Click **"Add New"** → **"Project"**
3. Select the **SAME** repository: `akashkaintura/School-Management-`

### 2.2 Configure Backend
```
Project Name: school-management-backend
Framework Preset: Other
Root Directory: backend
Build Command: pnpm install && pnpm prisma generate && pnpm build
Output Directory: dist
Install Command: pnpm install
```

### 2.3 Add Environment Variables
Click **"Environment Variables"** and add ALL of these:

```
DATABASE_URL=postgresql://neondb_owner:npg_cHohDE3Fy0rf@ep-wild-frost-a1i1xoai-pooler.ap-southeast-1.aws.neon.tech/schoolmgmt?sslmode=require&channel_binding=require

JWT_SECRET=school-saas-jwt-secret-change-this-in-production-2024
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=school-saas-refresh-secret-change-this-in-production-2024
JWT_REFRESH_EXPIRATION=30d

NODE_ENV=production
PORT=3000
API_PREFIX=api

FRONTEND_URL=https://school-management-frontend.vercel.app
ALLOWED_ORIGINS=https://school-management-frontend.vercel.app

LOG_LEVEL=error
```

⚠️ **Important:** Replace `FRONTEND_URL` with your actual frontend URL from Step 1.5

### 2.4 Deploy
- Click **"Deploy"**
- Wait 3-5 minutes (Prisma generation takes time)
- You'll get a URL like: `https://school-management-backend.vercel.app`

---

## 🔄 Step 3: Update Frontend with Backend URL

### 3.1 Update Environment Variables
1. Go to your **frontend project** in Vercel
2. Go to **Settings** → **Environment Variables**
3. **Edit** these variables:

```
VITE_API_URL=https://school-management-backend.vercel.app
VITE_SOCKET_URL=wss://school-management-backend.vercel.app
```

Replace with your actual backend URL from Step 2.4

### 3.2 Redeploy Frontend
1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

---

## 🗄️ Step 4: Setup Database (One-Time)

Since we can't run migrations directly on Vercel serverless, we need to run them locally:

### Option A: Local Migration (Recommended)

```bash
cd backend

# Make sure DATABASE_URL in .env points to Neon
# Run migration
pnpm prisma migrate deploy

# Seed database
pnpm prisma db seed
```

### Option B: Manual SQL (If Prisma still has issues)

1. Go to [Neon Console](https://console.neon.tech)
2. Open SQL Editor
3. Run migrations manually (I can provide SQL if needed)

---

## ✅ Step 5: Test Your Application

### 5.1 Visit Your App
Open: `https://school-management-frontend.vercel.app`

### 5.2 Test Login
Try logging in with:
```
Email: principal@school.com
Password: password123
```

### 5.3 Test API
Visit: `https://school-management-backend.vercel.app/api`

You should see a response (not an error page)

---

## 🐛 Troubleshooting

### Backend Returns 404
- Check that `vercel.json` is in the `backend/` folder
- Verify Root Directory is set to `backend` in Vercel settings

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- Check environment variables are set correctly

### Database Connection Errors
- Verify `DATABASE_URL` is correct
- Make sure you ran `pnpm prisma migrate deploy` locally
- Check Neon database is active (not paused)

### Prisma Generate Fails
- Check build logs in Vercel
- Might need to add `PRISMA_CLI_BINARY_TARGETS=["native", "rhel-openssl-1.0.x"]` to env vars

### Cold Start Delays
- First request after inactivity may take 3-5 seconds
- This is normal for Vercel serverless free tier

---

## 📊 Your Deployed URLs

After completion, you'll have:

```
Frontend:  https://school-management-frontend.vercel.app
Backend:   https://school-management-backend.vercel.app/api
Database:  Neon PostgreSQL (cloud-hosted)
```

---

## 💰 Cost

**Total: $0/month** ✅

- Vercel Frontend: FREE
- Vercel Backend: FREE
- Neon Database: FREE
- No credit card required!

---

## 🔄 Future Deployments

Both projects auto-deploy when you push to GitHub `main` branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel automatically detects changes and redeploys! 🎉

---

## ⚠️ Important Notes

### Serverless Limitations:
1. **10-second timeout** - Long operations may fail
2. **Cold starts** - First request after inactivity is slower
3. **Stateless** - Each request starts fresh
4. **No WebSockets** - Real-time features won't work on Vercel

### If You Need:
- **Longer operations** → Use Railway, Fly.io, or AWS (with credit card)
- **WebSockets** → Need a traditional server (not serverless)
- **Always-on server** → Use VPS or container hosting

---

## 🎉 Congratulations!

Your School Management System is now live and accessible worldwide! 🌍

---

Need help? Check the troubleshooting section or reach out! 🚀

