import LegalLayout from './LegalLayout'

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 2026 — Draft placeholder, final version to be drafted with legal counsel">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-[14px] text-amber-800">
        <strong>Placeholder document.</strong> This policy is a working draft compliant in structure with UK GDPR. Final legally reviewed terms will be published before The Marqet opens to the public.
      </div>

      <h2>1. Who we are</h2>
      <p>The Marqet is operated by Construx Group. We are the data controller for personal information collected through this website. References to "we", "us", or "our" mean Construx Group.</p>
      <p>This policy covers our website at themarqet.com and all associated services.</p>

      <h2>2. What personal data we collect</h2>
      <p>We collect the following categories of personal data:</p>
      <ul>
        <li><strong>Account data:</strong> email address, username, display name, password (hashed).</li>
        <li><strong>Profile data:</strong> bio, website, GitHub URL, avatar — provided voluntarily.</li>
        <li><strong>Transaction data:</strong> purchase history, payout records (for sellers).</li>
        <li><strong>Usage data:</strong> pages visited, add-ons installed, search queries.</li>
        <li><strong>Communications:</strong> messages sent via contact forms, support emails.</li>
        <li><strong>Technical data:</strong> IP address, browser type, device type (for security and analytics).</li>
      </ul>

      <h2>3. How we use your data</h2>
      <ul>
        <li>To provide and operate the marketplace (lawful basis: contract performance).</li>
        <li>To send transactional emails — account confirmation, purchase receipts, review notifications (lawful basis: contract performance).</li>
        <li>To send our newsletter, if you subscribed (lawful basis: consent — you can unsubscribe at any time).</li>
        <li>To improve the platform through analytics (lawful basis: legitimate interests).</li>
        <li>To comply with legal obligations (lawful basis: legal obligation).</li>
      </ul>

      <h2>4. Who we share your data with</h2>
      <ul>
        <li><strong>Supabase:</strong> database and authentication — EU-hosted infrastructure.</li>
        <li><strong>Stripe:</strong> payment processing — they receive the minimum data required for payment.</li>
        <li><strong>AWS:</strong> file storage and hosting.</li>
      </ul>
      <p>We do not sell your personal data to any third party.</p>

      <h2>5. How long we keep your data</h2>
      <p>We retain account data for as long as your account is active. If you delete your account, we delete or anonymise your personal data within 30 days, except where we are legally required to retain it (e.g. transaction records for 6 years under tax law).</p>

      <h2>6. Your rights (UK GDPR)</h2>
      <p>You have the right to: access your data, correct inaccurate data, delete your data, restrict or object to processing, data portability, and to withdraw consent where consent is the lawful basis.</p>
      <p>To exercise any of these rights, email <a href="mailto:privacy@themarqet.com" className="text-accent hover:underline">privacy@themarqet.com</a>. We will respond within 30 days. You also have the right to lodge a complaint with the ICO at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ico.org.uk</a>.</p>

      <h2>7. Cookies</h2>
      <p>We use essential cookies required for the site to function (authentication sessions). We do not use tracking or advertising cookies. See our <a href="/legal/cookies" className="text-accent hover:underline">Cookie Policy</a> for details.</p>

      <h2>8. Security</h2>
      <p>We use industry-standard security measures including encrypted data in transit (HTTPS), hashed passwords, and access controls. In the event of a data breach, we will notify affected users and the ICO within 72 hours as required by UK GDPR.</p>

      <h2>9. Changes to this policy</h2>
      <p>We will notify users of material changes to this policy by email. The latest version is always published at this URL.</p>
    </LegalLayout>
  )
}
