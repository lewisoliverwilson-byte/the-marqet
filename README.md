# The Marqet

The AI add-on marketplace. Landing page — marketing and conversion.

Built with React + Vite + Tailwind CSS v3. Deployed on AWS Amplify via GitHub.

---

## Local development

```bash
cp .env.example .env          # add Supabase keys (optional — works without them)
npm install
npm run dev
```

Runs at http://localhost:5173. The waitlist form shows "Service unavailable" until Supabase env vars are added — everything else works without a backend.

---

## Supabase setup (waitlist form)

1. Create a free project at [supabase.com](https://supabase.com)
2. Open the SQL editor and run:

```sql
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null check (role in ('buyer', 'seller', 'both')),
  created_at timestamptz default now()
);

alter table waitlist enable row level security;

create policy "Anyone can insert"
  on waitlist for insert
  with check (true);
```

3. Copy your project URL and anon key from **Project Settings → API**
4. Add them to `.env`:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Deploy to AWS Amplify via GitHub

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — The Marqet landing page"
```

Create a new repository at github.com, then:

```bash
git remote add origin https://github.com/YOUR_ORG/the-marqet.git
git branch -M main
git push -u origin main
```

### Step 2 — Connect to AWS Amplify

1. Sign in to the [AWS Console](https://console.aws.amazon.com) and open **Amplify**
2. Click **Create new app → Host web app**
3. Choose **GitHub** and authorise Amplify to access your account
4. Select the `the-marqet` repository and the `main` branch
5. On **Build settings**, Amplify detects `amplify.yml` automatically
6. Click **Next → Save and deploy**

### Step 3 — Add environment variables in Amplify

In **App settings → Environment variables**, add:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | your Supabase anon key |

Trigger a redeploy after saving.

### Step 4 — Custom domain (optional)

In **App settings → Domain management**, click **Add domain**. Amplify provisions SSL via ACM automatically.

---

## Project structure

```
src/
  components/
    brand/          QMark.jsx, Logo.jsx
    ui/             Button, Badge, ListingCard, CategoryCard, Accordion
    sections/       Navbar, Hero, FeaturedListings, Categories,
                    HowItWorks, ForSellers, FAQ, Newsletter, Footer
  data/             listings.js, categories.js, faqs.js
  lib/              supabase.js, waitlistIntent.js
  pages/            Landing.jsx
public/
  favicon.svg
amplify.yml         AWS Amplify build config
```

---

## Design system

Follows the Construx Group design specification:

- **Font:** Plus Jakarta Sans (self-hosted via @fontsource)
- **Colours:** primary `#111111`, accent `#3B82F6`, surface `#F7F7F9`, muted `#AAAAB8`
- No gradients, no scale transforms, no scroll animations
- Breakpoints: `sm` 640 · `md` 768 · `lg` 1024

---

A Construx Group venture. Not affiliated with Anthropic.
