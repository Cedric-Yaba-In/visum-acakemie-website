'use client'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteRecruteurButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Supprimer cette demande de recrutement ?')) return
    await fetch(`/api/admin/recruteurs/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Supprimer">
      <Trash2 size={16} />
    </button>
  )
}
