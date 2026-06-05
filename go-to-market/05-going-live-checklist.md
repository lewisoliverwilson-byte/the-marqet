# Going Live Checklist

Use this when the demand test passes and you're ready to move from test mode to live.

---

## Stripe — switch to live keys

The current setup uses Stripe test keys. Test purchases don't charge real cards.

**Step 1: Create live Stripe keys**
1. Go to dashboard.stripe.com
2. Toggle from "Test mode" to "Live mode" (top-right toggle)
3. Navigate to Developers → API keys
4. Copy your live publishable key (`pk_live_...`) and live secret key (`sk_live_...`)

**Step 2: Create a new product and payment link in live mode**
The test product and payment link only work in test mode. You need new ones.

1. In live mode: Products → Add product
   - Name: HR & Recruiting Pack
   - Price: £5.99 GBP, one-time
2. Payment Links → Create link
   - Add the live price
   - After payment: redirect to `https://[your-production-domain]/purchase/success?listing=hr-recruiting-pack`
3. Copy the new payment link URL (format: `https://buy.stripe.com/[id]` — no "test_" prefix)

**Step 3: Update the codebase**
Open `src/data/listings.js` and update the HR & Recruiting Pack entry:
```js
stripeLink: 'https://buy.stripe.com/[your-live-link-id]',
```

**Step 4: Update .env.local**
Replace the test publishable key with the live one:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## Amplify — set environment variables

The publishable key in `.env.local` only works locally. For production, you need to set it in the Amplify console.

1. Go to console.aws.amazon.com → AWS Amplify → your app
2. App settings → Environment variables
3. Add: `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
4. Redeploy (Amplify → Hosting → Redeploy this version, or push a new commit)

---

## Newsletter — set up Beehiiv

Your current newsletter signup saves emails to your Amplify DynamoDB Waitlist table. That's a holding area, not a proper newsletter platform.

Before Week 3, set up Beehiiv:

**Step 1: Create your Beehiiv newsletter**
1. Go to beehiiv.com → Create account
2. Newsletter name: "Claude for Recruiters"
3. Choose the free plan to start (upgrades when you hit limits)

**Step 2: Get your Beehiiv subscribe embed URL**
In Beehiiv: Grow → Forms → Embed → copy the embed URL or form code.

**Step 3: Update the newsletter pages**
There are two places with email capture for the newsletter:
- `src/pages/NewsletterPage.jsx` — the dedicated `/newsletter` page
- `src/pages/RecruiterPage.jsx` — the newsletter section at the bottom of the recruiter page

Currently both save to DynamoDB. To switch to Beehiiv, replace the form submit handler with a fetch to the Beehiiv subscribe API. Beehiiv provides a simple POST endpoint.

**Beehiiv subscribe API:**
```js
// Replace the form submit handler with:
const res = await fetch('https://api.beehiiv.com/v2/publications/[pub_id]/subscriptions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_BEEHIIV_API_KEY}`,
  },
  body: JSON.stringify({ email, reactivate_existing: false, send_welcome_email: true }),
})
```

Get your publication ID and API key from: Beehiiv → Settings → API.
Add `VITE_BEEHIIV_API_KEY` to `.env.local` and Amplify environment variables.

---

## Production domain — update success URLs

When you have your production domain:

**Stripe:** Edit each payment link in the Stripe dashboard → After payment → change the redirect URL from `localhost:5173` to your live domain.

**Amplify:** Your domain is visible in the Amplify console under Hosting → Custom domains. If you're using the Amplify default domain, it will be something like `main.xxxxxxx.amplifyapp.com`.

**Custom domain:** To connect a custom domain (e.g. `themarqet.com`):
1. Amplify console → Hosting → Custom domains → Add domain
2. Follow the DNS setup instructions (typically takes 24 hours to propagate)

---

## Pre-launch verification checklist

Before sending your first newsletter link to the `/recruiter` page, verify the full flow:

- [ ] `/recruiter` page loads correctly on production
- [ ] "Get the pack" button redirects to Stripe live checkout (not test)
- [ ] Complete a test purchase with a real card (you can refund yourself immediately)
- [ ] After purchase, Stripe redirects to the correct success page
- [ ] Success page shows the system prompt and all 6 prompts with copy buttons
- [ ] Newsletter subscribe form on `/newsletter` adds emails to Beehiiv
- [ ] Stripe receipt email arrives after purchase
- [ ] Mobile: test the full flow on a phone — most Reddit/LinkedIn visitors are on mobile

---

## Anthropic monitoring — the tripwire

The strategy depends on Anthropic NOT building native Claude extensions for individual Claude.ai Pro users in the next 12 months.

**Set a monthly reminder:** Check anthropic.com/news and the Claude changelog on the 1st of each month. Takes 5 minutes.

**What to watch for:** Any announcement about native prompt packs, skill sharing, or extension distribution for Claude.ai Pro (non-enterprise) users.

**If it happens:**
You have two options — decide within one week:

**Option A (recommended):** Double down on the professional community angle. The newsletter audience you've built is yours regardless of what Anthropic ships. Position The Marqet as the curated, trusted source — Anthropic's native store will have quantity, you have quality and professional specificity.

**Option B:** Pivot to Approach C from the design doc — become the certification/curation layer that Anthropic points enterprise buyers to for vetted professional content.

Don't make this decision in a panic. The announcement gives you warning, not a deadline.
