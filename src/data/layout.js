import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  metadataBase: new URL('https://apnashree.com'),
  title: { default: 'Apna Shree | Authorized Industrial Dealer Chennai Tamil Nadu', template: '%s | Apna Shree Chennai' },
  description: 'Apna Shree — authorized dealer for CENLUB, INTORQ, PETHE, BONFIGLIOLI, PMI, HIWIN in Chennai. Lubrication systems, EM brakes, gearboxes, ball screws. 35+ years. Call +91 73583 76280.',
  keywords: 'industrial components dealer Chennai, CENLUB dealer Tamil Nadu, INTORQ brake Chennai, BONFIGLIOLI gearbox Chennai, PMI HIWIN ball screw Chennai',
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: '/favicon.png',
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Apna Shree",
  "description": "Authorized dealer for CENLUB, INTORQ, PETHE, BONFIGLIOLI, PMI, HIWIN and 30+ industrial brands in Chennai, Tamil Nadu since 1990.",
  "url": "https://apnashree.com",
  "telephone": ["+917358376280", "+917358376275"],
  "email": "jeevandos@gmail.com",
  "foundingDate": "1990",
  "address": { "@type": "PostalAddress", "addressLocality": "Chennai", "addressRegion": "Tamil Nadu", "addressCountry": "IN" },
  "geo": { "@type": "GeoCoordinates", "latitude": 13.0827, "longitude": 80.2707 },
  "areaServed": [{ "@type": "State", "name": "Tamil Nadu" }, { "@type": "Country", "name": "India" }],
  "openingHours": "Mo-Sa 09:00-18:00",
  "hasMap": "https://maps.app.goo.gl/1ewP1ihp1u61rMVi6"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
