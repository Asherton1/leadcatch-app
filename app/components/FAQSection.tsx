interface FAQ {
  question: string
  answer: string
}

interface Props {
  faqs: FAQ[]
  title?: string
}

export default function FAQSection({ faqs, title = 'Frequently asked questions' }: Props) {
  return (
    <>
      <section style={{ background: '#0a0a0a', padding: '5rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#ff6b35', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem', fontWeight: 500 }}>Common questions</p>
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, marginBottom: '3rem', lineHeight: 1.2 }}>{title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.75rem 0', borderBottom: i === faqs.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <h3 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.75rem', lineHeight: 1.4 }}>{faq.question}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />
    </>
  )
}
