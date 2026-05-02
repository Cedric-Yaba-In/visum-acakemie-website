'use client'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteMessageButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Supprimer définitivement ce message ?')) return
    await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors" title="Supprimer">
      <Trash2 size={15} />
    </button>
  )
}
