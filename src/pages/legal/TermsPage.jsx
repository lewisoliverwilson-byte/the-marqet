import LegalLayout from './LegalLayout'

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="May 2026 — Draft placeholder, final version to be drafted with legal counsel">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-[14px] text-amber-800">
        <strong>Placeholder document.</strong> These terms are a working draft. Final legally reviewed terms will be published before The Marqet opens to the public.
      </div>

      <h2>1. About The Marqet</h2>
      <p>The Marqet is a marketplace for AI add-ons operated by Construx Group. By accessing or using The Marqet, you agree to these Terms of Service. The Marqet is not affiliated with Anthropic PBC.</p>

      <h2>2. Your account</h2>
      <p>You must be 18 or older to create an account. You are responsible for maintaining the security of your account credentials. You may not transfer your account to another person.</p>
      <p>We reserve the right to suspend or terminate accounts that violate these terms or our Acceptable Use Policy.</p>

      <h2>3. Buying add-ons</h2>
      <p>Paid add-ons are charged at the price displayed. Prices include VAT where applicable. By completing a purchase, you consent to immediate digital delivery and waive your 14-day cooling-off right under the Consumer Contracts Regulations 2013.</p>
      <p>Add-ons must match their description and be fit for purpose under the Consumer Rights Act 2015. If you believe a purchase does not meet this standard, contact us.</p>

      <h2>4. Selling add-ons</h2>
      <p>Sellers must agree to a separate Seller Agreement before listing paid add-ons. The Marqet charges a 20% platform commission on all paid sales. Payouts are processed monthly via Stripe.</p>
      <p>Every submission is reviewed before going live. We may remove add-ons at our discretion if they violate these terms or our Acceptable Use Policy.</p>

      <h2>5. Custom commission service</h2>
      <p>We offer a custom build service for buyers who need bespoke AI add-ons. All custom projects are scoped and priced individually. A separate engagement agreement governs each project.</p>

      <h2>6. Intellectual property</h2>
      <p>Sellers retain ownership of their submitted add-ons. By listing on The Marqet, sellers grant us a licence to display, distribute, and market their add-on on the platform. Sellers confirm they own or have rights to all submitted content.</p>
      <p>The Marqet's branding, design, and platform code are owned by Construx Group.</p>

      <h2>7. Liability</h2>
      <p>Add-ons are provided by third-party developers. The Marqet is not liable for the performance, safety, or fitness for purpose of third-party add-ons beyond what is required by law. We vet all submissions but do not guarantee they are free of defects.</p>

      <h2>8. Governing law</h2>
      <p>These terms are governed by the laws of England and Wales. Any disputes are subject to the exclusive jurisdiction of the courts of England and Wales.</p>

      <h2>9. Changes to these terms</h2>
      <p>We may update these terms at any time. We will notify registered users of material changes by email. Continued use of The Marqet after notification constitutes acceptance of the updated terms.</p>
    </LegalLayout>
  )
}
