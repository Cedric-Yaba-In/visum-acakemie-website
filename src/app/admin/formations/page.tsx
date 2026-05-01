import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import DeleteFormationButton from './DeleteButton'

export default async function AdminFormationsPage() {
  const formations = await prisma.formation.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Formations</h1>
          <p className="text-gray-500 text-sm">{formations.length} formation(s) au total</p>
        </div>
        <Link href="/admin/formations/new" className="btn-primary inline-flex items-center gap-2 text-sm">
          <Plus size={16} />Nouvelle formation
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F5F5] text-sm text-gray-500">
            <tr>
              <th className="text-left px-6 py-4 font-medium">Titre</th>
              <th className="text-left px-6 py-4 font-medium">Niveau</th>
              <th className="text-left px-6 py-4 font-medium">Domaine</th>
              <th className="text-left px-6 py-4 font-medium">Prix</th>
              <th className="text-left px-6 py-4 font-medium">Statut</th>
              <th className="text-right px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {formations.map(f => (
              <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#1A1A2E] truncate max-w-xs">{f.titre}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="badge bg-blue-100 text-blue-700 text-xs">{f.niveau}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{f.domaine}</td>
                <td className="px-6 py-4 text-sm font-semibold text-[#E8001C]">{f.prix} €</td>
                <td className="px-6 py-4">
                  <span className={`badge text-xs ${f.publie ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {f.publie ? 'Publié' : 'Masqué'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/formations/${f.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-[#5ECFCF] transition-colors">
                      <Eye size={16} />
                    </Link>
                    <Link href={`/admin/formations/${f.id}`} className="p-2 text-gray-400 hover:text-[#E8001C] transition-colors">
                      <Pencil size={16} />
                    </Link>
                    <DeleteFormationButton id={f.id} />
                  </div>
                </td>
              </tr>
            ))}
            {formations.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Aucune formation</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
