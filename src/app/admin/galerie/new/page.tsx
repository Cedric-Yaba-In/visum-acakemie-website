import MediaForm from '../MediaForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewMediaPage() {
  return (
    <div>
      <Link href="/admin/galerie" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E8001C] mb-6 transition-colors text-sm">
        <ArrowLeft size={16} />Retour à la galerie
      </Link>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Ajouter un média</h1>
      <MediaForm />
    </div>
  )
}
