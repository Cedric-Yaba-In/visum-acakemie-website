import AnnonceForm from '../AnnonceForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewAnnoncePage() {
  return (
    <div>
      <Link href="/admin/annonces" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E8001C] mb-6 transition-colors text-sm">
        <ArrowLeft size={16} />Retour aux annonces
      </Link>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Nouvelle annonce</h1>
      <AnnonceForm />
    </div>
  )
}
