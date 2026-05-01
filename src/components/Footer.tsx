import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

function IconFacebook() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Image src="/logo-nobg.png" alt="Visum Akademie" width={130} height={45} className="object-contain mb-4 brightness-0 invert" />
          <p className="text-sm leading-relaxed">
            Centre de formation de référence. Tous niveaux, toutes disciplines. Excellence pédagogique garantie.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {[['/', 'Accueil'], ['/formations', 'Formations'], ['/niveaux', 'Niveaux'], ['/annonces', 'Annonces'], ['/contact', 'Contact']].map(([href, label]) => (
              <li key={href}><Link href={href} className="hover:text-[#5ECFCF] transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-[#5ECFCF] shrink-0" /><span>Tchougo, Bangangté, Ouest Cameroun</span></li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-[#5ECFCF]" /><span>+237 653 78 04 08</span></li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-[#5ECFCF]" /><span>contact@visumakademie.com</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-[#5ECFCF] transition-colors"><IconFacebook /></a>
            <a href="#" aria-label="Instagram" className="hover:text-[#5ECFCF] transition-colors"><IconInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#5ECFCF] transition-colors"><IconLinkedin /></a>
          </div>
          <div className="mt-6">
            <h4 className="text-white font-semibold mb-2 text-sm">Horaires</h4>
            <p className="text-sm">Lun – Ven : 8h – 18h</p>
            <p className="text-sm">Sam : 9h – 13h</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Visum Akademie. Tous droits réservés.
      </div>
    </footer>
  )
}
