'use client'
import { useState } from 'react'

const FAQS = [
  { q: 'Do you ship outside Chennai?', a: 'Yes — we ship across all of India (PAN India), and we also export to the US and Dubai.' },
  { q: 'Do you import from Egypt?', a: 'No.' },
  { q: 'Do you service the products you supply?', a: 'Yes — all our products are serviced.' },
  { q: 'Are you an authorized dealer?', a: 'Yes — Apna Shree has been an authorized dealer since 1991, and today we represent 36+ reputed Indian and global brands.' },
  { q: 'How do I get the best price?', a: 'Call or WhatsApp us at +91 73583 76280, or send an enquiry through the website — we respond quickly with our best price.' },
]

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="sec-head sec-head-center">
          <span className="label">Questions</span>
          <h2>FREQUENTLY ASKED QUESTIONS</h2>
        </div>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12, overflow: 'hidden', background: 'var(--bg)' }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{f.q}</span>
                  <span style={{ fontSize: 24, lineHeight: 1, color: 'var(--accent)', flex: '0 0 auto', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 22px 20px', fontSize: 15, color: 'var(--text3)', lineHeight: 1.7 }}>{f.a}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  )
}
