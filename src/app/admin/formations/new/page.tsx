import FormationForm from '../FormationForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewFormationPage() {
  return (
    <div>
      <Link href="/admin/formations" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E8001C] mb-6 transition-colors text-sm">
        <ArrowLeft size={16} />Retour aux formations
      </Link>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Nouvelle formation</h1>
      <FormationForm />
    </div>
  )
}
