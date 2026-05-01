import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import FormationForm from '../FormationForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditFormationPage({ params }: { params: { id: string } }) {
  const formation = await prisma.formation.findUnique({ where: { id: params.id } })
  if (!formation) notFound()

  return (
    <div>
      <Link href="/admin/formations" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E8001C] mb-6 transition-colors text-sm">
        <ArrowLeft size={16} />Retour aux formations
      </Link>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Modifier la formation</h1>
      <FormationForm
        formationId={formation.id}
        defaultValues={{
          titre: formation.titre,
          niveau: formation.niveau,
          domaine: formation.domaine,
          description: formation.description,
          programme: formation.programme,
          prerequis: formation.prerequis ?? '',
          debouches: formation.debouches ?? '',
          formateur: formation.formateur,
          duree: formation.duree,
          prix: formation.prix,
          publie: formation.publie,
        }}
      />
    </div>
  )
}
