import React from 'react';

const TermsAndConditions = () => {
  const lastUpdated = "December 30, 2025"; // Diperbarui ke tanggal hari ini

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Container */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        
        {/* Header */}
        <header className="mb-12 border-b pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-500">
            Last updated: <span className="font-medium text-slate-800">{lastUpdated}</span>
          </p>
        </header>

        {/* Content */}
        <div className="space-y-10 text-slate-700 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services. This platform is intended for users who are at least 13 years of age.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Service Provision</h2>
            <p>
              Our services are provided on an <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong> basis. We reserve the right to modify, suspend, or discontinue the service at any time without prior notice. We shall not be held liable for any technical failures, downtime, or data loss.
            </p>
          </section>

          {/* Highlighted Data Privacy Section */}
          <section className="bg-blue-50/20 p-6 rounded-2xl border border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 mb-3">3. Data Usage & Privacy</h2>
            <p className="mb-3 text-blue-800/80 italic">
              Your privacy is paramount to us. We operate under the following principles:
            </p>
            <ul className="list-disc ml-5 space-y-2 text-blue-800/80">
              <li><strong>No Third-Party Sale:</strong> Your processed data will not be sold, shared, or distributed to third parties for advertising purposes.</li>
              <li><strong>Internal Analysis:</strong> Data is used internally to analyze user behavior and patterns to improve system stability and user experience.</li>
              <li><strong>AI Improvement:</strong> We utilize processed data to train and refine our internal <strong>AI & Machine Learning</strong> algorithms to enhance the accuracy and performance of our services.</li>
            </ul>
          </section>

          {/* Highlighted AI Infrastructure Section */}
          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. AI Infrastructure & Third-Party Providers</h2>
            <p className="mb-4">
              To provide high-quality intelligence, our platform integrates with external AI providers. By using this service, you acknowledge that:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 font-bold text-xs text-slate-600">1</div>
                <p>We currently utilize <strong>Google Gemini</strong> (Google Cloud) as our primary AI provider. Input data is transmitted to and processed on Google&apos;s secure servers.</p>
              </div>
              <div className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 font-bold text-xs text-slate-600">2</div>
                <p>We reserve the right to change AI models or providers (e.g., OpenAI, Anthropic) as needed to improve service quality.</p>
              </div>
            </div>
          </section>

          {/* New Section: Payments & Refunds */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Payments, Subscriptions & Refund Policy</h2>
            <p className="mb-3">
              To maintain our high-performance AI infrastructure, certain features require a paid subscription or credits. By completing a purchase, you agree to the following billing terms:
            </p>
            <div className="p-5 border-l-4 border-slate-900 bg-slate-50 italic text-slate-800">
              &quot;Due to the digital nature of our services and the immediate allocation of computing resources required for AI processing, <strong>all sales are final</strong>. We do not offer refunds, credits, or pro-rated billing for any payments made, including subscriptions that are cancelled mid-term.&quot;
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Limitation of Liability</h2>
            <p>
              Output generated by AI is probabilistic and may occasionally be inaccurate. We do not guarantee the correctness of AI-generated content. Users are solely responsible for verifying the output before relying on it for any critical purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Your continued use of the platform after any changes constitutes acceptance of the new Terms. We encourage you to review this page periodically.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;