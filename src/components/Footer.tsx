import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

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
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-[#5ECFCF] shrink-0" /><span>123 Rue de la Formation, Ville</span></li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-[#5ECFCF]" /><span>+33 1 23 45 67 89</span></li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-[#5ECFCF]" /><span>contact@visum-akademie.com</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#5ECFCF] transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-[#5ECFCF] transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-[#5ECFCF] transition-colors"><Linkedin size={20} /></a>
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
