export function IntegrationsSection() {
  const integrations = [
    'Slack',
    'Google Workspace',
    'Microsoft 365',
    'Salesforce',
    'HubSpot',
    'Zapier',
    'Stripe',
    'Shopify',
    'WordPress',
    'Notion',
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Seamless <span className="text-neon-blue neon-text">Integrations</span>
          </h2>
          <p className="text-lg text-white/70 font-inter max-w-2xl mx-auto">
            Connect with 500+ tools and platforms to automate your entire workflow
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-left">
              {[...integrations, ...integrations].map((integration, index) => (
                <div
                  key={`${integration}-${index}`}
                  className="flex-shrink-0 mx-8 px-8 py-4 glass-card hover:scale-110 hover:shadow-neon-glow transition-all duration-300 group"
                >
                  <span className="text-xl font-inter font-semibold text-white/80 group-hover:text-neon-blue transition-colors duration-300">
                    {integration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
