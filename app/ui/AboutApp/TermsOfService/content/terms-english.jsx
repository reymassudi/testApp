'use server';

import { getTranslations } from 'next-intl/server';

export default async function TermsEnglish() {
  const t = await getTranslations();

  return (
    <>
      <p className="mb-2">Effective Date: 1 APRIL 2025 </p>
      <div>
        Welcome to {t('app_name')}, your AI-powered pregnancy assistant! These
        Terms of Service govern your use of the {t('app_name')} mobile
        application, owned and operated by {t('app_company_name')}. By
        downloading, installing, or using the App, you agree to comply with and
        be bound by these Terms. If you do not agree with these Terms, you must
        not use the App.
      </div>
      <p>1. Acceptance of Terms</p>
      <div>
        By accessing or using the {t('app_name')} App, you agree to these Terms
        and any applicable laws and regulations. If you do not agree with these
        Terms, you are prohibited from using the App.{' '}
      </div>
      <p>2. Privacy Policy</p>
      <div>
        Your use of the {t('app_name')} App is also governed by our Privacy
        Policy, which outlines how we collect, use, and store your data. You
        consent to the practices described in the Privacy Policy by using the
        App. We are committed to compliance with applicable data protection
        laws, including the UK GDPR, EU GDPR, and (where applicable) HIPAA. You
        have the right to access, rectify, or request deletion of your personal
        data at any time. For more information, please refer to our Privacy
        Policy.
      </div>
      <p>3. Description of Service</p>
      <div>
        {t('app_name')} is a pregnancy assistant app that provides personalized
        guidance, tracking, and support throughout pregnancy using AI. The App
        offers advice, reminders, and helpful information to assist mothers
        during their pregnancy journey. The service includes tools such as:
        <ul>
          <li>AI-driven personalized pregnancy tracking</li>
          <li>Health tips and advice based on individual progress</li>
          <li>
            Regular reminders and notifications regarding appointments, tests,
            and milestones
          </li>
          <li>Access to community resources and expert consultations</li>
        </ul>
        <b>
          Important Notice: The information provided by the App is for
          informational and educational purposes only. It is not intended to
          replace professional medical advice, diagnosis, or treatment. Always
          consult your physician or qualified healthcare provider with any
          questions regarding a medical condition. Never disregard or delay
          seeking professional advice because of information obtained from the
          App.
        </b>
      </div>
      <p>4. Account Creation and Security</p>
      <div>
        To use the App, you may need to create an account. You agree to provide
        accurate, current, and complete information during registration and to
        update such information as necessary. You are responsible for
        maintaining the confidentiality of your account credentials and for all
        activities that occur under your account.
      </div>
      <p>5. Use of the App</p>
      <div>
        You may use the App solely for personal, non-commercial purposes and in
        accordance with these Terms. You are prohibited from:
        <ul>
          <li>Using the App for unlawful activities</li>
          <li>
            Reproducing, modifying, distributing, or selling any part of the App
            without prior consent
          </li>
          <li>
            Interfering with the proper functioning of the App or disrupting
            other users' access
          </li>
          <li>Uploading harmful content, including viruses or malware</li>
          <li>Violating the intellectual property rights of others</li>
        </ul>
      </div>
      <p>6. Third-Party Services</p>
      <div>
        The App may include services, plugins, or applications developed by
        third parties ("Third-Party Services"). If you use any Third-Party
        Services, you acknowledge and agree that:
        <ul>
          <li>
            {t('app_company_name')} does not endorse or control these service
          </li>
          <li>
            You are responsible for reviewing the third party’s terms and
            privacy policies
          </li>
          <li>
            We are not liable for any issues arising from the use of these
            services
          </li>
        </ul>
      </div>
      <p>7. Copyright and Intellectual Property</p>
      <div>
        All intellectual property rights related to the App, including software,
        designs, logos, trademarks, and content, are owned by or licensed to{' '}
        {t('app_company_name')}. You may not use, reproduce, modify, or
        distribute these materials without our express written consent.
      </div>
      <p>8. Payment and Fees</p>
      <div>
        Certain features of the App may require payment. By subscribing to or
        purchasing such features, you agree to the applicable payment terms.{' '}
        {t('app_company_name')} reserves the right to change pricing, payment
        models, or introduce new fees at any time, provided you are notified in
        advance.
      </div>
      <p>9. Termination</p>
      <div>
        {t('app_company_name')} reserves the right to terminate or suspend your
        access to the App at any time, with or without cause, with or without
        notice, if you violate these Terms. In the event of termination, your
        right to use the App will immediately cease, and you may not be entitled
        to any refund of payments made.
      </div>
      <p>10. Disclaimers</p>
      <div>
        The App and its content are provided "as is" without warranties of any
        kind, either express or implied. {t('app_company_name')} does not
        warrant that the App will be uninterrupted, error-free, or free of
        harmful components.
        <br />
        The App does not provide medical advice. All health-related content is
        general in nature and not a substitute for professional medical
        evaluation. {t('app_company_name')} is not liable for any decisions made
        by users based on the information provided by the App.
      </div>
      <p>11. Limitation of Liability</p>
      <div>
        In no event shall {t('app_company_name')} be liable for any indirect,
        incidental, consequential, or special damages arising from your use of
        the App. {t('app_company_name')}’s total liability will not exceed the
        amount you have paid for the App, if applicable.
        <br />
        We do not accept liability for health outcomes resulting from reliance
        on AI-generated content or failure to seek proper medical attention.
      </div>
      <p>12. Indemnification</p>
      <div>
        You agree to indemnify and hold {t('app_company_name')} harmless from
        any claims, damages, liabilities, and expenses arising from your use of
        the App, your violation of these Terms, or your violation of any
        third-party rights.
      </div>
      <p>13. Changes to Terms</p>
      <div>
        {t('app_company_name')} reserves the right to update these Terms at any
        time. If any material changes are made, we will notify you through the
        App, by email, or other communication channels. The new Terms will take
        effect after the specified notice period or when you continue using the
        App, whichever comes first.
      </div>
      <p>14. Governing Law</p>
      <div>
        These Terms are governed by and construed under the laws of England and
        Wales, United Kingdom. Any disputes arising from or relating to these
        Terms will be resolved in the appropriate courts of England and Wales
      </div>
      <p>15. Class Action Waiver</p>
      <div>
        You agree that any claims will be brought individually and not as part
        of a class or representative action. Arbitration may not consolidate or
        join multiple claims.
      </div>
      <p>16. Termination of Use</p>
      <div>
        If you wish to stop using the App, you can simply delete it from your
        device or cancel your account in accordance with the provided
        instructions. Upon cancellation or termination, these Terms shall
        continue to apply to any past actions or claims.
      </div>
      <p>17. Miscellaneous</p>
      <div>
        These Terms constitute the entire agreement between you and{' '}
        {t('app_company_name')} concerning the use of the App. If any provision
        is found to be unenforceable, the remaining provisions will remain in
        full effect. You may not assign these Terms to any third party without{' '}
        {t('app_company_name')}’s consent.
      </div>
      <p>Informed Consent and Data Use Acknowledgment</p>
      <div>
        By using the App, you acknowledge that you understand how your personal
        and health-related data will be used. You consent to the collection and
        processing of such data for the purpose of providing personalized
        pregnancy support. You have the right to withdraw your consent at any
        time, subject to legal and contractual restrictions.
      </div>
    </>
  );
}
