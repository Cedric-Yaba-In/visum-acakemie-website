'use client'
import { useRouter } from 'next/navigation'
import { CheckCheck } from 'lucide-react'

export default function MarkRecruteurLuButton({ id }: { id: string }) {
  const router = useRouter()

  async function handle() {
    await fetch(`/api/admin/recruteurs/${id}`, { method: 'PATCH' })
    router.refresh()
  }

  return (
    <button onClick={handle} className="p-2 text-gray-400 hover:text-green-500 transition-colors" title="Marquer comme lu">
      <CheckCheck size={16} />
    </button>
  )
}
