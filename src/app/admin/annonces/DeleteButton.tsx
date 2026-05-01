'use client'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteAnnonceButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Supprimer cette annonce ?')) return
    await fetch(`/api/admin/annonces/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Supprimer">
      <Trash2 size={16} />
    </button>
  )
}
