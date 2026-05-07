'use client'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteMediaButton({ id }: { id: string }) {
  const router = useRouter()
  async function handleDelete() {
    if (!confirm('Supprimer ce média de la galerie ?')) return
    await fetch(`/api/admin/galerie/${id}`, { method: 'DELETE' })
    router.refresh()
  }
  return (
    <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Supprimer">
      <Trash2 size={16} />
    </button>
  )
}
