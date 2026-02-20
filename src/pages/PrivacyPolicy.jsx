import LegalLayout from "./LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" subtitle="Your Trust is Our Heritage">
      <section>
        <h2 className="text-brand-dark font-luxury uppercase tracking-widest text-sm mb-4">I. Data Collection</h2>
        <p>
          At Oyinmax, we respect the sanctity of your personal data. We collect information only to enhance your bespoke experience, including your name, contact details, and measurements for tailored pieces.
        </p>
      </section>

      <section>
        <h2 className="text-brand-dark font-luxury uppercase tracking-widest text-sm mb-4">II. Security of Information</h2>
        <p>
          Your data is encrypted and stored with the same care we give to our textiles. We use industry-standard SSL encryption to ensure that your private transactions remain private.
        </p>
      </section>

      <section>
        <h2 className="text-brand-dark font-luxury uppercase tracking-widest text-sm mb-4">III. Third-Party Sharing</h2>
        <p>
          We do not sell or trade your information. Data is only shared with trusted partners (like global couriers) necessary to deliver your collection items.
        </p>
      </section>
    </LegalLayout>
  );
}