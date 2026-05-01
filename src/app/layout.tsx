import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'Visum Akademie', template: '%s | Visum Akademie' },
  description: 'Centre de formation allemand — tous niveaux, toutes disciplines.',
  keywords: ['formation', 'allemand', 'cours', 'certification', 'Visum Akademie'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
