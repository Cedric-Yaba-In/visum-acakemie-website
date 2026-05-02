import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Eye, Users } from 'lucide-react'
import DeleteInscriptionButton from './DeleteButton'
import MarkTraiteButton from './MarkTraiteButton'

export default async function AdminInscriptionsPage({ searchParams }: { searchParams: { statut?: string } }) {
  const { statut } = searchParams

  const inscriptions = await prisma.inscription.findMany({
    where: statut === 'en-attente' ? { traite: false } : statut === 'traite' ? { traite: true } : {},
    orderBy: { createdAt: 'desc' },
  })

  const total = await prisma.inscription.count()
  const enAttente = await prisma.inscription.count({ where: { traite: false } })
  const traites = await prisma.inscription.count({ where: { traite: true } })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Inscriptions</h1>
        <p className="text-gray-500 text-sm">{total} inscription(s) au total</p>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total', value: total, color: 'bg-blue-500', href: '/admin/inscriptions' },
          { label: 'En attente', value: enAttente, color: 'bg-[#E8001C]', href: '/admin/inscriptions?statut=en-attente' },
          { label: 'Traités', value: traites, color: 'bg-green-500', href: '/admin/inscriptions?statut=traite' },
        ].map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className={`${s.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
              <Users size={18} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1A1A2E]">{s.value}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-6">
        {[
          { label: 'Tous', href: '/admin/inscriptions' },
          { label: 'En attente', href: '/admin/inscriptions?statut=en-attente' },
          { label: 'Traités', href: '/admin/inscriptions?statut=traite' },
        ].map(f => (
          <Link key={f.label} href={f.href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
              ${(f.href === '/admin/inscriptions' && !statut) || f.href.includes(statut ?? '__')
                ? 'bg-[#E8001C] text-white border-[#E8001C]'
                : 'bg-white text-gray-600 border-gray-300 hover:border-[#E8001C]'}`}>
            {f.label}
          </Link>
        ))}
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F5F5] text-sm text-gray-500">
            <tr>
              <th className="text-left px-6 py-4 font-medium">Apprenant</th>
              <th className="text-left px-6 py-4 font-medium">Formation</th>
              <th className="text-left px-6 py-4 font-medium">Niveau</th>
              <th className="text-left px-6 py-4 font-medium">Date</th>
              <th className="text-left px-6 py-4 font-medium">Statut</th>
              <th className="text-right px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inscriptions.map(i => (
              <tr key={i.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#1A1A2E]">{i.prenom} {i.nom}</p>
                  <p className="text-xs text-gray-400">{i.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-[180px] truncate">{i.formation}</td>
                <td className="px-6 py-4">
                  <span className="badge bg-blue-100 text-blue-700 text-xs">{i.niveau}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(i.createdAt).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4">
                  <span className={`badge text-xs ${i.traite ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {i.traite ? 'Traité' : 'En attente'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/inscriptions/${i.id}`} className="p-2 text-gray-400 hover:text-[#5ECFCF] transition-colors" title="Voir détails">
                      <Eye size={16} />
                    </Link>
                    {!i.traite && <MarkTraiteButton id={i.id} />}
                    <DeleteInscriptionButton id={i.id} />
                  </div>
                </td>
              </tr>
            ))}
            {inscriptions.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                <Users size={40} className="mx-auto mb-3 opacity-20" />
                Aucune inscription
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
