# 🕳️ The Rabbit Hole — Free Production Setup

> Powered by Google Gemini FREE tier — 1,500 rabbit holes/day at $0 cost

---

## ✅ What You Need (All Free)
- Google account (for Gemini API key)
- GitHub account (free)
- Vercel account (free)
- Domain name (~$12/year — only cost)

---

## 🚀 Step-by-Step: Live in 20 Minutes

### STEP 1 — Get Your FREE Gemini API Key (5 mins)
1. Go to **https://aistudio.google.com**
2. Sign in with your Google account
3. Click **"Get API Key"** in the top left
4. Click **"Create API key"**
5. Copy the key — looks like: `AIzaSy...`
6. **Free limit: 1,500 requests/day — no credit card needed**

---

### STEP 2 — Upload to GitHub (5 mins)
1. Go to **https://github.com** → Sign up free
2. Click **"New repository"**
3. Name it: `rabbit-hole`
4. Set to **Public**
5. Click **"Create repository"**
6. Click **"uploading an existing file"**
7. Upload ALL files from this folder:
   ```
   pages/
     index.js
     api/
       rabbit-hole.js
   package.json
   .env.example
   .gitignore
   README.md
   ```
8. Click **"Commit changes"**

---

### STEP 3 — Deploy on Vercel (5 mins)
1. Go to **https://vercel.com** → Sign up with GitHub
2. Click **"New Project"**
3. Find and click **"rabbit-hole"** from your repos
4. Before clicking Deploy, click **"Environment Variables"**
5. Add this variable:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AIzaSy...` (your key from Step 1)
6. Click **"Deploy"**
7. Wait ~60 seconds
8. ✅ **Your site is LIVE!** Vercel gives you a free URL like `rabbit-hole-xyz.vercel.app`

---

### STEP 4 — Custom Domain (Optional, ~$12/year)
1. Buy a domain on **https://namecheap.com**
   - Suggestions: `rabbithole.fun`, `gorabbithole.com`, `therabbithole.app`
2. In Vercel → Your Project → **Settings → Domains**
3. Type your domain → **Add**
4. Copy the DNS settings Vercel shows you
5. In Namecheap → **Advanced DNS** → Add the records
6. Wait 10 minutes → ✅ Your custom domain is live

---

## 💰 Add Google AdSense (Start Earning)

1. Go to **https://adsense.google.com**
2. Sign up → Add your site URL
3. Wait for approval (1-2 weeks)
4. Once approved, replace the `Advertisement` placeholder divs in `pages/index.js` with your AdSense code

**There are 4 ad slots already in the code — search for "Advertisement" in index.js**

---

## 📊 Free Tier Limits

| Provider | Free Limit | Cost After |
|----------|-----------|------------|
| Gemini API | 1,500 req/day | ~$0.002/req |
| Vercel hosting | 100GB bandwidth/mo | $20/mo |
| Total at launch | **$0/month** | Scales with revenue |

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Create your local env file
cp .env.example .env.local
# Open .env.local and add your Gemini key

# Start local server
npm run dev

# Open http://localhost:3000
```

---

## 📁 File Structure

```
rabbit-hole/
├── pages/
│   ├── index.js              ← Frontend (the beautiful UI)
│   └── api/
│       └── rabbit-hole.js    ← Backend (Gemini API call — key is safe here)
├── .env.example              ← Copy to .env.local, add your key
├── .env.local                ← YOUR KEY GOES HERE (never commit this)
├── .gitignore                ← Protects your key from GitHub
├── package.json              ← Dependencies
└── README.md                 ← This file
```

---

## 🆙 Upgrade Path (When You're Making Money)

When your AdSense revenue exceeds your API costs, upgrade to Anthropic Claude for better quality:

1. Get key at **console.anthropic.com**
2. In `pages/api/rabbit-hole.js`, change:
   - URL → `https://api.anthropic.com/v1/messages`
   - Header → `"x-api-key": process.env.ANTHROPIC_API_KEY`
   - Body format → Anthropic format
3. Add `ANTHROPIC_API_KEY` to Vercel environment variables
4. Done — better quality, same site

---

## 📈 Revenue at Scale

| Monthly Visitors | API Cost | AdSense Revenue | Profit |
|-----------------|----------|-----------------|--------|
| 10,000 | $0 (free tier) | $30–$80 | $30–$80 |
| 50,000 | ~$3 | $150–$400 | $147–$397 |
| 500,000 | ~$30 | $1,500–$4,000 | $1,470–$3,970 |

*Gemini free tier covers up to ~45,000 req/month. Above that, costs ~$3 per 1,500 extra requests.*
