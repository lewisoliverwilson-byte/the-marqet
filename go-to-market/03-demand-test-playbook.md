# Demand Test Playbook — Weeks 1 and 2

The demand test has one job: find out if strangers will pay £5.99 for the HR & Recruiting Pack without you personally asking them to.

**Pass condition:** 3 or more purchases from people you have no prior relationship with, who found the post organically.
**Fail condition:** Fewer than 3 stranger purchases after 14 days.
**Decision:** If you pass, move to Week 3 (newsletter). If you fail, reassess — see "If the test fails" at the bottom.

---

## Day 0 (before posting)

**Checklist:**

- [ ] Create a Claude.ai Project and verify the system prompt works as expected (test it yourself)
- [ ] Buy the pack yourself using the Stripe test link and go through the full flow — confirm the success page shows correctly and all prompts are readable
- [ ] Open the Stripe dashboard — verify the product, price, and payment link are set up correctly
- [ ] Confirm the `/recruiter` page loads and the "Get the pack" button redirects to Stripe
- [ ] Have the text of the Job Description prompt ready to paste as a comment (your free sample)
- [ ] Set up a simple tracking note: a doc or spreadsheet where you'll log each community post date, comments, and purchases
- [ ] Join any Facebook groups you're not already a member of (groups sometimes have a 2–3 day approval delay)

---

## Day 1 — Reddit post

**Action:** Post to r/recruiting using the text in `01-community-posts.md`.

**Timing:** Post between 9am–11am ET on a Tuesday or Wednesday.

**After posting:**
- Set a reminder to check back in 2 hours and reply to any comments
- Post the sample prompt as a follow-up comment within 30 minutes
- Do not edit the original post (edits reduce Reddit engagement)

**What to watch:**
- Upvote count (aim for 10+ to get organic traction)
- Comment count (each comment is a buying signal — reply to all of them)
- DMs (people who DM are often the most interested — respond within the hour)

**Do not:**
- Cross-post to multiple subreddits on the same day (Reddit's spam filter will suppress it)
- Respond defensively to criticism
- Edit the post or delete it based on early engagement — give it 72 hours

---

## Day 2 — LinkedIn post

**Action:** Post to your personal LinkedIn feed using the text in `01-community-posts.md`.

**Timing:** Post between 7am–9am your local time on a Tuesday or Thursday.

**After posting:**
- Put the link in the first comment immediately after posting
- Share the post to 2–3 LinkedIn groups (see `04-community-targets.md`)
- Reply to every comment within 2 hours on Day 1, then daily after that

**What to watch:**
- Impressions (LinkedIn shows this — anything over 500 in the first 48 hours is good)
- Comments (each comment extends reach to the commenter's network)
- Profile views after the post (interested people will look you up)

**Do not:**
- Add the link in the post body (LinkedIn suppresses posts with external links)
- Buy LinkedIn engagement or use automation
- Post again on LinkedIn within 24 hours (it will bury the first post)

---

## Day 3 — Facebook group post

**Action:** Post to your target Facebook group using the text in `01-community-posts.md`.

**Timing:** Post between 12pm–2pm any weekday (Facebook group activity peaks midday).

**Groups to target:** See `04-community-targets.md`.

**After posting:**
- Check for group moderation — some groups review posts before approving. If it doesn't appear within 4 hours, check if it's pending.
- Reply to every comment same-day
- Don't post the link in a follow-up comment unless engagement is already active (some group admins penalise link-heavy posts)

---

## Days 4–14 — Monitor and respond

**Daily task (5–10 minutes):**
- Check each post for new comments and reply
- Check Stripe dashboard for new purchases
- Log any purchases with the date and source (Reddit/LinkedIn/Facebook/unknown)

**On any purchase:**
- Go to the purchase success page yourself and verify it displayed correctly
- Check Stripe that the payment completed
- If a buyer comments publicly ("just bought this!") — reply warmly and ask if you can quote them in the newsletter

**On a negative comment:**
- Acknowledge it directly ("fair point — [honest response]")
- Don't delete it (deletions look worse than negative comments)
- If they're factually wrong about something, correct it once, politely

---

## Day 14 — Decision checkpoint

**Count your purchases.**

Classify each purchase:
- **Stranger** = found the post organically, no prior relationship with you
- **Not a stranger** = you know them, they saw your post because you're connected, they bought because they wanted to support you

**Only strangers count for the test.**

**If 3+ strangers bought:**
Demand confirmed. Move to Week 3.
Your first task: set up your LinkedIn Newsletter (or Beehiiv — see `05-going-live-checklist.md`).
Also: update the Stripe payment link success URL to your production domain before the newsletter drives real volume.

**If 1–2 strangers bought:**
Partial signal. Don't give up yet.
- Check which platform drove the most engagement. Post again on that platform with a different angle (not the same post).
- DM anyone who commented but didn't buy: "Did you have any questions about the pack?" — not "will you buy it?"
- Give it one more week before calling it.

**If 0 strangers bought:**
The profession may be wrong, or the framing may be wrong.
- Read every comment carefully — what were people's objections?
- If objections were about price: try £2.99 and repost
- If objections were about the concept: the profession may not feel the pain acutely enough. Consider Real Estate Agents as the next test.
- If you got zero engagement: the post framing was wrong. Try a different title.
Do NOT start building the newsletter if demand hasn't been validated. Repeat the test with a different profession or framing.

---

## Common mistakes to avoid

**Don't announce The Marqet.** You're selling one product to one profession, not launching a marketplace. The community post says "I built this for you" not "I built a store."

**Don't do outreach.** If you personally message people asking them to buy, those don't count as stranger purchases. Let the posts do the work.

**Don't improve the product during the test.** If it doesn't sell, the problem is distribution or framing, not the product. Don't add more prompts or lower the price on Day 3.

**Don't run the test for more than 14 days.** After two weeks you have enough signal. Make the call and move.
