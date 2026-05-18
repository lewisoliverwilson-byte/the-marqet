import LegalLayout from './LegalLayout'

export default function AcceptableUsePage() {
  return (
    <LegalLayout title="Acceptable Use Policy" lastUpdated="May 2026 — Draft placeholder">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-[14px] text-amber-800">
        <strong>Placeholder document.</strong> Final version to be reviewed with legal counsel before public launch.
      </div>

      <h2>1. What this policy covers</h2>
      <p>This Acceptable Use Policy (AUP) sets out the content and behaviour standards that apply to all add-ons submitted to The Marqet and all users of the platform. It supplements our Terms of Service.</p>

      <h2>2. What is permitted</h2>
      <p>The Marqet has a permissive content policy within the bounds of UK law. We support legitimate edge cases that some other platforms restrict, including:</p>
      <ul>
        <li>Security research and penetration testing skills (for lawful, authorised use).</li>
        <li>Competitive intelligence and market research tools.</li>
        <li>Adult creative writing assistance (for verified adult users).</li>
        <li>Highly specific or niche professional workflows.</li>
      </ul>

      <h2>3. What is strictly prohibited</h2>
      <p>The following content and uses are prohibited regardless of framing or stated intent:</p>
      <ul>
        <li>Content that sexualises or exploits minors under any framing.</li>
        <li>Content designed to harass, dox, stalk, or threaten identifiable individuals.</li>
        <li>Skills that facilitate the production of weapons, hard-controlled substances, or attacks on real infrastructure.</li>
        <li>Skills designed for fraud, phishing, malware distribution, or unauthorised system access.</li>
        <li>Pirated software, leaked credentials, or tools designed to violate third-party Terms of Service.</li>
        <li>Content that violates UK law, including Online Safety Act priority harmful content categories.</li>
        <li>Redistribution of Anthropic's source-available skill documents (docx, pdf, pptx, xlsx files from the anthropics/skills repository).</li>
        <li>Content designed to circumvent Anthropic's Usage Policy in ways that could harm users or third parties.</li>
      </ul>

      <h2>4. Review and enforcement</h2>
      <p>Every submission is reviewed by our team before going live. We check for quality, safety, originality, and compliance with this policy.</p>
      <p>Any user may report a published add-on using the report button on the skill's detail page. Reported add-ons are suspended from public listing pending review. We aim to complete investigations within 24 hours.</p>

      <h2>5. Consequences of violations</h2>
      <ul>
        <li>Minor violations: content removed, developer notified with reason.</li>
        <li>Serious violations: permanent removal, developer account suspended, possible referral to authorities.</li>
        <li>Serious incidents: anonymous public incident log published.</li>
      </ul>

      <h2>6. Reviews and ratings</h2>
      <p>Under the Digital Markets, Competition and Consumers Act 2024, fake or incentivised reviews are illegal. You may not:</p>
      <ul>
        <li>Post a review for an add-on you have not installed.</li>
        <li>Offer or accept incentives in exchange for reviews.</li>
        <li>Coordinate mass-downvoting or review-bombing campaigns.</li>
      </ul>

      <h2>7. Anthropic trademark and IP</h2>
      <p>"CLAUDE" is a registered trademark of Anthropic PBC. Descriptive use ("skills for Claude") is permitted. You may not use the Claude logo, imply Anthropic endorsement, or include "Claude" in a product name without authorisation. All add-ons must carry a "Not affiliated with Anthropic" disclaimer where required.</p>

      <h2>8. Reporting violations</h2>
      <p>To report an add-on, use the report button on its detail page. To report account-level abuse or urgent safety concerns, email <a href="mailto:safety@themarqet.com" className="text-accent hover:underline">safety@themarqet.com</a>.</p>
    </LegalLayout>
  )
}
