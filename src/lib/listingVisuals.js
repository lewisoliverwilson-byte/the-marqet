import {
  Zap, Server, MessageSquare, GitBranch, Package, Layout,
  GitMerge, Rocket, FlaskConical, BookOpen, ShieldAlert, Scissors, Paintbrush,
  Database, LayoutDashboard, Mail, Building2, Eye, FileCode2, AlertTriangle,
  Braces, ClipboardList, Send, Award, TrendingUp, UserCheck, BarChart3,
  Volume2, Users, Share2, Search, LineChart, Inbox, HardDrive, Table2,
  BookMarked, Calendar, Globe, Bookmark, Clock, DollarSign, Home, ShoppingBag,
  Mic, Briefcase, Headphones, Target, Wallet, GraduationCap, Heart, Radio,
  CalendarCheck, CheckSquare, Scale, FileText, BarChart2, PenLine,
  // New icons for 104 expanded products
  Camera, Music, Trophy, Utensils, Truck, Film, Leaf, Megaphone, Car, Cloud,
} from 'lucide-react'

const LISTING_ICON_MAP = {
  // ── Claude Code command bundles → stat treatment ──────────────────────────
  'GitFlow Pro':      { Icon: GitMerge,       badge: '7 commands' },
  'Release Captain':  { Icon: Rocket,          badge: '6 commands' },
  'Test Forge':       { Icon: FlaskConical,    badge: '5 commands' },
  'Docs Engine':      { Icon: BookOpen,         badge: '6 commands' },
  'Security Sweep':   { Icon: ShieldAlert,     badge: '5 commands' },
  'Refactor Kit':     { Icon: Scissors,         badge: '5 commands' },
  'Frontend Polish':  { Icon: Paintbrush,      badge: '5 commands' },
  'Data Ops':         { Icon: Database,         badge: '5 commands' },
  'PM Cockpit':       { Icon: LayoutDashboard, badge: '6 commands' },
  'Content Studio':   { Icon: PenLine,          badge: '5 commands' },
  'Inbox Zero':       { Icon: Mail,             badge: '5 commands' },
  'Founder Ops':      { Icon: Building2,        badge: '5 commands' },

  // ── Claude Skills (system prompt style) → abstract treatment ─────────────
  'Accessibility Auditor':        { Icon: Eye },
  'API Contract Tester':          { Icon: FileCode2 },
  'Migration Safeguard':          { Icon: ShieldAlert },
  'Dependency Upgrader':          { Icon: TrendingUp },
  'Incident Postmortem Writer':   { Icon: AlertTriangle },
  'Regex Crafter':                { Icon: Braces },
  'Error Message Improver':       { Icon: MessageSquare },
  'Contract Reviewer':            { Icon: Scale },
  'Meeting Notes Structurer':     { Icon: ClipboardList },
  'Cold Email Writer':            { Icon: Send },
  'Grant Proposal Drafter':       { Icon: Award },
  'Financial Statement Analyser': { Icon: BarChart3 },
  'Job Application Tailor':       { Icon: UserCheck },
  'Competitor Analyser':          { Icon: BarChart2 },
  'Brand Voice Enforcer':         { Icon: Volume2 },
  'User Research Synthesiser':    { Icon: Users },
  'Social Content Repurposer':    { Icon: Share2 },
  'SEO Content Briefer':          { Icon: Search },
  'Data Story Teller':            { Icon: LineChart },
  'Email Inbox Triager':          { Icon: Inbox },

  // ── New Claude Skills (IDs 140–164) → abstract treatment ─────────────────
  'Code Review Assistant':         { Icon: Eye },
  'Database Schema Designer':      { Icon: Database },
  'Sprint Retrospective Facilitator': { Icon: Users },
  'OKR Setting Coach':             { Icon: Target },
  'System Design Explainer':       { Icon: LayoutDashboard },
  'Architecture Decision Recorder': { Icon: FileText },
  'API Documentation Writer':      { Icon: FileCode2 },
  'Technical Debt Assessor':       { Icon: AlertTriangle },
  'Bug Report Analyst':            { Icon: AlertTriangle },
  'User Story Writer':             { Icon: ClipboardList },
  'Performance Review Writer':     { Icon: BarChart3 },
  'Press Release Drafter':         { Icon: Megaphone },
  'Pitch Deck Critiquer':          { Icon: Award },
  'Market Research Analyst':       { Icon: BarChart2 },
  'Business Plan Builder':         { Icon: Building2 },
  'Risk Assessment Writer':        { Icon: ShieldAlert },
  'Change Management Guide':       { Icon: TrendingUp },
  'Training Material Creator':     { Icon: GraduationCap },
  'SOP Document Writer':           { Icon: FileText },
  'Customer Journey Mapper':       { Icon: Target },
  'A/B Test Designer':             { Icon: FlaskConical },
  'Pricing Strategy Advisor':      { Icon: DollarSign },
  'Partnership Outreach Writer':   { Icon: Send },
  'Investor Relations Writer':     { Icon: TrendingUp },
  'Executive Summary Writer':      { Icon: FileText },

  // ── MCP Servers (original, IDs 60–67) → terminal treatment ───────────────
  'Local Knowledge Base MCP': { Icon: HardDrive,  snippet: '> search "quarterly report"' },
  'SQLite Explorer MCP':       { Icon: Table2,     snippet: '> query users LIMIT 10' },
  'Obsidian Vault MCP':        { Icon: BookMarked, snippet: '> note "team meeting"' },
  'iCal Calendar MCP':         { Icon: Calendar,   snippet: '> events today' },
  'Web Clipper MCP':           { Icon: Globe,      snippet: '> clip example.com/blog' },
  'CSV Analytics MCP':         { Icon: BarChart3,  snippet: '> query data.csv' },
  'Bookmark Manager MCP':      { Icon: Bookmark,   snippet: '> find "react hooks"' },
  'Time Tracker MCP':          { Icon: Clock,      snippet: '> timer start coding' },

  // ── New MCP Servers (IDs 170–181) → terminal treatment ───────────────────
  'GitHub MCP':          { Icon: GitMerge,   snippet: '> list repos owner/project' },
  'Notion MCP':          { Icon: FileText,   snippet: '> search "Q3 roadmap"' },
  'Google Calendar MCP': { Icon: Calendar,   snippet: '> events this week' },
  'Jira MCP':            { Icon: ClipboardList, snippet: '> issues sprint 12' },
  'Linear MCP':          { Icon: Target,     snippet: '> cycle ENG-42 status' },
  'Airtable MCP':        { Icon: Table2,     snippet: '> query CRM limit 20' },
  'Todoist MCP':         { Icon: CheckSquare, snippet: '> tasks overdue' },
  'RSS Feed MCP':        { Icon: Radio,      snippet: '> feed techcrunch latest' },
  'Weather MCP':         { Icon: Cloud,      snippet: '> forecast London 3d' },
  'HackerNews MCP':      { Icon: TrendingUp, snippet: '> top stories today' },
  'Spotify MCP':         { Icon: Music,      snippet: '> now playing' },
  'PDF Reader MCP':      { Icon: FileText,   snippet: '> read contract.pdf' },

  // ── Original Prompt Packs (IDs 80–99) → stat treatment ───────────────────
  'Startup Fundraising Pack':      { Icon: DollarSign,     badge: '12 prompts' },
  'SaaS Growth Marketing Pack':    { Icon: TrendingUp,     badge: '12 prompts' },
  'Real Estate Agent Pack':        { Icon: Home,            badge: '12 prompts' },
  'E-commerce Operations Pack':    { Icon: ShoppingBag,    badge: '12 prompts' },
  'Content Creator Pack':          { Icon: Mic,             badge: '12 prompts' },
  'Job Search & Career Pack':      { Icon: Briefcase,       badge: '12 prompts' },
  'Customer Support Pack':         { Icon: Headphones,      badge: '12 prompts' },
  'Sales Outreach & Closing Pack': { Icon: Target,          badge: '12 prompts' },
  'Personal Finance Pack':         { Icon: Wallet,          badge: '12 prompts' },
  'Product Management Pack':       { Icon: LayoutDashboard, badge: '12 prompts' },
  'HR & Recruiting Pack':          { Icon: Users,           badge: '12 prompts' },
  'Small Business Legal Pack':     { Icon: Scale,           badge: '12 prompts' },
  'Teacher & Educator Pack':       { Icon: GraduationCap,   badge: '12 prompts' },
  'Freelancer & Agency Pack':      { Icon: Briefcase,       badge: '12 prompts' },
  'Wellness & Coaching Pack':      { Icon: Heart,           badge: '12 prompts' },
  'Nonprofit Operations Pack':     { Icon: Heart,           badge: '12 prompts' },
  'Podcast Production Pack':       { Icon: Radio,           badge: '12 prompts' },
  'Event Planning Pack':           { Icon: CalendarCheck,   badge: '12 prompts' },
  'Technical Writing Pack':        { Icon: FileText,        badge: '12 prompts' },
  'Personal Productivity Pack':    { Icon: CheckSquare,     badge: '12 prompts' },

  // ── New Prompt Packs (IDs 100–139) → stat treatment ──────────────────────
  'Architecture & Interior Design Pack': { Icon: Home,          badge: '12 prompts' },
  'Legal Research Pack':                 { Icon: Scale,          badge: '12 prompts' },
  'Investment & Wealth Management Pack': { Icon: TrendingUp,     badge: '12 prompts' },
  'Restaurant & Hospitality Pack':       { Icon: Utensils,       badge: '12 prompts' },
  'Travel Planning & Tourism Pack':      { Icon: Globe,          badge: '12 prompts' },
  'Construction & Trades Pack':          { Icon: Home,           badge: '12 prompts' },
  'Fashion & Retail Pack':               { Icon: ShoppingBag,    badge: '12 prompts' },
  'Gaming & Esports Pack':               { Icon: Trophy,         badge: '12 prompts' },
  'Parenting & Family Pack':             { Icon: Heart,          badge: '12 prompts' },
  'Mental Health Coaching Pack':         { Icon: Heart,          badge: '12 prompts' },
  'Academic Research Pack':              { Icon: GraduationCap,  badge: '12 prompts' },
  'Healthcare Administration Pack':      { Icon: Briefcase,      badge: '12 prompts' },
  'Automotive Services Pack':            { Icon: Car,            badge: '12 prompts' },
  'Photography & Videography Pack':      { Icon: Camera,         badge: '12 prompts' },
  'Music Production Pack':               { Icon: Music,          badge: '12 prompts' },
  'Sports Coaching Pack':                { Icon: Trophy,         badge: '12 prompts' },
  'Pet Care & Veterinary Pack':          { Icon: Heart,          badge: '12 prompts' },
  'Consulting & Advisory Pack':          { Icon: Briefcase,      badge: '12 prompts' },
  'Accounting & Bookkeeping Pack':       { Icon: BarChart3,      badge: '12 prompts' },
  'Cybersecurity Awareness Pack':        { Icon: ShieldAlert,    badge: '12 prompts' },
  'DevOps & Platform Engineering Pack':  { Icon: Server,         badge: '12 prompts' },
  'UX Research & Design Pack':           { Icon: Paintbrush,     badge: '12 prompts' },
  'Executive Leadership Pack':           { Icon: Building2,      badge: '12 prompts' },
  'Community Management Pack':           { Icon: Users,          badge: '12 prompts' },
  'Cooking & Food Business Pack':        { Icon: Utensils,       badge: '12 prompts' },
  'Home & DIY Improvement Pack':         { Icon: Home,           badge: '12 prompts' },
  'Sustainability & ESG Pack':           { Icon: Leaf,           badge: '12 prompts' },
  'Immigration & Relocation Pack':       { Icon: Globe,          badge: '12 prompts' },
  'Retirement & Estate Planning Pack':   { Icon: Wallet,         badge: '12 prompts' },
  'Charity & Fundraising Pack':          { Icon: Heart,          badge: '12 prompts' },
  'Language Learning Pack':              { Icon: MessageSquare,  badge: '12 prompts' },
  'Film & TV Production Pack':           { Icon: Film,           badge: '12 prompts' },
  'Publishing & Author Pack':            { Icon: BookOpen,       badge: '12 prompts' },
  'Logistics & Supply Chain Pack':       { Icon: Truck,          badge: '12 prompts' },
  'Customer Success Pack':               { Icon: Headphones,     badge: '12 prompts' },
  'Recruitment Agency Pack':             { Icon: UserCheck,      badge: '12 prompts' },
  'Science & Lab Research Pack':         { Icon: FlaskConical,   badge: '12 prompts' },
  'Insurance & Risk Pack':               { Icon: Scale,          badge: '12 prompts' },
  'Public Relations Pack':               { Icon: Megaphone,      badge: '12 prompts' },
  'Political & Policy Writing Pack':     { Icon: FileText,       badge: '12 prompts' },

  // ── Workflows (IDs 190–199) → abstract treatment ──────────────────────────
  'Blog Post to Social Campaign':         { Icon: Share2 },
  'Lead Capture to CRM Entry':            { Icon: UserCheck },
  'Weekly Team Standup Digest':           { Icon: ClipboardList },
  'Customer Feedback Triage Pipeline':    { Icon: MessageSquare },
  'Job Application Tracking Workflow':    { Icon: Briefcase },
  'Monthly Financial Review Workflow':    { Icon: BarChart3 },
  'Content Audit & Refresh Workflow':     { Icon: Search },
  'Bug Triage to Sprint Ticket Workflow': { Icon: AlertTriangle },
  'New Employee Onboarding Workflow':     { Icon: Users },
  'Press Release Distribution Workflow':  { Icon: Send },

  // ── Templates (IDs 210–219) → abstract treatment ─────────────────────────
  'B2B SaaS Pitch Deck Template':       { Icon: TrendingUp },
  'Business Plan Template':             { Icon: Building2 },
  'Marketing Strategy Template':        { Icon: Target },
  'Employee Handbook Template':         { Icon: Users },
  'Client Proposal Template':           { Icon: Briefcase },
  'OKR Setting Template':               { Icon: Target },
  'Sales Playbook Template':            { Icon: BarChart2 },
  'Content Calendar Template':          { Icon: Calendar },
  'Technical Architecture Template':    { Icon: Database },
  'Product Launch Checklist Template':  { Icon: CheckSquare },

  // ── Bundles → grid treatment ──────────────────────────────────────────────
  'Developer Starter Bundle':   { Icon: Package, gridIcons: [GitMerge, ShieldAlert, FlaskConical, Database] },
  'Complete Marketing Bundle':  { Icon: Package, gridIcons: [PenLine, Share2, Search, Mic] },
  'Startup Founder Bundle':     { Icon: Package, gridIcons: [Building2, LayoutDashboard, BarChart2, DollarSign] },
  'Developer Pro Bundle':       { Icon: Package, gridIcons: [GitMerge, ShieldAlert, FlaskConical, Eye] },
  'Small Business Bundle':      { Icon: Package, gridIcons: [Mail, Headphones, Scale, ShoppingBag] },
  'Content Creator Bundle':     { Icon: Package, gridIcons: [PenLine, Mic, Radio, Share2] },
  'HR & People Bundle':         { Icon: Package, gridIcons: [Users, BarChart3, ClipboardList, GraduationCap] },
  'Sales Pro Bundle':           { Icon: Package, gridIcons: [Send, Target, BarChart2, DollarSign] },

  // ── Placeholder listings (IDs 1–3) ───────────────────────────────────────
  'Weekly Report Automator':  { Icon: BarChart3 },
  'SaaS Onboarding Template': { Icon: Building2 },
}

const CATEGORY_GRADIENTS = {
  'Claude Skills': [
    'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    'linear-gradient(135deg, #2563EB 0%, #4B8EF0 100%)',
    'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
    'linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)',
    'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
  ],
  'MCP Servers': [
    'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
    'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
    'linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%)',
    'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)',
  ],
  'Prompt Packs': [
    'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)',
    'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
    'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)',
    'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    'linear-gradient(135deg, #0E7490 0%, #0891B2 100%)',
  ],
  'Workflows': ['linear-gradient(135deg, #10B981 0%, #34D399 100%)'],
  'Templates': ['linear-gradient(135deg, #EC4899 0%, #F472B6 100%)'],
  'Bundles':   ['linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)'],
}

const CATEGORY_FALLBACK = {
  'Claude Skills': Zap, claude_skill: Zap,
  'MCP Servers': Server, mcp_server: Server,
  'Prompt Packs': MessageSquare, prompt_pack: MessageSquare,
  'Workflows': GitBranch, workflow: GitBranch,
  'Templates': Layout, template: Layout,
  'Bundles': Package, bundle: Package,
}

const BUNDLE_GRID_FALLBACK = [Zap, Server, GitBranch, Package]

export function getListingVisual(listing) {
  const titleConfig = LISTING_ICON_MAP[listing.title] ?? {}
  const Icon = titleConfig.Icon ?? CATEGORY_FALLBACK[listing.category] ?? Zap
  const badge = titleConfig.badge ?? null
  const snippet = titleConfig.snippet ?? null
  const gridIcons = titleConfig.gridIcons ?? BUNDLE_GRID_FALLBACK
  const gradients = CATEGORY_GRADIENTS[listing.category] ?? CATEGORY_GRADIENTS['Claude Skills']
  const gradient = gradients[(listing.id ?? 0) % gradients.length]
  return { Icon, badge, snippet, gridIcons, gradient }
}

export function getTreatment(listing, visual) {
  if (listing.category === 'MCP Servers' || listing.category === 'mcp_server') return 'terminal'
  if (listing.category === 'Bundles' || listing.category === 'bundle') return 'grid'
  if (visual.badge) return 'stat'
  return 'abstract'
}
