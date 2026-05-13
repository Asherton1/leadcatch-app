import Link from 'next/link'

interface LinkItem {
  name: string
  href: string
  description: string
}

interface PageRelations {
  worksWith: { title: string; links: LinkItem[] }
  relatedTopics: { title: string; links: LinkItem[] }
}

const RELATIONS: Record<string, PageRelations> = {
  // === INDUSTRY PAGES ===
  'for-med-spas': {
    worksWith: {
      title: 'Works with med spa CRMs',
      links: [
        { name: 'Boulevard', href: '/for-boulevard', description: 'Booking + client database for med spas' },
        { name: 'GoHighLevel', href: '/for-gohighlevel', description: 'All-in-one CRM + marketing automation' },
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
      ],
    },
    relatedTopics: {
      title: 'Related industries',
      links: [
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Consultation form recovery for surgical practices' },
        { name: 'Cosmetic Dental', href: '/for-dental', description: 'Veneer + implant consultation recovery' },
      ],
    },
  },
  'for-dental': {
    worksWith: {
      title: 'Works with dental practice CRMs',
      links: [
        { name: 'GoHighLevel', href: '/for-gohighlevel', description: 'All-in-one CRM + marketing automation' },
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
      ],
    },
    relatedTopics: {
      title: 'Related industries',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Surgical consultation recovery' },
      ],
    },
  },
  'for-plastic-surgery': {
    worksWith: {
      title: 'Works with plastic surgery CRMs',
      links: [
        { name: 'Boulevard', href: '/for-boulevard', description: 'Booking + client database for aesthetic practices' },
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
        { name: 'GoHighLevel', href: '/for-gohighlevel', description: 'All-in-one CRM + marketing automation' },
      ],
    },
    relatedTopics: {
      title: 'Related industries',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Cosmetic Dental', href: '/for-dental', description: 'Veneer + implant consultation recovery' },
      ],
    },
  },
  'for-luxury-real-estate': {
    worksWith: {
      title: 'Works with luxury real estate CRMs',
      links: [
        { name: 'Follow Up Boss', href: '/for-followupboss', description: 'Real estate-specific CRM + lead follow-up' },
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
        { name: 'GoHighLevel', href: '/for-gohighlevel', description: 'All-in-one CRM + marketing automation' },
      ],
    },
    relatedTopics: {
      title: 'Related industries',
      links: [
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry form recovery' },
      ],
    },
  },
  'for-property-management': {
    worksWith: {
      title: 'Works with property management software',
      links: [
        { name: 'AppFolio', href: '/for-appfolio', description: 'Leasing pipeline + prospect sync' },
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
        { name: 'GoHighLevel', href: '/for-gohighlevel', description: 'All-in-one CRM + marketing automation' },
      ],
    },
    relatedTopics: {
      title: 'Related industries',
      links: [
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry form recovery' },
      ],
    },
  },
  'for-luxury-auto': {
    worksWith: {
      title: 'Works with luxury auto CRMs',
      links: [
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
        { name: 'GoHighLevel', href: '/for-gohighlevel', description: 'All-in-one CRM + marketing automation' },
      ],
    },
    relatedTopics: {
      title: 'Related industries',
      links: [
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'High-value lead recovery for ultra-luxury markets' },
      ],
    },
  },
  // === CRM PAGES ===
  'for-gohighlevel': {
    worksWith: {
      title: 'Industries using GoHighLevel',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Cosmetic Dental', href: '/for-dental', description: 'Veneer + implant consultation recovery' },
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry form recovery' },
        { name: 'Luxury Auto', href: '/for-luxury-auto', description: 'High-value vehicle inquiry recovery' },
      ],
    },
    relatedTopics: {
      title: 'Other CRMs we integrate with',
      links: [
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
        { name: 'Boulevard', href: '/for-boulevard', description: 'Med spa booking system' },
      ],
    },
  },
  'for-hubspot': {
    worksWith: {
      title: 'Industries using HubSpot',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Surgical consultation recovery' },
        { name: 'Cosmetic Dental', href: '/for-dental', description: 'Veneer + implant consultation recovery' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry form recovery' },
      ],
    },
    relatedTopics: {
      title: 'Other CRMs we integrate with',
      links: [
        { name: 'Follow Up Boss', href: '/for-followupboss', description: 'Real estate-specific CRM' },
        { name: 'GoHighLevel', href: '/for-gohighlevel', description: 'All-in-one CRM + marketing automation' },
      ],
    },
  },
  'for-followupboss': {
    worksWith: {
      title: 'Industries using Follow Up Boss',
      links: [
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry form recovery' },
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry form recovery' },
      ],
    },
    relatedTopics: {
      title: 'Other CRMs we integrate with',
      links: [
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
        { name: 'AppFolio', href: '/for-appfolio', description: 'Property management software' },
      ],
    },
  },
  'for-appfolio': {
    worksWith: {
      title: 'Industries using AppFolio',
      links: [
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry form recovery' },
      ],
    },
    relatedTopics: {
      title: 'Other CRMs we integrate with',
      links: [
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
        { name: 'Follow Up Boss', href: '/for-followupboss', description: 'Real estate-specific CRM' },
        { name: 'GoHighLevel', href: '/for-gohighlevel', description: 'All-in-one CRM + marketing automation' },
      ],
    },
  },
  'for-boulevard': {
    worksWith: {
      title: 'Industries using Boulevard',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Surgical consultation recovery' },
      ],
    },
    relatedTopics: {
      title: 'Other CRMs we integrate with',
      links: [
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
        { name: 'GoHighLevel', href: '/for-gohighlevel', description: 'All-in-one CRM + marketing automation' },
      ],
    },
  },
  // === OTHER (for Phase 2) ===
  'how-it-works': {
    worksWith: {
      title: 'Explore the recovery layer',
      links: [
        { name: 'Pricing', href: '/pricing', description: 'Plans starting at $197/mo' },
        { name: 'FAQ', href: '/faq', description: 'Common questions answered' },
        { name: 'Integrations', href: '/integrations', description: 'CRM and tool integrations' },
        { name: 'Book a demo', href: '/demo', description: '15-min walkthrough with the founder' },
      ],
    },
    relatedTopics: {
      title: 'Industries we serve',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry form recovery' },
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry form recovery' },
      ],
    },
  },
  faq: {
    worksWith: {
      title: 'Explore the recovery layer',
      links: [
        { name: 'Pricing', href: '/pricing', description: 'Plans starting at $197/mo' },
        { name: 'How It Works', href: '/how-it-works', description: 'See the recovery layer step-by-step' },
        { name: 'Integrations', href: '/integrations', description: 'CRM and tool integrations' },
        { name: 'Free Form Audit', href: '/form-audit', description: 'Audit your existing form abandonment' },
      ],
    },
    relatedTopics: {
      title: 'Built for your industry',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Surgical consultation recovery' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry form recovery' },
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry form recovery' },
      ],
    },
  },
  integrations: {
    worksWith: {
      title: 'CRMs with dedicated integration pages',
      links: [
        { name: 'GoHighLevel', href: '/for-gohighlevel', description: 'All-in-one CRM + marketing automation' },
        { name: 'HubSpot', href: '/for-hubspot', description: 'Enterprise CRM + workflow automation' },
        { name: 'Follow Up Boss', href: '/for-followupboss', description: 'Real estate-specific CRM' },
        { name: 'AppFolio', href: '/for-appfolio', description: 'Multifamily property management' },
        { name: 'Boulevard', href: '/for-boulevard', description: 'Med spa booking system' },
      ],
    },
    relatedTopics: {
      title: 'Industries we serve',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Surgical consultation recovery' },
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry form recovery' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry form recovery' },
      ],
    },
  },
  pricing: {
    worksWith: {
      title: 'Industries we serve',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Surgical consultation recovery' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry recovery' },
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry recovery' },
      ],
    },
    relatedTopics: {
      title: 'Tools and resources',
      links: [
        { name: 'How It Works', href: '/how-it-works', description: 'See the recovery layer step-by-step' },
        { name: 'FAQ', href: '/faq', description: 'Common questions answered' },
        { name: 'ROI Calculator', href: '/calculator', description: 'Estimate your recovery revenue' },
        { name: 'Free Form Audit', href: '/form-audit', description: 'See what you are losing right now' },
      ],
    },
  },
  demo: {
    worksWith: {
      title: 'See ReCapture for your industry',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Surgical consultation recovery' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry recovery' },
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry recovery' },
      ],
    },
    relatedTopics: {
      title: 'Learn more before you book',
      links: [
        { name: 'How It Works', href: '/how-it-works', description: 'See the recovery layer step-by-step' },
        { name: 'Pricing', href: '/pricing', description: 'Plans starting at $197/mo' },
        { name: 'FAQ', href: '/faq', description: 'Common questions answered' },
        { name: 'ROI Calculator', href: '/calculator', description: 'Estimate your recovery revenue' },
      ],
    },
  },
  calculator: {
    worksWith: {
      title: 'ROI estimates by industry',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Average $2,800 per recovered consultation' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Average $15,000 per recovered procedure' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Six-figure commission per recovered buyer' },
        { name: 'Property Management', href: '/for-property-management', description: '50+ leases per 200-unit portfolio per month' },
      ],
    },
    relatedTopics: {
      title: 'After you see the numbers',
      links: [
        { name: 'Pricing', href: '/pricing', description: 'Plans starting at $197/mo' },
        { name: 'Book a demo', href: '/demo', description: '15-min walkthrough with the founder' },
        { name: 'Free Form Audit', href: '/form-audit', description: 'Live audit of your existing forms' },
        { name: 'FAQ', href: '/faq', description: 'Common questions answered' },
      ],
    },
  },
  'form-audit': {
    worksWith: {
      title: 'Industries we audit',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Surgical consultation recovery' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry recovery' },
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry recovery' },
      ],
    },
    relatedTopics: {
      title: 'After the audit',
      links: [
        { name: 'Pricing', href: '/pricing', description: 'Plans starting at $197/mo' },
        { name: 'Book a demo', href: '/demo', description: '15-min walkthrough with the founder' },
        { name: 'How It Works', href: '/how-it-works', description: 'See the recovery layer step-by-step' },
        { name: 'ROI Calculator', href: '/calculator', description: 'Estimate your recovery revenue' },
      ],
    },
  },
  enterprise: {
    worksWith: {
      title: 'Enterprise industries we serve',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Multi-location chains' },
        { name: 'Property Management', href: '/for-property-management', description: 'Multi-portfolio operators' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Multi-office brokerages' },
      ],
    },
    relatedTopics: {
      title: 'Enterprise resources',
      links: [
        { name: 'Pricing', href: '/pricing', description: 'Plans starting at $197/mo' },
        { name: 'Book a demo', href: '/demo', description: '15-min walkthrough with the founder' },
        { name: 'BAA & HIPAA', href: '/baa', description: 'Healthcare compliance details' },
        { name: 'FAQ', href: '/faq', description: 'Common questions answered' },
      ],
    },
  },
  about: {
    worksWith: {
      title: 'Industries we serve',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Surgical consultation recovery' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry recovery' },
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry recovery' },
      ],
    },
    relatedTopics: {
      title: 'Learn more',
      links: [
        { name: 'How It Works', href: '/how-it-works', description: 'See the recovery layer in action' },
        { name: 'Why ReCapture', href: '/why-us', description: 'How we compare to Podium and CartStack' },
        { name: 'Pricing', href: '/pricing', description: 'Plans starting at $197/mo' },
        { name: 'FAQ', href: '/faq', description: 'Common questions answered' },
      ],
    },
  },
  'why-us': {
    worksWith: {
      title: 'Industries we serve',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'Aesthetic consultation form recovery' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'Surgical consultation recovery' },
        { name: 'Luxury Real Estate', href: '/for-luxury-real-estate', description: 'Buyer inquiry recovery' },
        { name: 'Property Management', href: '/for-property-management', description: 'Leasing inquiry recovery' },
      ],
    },
    relatedTopics: {
      title: 'Make your decision',
      links: [
        { name: 'Pricing', href: '/pricing', description: 'Plans starting at $197/mo' },
        { name: 'Book a demo', href: '/demo', description: '15-min walkthrough with the founder' },
        { name: 'How It Works', href: '/how-it-works', description: 'See the recovery layer step-by-step' },
        { name: 'FAQ', href: '/faq', description: 'Common questions answered' },
      ],
    },
  },
  baa: {
    worksWith: {
      title: 'Healthcare industries we serve',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'HIPAA-eligible deployment' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'HIPAA-eligible deployment' },
        { name: 'Dental Practices', href: '/for-dental', description: 'HIPAA-eligible deployment' },
      ],
    },
    relatedTopics: {
      title: 'Compliance and security',
      links: [
        { name: 'Trust & Compliance', href: '/trust', description: 'How we handle data and security' },
        { name: 'Enterprise', href: '/enterprise', description: 'HIPAA + BAA + white-glove setup' },
        { name: 'FAQ', href: '/faq', description: 'Common compliance questions' },
        { name: 'Pricing', href: '/pricing', description: 'Plans starting at $197/mo' },
      ],
    },
  },
  trust: {
    worksWith: {
      title: 'Healthcare industries we serve',
      links: [
        { name: 'Med Spas', href: '/for-med-spas', description: 'HIPAA-eligible deployment' },
        { name: 'Plastic Surgery', href: '/for-plastic-surgery', description: 'HIPAA-eligible deployment' },
        { name: 'Dental Practices', href: '/for-dental', description: 'HIPAA-eligible deployment' },
      ],
    },
    relatedTopics: {
      title: 'Related compliance docs',
      links: [
        { name: 'BAA & HIPAA', href: '/baa', description: 'Business Associate Agreement details' },
        { name: 'Privacy Template', href: '/legal/client-privacy-template', description: 'Privacy policy copy-paste language' },
        { name: 'Enterprise', href: '/enterprise', description: 'White-glove setup with BAA' },
        { name: 'API Documentation', href: '/docs/api', description: 'For developer teams' },
      ],
    },
  },
}

export default function RelatedPages({ page }: { page: string }) {
  const rel = RELATIONS[page]
  if (!rel) return null

  const renderColumn = (col: { title: string; links: LinkItem[] }) => (
    <div>
      <p style={{
        color: '#ff6b35',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '1.25rem',
        fontWeight: 500,
      }}>
        {col.title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {col.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              color: '#fff',
              textDecoration: 'none',
              padding: '1rem 1.25rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              display: 'block',
            }}
          >
            <div style={{ fontWeight: 500, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
              {l.name} &rarr;
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}>
              {l.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <section style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '5rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '3rem',
      }}>
        {renderColumn(rel.worksWith)}
        {renderColumn(rel.relatedTopics)}
      </div>
    </section>
  )
}
