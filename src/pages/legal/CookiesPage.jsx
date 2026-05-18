import LegalLayout from './LegalLayout'

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="May 2026 — Draft placeholder">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-[14px] text-amber-800">
        <strong>Placeholder document.</strong> Final version to be reviewed with legal counsel before public launch.
      </div>

      <h2>1. What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit.</p>

      <h2>2. Cookies we use</h2>
      <p>The Marqet uses only essential cookies necessary for the site to function. We do not use advertising, tracking, or analytics cookies that require consent under PECR.</p>

      <table className="w-full text-[13px] border border-border rounded-xl overflow-hidden mb-4">
        <thead className="bg-surface">
          <tr>
            <th className="text-left px-4 py-2 font-semibold text-primary">Cookie</th>
            <th className="text-left px-4 py-2 font-semibold text-primary">Purpose</th>
            <th className="text-left px-4 py-2 font-semibold text-primary">Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border">
            <td className="px-4 py-2 font-mono text-dark-mid">sb-auth-token</td>
            <td className="px-4 py-2 text-dark-mid">Authentication session — keeps you logged in</td>
            <td className="px-4 py-2 text-muted">Session / 1 week</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-2 font-mono text-dark-mid">marqet:waitlist-intent</td>
            <td className="px-4 py-2 text-dark-mid">Remembers whether you clicked "Apply to Sell" so the waitlist form pre-selects the seller option</td>
            <td className="px-4 py-2 text-muted">Session (sessionStorage)</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Third-party cookies</h2>
      <p>Stripe may set cookies when you complete a payment. These are strictly necessary for payment processing and are governed by <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Stripe's privacy policy</a>.</p>

      <h2>4. Managing cookies</h2>
      <p>You can control cookies through your browser settings. Blocking essential cookies may prevent the site from functioning correctly (for example, you won't be able to stay logged in).</p>

      <h2>5. No cookie banner required</h2>
      <p>Because we only use essential cookies, we are not required to display a cookie consent banner under PECR. If we introduce any non-essential cookies in future, we will update this policy and add appropriate consent mechanisms.</p>
    </LegalLayout>
  )
}
