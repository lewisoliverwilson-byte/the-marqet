import {
  Zap, Server, MessageSquare, GitBranch, Package, Layout,
  GitMerge, Rocket, FlaskConical, BookOpen, ShieldAlert, Scissors, Paintbrush,
  Database, LayoutDashboard, Mail, Building2, Eye, FileCode2, AlertTriangle,
  Braces, ClipboardList, Send, Award, TrendingUp, UserCheck, BarChart3,
  Volume2, Users, Share2, Search, LineChart, Inbox, HardDrive, Table2,
  BookMarked, Calendar, Globe, Bookmark, Clock, DollarSign, Home, ShoppingBag,
  Mic, Briefcase, Headphones, Target, Wallet, GraduationCap, Heart, Radio,
  CalendarCheck, CheckSquare, Scale, FileText, BarChart2, PenLine,
} from 'lucide-react'

const LISTING_ICON_MAP = {
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
  'Local Knowledge Base MCP': { Icon: HardDrive },
  'SQLite Explorer MCP':       { Icon: Table2 },
  'Obsidian Vault MCP':        { Icon: BookMarked },
  'iCal Calendar MCP':         { Icon: Calendar },
  'Web Clipper MCP':           { Icon: Globe },
  'CSV Analytics MCP':         { Icon: BarChart3 },
  'Bookmark Manager MCP':      { Icon: Bookmark },
  'Time Tracker MCP':          { Icon: Clock },
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

export function getListingVisual(listing) {
  const titleConfig = LISTING_ICON_MAP[listing.title]
  const Icon = titleConfig?.Icon ?? CATEGORY_FALLBACK[listing.category] ?? Zap
  const badge = titleConfig?.badge ?? null
  const gradients = CATEGORY_GRADIENTS[listing.category] ?? CATEGORY_GRADIENTS['Claude Skills']
  const gradient = gradients[(listing.id ?? 0) % gradients.length]
  return { Icon, badge, gradient }
}
