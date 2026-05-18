import Logo from '../brand/Logo'

const footerLinks = {
  Marketplace: [
    'Browse All',
    'Claude Skills',
    'MCP Servers',
    'Prompt Packs',
    'Workflows',
    'Templates',
    'Bundles',
  ],
  Sellers: [
    'Sell Your Work',
    'Seller Programme',
    'Listing Guidelines',
    'Pricing & Commission',
    { label: 'Seller Dashboard', badge: 'coming soon' },
  ],
  Company: [
    'About The Marqet',
    'Construx Group',
    'Contact',
    'Privacy Policy',
    'Terms of Service',
  ],
}

function FooterLink({ item }) {
  const label = typeof item === 'string' ? item : item.label
  const badge = typeof item === 'object' ? item.badge : null

  return (
    <li>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="text-[14px] text-muted hover:text-white transition-colors duration-150 flex items-center gap-2"
      >
        {label}
        {badge && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-dark-mid">
            {badge}
          </span>
        )}
      </a>
    </li>
  )
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-primary">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Column 1: brand */}
          <div>
            <Logo size="sm" reversed className="mb-4" />
            <p className="text-[14px] text-muted leading-relaxed">
              The AI add-on marketplace.
              <br />
              Built by Construx Group.
            </p>
          </div>

          {/* Columns 2–4: links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[13px] font-semibold uppercase tracking-widest2 text-surface mb-4">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                {links.map((link, i) => (
                  <FooterLink key={i} item={link} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid #1F1F1F' }}
        >
          <p className="text-[13px] text-dark-mid">
            © {new Date().getFullYear()} Construx Group. Not affiliated with Anthropic.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-label="The Marqet on X (Twitter)"
              className="text-dark-mid hover:text-white transition-colors duration-150"
            >
              <TwitterIcon />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-label="The Marqet on GitHub"
              className="text-dark-mid hover:text-white transition-colors duration-150"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
