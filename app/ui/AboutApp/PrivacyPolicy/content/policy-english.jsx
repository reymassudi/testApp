'use server';

import { getTranslations } from 'next-intl/server';

export default async function PolicyEnglish() {
  const t = await getTranslations();

  return (
    <>
      <p className="mb-2">Last Updated: 1 APRIL 2025</p>
      <div>
        <b>1. Who We Are</b> {t('company_name')} ("Company," "we," "our," or
        "us") is a pregnancy assistant application powered by AI. This Privacy
        Policy explains how we collect, use, disclose, and protect information
        about users of our services, including our mobile application and
        website (collectively, "Services").
      </div>

      <div>
        <b>2. Information We Collect</b> We collect various types of information
        to provide and improve our Services:
        <ul>
          <li>
            <b>Personal Information:</b> Name, email, and other details provided
            during registration.
          </li>
          <li>
            <b>Health-Related Information:</b> Any pregnancy-related questions
            or data users input into the app.
          </li>
          <li>
            <b>Device Information:</b> Browser type, IP address, operating
            system, and cookies.
          </li>
          <li>
            <b>Usage Data:</b> Interactions with the Services, including
            features accessed and session durations.
          </li>
        </ul>
      </div>

      <div>
        <b>3. How We Use Information</b> We use the collected information to:
        <ul>
          <li>Provide, personalize, and improve our Services.</li>
          <li>Analyze user behavior to enhance AI recommendations.</li>
          <li>Ensure security and prevent fraudulent activities.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </div>

      <div>
        <b>4. Information Sharing</b> We do <b>not</b> sell personal data.
        However, we may share user information:
        <ul>
          <li>
            With service providers assisting us in delivering the Services.
          </li>
          <li>To comply with legal requirements or protect our rights.</li>
          <li>
            In cases of business transfers, such as mergers or acquisitions.
          </li>
        </ul>
      </div>
      <div>
        <b>5. Data Security</b> While we take reasonable measures to protect
        user information, we <b>cannot guarantee</b> absolute security. Users
        assume responsibility for their data transmission and device security.
      </div>
      <div>
        <b>6. User Rights</b> Depending on applicable laws, users may have
        rights to:
        <ul>
          <li>Access, correct, or delete their personal data.</li>
          <li>Object to data processing.</li>
          <li>Withdraw consent for data usage.</li>
        </ul>
        For inquiries about data handling, contact us at info@nextgenai.ir
      </div>
      <div>
        <b>7. Changes to This Policy</b> We may update this Privacy Policy from
        time to time. Continued use of the Services after any changes
        constitutes acceptance of the revised policy.
      </div>
    </>
  );
}
