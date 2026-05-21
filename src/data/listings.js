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
  },
]

export const listings = [
  ...placeholders,
  ...addons,
  ...skills,
  ...mcpServers,
  ...promptPacks,
]
