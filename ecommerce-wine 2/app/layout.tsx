import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'E-commerce Demo - React/Next.js',
  description: 'Demo di e-commerce che segue gli standard di programmazione professionali',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
