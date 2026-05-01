import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import DeleteAnnonceButton from './DeleteButton'

export default async function AdminAnnoncesPage() {
  const annonces = await prisma.annonce.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Annonces</h1>
          <p className="text-gray-500 text-sm">{annonces.length} annonce(s) au total</p>
        </div>
        <Link href="/admin/annonces/new" className="btn-primary inline-flex items-center gap-2 text-sm">
          <Plus size={16} />Nouvelle annonce
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F5F5] text-sm text-gray-500">
            <tr>
              <th className="text-left px-6 py-4 font-medium">Titre</th>
              <th className="text-left px-6 py-4 font-medium">Catégorie</th>
              <th className="text-left px-6 py-4 font-medium">Statut</th>
              <th className="text-left px-6 py-4 font-medium">Date</th>
              <th className="text-right px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {annonces.map(a => (
              <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#1A1A2E] truncate max-w-xs">{a.titre}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="badge bg-blue-100 text-blue-700 text-xs">{a.categorie}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`badge text-xs ${a.statut === 'PUBLIE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {a.statut}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(a.createdAt).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/annonces/${a.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-[#5ECFCF] transition-colors" title="Voir">
                      <Eye size={16} />
                    </Link>
                    <Link href={`/admin/annonces/${a.id}`} className="p-2 text-gray-400 hover:text-[#E8001C] transition-colors" title="Modifier">
                      <Pencil size={16} />
                    </Link>
                    <DeleteAnnonceButton id={a.id} />
                  </div>
                </td>
              </tr>
            ))}
            {annonces.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Aucune annonce</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
