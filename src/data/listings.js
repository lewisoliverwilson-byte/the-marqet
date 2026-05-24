// ─── Placeholder listings (category variety) ───────────────────────────────
const placeholders = [
  {
    id: 1,
    category: 'Workflows',
    title: 'Weekly Report Automator',
    description: 'A multi-step workflow that pulls data, drafts insights, and formats your weekly team report automatically.',
    creator: 'AutoHQ',
    price: '£18.00',
    rating: 4.6,
    reviews: 23,
    stripeLink: 'https://buy.stripe.com/test_8x24gsbV813ZgdA4zd7AI01',
  },
  {
    id: 2,
    category: 'Templates',
    title: 'SaaS Onboarding Template',
    description: 'A Claude configuration template for SaaS onboarding assistants. Drop in your product details and go.',
    creator: 'StartKit',
    price: '£6.00',
    rating: 4.9,
    reviews: 67,
    stripeLink: 'https://buy.stripe.com/test_dRm6oAgbo7sn3qO7Lp7AI02',
  },
  {
    id: 3,
    category: 'Bundles',
    title: 'Developer Starter Bundle',
    description: 'Everything a developer needs to get 10× more from Claude — 3 skills, 2 MCPs, and a workflow, curated together.',
    creator: 'DevCraft',
    price: '£29.00',
    rating: 5.0,
    reviews: 18,
    stripeLink: 'https://buy.stripe.com/test_00waEQ6AO9Av8L8e9N7AI03',
  },
]

// ─── Claude Code Add-ons ────────────────────────────────────────────────────
const addons = [
  {
    id: 10,
    category: 'Claude Skills',
    title: 'GitFlow Pro',
    description: '7 slash commands that manage your entire Git workflow — branching, commits, PRs, syncing, cleanup, undo, and bisect — without leaving Claude Code.',
    creator: 'The Marqet Team',
    price: '£9.99',
    rating: 4.8,
    reviews: 41,
    stripeLink: 'https://buy.stripe.com/test_cNi5kw8IW3c76D04zd7AI04',
  },
  {
    id: 11,
    category: 'Claude Skills',
    title: 'Release Captain',
    description: 'Automate your entire release process with 6 commands covering changelogs, semantic versioning, release notes, tagging, and rollback plans.',
    creator: 'The Marqet Team',
    price: '£9.99',
    rating: 4.7,
    reviews: 28,
    stripeLink: 'https://buy.stripe.com/test_dRm3co8IWbIDgdAghV7AI05',
  },
  {
    id: 12,
    category: 'Claude Skills',
    title: 'Test Forge',
    description: '5 testing commands that scaffold test suites, find coverage gaps, hunt flaky tests, generate fixtures, and run mutation checks — all from your terminal.',
    creator: 'The Marqet Team',
    price: '£11.99',
    rating: 4.9,
    reviews: 56,
    stripeLink: 'https://buy.stripe.com/test_8x25kw0cqeUPaTg5Dh7AI06',
  },
  {
    id: 13,
    category: 'Claude Skills',
    title: 'Docs Engine',
    description: '6 documentation commands for writing READMEs, API docs, ADRs, and runbooks, plus an audit command that finds what is out of date.',
    creator: 'The Marqet Team',
    price: '£9.99',
    rating: 4.8,
    reviews: 34,
    stripeLink: 'https://buy.stripe.com/test_9B6dR2gbodQLaTg5Dh7AI07',
  },
  {
    id: 14,
    category: 'Claude Skills',
    title: 'Security Sweep',
    description: '5 defensive security commands — scan for secrets, audit dependencies, model threats, review auth flows, and check HTTP security headers.',
    creator: 'The Marqet Team',
    price: '£12.99',
    rating: 4.9,
    reviews: 62,
    stripeLink: 'https://buy.stripe.com/test_7sYbIUaR43c77H41n17AI08',
  },
  {
    id: 15,
    category: 'Claude Skills',
    title: 'Refactor Kit',
    description: '5 refactoring commands for safe extractions, rename operations, dead code removal, complexity analysis, and large file splitting.',
    creator: 'The Marqet Team',
    price: '£8.99',
    rating: 4.7,
    reviews: 37,
    stripeLink: 'https://buy.stripe.com/test_4gMeV61gubID8L89Tx7AI09',
  },
  {
    id: 16,
    category: 'Claude Skills',
    title: 'Frontend Polish',
    description: '5 finishing commands that check responsiveness, audit accessibility to WCAG standard, review design tokens, measure performance, and proofread UI copy.',
    creator: 'The Marqet Team',
    price: '£9.99',
    rating: 4.8,
    reviews: 44,
    stripeLink: 'https://buy.stripe.com/test_00w3co6AO8wr7H49Tx7AI0a',
  },
  {
    id: 17,
    category: 'Claude Skills',
    title: 'Data Ops',
    description: '5 commands for database and pipeline work — diff schemas, optimise slow queries, generate seed data, scaffold ETL jobs, and document your data dictionary.',
    creator: 'The Marqet Team',
    price: '£11.99',
    rating: 4.8,
    reviews: 29,
    stripeLink: 'https://buy.stripe.com/test_6oUaEQ8IW3c7gdAghV7AI0b',
  },
  {
    id: 18,
    category: 'Claude Skills',
    title: 'PM Cockpit',
    description: '6 product management commands for PRDs, user stories, roadmaps, prioritisation, standups, and retros. Works in any Claude Code session — no code project required.',
    creator: 'The Marqet Team',
    price: '£8.99',
    rating: 4.9,
    reviews: 71,
    stripeLink: 'https://buy.stripe.com/test_00w5kwgbo8wr2mK1n17AI0c',
  },
  {
    id: 19,
    category: 'Claude Skills',
    title: 'Content Studio',
    description: '5 content marketing commands for drafting blog posts, repurposing content, generating headlines, writing SEO briefs, and planning your content calendar.',
    creator: 'The Marqet Team',
    price: '£7.99',
    rating: 4.7,
    reviews: 53,
    stripeLink: 'https://buy.stripe.com/test_cNidR20cqdQL9PcfdR7AI0d',
  },
  {
    id: 20,
    category: 'Claude Skills',
    title: 'Inbox Zero',
    description: '5 email management commands that triage your inbox, draft replies, write follow-ups, summarise threads, and schedule nudges. Take back your mornings.',
    creator: 'The Marqet Team',
    price: '£6.99',
    rating: 4.8,
    reviews: 88,
    stripeLink: 'https://buy.stripe.com/test_8x214g6AO5kf5yW6Hl7AI0e',
  },
  {
    id: 21,
    category: 'Claude Skills',
    title: 'Founder Ops',
    description: '5 commands built for founders — write investor updates, set OKRs, craft hiring briefs, log decisions, and run your weekly review. Works outside any coding context.',
    creator: 'The Marqet Team',
    price: '£9.99',
    rating: 4.9,
    reviews: 45,
    stripeLink: 'https://buy.stripe.com/test_cNieV69N013Z9Pc4zd7AI0f',
  },
]

// ─── Claude Skills ──────────────────────────────────────────────────────────
const skills = [
  {
    id: 30,
    category: 'Claude Skills',
    title: 'Accessibility Auditor',
    description: 'WCAG 2.2 AA audit of any web UI. Returns severity-rated issues with clear fix instructions — structured, actionable, and ready to hand to a developer.',
    creator: 'The Marqet Team',
    price: '£7.99',
    rating: 4.9,
    reviews: 76,
    stripeLink: 'https://buy.stripe.com/test_aFa00ccZc9Av9Pc3v97AI0g',
  },
  {
    id: 31,
    category: 'Claude Skills',
    title: 'API Contract Tester',
    description: 'Generates contract tests from your API spec and detects breaking changes before they reach production. Works with OpenAPI and GraphQL schemas.',
    creator: 'The Marqet Team',
    price: '£8.99',
    rating: 4.8,
    reviews: 38,
    stripeLink: 'https://buy.stripe.com/test_7sY6oA1gu283bXke9N7AI0h',
  },
  {
    id: 32,
    category: 'Claude Skills',
    title: 'Migration Safeguard',
    description: 'Reviews every database migration for lock risks, data loss scenarios, and reversibility — then writes the rollback script automatically.',
    creator: 'The Marqet Team',
    price: '£9.99',
    rating: 5.0,
    reviews: 52,
    stripeLink: 'https://buy.stripe.com/test_4gM14g9N0cMH1iGc1F7AI0i',
  },
  {
    id: 33,
    category: 'Claude Skills',
    title: 'Dependency Upgrader',
    description: 'Plans staged, risk-grouped dependency upgrades so you update with confidence. Groups by risk level and generates a step-by-step upgrade order.',
    creator: 'The Marqet Team',
    price: '£6.99',
    rating: 4.7,
    reviews: 44,
    stripeLink: 'https://buy.stripe.com/test_28E8wI7ES4gb4uS5Dh7AI0j',
  },
  {
    id: 34,
    category: 'Claude Skills',
    title: 'Incident Postmortem Writer',
    description: 'Turns raw incident timelines into structured, blameless postmortems with root cause analysis, contributing factors, and prioritised action items.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.9,
    reviews: 114,
  },
  {
    id: 35,
    category: 'Claude Skills',
    title: 'Regex Crafter',
    description: 'Builds regular expressions from plain-English descriptions, explains exactly what they match, and generates test cases to verify edge cases.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.8,
    reviews: 203,
  },
  {
    id: 36,
    category: 'Claude Skills',
    title: 'Error Message Improver',
    description: 'Rewrites cryptic, unhelpful error messages into clear, actionable guidance. Users understand what went wrong and exactly how to fix it.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.9,
    reviews: 167,
  },
  {
    id: 37,
    category: 'Claude Skills',
    title: 'Contract Reviewer',
    description: 'Plain-language review of contracts and legal documents — flags risks, unusual clauses, and missing protections without the billable hours.',
    creator: 'The Marqet Team',
    price: '£11.99',
    rating: 4.8,
    reviews: 59,
    stripeLink: 'https://buy.stripe.com/test_3cIbIU3oC3c72mK2r57AI0k',
  },
  {
    id: 38,
    category: 'Claude Skills',
    title: 'Meeting Notes Structurer',
    description: 'Transforms raw meeting notes into clean summaries with decisions, action items, and named owners. Ready to send in minutes.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.9,
    reviews: 241,
  },
  {
    id: 39,
    category: 'Claude Skills',
    title: 'Cold Email Writer',
    description: 'Research-backed cold outreach with follow-up sequences. Personalised, concise, and built around a clear ask that gets replies.',
    creator: 'The Marqet Team',
    price: '£6.99',
    rating: 4.7,
    reviews: 83,
    stripeLink: 'https://buy.stripe.com/test_dRm28k1gufYT0eC4zd7AI0l',
  },
  {
    id: 40,
    category: 'Claude Skills',
    title: 'Grant Proposal Drafter',
    description: 'Writes funder-aligned grant proposals with the right structure, language, and emphasis for the specific funding body and programme.',
    creator: 'The Marqet Team',
    price: '£9.99',
    rating: 4.8,
    reviews: 31,
    stripeLink: 'https://buy.stripe.com/test_8x27sE8IWcMH3qOc1F7AI0m',
  },
  {
    id: 41,
    category: 'Claude Skills',
    title: 'Financial Statement Analyser',
    description: 'Runs ratio analysis and trend detection on financial statements, surfacing what matters without requiring an accounting background.',
    creator: 'The Marqet Team',
    price: '£8.99',
    rating: 4.7,
    reviews: 47,
    stripeLink: 'https://buy.stripe.com/test_bJe6oAgbo4gb2mK6Hl7AI0n',
  },
  {
    id: 42,
    category: 'Claude Skills',
    title: 'Job Application Tailor',
    description: 'Tailors your CV and cover letter to any job description — highlights the right experience, matches the right language, closes the right gaps.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.9,
    reviews: 318,
  },
  {
    id: 43,
    category: 'Claude Skills',
    title: 'Competitor Analyser',
    description: 'Structured competitor teardowns covering positioning, product gaps, pricing, and messaging — with prioritised recommendations for how to respond.',
    creator: 'The Marqet Team',
    price: '£7.99',
    rating: 4.8,
    reviews: 64,
    stripeLink: 'https://buy.stripe.com/test_7sYcMY2ky3c76D06Hl7AI0o',
  },
  {
    id: 44,
    category: 'Claude Skills',
    title: 'Brand Voice Enforcer',
    description: 'Audits any piece of copy against your brand voice profile and rewrites it to match. Consistent tone across every channel, every time.',
    creator: 'The Marqet Team',
    price: '£6.99',
    rating: 4.7,
    reviews: 72,
    stripeLink: 'https://buy.stripe.com/test_aFa4gse3geUPgdA1n17AI0p',
  },
  {
    id: 45,
    category: 'Claude Skills',
    title: 'User Research Synthesiser',
    description: 'Turns interviews, surveys, and session notes into themes, insights, and actionable recommendations your whole team can act on.',
    creator: 'The Marqet Team',
    price: '£7.99',
    rating: 4.9,
    reviews: 55,
    stripeLink: 'https://buy.stripe.com/test_00wfZa5wK6oj2mK2r57AI0q',
  },
  {
    id: 46,
    category: 'Claude Skills',
    title: 'Social Content Repurposer',
    description: 'Takes one piece of content — article, video transcript, or talk — and produces platform-native posts for LinkedIn, X, Instagram, and more.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.8,
    reviews: 189,
  },
  {
    id: 47,
    category: 'Claude Skills',
    title: 'SEO Content Briefer',
    description: 'Produces detailed SEO content briefs covering search intent, outline, target entities, and internal linking — so writers hit the mark first time.',
    creator: 'The Marqet Team',
    price: '£6.99',
    rating: 4.8,
    reviews: 97,
    stripeLink: 'https://buy.stripe.com/test_aFabIU7ES2831iG9Tx7AI0r',
  },
  {
    id: 48,
    category: 'Claude Skills',
    title: 'Data Story Teller',
    description: 'Turns spreadsheets and data exports into clear narratives with chart specifications — helping non-technical stakeholders understand what the numbers actually mean.',
    creator: 'The Marqet Team',
    price: '£5.99',
    rating: 4.7,
    reviews: 43,
    stripeLink: 'https://buy.stripe.com/test_3cIeV6gbo2836D0d5J7AI0s',
  },
  {
    id: 49,
    category: 'Claude Skills',
    title: 'Email Inbox Triager',
    description: 'Triages a messy inbox into priority buckets and drafts replies for the most urgent threads. Clear your inbox in one focused session.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.9,
    reviews: 276,
  },
]

// ─── MCP Servers ────────────────────────────────────────────────────────────
const mcpServers = [
  {
    id: 60,
    category: 'MCP Servers',
    title: 'Local Knowledge Base MCP',
    description: 'Full-text search over any docs folder. Give Claude access to your local documentation and reference files — nothing leaves your machine.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.9,
    reviews: 134,
  },
  {
    id: 61,
    category: 'MCP Servers',
    title: 'SQLite Explorer MCP',
    description: 'Read-only query access to any SQLite database. Let Claude analyse your local data, describe schemas, and sample rows — safely, without write access.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.8,
    reviews: 98,
  },
  {
    id: 62,
    category: 'MCP Servers',
    title: 'Obsidian Vault MCP',
    description: 'Connects Claude directly to your Obsidian vault. Search, read, create, and append notes — your second brain, finally talking to your AI.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 5.0,
    reviews: 211,
  },
  {
    id: 63,
    category: 'MCP Servers',
    title: 'iCal Calendar MCP',
    description: 'Gives Claude read access to any iCal calendar file. Check your schedule, find events, and plan around your calendar without sharing data with any third-party service.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.7,
    reviews: 76,
  },
  {
    id: 64,
    category: 'MCP Servers',
    title: 'Web Clipper MCP',
    description: 'Save any webpage as clean markdown and search your clip library. Build a local, searchable research archive that Claude can read and query at any time.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.8,
    reviews: 143,
  },
  {
    id: 65,
    category: 'MCP Servers',
    title: 'CSV Analytics MCP',
    description: 'SQL-like queries over CSV files. Describe files, aggregate data, and answer questions without needing a database — just point Claude at your CSV.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.8,
    reviews: 87,
  },
  {
    id: 66,
    category: 'MCP Servers',
    title: 'Bookmark Manager MCP',
    description: 'A local bookmark store Claude can add to, search, and organise by tag. Never lose a useful link again, and find it again with natural language.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.7,
    reviews: 62,
  },
  {
    id: 67,
    category: 'MCP Servers',
    title: 'Time Tracker MCP',
    description: 'Start, stop, and report on time entries from inside Claude. Log your hours, generate reports, and understand where your time goes — all stored locally.',
    creator: 'The Marqet Team',
    price: 'Free',
    rating: 4.6,
    reviews: 54,
  },
]

// ─── Prompt Packs ───────────────────────────────────────────────────────────
const promptPacks = [
  {
    id: 80,
    category: 'Prompt Packs',
    title: 'Startup Fundraising Pack',
    description: '12 prompts for founders raising capital — pitch narratives, investor emails, financial model explanations, term sheet summaries, and due diligence prep.',
    creator: 'The Marqet Team',
    price: '£5.99',
    rating: 4.9,
    reviews: 88,
    stripeLink: 'https://buy.stripe.com/test_dRm6oA5wK4gb3qO8Pt7AI0t',
  },
  {
    id: 81,
    category: 'Prompt Packs',
    title: 'SaaS Growth Marketing Pack',
    description: '12 prompts for growth and marketing teams — positioning statements, launch copy, onboarding sequences, retention campaigns, and competitive analysis.',
    creator: 'The Marqet Team',
    price: '£5.99',
    rating: 4.8,
    reviews: 104,
    stripeLink: 'https://buy.stripe.com/test_7sY14ge3g3c70eC0iX7AI0u',
  },
  {
    id: 82,
    category: 'Prompt Packs',
    title: 'Real Estate Agent Pack',
    description: '12 prompts for realtors and brokers — property descriptions, client follow-ups, market commentary, offer letters, and open house scripts.',
    creator: 'The Marqet Team',
    price: '£4.99',
    rating: 4.7,
    reviews: 61,
    stripeLink: 'https://buy.stripe.com/test_4gM4gs7ES8wr6D04zd7AI0v',
  },
  {
    id: 83,
    category: 'Prompt Packs',
    title: 'E-commerce Operations Pack',
    description: '12 prompts for online store owners — product descriptions, abandoned cart emails, review responses, supplier outreach, and seasonal campaign copy.',
    creator: 'The Marqet Team',
    price: '£4.99',
    rating: 4.8,
    reviews: 79,
    stripeLink: 'https://buy.stripe.com/test_cNiaEQ3oCdQLe5s7Lp7AI0w',
  },
  {
    id: 84,
    category: 'Prompt Packs',
    title: 'Content Creator Pack',
    description: '12 prompts for creators and writers — newsletter issues, YouTube scripts, content frameworks, sponsorship pitches, and audience growth strategies.',
    creator: 'The Marqet Team',
    price: '£5.99',
    rating: 4.9,
    reviews: 132,
    stripeLink: 'https://buy.stripe.com/test_8x2dR24sGdQLbXk4zd7AI0x',
  },
  {
    id: 85,
    category: 'Prompt Packs',
    title: 'Job Search & Career Pack',
    description: '12 prompts for job seekers — CV rewrites, cover letters tailored to job descriptions, interview prep questions, salary negotiation scripts, and LinkedIn overhauls.',
    creator: 'The Marqet Team',
    price: '£4.99',
    rating: 4.9,
    reviews: 198,
    stripeLink: 'https://buy.stripe.com/test_4gMdR22kyaEzbXkd5J7AI0y',
  },
  {
    id: 86,
    category: 'Prompt Packs',
    title: 'Customer Support Pack',
    description: '12 prompts for support teams — resolution templates, escalation handling, refund responses, FAQ drafts, and post-resolution satisfaction follow-ups.',
    creator: 'The Marqet Team',
    price: '£4.99',
    rating: 4.7,
    reviews: 73,
    stripeLink: 'https://buy.stripe.com/test_28EbIU0cqeUP4uS0iX7AI0z',
  },
  {
    id: 87,
    category: 'Prompt Packs',
    title: 'Sales Outreach & Closing Pack',
    description: '12 prompts for SDRs and account executives — cold outreach, discovery call questions, objection handling, proposal copy, and closing sequences.',
    creator: 'The Marqet Team',
    price: '£5.99',
    rating: 4.8,
    reviews: 91,
    stripeLink: 'https://buy.stripe.com/test_bJeeV69N09Av5yWfdR7AI0A',
  },
  {
    id: 88,
    category: 'Prompt Packs',
    title: 'Personal Finance Pack',
    description: '12 prompts for managing your money — budget breakdowns, debt payoff plans, savings goal frameworks, expense analysis, and financial goal-setting.',
    creator: 'The Marqet Team',
    price: '£3.99',
    rating: 4.8,
    reviews: 156,
    stripeLink: 'https://buy.stripe.com/test_dRm7sE6AO8wr4uS8Pt7AI0B',
  },
  {
    id: 89,
    category: 'Prompt Packs',
    title: 'Product Management Pack',
    description: '12 prompts for product managers — PRD templates, user story writing, sprint planning, stakeholder updates, and feature prioritisation frameworks.',
    creator: 'The Marqet Team',
    price: '£5.99',
    rating: 4.9,
    reviews: 117,
    stripeLink: 'https://buy.stripe.com/test_fZubIUaR4fYT7H45Dh7AI0C',
  },
  {
    id: 90,
    category: 'Prompt Packs',
    title: 'HR & Recruiting Pack',
    description: '12 prompts for people teams — job descriptions, interview scorecards, offer letters, performance review frameworks, and employee policy drafts.',
    creator: 'The Marqet Team',
    price: '£5.99',
    rating: 4.7,
    reviews: 58,
    // Create a Stripe Payment Link at dashboard.stripe.com → Payment Links
    // Set the success URL to: https://themarqet.com/purchase/success?listing=hr-recruiting-pack
    // Set the cancel URL to:  https://themarqet.com/purchase/cancelled?listing=hr-recruiting-pack
    // Test mode link — update after_completion URL in Stripe dashboard before going live
    stripeLink: 'https://buy.stripe.com/test_fZueV6gboeUP7H4fdR7AI00',
    content: {
      systemPrompt: `You are an expert HR and recruiting assistant with deep experience across full-cycle talent acquisition, employee relations, and people operations. You help HR professionals and recruiters work faster and more effectively.

When drafting job descriptions: lead with mission and impact before requirements. Use inclusive, direct language. Keep requirements lists short and honest — list only what is truly essential, not a wish list. Avoid buzzwords.

When reviewing candidates: focus on relevant transferable skills and growth trajectory, not credentials alone. Flag potential gaps honestly.

When handling sensitive HR situations such as performance management, terminations, or disciplinary processes: be clear, professional, and legally cautious. Recommend involving employment counsel whenever there is meaningful legal risk.

Be direct and practical. Avoid HR jargon. When the user pastes job descriptions, CVs, or notes, analyse them thoroughly before asking clarifying questions.`,
      prompts: [
        {
          title: 'Write a Job Description',
          description: 'Draft a compelling, inclusive job description for any role.',
          text: `Write a job description for the following role. Lead with what the person will accomplish in their first 6 months (impact), then cover day-to-day responsibilities, then requirements. Keep the requirements list short — only truly necessary skills. Use inclusive, direct language. Avoid buzzwords.

Role: [Job title]
Team: [Team name and what they do]
Level: [Junior / Mid / Senior / Lead]
Location: [Remote / Hybrid / On-site, city]
Salary range: [Range or "competitive"]
Reporting to: [Manager title]
Key things this person will own: [List 2–3 things]

Format:
— Role overview (2–3 sentences)
— What you'll do (5–6 bullets, outcome-focused)
— What we're looking for (4–6 bullets, essential only)
— Nice to have (2–3 bullets, optional)
— What we offer (benefits, culture — concise)`,
        },
        {
          title: 'Generate an Interview Scorecard',
          description: 'Build a structured scorecard with competencies and clear scoring rubric.',
          text: `Create a structured interview scorecard for the following role. Include 5–6 key competencies, one interview question per competency, and a 1–5 scoring rubric for each. The rubric must describe what a 1, 3, and 5 answer actually looks like — not just "poor / average / excellent."

Role: [Job title]
Level: [Junior / Senior / etc.]
The 3 most important things for success in this role: [List them]
Interview format: [30-min phone screen / 1-hour technical / panel / etc.]

Format as a table: Competency | Interview question | 5 looks like | 3 looks like | 1 looks like | Score`,
        },
        {
          title: 'Write an Offer Letter',
          description: 'Draft a warm, clear offer letter that makes the candidate want to sign.',
          text: `Draft a professional but warm offer letter for a new hire. Include all key terms, express genuine excitement, and make it easy to say yes. Avoid legalese — our legal team handles the employment contract separately.

Candidate name: [Full name]
Role: [Job title]
Department: [Department]
Start date: [Date]
Base salary: [Amount and frequency]
Bonus or commission: [If applicable, or leave blank]
Key benefits: [Health, pension, equity, etc. — list the highlights]
Reporting to: [Manager name and title]
Location: [On-site / hybrid / remote and where]
Offer expiry: [Date — usually 5–7 business days]

Tone: warm and professional. End with one personal sentence about why we are excited for them to join.`,
        },
        {
          title: 'Write a Candidate Rejection Email',
          description: 'Compassionate, specific rejection that leaves candidates feeling respected.',
          text: `Write a rejection email for a candidate who reached the stage below. Make it feel human and specific — not a form letter. Be honest and kind. Do not promise feedback you will not give, but include useful feedback briefly if you have it.

Candidate name: [First name]
Role they applied for: [Job title]
Stage they reached: [CV screen / phone screen / first interview / final round]
Reason for not progressing (honest but tactful): [e.g. "another candidate was a stronger technical fit" / "we restructured the role" / "needed more experience in X"]
Feedback to share (optional — leave blank if none): [Feedback]
Open to future roles?: [Yes / No]

Keep it under 150 words. No waffle.`,
        },
        {
          title: 'Create Screening Questions',
          description: 'Generate targeted questions to filter candidates efficiently at the application stage.',
          text: `Generate 6–8 screening questions for the following role to use in an initial application form or phone screen. Mix of must-have filters (knock-out questions) and insight questions. Each question should include a note on what a strong answer looks like.

Role: [Job title]
Absolute must-haves: [List 2–3 hard requirements]
Nice-to-haves: [List 1–2 preferred skills]
Common red flags to screen for: [e.g. "no experience managing direct reports" / "no domain-relevant background"]
Format: [Multiple choice / Short written answer / Phone screen prompts]

For each question provide: Question | Format | What a strong answer includes | Knock-out question? (Yes/No)`,
        },
        {
          title: 'Draft a Performance Review Framework',
          description: 'Build a fair, consistent review process tailored to your team.',
          text: `Design a performance review framework for the following team. Include: rating scale with clear descriptors, core competencies to assess, suggested self-review questions, suggested manager review questions, and guidance on calibration to reduce ratings drift.

Team or role type: [Engineering / Sales / Operations / etc.]
Review frequency: [Annual / Bi-annual / Quarterly]
Team size: [Number of people]
Current problems with reviews: [e.g. "ratings drift too high" / "feedback is too vague" / "no consistency across managers" / "managers lack time"]
Most important behaviours for this team: [List 2–3]

Output should be immediately usable — not a generic HR template.`,
        },
      ],
      quickStart: [
        'Copy the System Prompt above.',
        'Open Claude.ai and create a new Project — name it "HR & Recruiting Assistant."',
        'Paste the System Prompt into "Project instructions" — this configures Claude for your HR workflows.',
        'Use each individual prompt by copying it into any conversation inside that project.',
        'Fill in the bracketed fields [like this] with your real details before sending.',
        'Save your best outputs as templates to reuse for similar roles or situations.',
      ],
    },
  },
  {
    id: 91,
    category: 'Prompt Packs',
    title: 'Small Business Legal Pack',
    description: '12 prompts for SMB owners — contract summaries, terms of service drafts, privacy policy explanations, compliance checklists, and dispute correspondence.',
    creator: 'The Marqet Team',
    price: '£4.99',
    rating: 4.8,
    reviews: 84,
    stripeLink: 'https://buy.stripe.com/test_9B64gs6AOdQL4uSc1F7AI0D',
  },
  {
    id: 92,
    category: 'Prompt Packs',
    title: 'Teacher & Educator Pack',
    description: '12 prompts for teachers and tutors — lesson plans, assessment rubrics, parent communications, differentiated instruction ideas, and student feedback templates.',
    creator: 'The Marqet Team',
    price: '£3.99',
    rating: 4.9,
    reviews: 143,
    stripeLink: 'https://buy.stripe.com/test_dRmcMY6AO8wr0eCghV7AI0E',
  },
  {
    id: 93,
    category: 'Prompt Packs',
    title: 'Freelancer & Agency Pack',
    description: '12 prompts for freelancers and agencies — project proposals, scope documents, client onboarding, invoice copy, and scripts for difficult conversations.',
    creator: 'The Marqet Team',
    price: '£5.99',
    rating: 4.8,
    reviews: 96,
    stripeLink: 'https://buy.stripe.com/test_6oU3cogbo9Avd1o9Tx7AI0F',
  },
  {
    id: 94,
    category: 'Prompt Packs',
    title: 'Wellness & Coaching Pack',
    description: '12 prompts for non-clinical coaches — session frameworks, goal-setting conversations, accountability check-ins, programme outlines, and client intake processes.',
    creator: 'The Marqet Team',
    price: '£4.99',
    rating: 4.7,
    reviews: 49,
    stripeLink: 'https://buy.stripe.com/test_6oU5kw7ES4gb8L8c1F7AI0G',
  },
  {
    id: 95,
    category: 'Prompt Packs',
    title: 'Nonprofit Operations Pack',
    description: '12 prompts for nonprofit staff — grant writing, donor outreach, impact reporting, volunteer recruitment, and board meeting preparation materials.',
    creator: 'The Marqet Team',
    price: '£4.99',
    rating: 4.8,
    reviews: 67,
    stripeLink: 'https://buy.stripe.com/test_5kQeV64sGcMH2mK4zd7AI0H',
  },
  {
    id: 96,
    category: 'Prompt Packs',
    title: 'Podcast Production Pack',
    description: '12 prompts for podcasters — episode outlines, guest research briefs, show notes, promotional clip scripts, and listener growth strategies.',
    creator: 'The Marqet Team',
    price: '£3.99',
    rating: 4.7,
    reviews: 78,
    stripeLink: 'https://buy.stripe.com/test_cNidR21guaEz2mK9Tx7AI0I',
  },
  {
    id: 97,
    category: 'Prompt Packs',
    title: 'Event Planning Pack',
    description: '12 prompts for event organisers — RFP templates, vendor outreach, event copy, attendee communications, and post-event follow-up sequences.',
    creator: 'The Marqet Team',
    price: '£3.99',
    rating: 4.7,
    reviews: 42,
    stripeLink: 'https://buy.stripe.com/test_cNiaEQ6AO4gb9Pcd5J7AI0J',
  },
  {
    id: 98,
    category: 'Prompt Packs',
    title: 'Technical Writing Pack',
    description: '12 prompts for technical writers — API documentation templates, user guide structures, changelog formats, style guide rules, and tutorial frameworks.',
    creator: 'The Marqet Team',
    price: '£5.99',
    rating: 4.8,
    reviews: 63,
    stripeLink: 'https://buy.stripe.com/test_4gM8wI8IWbID3qO3v97AI0K',
  },
  {
    id: 99,
    category: 'Prompt Packs',
    title: 'Personal Productivity Pack',
    description: '12 prompts for getting life organised — weekly planning, habit tracking, decision frameworks, decluttering guides, and goal review templates.',
    creator: 'The Marqet Team',
    price: '£3.99',
    rating: 4.9,
    reviews: 221,
    stripeLink: 'https://buy.stripe.com/test_aFa9AM0cq6oj2mKd5J7AI0L',
  },
]

// ─── New Prompt Packs (IDs 100–139) ─────────────────────────────────────────
const newPromptPacks = [
  { id: 100, category: 'Prompt Packs', title: 'Architecture & Interior Design Pack', description: '12 prompts for architects and interior designers — client briefs, spatial narratives, planning objection responses, material specifications, contractor briefs, and concept statements.', creator: 'The Marqet Team', price: '£4.99', rating: 4.8, reviews: 31, stripeLink: 'https://buy.stripe.com/test_00w00c4sGeUPgdA5Dh7AI0M' },
  { id: 101, category: 'Prompt Packs', title: 'Legal Research Pack', description: '12 prompts for legal professionals — research memos, letters before action, contract clause summaries, NDA drafts, compliance checklists, and settlement agreement frameworks.', creator: 'The Marqet Team', price: '£5.99', rating: 4.9, reviews: 44, stripeLink: 'https://buy.stripe.com/test_fZu4gsgbo3c7aTg2r57AI0N' },
  { id: 102, category: 'Prompt Packs', title: 'Investment & Wealth Management Pack', description: '12 prompts for IFAs and wealth managers — investment thesis analysis, portfolio frameworks, fund evaluation, market commentaries, suitability letters, and tax-efficient withdrawal planning.', creator: 'The Marqet Team', price: '£5.99', rating: 4.8, reviews: 38, stripeLink: 'https://buy.stripe.com/test_bJe7sE9N0cMH4uS8Pt7AI0O' },
  { id: 103, category: 'Prompt Packs', title: 'Restaurant & Hospitality Pack', description: '12 prompts for restaurant and hospitality professionals — menu descriptions, staff training docs, complaint responses, seasonal menu concepts, supplier negotiations, and opening PR announcements.', creator: 'The Marqet Team', price: '£4.99', rating: 4.7, reviews: 52, stripeLink: 'https://buy.stripe.com/test_3cI3co6AO13ZaTg9Tx7AI0P' },
  { id: 104, category: 'Prompt Packs', title: 'Travel Planning & Tourism Pack', description: '12 prompts for travel agents, operators, and enthusiasts — itinerary design, destination guides, client consultation scripts, travel writing, and crisis communications.', creator: 'The Marqet Team', price: '£3.99', rating: 4.7, reviews: 67, stripeLink: 'https://buy.stripe.com/test_4gMdR28IW4gbaTge9N7AI0Q' },
  { id: 105, category: 'Prompt Packs', title: 'Construction & Trades Pack', description: '12 prompts for contractors and trades businesses — site reports, subcontractor briefs, variation orders, health & safety policies, client updates, and tender documents.', creator: 'The Marqet Team', price: '£4.99', rating: 4.8, reviews: 29, stripeLink: 'https://buy.stripe.com/test_fZuaEQ0cq8wr5yWaXB7AI0R' },
  { id: 106, category: 'Prompt Packs', title: 'Fashion & Retail Pack', description: '12 prompts for fashion brands and retailers — product descriptions, buyer presentations, influencer briefs, lookbook copy, press release drafts, and seasonal campaign planning.', creator: 'The Marqet Team', price: '£4.99', rating: 4.7, reviews: 41, stripeLink: 'https://buy.stripe.com/test_28EcMY9N0h2X4uS2r57AI0S' },
  { id: 107, category: 'Prompt Packs', title: 'Gaming & Esports Pack', description: '12 prompts for game developers and esports organisations — patch notes, community announcements, tournament scripts, sponsor outreach, content creator briefs, and crisis communications.', creator: 'The Marqet Team', price: '£3.99', rating: 4.8, reviews: 73, stripeLink: 'https://buy.stripe.com/test_3cI9AM5wK3c73qOfdR7AI0T' },
  { id: 108, category: 'Prompt Packs', title: 'Parenting & Family Pack', description: '12 prompts for parents, family bloggers, and childcare professionals — age-appropriate activity plans, school communication templates, family chore systems, and parenting content ideas.', creator: 'The Marqet Team', price: '£3.99', rating: 4.8, reviews: 112, stripeLink: 'https://buy.stripe.com/test_8x200c0cqdQLaTg2r57AI0U' },
  { id: 109, category: 'Prompt Packs', title: 'Mental Health Coaching Pack', description: '12 prompts for non-clinical coaches and wellness practitioners — session frameworks, goal-setting conversations, accountability scripts, programme outlines, and intake questionnaires.', creator: 'The Marqet Team', price: '£4.99', rating: 4.9, reviews: 58, stripeLink: 'https://buy.stripe.com/test_eVq9AM1gufYT0eC5Dh7AI0V' },
  { id: 110, category: 'Prompt Packs', title: 'Academic Research Pack', description: '12 prompts for academics and graduate students — literature review structures, research proposal drafts, methodology sections, abstract writing, peer review responses, and grant applications.', creator: 'The Marqet Team', price: '£4.99', rating: 4.8, reviews: 84, stripeLink: 'https://buy.stripe.com/test_14AcMY4sG5kfaTg6Hl7AI0W' },
  { id: 111, category: 'Prompt Packs', title: 'Healthcare Administration Pack', description: '12 prompts for healthcare administrators and practice managers — patient communication templates, staff scheduling frameworks, CQC inspection prep, policy documents, and clinical governance reports.', creator: 'The Marqet Team', price: '£5.99', rating: 4.9, reviews: 37, stripeLink: 'https://buy.stripe.com/test_5kQeV6gbo9Av5yW9Tx7AI0X' },
  { id: 112, category: 'Prompt Packs', title: 'Automotive Services Pack', description: '12 prompts for garage owners and automotive professionals — service advisories, customer follow-ups, MOT failure explanations, fleet management reports, and marketing copy.', creator: 'The Marqet Team', price: '£3.99', rating: 4.6, reviews: 28, stripeLink: 'https://buy.stripe.com/test_fZu28kbV89Av0eC6Hl7AI0Y' },
  { id: 113, category: 'Prompt Packs', title: 'Photography & Videography Pack', description: '12 prompts for photographers and videographers — client briefs, shot lists, proposal templates, usage licence agreements, social captions, and portfolio write-ups.', creator: 'The Marqet Team', price: '£4.99', rating: 4.8, reviews: 61, stripeLink: 'https://buy.stripe.com/test_8x2fZa5wKaEz6D0ghV7AI0Z' },
  { id: 114, category: 'Prompt Packs', title: 'Music Production Pack', description: '12 prompts for music producers and artists — press bios, sync licensing pitches, EPK copy, session musician briefs, release strategy plans, and social content frameworks.', creator: 'The Marqet Team', price: '£4.99', rating: 4.7, reviews: 49, stripeLink: 'https://buy.stripe.com/test_3cIbIU5wK2837H45Dh7AI10' },
  { id: 115, category: 'Prompt Packs', title: 'Sports Coaching Pack', description: '12 prompts for coaches and athletic directors — session plans, player feedback scripts, parent communications, club newsletters, grant applications, and performance review frameworks.', creator: 'The Marqet Team', price: '£4.99', rating: 4.8, reviews: 55, stripeLink: 'https://buy.stripe.com/test_4gMfZa9N0eUPe5s6Hl7AI11' },
  { id: 116, category: 'Prompt Packs', title: 'Pet Care & Veterinary Pack', description: '12 prompts for veterinary practices and pet businesses — client communication templates, post-appointment summaries, pet care guides, social media content, and staff protocols.', creator: 'The Marqet Team', price: '£3.99', rating: 4.7, reviews: 43, stripeLink: 'https://buy.stripe.com/test_8x2bIU1gubID4uS9Tx7AI12' },
  { id: 117, category: 'Prompt Packs', title: 'Consulting & Advisory Pack', description: '12 prompts for independent consultants — proposal frameworks, diagnostic interview guides, findings presentations, change recommendations, workshop agendas, and client relationship emails.', creator: 'The Marqet Team', price: '£5.99', rating: 4.9, reviews: 66, stripeLink: 'https://buy.stripe.com/test_9B66oA3oC2832mKc1F7AI13' },
  { id: 118, category: 'Prompt Packs', title: 'Accounting & Bookkeeping Pack', description: '12 prompts for accountants and bookkeepers — client onboarding checklists, year-end summaries, VAT return explanations, management accounts narratives, and advisory letter frameworks.', creator: 'The Marqet Team', price: '£5.99', rating: 4.8, reviews: 47, stripeLink: 'https://buy.stripe.com/test_3cIeV6f7k9Avd1oaXB7AI14' },
  { id: 119, category: 'Prompt Packs', title: 'Cybersecurity Awareness Pack', description: '12 prompts for security professionals and business owners — security policy drafts, staff awareness training content, incident response communication, risk assessment frameworks, and board-level briefings.', creator: 'The Marqet Team', price: '£5.99', rating: 4.9, reviews: 52, stripeLink: 'https://buy.stripe.com/test_6oU8wIcZc4gbbXkfdR7AI15' },
  { id: 120, category: 'Prompt Packs', title: 'DevOps & Platform Engineering Pack', description: '12 prompts for DevOps and SRE teams — runbook templates, incident post-mortem frameworks, on-call handover scripts, infrastructure documentation, and SLA definitions.', creator: 'The Marqet Team', price: '£5.99', rating: 4.8, reviews: 39, stripeLink: 'https://buy.stripe.com/test_fZudR2aR46ojaTg1n17AI16' },
  { id: 121, category: 'Prompt Packs', title: 'UX Research & Design Pack', description: '12 prompts for UX designers and researchers — research plans, interview guides, usability test scripts, affinity mapping facilitation, design critique frameworks, and stakeholder presentations.', creator: 'The Marqet Team', price: '£5.99', rating: 4.9, reviews: 77, stripeLink: 'https://buy.stripe.com/test_aFabIU2ky9AvgdA7Lp7AI17' },
  { id: 122, category: 'Prompt Packs', title: 'Executive Leadership Pack', description: '12 prompts for senior leaders and executives — board papers, all-hands communications, strategic narrative drafts, leadership team alignment sessions, and crisis communication frameworks.', creator: 'The Marqet Team', price: '£5.99', rating: 4.8, reviews: 34, stripeLink: 'https://buy.stripe.com/test_4gMbIUaR49Ave5se9N7AI18' },
  { id: 123, category: 'Prompt Packs', title: 'Community Management Pack', description: '12 prompts for community managers — welcome sequences, community guidelines, engagement campaigns, moderation policies, event announcements, and member spotlight templates.', creator: 'The Marqet Team', price: '£3.99', rating: 4.7, reviews: 88, stripeLink: 'https://buy.stripe.com/test_4gM00c0cqh2X8L86Hl7AI19' },
  { id: 124, category: 'Prompt Packs', title: 'Cooking & Food Business Pack', description: '12 prompts for food entrepreneurs and recipe creators — recipe write-ups, pitch decks for retailers, product naming, food brand copy, packaging descriptions, and grant applications.', creator: 'The Marqet Team', price: '£3.99', rating: 4.7, reviews: 59, stripeLink: 'https://buy.stripe.com/test_3cI3co8IW9AvgdAe9N7AI1a' },
  { id: 125, category: 'Prompt Packs', title: 'Home & DIY Improvement Pack', description: '12 prompts for homeowners and DIY enthusiasts — project planning guides, material lists, contractor briefings, before/after content scripts, renovation budgets, and planning permission prep.', creator: 'The Marqet Team', price: '£3.99', rating: 4.6, reviews: 94, stripeLink: 'https://buy.stripe.com/test_aFadR21gueUPd1oc1F7AI1b' },
  { id: 126, category: 'Prompt Packs', title: 'Sustainability & ESG Pack', description: '12 prompts for sustainability managers and ESG teams — materiality assessments, supplier questionnaires, ESG reporting frameworks, carbon reduction plans, and stakeholder disclosures.', creator: 'The Marqet Team', price: '£4.99', rating: 4.8, reviews: 41, stripeLink: 'https://buy.stripe.com/test_5kQaEQ3oCeUPbXk4zd7AI1c' },
  { id: 127, category: 'Prompt Packs', title: 'Immigration & Relocation Pack', description: '12 prompts for relocation consultants and HR teams — visa application guides, housing briefings, cost-of-living comparisons, cultural orientation documents, and settling-in checklists.', creator: 'The Marqet Team', price: '£4.99', rating: 4.7, reviews: 33, stripeLink: 'https://buy.stripe.com/test_eVq9AM9N04gb2mKe9N7AI1d' },
  { id: 128, category: 'Prompt Packs', title: 'Retirement & Estate Planning Pack', description: '12 prompts for financial planners and individuals — retirement income projections, estate planning checklists, power of attorney guides, beneficiary nomination reviews, and legacy letters.', creator: 'The Marqet Team', price: '£4.99', rating: 4.8, reviews: 46, stripeLink: 'https://buy.stripe.com/test_6oU6oAbV85kfaTgaXB7AI1e' },
  { id: 129, category: 'Prompt Packs', title: 'Charity & Fundraising Pack', description: '12 prompts for charity professionals — grant bid narratives, major donor cultivation letters, impact reports, volunteer recruitment campaigns, and fundraising event copy.', creator: 'The Marqet Team', price: '£4.99', rating: 4.9, reviews: 62, stripeLink: 'https://buy.stripe.com/test_fZu9AM9N02836D08Pt7AI1f' },
  { id: 130, category: 'Prompt Packs', title: 'Language Learning Pack', description: '12 prompts for language learners and tutors — structured practice conversations, grammar explanation scripts, vocabulary building exercises, lesson plans, and progress review frameworks.', creator: 'The Marqet Team', price: '£3.99', rating: 4.8, reviews: 103, stripeLink: 'https://buy.stripe.com/test_cNi00c9N0fYT4uSaXB7AI1g' },
  { id: 131, category: 'Prompt Packs', title: 'Film & TV Production Pack', description: '12 prompts for screenwriters and producers — logline development, treatment writing, pitch documents, production schedule templates, casting briefs, and post-production handover notes.', creator: 'The Marqet Team', price: '£4.99', rating: 4.8, reviews: 38, stripeLink: 'https://buy.stripe.com/test_eVq28kcZceUP4uS2r57AI1h' },
  { id: 132, category: 'Prompt Packs', title: 'Publishing & Author Pack', description: '12 prompts for authors and publishers — query letters, synopsis writing, book proposal structures, marketing one-pagers, advance reader copy requests, and launch newsletter sequences.', creator: 'The Marqet Team', price: '£4.99', rating: 4.8, reviews: 57, stripeLink: 'https://buy.stripe.com/test_cNiaEQ9N07sn7H4ghV7AI1i' },
  { id: 133, category: 'Prompt Packs', title: 'Logistics & Supply Chain Pack', description: '12 prompts for supply chain professionals — supplier onboarding docs, logistics RFP frameworks, carrier performance reviews, inventory policy documents, and disruption communication templates.', creator: 'The Marqet Team', price: '£5.99', rating: 4.7, reviews: 29, stripeLink: 'https://buy.stripe.com/test_14A9AM9N0h2X0eCfdR7AI1j' },
  { id: 134, category: 'Prompt Packs', title: 'Customer Success Pack', description: '12 prompts for CS managers and SaaS teams — onboarding email sequences, health score frameworks, QBR agendas, churn risk conversations, renewal outreach, and expansion play scripts.', creator: 'The Marqet Team', price: '£4.99', rating: 4.9, reviews: 81, stripeLink: 'https://buy.stripe.com/test_3cIbIU7ES5kfaTge9N7AI1k' },
  { id: 135, category: 'Prompt Packs', title: 'Recruitment Agency Pack', description: '12 prompts for recruitment consultants — candidate sourcing messages, client briefing templates, shortlist presentations, offer negotiation scripts, and market mapping reports.', creator: 'The Marqet Team', price: '£5.99', rating: 4.8, reviews: 44, stripeLink: 'https://buy.stripe.com/test_fZu14gbV813Z7H46Hl7AI1l' },
  { id: 136, category: 'Prompt Packs', title: 'Science & Lab Research Pack', description: '12 prompts for scientists and researchers — research proposal structures, methodology descriptions, data interpretation narratives, conference abstracts, lab protocol writing, and ethics applications.', creator: 'The Marqet Team', price: '£5.99', rating: 4.8, reviews: 35, stripeLink: 'https://buy.stripe.com/test_bJedR27ES4gb4uS9Tx7AI1m' },
  { id: 137, category: 'Prompt Packs', title: 'Insurance & Risk Pack', description: '12 prompts for brokers and risk managers — risk assessment frameworks, policy recommendation letters, claims correspondence, renewal presentations, and client risk reports.', creator: 'The Marqet Team', price: '£5.99', rating: 4.7, reviews: 28, stripeLink: 'https://buy.stripe.com/test_cNi7sE7ESh2XgdAe9N7AI1n' },
  { id: 138, category: 'Prompt Packs', title: 'Public Relations Pack', description: '12 prompts for PR professionals — press release drafts, crisis holding statements, journalist pitch emails, speaking submission applications, awards entry frameworks, and briefing documents.', creator: 'The Marqet Team', price: '£4.99', rating: 4.8, reviews: 53, stripeLink: 'https://buy.stripe.com/test_eVq28k2ky8wrgdA3v97AI1o' },
  { id: 139, category: 'Prompt Packs', title: 'Political & Policy Writing Pack', description: '12 prompts for policy researchers and government communications teams — policy briefs, consultation responses, ministerial submissions, select committee evidence, and stakeholder engagement strategies.', creator: 'The Marqet Team', price: '£4.99', rating: 4.7, reviews: 22, stripeLink: 'https://buy.stripe.com/test_7sYfZabV87sne5sc1F7AI1p' },
]

// ─── New Claude Skills (IDs 140–164) ─────────────────────────────────────────
const newSkills = [
  { id: 140, category: 'Claude Skills', title: 'Code Review Assistant', description: 'Thorough code reviews organised by severity — Critical, Important, and Suggestions. Covers correctness, security, performance, readability, and idiomatic patterns. Specific line-level feedback with fixes included.', creator: 'The Marqet Team', price: '£7.99', rating: 4.9, reviews: 83, stripeLink: 'https://buy.stripe.com/test_28EcMY9N0dQL3qO0iX7AI1q' },
  { id: 141, category: 'Claude Skills', title: 'Database Schema Designer', description: 'Production-ready database schema design with normalisation reasoning, index strategy, constraint definitions, and migration considerations. Works across PostgreSQL, MySQL, SQLite, and NoSQL.', creator: 'The Marqet Team', price: '£8.99', rating: 4.8, reviews: 47, stripeLink: 'https://buy.stripe.com/test_00wbIU1gufYTbXk1n17AI1r' },
  { id: 142, category: 'Claude Skills', title: 'Sprint Retrospective Facilitator', description: 'Runs effective, honest sprint retrospectives using Start/Stop/Continue, 4Ls, Mad/Sad/Glad, and other formats. Always ends with 1–3 specific, owned action items — never vague commitments.', creator: 'The Marqet Team', price: 'Free', rating: 4.9, reviews: 156 },
  { id: 143, category: 'Claude Skills', title: 'OKR Setting Coach', description: 'Helps teams write excellent Objectives and Key Results — flags vague KRs, activities dressed as outcomes, and misalignment between team and company goals. Shows a better version for every weak OKR.', creator: 'The Marqet Team', price: '£6.99', rating: 4.8, reviews: 68, stripeLink: 'https://buy.stripe.com/test_fZufZa1gu3c77H45Dh7AI1s' },
  { id: 144, category: 'Claude Skills', title: 'System Design Explainer', description: 'Designs distributed systems from scratch or explains existing architectures clearly. Makes trade-offs explicit: what you\'re optimising for and what you\'re sacrificing. Covers data flow, storage, APIs, caching, and failure modes.', creator: 'The Marqet Team', price: '£9.99', rating: 4.9, reviews: 91, stripeLink: 'https://buy.stripe.com/test_4gM3co5wKh2X2mKghV7AI1t' },
  { id: 145, category: 'Claude Skills', title: 'Architecture Decision Recorder', description: 'Writes honest, well-structured ADRs that capture context, the decision, alternatives considered, rationale, and consequences. Doesn\'t make decisions sound perfect — captures the messy reality future teams need.', creator: 'The Marqet Team', price: '£7.99', rating: 4.8, reviews: 39, stripeLink: 'https://buy.stripe.com/test_5kQ4gs3oC4gbaTgd5J7AI1u' },
  { id: 146, category: 'Claude Skills', title: 'API Documentation Writer', description: 'Writes developer-loved API docs — starts with a working quick-start example, then covers auth, endpoints, parameters, request/response formats, error codes, and rate limits. Example first, theory second.', creator: 'The Marqet Team', price: '£6.99', rating: 4.9, reviews: 72, stripeLink: 'https://buy.stripe.com/test_7sYaEQ8IW5kf3qO6Hl7AI1v' },
  { id: 147, category: 'Claude Skills', title: 'Technical Debt Assessor', description: 'Categorises and prioritises technical debt by real cost — velocity drag, defect rate, onboarding time, reliability risk. Helps teams decide what to ignore, manage, or eliminate. Pragmatic, not dogmatic.', creator: 'The Marqet Team', price: '£8.99', rating: 4.7, reviews: 44, stripeLink: 'https://buy.stripe.com/test_4gMbIU8IW2834uSe9N7AI1w' },
  { id: 148, category: 'Claude Skills', title: 'Bug Report Analyst', description: 'Turns messy bug reports into clean, actionable developer tickets. Identifies missing information, infers likely root causes, proposes reproduction steps, and assigns severity — all without playing 20 questions.', creator: 'The Marqet Team', price: 'Free', rating: 4.8, reviews: 127 },
  { id: 149, category: 'Claude Skills', title: 'User Story Writer', description: 'Writes clear, testable user stories with a proper actor, goal, benefit, and concrete acceptance criteria. Flags stories that are too large, vague, or describe implementation instead of behaviour.', creator: 'The Marqet Team', price: 'Free', rating: 4.9, reviews: 203 },
  { id: 150, category: 'Claude Skills', title: 'Performance Review Writer', description: 'Helps managers write specific, fair, and legally sound performance reviews — grounded in real examples, balanced, forward-looking, and actionable. Avoids vague praise and unexplained criticism.', creator: 'The Marqet Team', price: '£6.99', rating: 4.8, reviews: 54, stripeLink: 'https://buy.stripe.com/test_bJe4gsf7k5kf4uS1n17AI1x' },
  { id: 151, category: 'Claude Skills', title: 'Press Release Drafter', description: 'Writes press releases journalists actually cover — newsworthy hook in the first sentence, answers who/what/where/when/why in the lede, strong headline. Tells you honestly if something isn\'t news.', creator: 'The Marqet Team', price: '£5.99', rating: 4.8, reviews: 61, stripeLink: 'https://buy.stripe.com/test_3cIaEQ2ky7sn8L84zd7AI1y' },
  { id: 152, category: 'Claude Skills', title: 'Pitch Deck Critiquer', description: 'Reviews pitch decks like a honest VC friend. Identifies story gaps, broken logic, unanswered investor questions, and credibility issues. Covers problem, solution, market, model, traction, team, financials, and ask.', creator: 'The Marqet Team', price: '£9.99', rating: 4.9, reviews: 77, stripeLink: 'https://buy.stripe.com/test_aFadR21gu4gb1iG0iX7AI1z' },
  { id: 153, category: 'Claude Skills', title: 'Market Research Analyst', description: 'Structured market analysis covering size and growth, customer segmentation, competitive landscape, buyer behaviour, and key trends. Distinguishes between what the data shows and what\'s being assumed.', creator: 'The Marqet Team', price: '£8.99', rating: 4.8, reviews: 58, stripeLink: 'https://buy.stripe.com/test_9B6bIUaR46ojbXkghV7AI1A' },
  { id: 154, category: 'Claude Skills', title: 'Business Plan Builder', description: 'Builds credible, realistic business plans that stand up to investor and bank scrutiny. Makes assumptions explicit, includes sensitivity analysis, and is honest about risks. No wish lists.', creator: 'The Marqet Team', price: '£9.99', rating: 4.9, reviews: 66, stripeLink: 'https://buy.stripe.com/test_28E5kw1gu5kf8L8d5J7AI1B' },
  { id: 155, category: 'Claude Skills', title: 'Risk Assessment Writer', description: 'Identifies, assesses, and documents risks across operational, financial, strategic, and compliance dimensions. Produces structured risk registers with likelihood, impact, controls, mitigations, and ownership.', creator: 'The Marqet Team', price: '£7.99', rating: 4.7, reviews: 33, stripeLink: 'https://buy.stripe.com/test_cNifZa8IWaEz3qO2r57AI1C' },
  { id: 156, category: 'Claude Skills', title: 'Change Management Guide', description: 'Expert change management support grounded in Kotter, ADKAR, and Prosci — with honest opinions about what works. Focuses on the human side: resistance, communication gaps, and genuine stakeholder listening.', creator: 'The Marqet Team', price: '£7.99', rating: 4.8, reviews: 41, stripeLink: 'https://buy.stripe.com/test_00waEQbV813ZaTg2r57AI1D' },
  { id: 157, category: 'Claude Skills', title: 'Training Material Creator', description: 'Designs training materials that change behaviour, not just transfer information. Learner-centred, appropriately active, well-chunked, and measurable. Defines learning objectives first, then chooses the right format.', creator: 'The Marqet Team', price: '£6.99', rating: 4.8, reviews: 49, stripeLink: 'https://buy.stripe.com/test_3cIbIU9N0aEzgdA9Tx7AI1E' },
  { id: 158, category: 'Claude Skills', title: 'SOP Document Writer', description: 'Writes SOPs people actually follow — numbered steps, specific actions, decision points, error handling, and escalation paths. Written for the person doing the task, not the person who already knows how.', creator: 'The Marqet Team', price: '£5.99', rating: 4.9, reviews: 88, stripeLink: 'https://buy.stripe.com/test_00w00c3oC9Av5yW0iX7AI1F' },
  { id: 159, category: 'Claude Skills', title: 'Customer Journey Mapper', description: 'Maps end-to-end customer experiences across stages, touchpoints, and emotional states — identifying moments of delight and where the experience breaks down. Grounded in evidence, honest about assumptions.', creator: 'The Marqet Team', price: '£7.99', rating: 4.8, reviews: 55, stripeLink: 'https://buy.stripe.com/test_9B600c6AOcMHgdAghV7AI1G' },
  { id: 160, category: 'Claude Skills', title: 'A/B Test Designer', description: 'Designs rigorous A/B tests with clear hypotheses, single variables, correct sample size calculations, primary metrics, and guardrail metrics. Every test has a defined action for both winning and losing results.', creator: 'The Marqet Team', price: '£6.99', rating: 4.8, reviews: 62, stripeLink: 'https://buy.stripe.com/test_14AaEQe3g2830eC9Tx7AI1H' },
  { id: 161, category: 'Claude Skills', title: 'Pricing Strategy Advisor', description: 'Expert pricing guidance grounded in value delivered, not cost-plus. Covers willingness to pay, customer segmentation, competitive positioning, and psychological pricing. Direct about when pricing looks wrong and why.', creator: 'The Marqet Team', price: '£8.99', rating: 4.9, reviews: 74, stripeLink: 'https://buy.stripe.com/test_28EdR22ky5kf1iG0iX7AI1I' },
  { id: 162, category: 'Claude Skills', title: 'Partnership Outreach Writer', description: 'Writes partnership outreach that gets replies — leads with value for the recipient, opens with a specific observation, makes the value mutual, and has a clear and easy ask. Short enough to read in 30 seconds.', creator: 'The Marqet Team', price: '£5.99', rating: 4.7, reviews: 48, stripeLink: 'https://buy.stripe.com/test_cNi6oAf7k2831iG1n17AI1J' },
  { id: 163, category: 'Claude Skills', title: 'Investor Relations Writer', description: 'Helps leadership communicate clearly and credibly with investors — honest about challenges, focused on what investors care about (returns, risk, capital allocation), and consistent with previous communications.', creator: 'The Marqet Team', price: '£8.99', rating: 4.8, reviews: 36, stripeLink: 'https://buy.stripe.com/test_00w14g9N0bID1iG6Hl7AI1K' },
  { id: 164, category: 'Claude Skills', title: 'Executive Summary Writer', description: 'Distils complex documents into decision-ready summaries that lead with the bottom line, provide only essential context, and are structured around decisions. Synthesises — doesn\'t just summarise.', creator: 'The Marqet Team', price: '£5.99', rating: 4.9, reviews: 119, stripeLink: 'https://buy.stripe.com/test_28E4gsaR4cMHbXk4zd7AI1L' },
]

// ─── New MCP Servers (IDs 170–181) ───────────────────────────────────────────
const newMCPServers = [
  { id: 170, category: 'MCP Servers', title: 'GitHub MCP', description: 'Read-only GitHub access for Claude — list repositories, read issues, fetch pull requests, and search code. Works with any public repo or private repos when a personal access token is configured.', creator: 'The Marqet Team', price: 'Free', rating: 4.9, reviews: 148 },
  { id: 171, category: 'MCP Servers', title: 'Notion MCP', description: 'Search, read, and append to Notion pages and databases. Give Claude access to your team wiki, personal notes, or project database — all through the Notion API.', creator: 'The Marqet Team', price: 'Free', rating: 4.8, reviews: 94 },
  { id: 172, category: 'MCP Servers', title: 'Google Calendar MCP', description: 'Read calendar events from a local ICS export file. No OAuth setup required — just export your Google Calendar to ICS and point the server at it. Claude can check your schedule, find gaps, and plan around meetings.', creator: 'The Marqet Team', price: 'Free', rating: 4.7, reviews: 67 },
  { id: 173, category: 'MCP Servers', title: 'Jira MCP', description: 'List, search, and read Jira issues via the Jira REST API. Works with Jira Cloud. Ask Claude about sprint progress, find blockers, and get full issue details without leaving your terminal.', creator: 'The Marqet Team', price: 'Free', rating: 4.8, reviews: 82 },
  { id: 174, category: 'MCP Servers', title: 'Linear MCP', description: 'Read and create Linear issues, cycles, and projects. Give Claude visibility into your Linear workspace — triage incoming work, check cycle progress, and draft new issues directly from conversation.', creator: 'The Marqet Team', price: 'Free', rating: 4.9, reviews: 111 },
  { id: 175, category: 'MCP Servers', title: 'Airtable MCP', description: 'Query and read Airtable bases and records via the Airtable REST API. Turn your Airtable into a Claude-readable database — great for product roadmaps, CRMs, and content calendars stored in Airtable.', creator: 'The Marqet Team', price: 'Free', rating: 4.7, reviews: 58 },
  { id: 176, category: 'MCP Servers', title: 'Todoist MCP', description: 'Read tasks, projects, and labels from Todoist. Let Claude see your task list, help prioritise your day, and find overdue items — without ever leaving Claude Desktop.', creator: 'The Marqet Team', price: 'Free', rating: 4.8, reviews: 76 },
  { id: 177, category: 'MCP Servers', title: 'RSS Feed MCP', description: 'Subscribe to any RSS feed and let Claude read, search, and summarise the latest items. Save named feeds for instant access. Build a local research reading list Claude can query at any time.', creator: 'The Marqet Team', price: 'Free', rating: 4.7, reviews: 53 },
  { id: 178, category: 'MCP Servers', title: 'Weather MCP', description: 'Current conditions and 7-day forecast for any city via Open-Meteo — fully free, no API key required. Claude can check the weather, plan outdoor activities, and answer weather-dependent questions instantly.', creator: 'The Marqet Team', price: 'Free', rating: 4.8, reviews: 139 },
  { id: 179, category: 'MCP Servers', title: 'HackerNews MCP', description: 'Top stories, story search, Ask HN posts, and full item reads from the HN Algolia API. Stay on top of tech news without leaving Claude — ask for today\'s top stories or search for any topic.', creator: 'The Marqet Team', price: 'Free', rating: 4.8, reviews: 97 },
  { id: 180, category: 'MCP Servers', title: 'Spotify MCP', description: 'Check what\'s playing, search tracks, and browse your playlists via the Spotify Web API. Add music context to your Claude sessions — ask for study playlists, check currently playing, or search your library.', creator: 'The Marqet Team', price: 'Free', rating: 4.6, reviews: 84 },
  { id: 181, category: 'MCP Servers', title: 'PDF Reader MCP', description: 'Extract text from local PDF files so Claude can read, search, and summarise them. Point it at any PDF directory — contracts, reports, research papers, or manuals — and ask Claude anything about the content.', creator: 'The Marqet Team', price: 'Free', rating: 4.9, reviews: 162 },
]

// ─── Workflows (IDs 190–199) ─────────────────────────────────────────────────
const workflows = [
  { id: 190, category: 'Workflows', title: 'Blog Post to Social Campaign', description: 'Turn any blog post into a complete multi-platform social campaign — LinkedIn, X, Instagram, Facebook, email teaser, and 3 ad headline variations. Takes under 5 minutes.', creator: 'The Marqet Team', price: '£14.99', rating: 4.8, reviews: 58, stripeLink: 'https://buy.stripe.com/test_5kQeV63oC8wr3qO6Hl7AI1M' },
  { id: 191, category: 'Workflows', title: 'Lead Capture to CRM Entry', description: 'Enrich and structure any inbound lead — extracts contact details, infers intent signals, suggests a lead score with reasoning, drafts first outreach, and outputs a CRM-ready block.', creator: 'The Marqet Team', price: '£18.99', rating: 4.9, reviews: 41, stripeLink: 'https://buy.stripe.com/test_28E00ccZch2X2mK3v97AI1N' },
  { id: 192, category: 'Workflows', title: 'Weekly Team Standup Digest', description: 'Compile a week of standup notes into a structured team digest — wins, WIP, blockers, next week\'s focus, plus a 3-sentence exec summary. Ready to paste into Slack or email.', creator: 'The Marqet Team', price: '£12.99', rating: 4.7, reviews: 63, stripeLink: 'https://buy.stripe.com/test_6oU14gf7k9Ave5s7Lp7AI1O' },
  { id: 193, category: 'Workflows', title: 'Customer Feedback Triage Pipeline', description: 'Turn a backlog of customer feedback into prioritised, actionable insights. Categorises, clusters, rates, and produces a ranked insights report with verbatim quotes — plus a customer response template.', creator: 'The Marqet Team', price: '£16.99', rating: 4.9, reviews: 37, stripeLink: 'https://buy.stripe.com/test_7sYdR27ES7sn3qOe9N7AI1P' },
  { id: 194, category: 'Workflows', title: 'Job Application Tracking Workflow', description: 'From job description to tailored application to follow-up — Claude assesses fit, tailors your CV bullets, writes the cover letter opening, and logs the opportunity in a structured tracker.', creator: 'The Marqet Team', price: '£9.99', rating: 4.8, reviews: 129, stripeLink: 'https://buy.stripe.com/test_28E28k6AO8wr8L80iX7AI1Q' },
  { id: 195, category: 'Workflows', title: 'Monthly Financial Review Workflow', description: 'Run a structured monthly financial review — calculates key metrics, compares MoM, flags significant variances, produces a 1-page summary, and generates 3 action items for next month.', creator: 'The Marqet Team', price: '£14.99', rating: 4.8, reviews: 48, stripeLink: 'https://buy.stripe.com/test_5kQ9AMgbocMH3qOaXB7AI1R' },
  { id: 196, category: 'Workflows', title: 'Content Audit & Refresh Workflow', description: 'Audit your content library and produce a prioritised refresh plan — identifies thin content, outdated information, and topic gaps, then outlines what to update and drafts a refreshed intro for the top piece.', creator: 'The Marqet Team', price: '£12.99', rating: 4.7, reviews: 33, stripeLink: 'https://buy.stripe.com/test_bJe28kaR4aEze5se9N7AI1S' },
  { id: 197, category: 'Workflows', title: 'Bug Triage to Sprint Ticket Workflow', description: 'Turn raw bug reports into clean, sprint-ready tickets — extracts what broke, assesses severity, writes the full ticket with reproduction steps, and drafts an acknowledgement reply to the reporter.', creator: 'The Marqet Team', price: '£14.99', rating: 4.9, reviews: 72, stripeLink: 'https://buy.stripe.com/test_5kQ28kgbo7snbXkc1F7AI1T' },
  { id: 198, category: 'Workflows', title: 'New Employee Onboarding Workflow', description: 'Build a complete 90-day onboarding plan for any new hire — pre-boarding checklist, welcome email, Day 1 agenda, Week 1 meeting plan, and 30/60/90 day check-in templates.', creator: 'The Marqet Team', price: '£18.99', rating: 4.8, reviews: 44, stripeLink: 'https://buy.stripe.com/test_8x2dR2e3gh2Xf9w7Lp7AI1U' },
  { id: 199, category: 'Workflows', title: 'Press Release Distribution Workflow', description: 'Distribute a press release across every channel — journalist-ready version, personalised pitch emails for 5 journalist types, social posts, internal announcement, and 10 targeted outlet suggestions.', creator: 'The Marqet Team', price: '£12.99', rating: 4.7, reviews: 29, stripeLink: 'https://buy.stripe.com/test_9B69AMf7kcMH2mK9Tx7AI1V' },
]

// ─── Templates (IDs 210–219) ─────────────────────────────────────────────────
const templates = [
  { id: 210, category: 'Templates', title: 'B2B SaaS Pitch Deck Template', description: 'A complete 12-slide pitch deck structure for B2B SaaS — from problem and solution through to financials and ask. Includes guidance on what investors want to see on each slide.', creator: 'The Marqet Team', price: '£7.99', rating: 4.9, reviews: 88, stripeLink: 'https://buy.stripe.com/test_28EcMY9N03c7aTgghV7AI1W' },
  { id: 211, category: 'Templates', title: 'Business Plan Template', description: 'A comprehensive business plan template covering executive summary, market analysis, competitive landscape, operations, financials, and funding requirements — with guidance on what to include in each section.', creator: 'The Marqet Team', price: '£9.99', rating: 4.8, reviews: 67, stripeLink: 'https://buy.stripe.com/test_14A28ke3gfYTgdAd5J7AI1X' },
  { id: 212, category: 'Templates', title: 'Marketing Strategy Template', description: 'A full marketing strategy template covering situation analysis, audience personas, goals, positioning, messaging, channel strategy, content plan, campaign calendar, and measurement framework.', creator: 'The Marqet Team', price: '£8.99', rating: 4.8, reviews: 74, stripeLink: 'https://buy.stripe.com/test_eVq14gbV85kfgdAfdR7AI1Y' },
  { id: 213, category: 'Templates', title: 'Employee Handbook Template', description: 'A complete 12-section employee handbook template covering culture, employment basics, pay and benefits, conduct, performance, absence, health & safety, DEI, data handling, and leaving procedures.', creator: 'The Marqet Team', price: '£11.99', rating: 4.9, reviews: 52, stripeLink: 'https://buy.stripe.com/test_bJe5kw2ky8wr5yW8Pt7AI1Z' },
  { id: 214, category: 'Templates', title: 'Client Proposal Template', description: 'A professional 10-section client proposal template — from executive summary through scope, approach, team, investment, timeline, and terms. Structured to make it easy for the client to say yes.', creator: 'The Marqet Team', price: '£6.99', rating: 4.8, reviews: 93, stripeLink: 'https://buy.stripe.com/test_7sY8wI2kyaEz8L8d5J7AI20' },
  { id: 215, category: 'Templates', title: 'OKR Setting Template', description: 'A complete OKR framework template with company and team OKR formats, scoring guides, mid-quarter check-in structure, and end-of-quarter retrospective format. Works for any team size.', creator: 'The Marqet Team', price: '£7.99', rating: 4.8, reviews: 61, stripeLink: 'https://buy.stripe.com/test_cNi00c9N02831iGaXB7AI21' },
  { id: 216, category: 'Templates', title: 'Sales Playbook Template', description: 'A 10-section sales playbook template covering ICP, discovery framework, value proposition by persona, objection handling, demo script, competitive battle cards, closing techniques, and metrics.', creator: 'The Marqet Team', price: '£9.99', rating: 4.9, reviews: 78, stripeLink: 'https://buy.stripe.com/test_9B6fZabV8aEzf9w0iX7AI22' },
  { id: 217, category: 'Templates', title: 'Content Calendar Template', description: 'A structured content calendar template with content pillars, audience map, channel matrix, monthly posting schedule, post template, seasonal dates, and performance review format.', creator: 'The Marqet Team', price: '£6.99', rating: 4.7, reviews: 104, stripeLink: 'https://buy.stripe.com/test_dRmcMY8IWbIDbXkc1F7AI23' },
  { id: 218, category: 'Templates', title: 'Technical Architecture Template', description: 'A 10-section technical architecture document template covering system overview, technology choices, data model, API design, infrastructure, security, scalability, failure modes, and trade-offs.', creator: 'The Marqet Team', price: '£8.99', rating: 4.8, reviews: 47, stripeLink: 'https://buy.stripe.com/test_aFaeV67ES9Avf9wd5J7AI24' },
  { id: 219, category: 'Templates', title: 'Product Launch Checklist Template', description: 'A week-by-week product launch checklist from T-8 weeks to T+1 month — covering product, marketing, sales enablement, technical readiness, launch day execution, and post-launch review.', creator: 'The Marqet Team', price: '£7.99', rating: 4.9, reviews: 83, stripeLink: 'https://buy.stripe.com/test_eVq6oA8IW3c7bXk6Hl7AI25' },
]

// ─── Bundles (IDs 230–236) ───────────────────────────────────────────────────
const bundles = [
  { id: 230, category: 'Bundles', title: 'Complete Marketing Bundle', description: 'Everything a marketing team needs from Claude — Content Studio add-on, Brand Voice Enforcer, Social Content Repurposer, SEO Content Briefer, plus SaaS Growth Marketing Pack, Content Creator Pack, and PR Pack.', creator: 'The Marqet Team', price: '£24.99', rating: 4.9, reviews: 39, stripeLink: 'https://buy.stripe.com/test_bJedR29N07sn1iG7Lp7AI26' },
  { id: 231, category: 'Bundles', title: 'Startup Founder Bundle', description: 'From pitch to execution — Founder Ops, PM Cockpit, Competitor Analyser, Business Plan Builder, Pitch Deck Critiquer, Investor Relations Writer, Startup Fundraising Pack, and B2B SaaS Pitch Deck Template.', creator: 'The Marqet Team', price: '£34.99', rating: 4.9, reviews: 51, stripeLink: 'https://buy.stripe.com/test_28E28kaR4fYTe5s3v97AI27' },
  { id: 232, category: 'Bundles', title: 'Developer Pro Bundle', description: 'The complete developer toolkit — GitFlow Pro, Security Sweep, Test Forge, Refactor Kit, Code Review Assistant, Technical Debt Assessor, GitHub MCP, SQLite Explorer MCP, and PDF Reader MCP.', creator: 'The Marqet Team', price: '£39.99', rating: 4.9, reviews: 63, stripeLink: 'https://buy.stripe.com/test_7sYeV68IW7sn6D0aXB7AI28' },
  { id: 233, category: 'Bundles', title: 'Small Business Bundle', description: 'Run your small business better — Inbox Zero, Customer Support Pack, Small Business Legal Pack, E-commerce Operations Pack, SOP Document Writer, and Client Proposal Template. Everything in one download.', creator: 'The Marqet Team', price: '£19.99', rating: 4.8, reviews: 44, stripeLink: 'https://buy.stripe.com/test_bJeaEQcZcbID8L8e9N7AI29' },
  { id: 234, category: 'Bundles', title: 'Content Creator Bundle', description: 'For creators who publish consistently — Content Studio, Content Creator Pack, Podcast Production Pack, Social Content Repurposer, Blog Post to Social Campaign workflow, and Content Calendar Template.', creator: 'The Marqet Team', price: '£17.99', rating: 4.8, reviews: 57, stripeLink: 'https://buy.stripe.com/test_4gM7sE9N0bID1iGc1F7AI2a' },
  { id: 235, category: 'Bundles', title: 'HR & People Bundle', description: 'For people teams and managers — HR & Recruiting Pack, Performance Review Writer, Training Material Creator, Meeting Notes Structurer, Sprint Retrospective Facilitator, User Story Writer, and Employee Handbook Template.', creator: 'The Marqet Team', price: '£27.99', rating: 4.9, reviews: 33, stripeLink: 'https://buy.stripe.com/test_9B63coaR49Av3qO1n17AI2b' },
  { id: 236, category: 'Bundles', title: 'Sales Pro Bundle', description: 'Close more deals — Cold Email Writer, Sales Outreach & Closing Pack, Competitor Analyser, Partnership Outreach Writer, Pricing Strategy Advisor, and Sales Playbook Template. The complete sales toolkit.', creator: 'The Marqet Team', price: '£22.99', rating: 4.8, reviews: 46, stripeLink: 'https://buy.stripe.com/test_14AbIUaR48wr6D02r57AI2c' },
]

export const listings = [
  ...placeholders,
  ...addons,
  ...skills,
  ...mcpServers,
  ...promptPacks,
  ...newPromptPacks,
  ...newSkills,
  ...newMCPServers,
  ...workflows,
  ...templates,
  ...bundles,
]
