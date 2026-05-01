'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/formations', label: 'Formations' },
  { href: '/niveaux', label: 'Niveaux' },
  { href: '/annonces', label: 'Annonces' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-baseline gap-0.5 select-none">
            <span className="text-2xl font-black tracking-tight text-[#E8001C]">Visum</span>
            <span className="text-2xl font-black tracking-tight text-[#1A1A2E]"> Akademie</span>
            <span className="ml-1.5 text-xs font-semibold text-[#5ECFCF] uppercase tracking-widest hidden sm:inline">🇩🇪 Deutsch</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-gray-700 hover:text-[#E8001C] font-medium transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/inscription" className="btn-primary text-sm py-2">
              S&apos;inscrire
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-gray-700 hover:text-[#E8001C] font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/inscription" className="btn-primary text-center text-sm" onClick={() => setOpen(false)}>
            S&apos;inscrire
          </Link>
        </div>
      )}
    </nav>
  )
}
