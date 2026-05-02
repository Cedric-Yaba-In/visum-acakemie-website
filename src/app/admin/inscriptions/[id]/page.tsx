import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Mail, Phone, BookOpen, GraduationCap, Calendar, MessageSquare } from 'lucide-react'
import DeleteInscriptionButton from '../DeleteButton'
import MarkTraiteButton from '../MarkTraiteButton'

export default async function InscriptionDetailPage({ params }: { params: { id: string } }) {
  const inscription = await prisma.inscription.findUnique({ where: { id: params.id } })
  if (!inscription) notFound()

  const infos = [
    { icon: User, label: 'Nom complet', value: `${inscription.prenom} ${inscription.nom}` },
    { icon: Mail, label: 'Email', value: inscription.email },
    { icon: Phone, label: 'Téléphone', value: inscription.telephone || 'Non renseigné' },
    { icon: BookOpen, label: 'Formation souhaitée', value: inscription.formation },
    { icon: GraduationCap, label: 'Niveau actuel', value: inscription.niveau },
    { icon: Calendar, label: 'Date d\'inscription', value: new Date(inscription.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) },
  ]

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin/inscriptions" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E8001C] transition-colors text-sm">
          <ArrowLeft size={16} />Retour aux inscriptions
        </Link>
        <span className={`badge px-3 py-1 text-sm font-semibold ${inscription.traite ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {inscription.traite ? '✓ Traité' : '⏳ En attente'}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b">
          <div className="w-16 h-16 bg-[#E8001C]/10 rounded-full flex items-center justify-center shrink-0">
            <User size={28} className="text-[#E8001C]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">{inscription.prenom} {inscription.nom}</h1>
            <p className="text-gray-500 text-sm">{inscription.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {infos.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-9 h-9 bg-[#F5F5F5] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={16} className="text-[#E8001C]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-[#1A1A2E] font-medium mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {inscription.message && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={16} className="text-[#E8001C]" />
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Message de l&apos;apprenant</p>
            </div>
            <div className="bg-[#F5F5F5] rounded-xl p-4 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {inscription.message}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {!inscription.traite && (
          <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm px-5 py-3">
            <MarkTraiteButton id={inscription.id} />
            <span className="text-sm text-gray-600">Marquer comme traité</span>
          </div>
        )}
        <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm px-5 py-3">
          <DeleteInscriptionButton id={inscription.id} />
          <span className="text-sm text-gray-600">Supprimer cette inscription</span>
        </div>
        <a href={`mailto:${inscription.email}`} className="btn-primary text-sm inline-flex items-center gap-2">
          <Mail size={15} />Contacter par email
        </a>
      </div>
    </div>
  )
}
