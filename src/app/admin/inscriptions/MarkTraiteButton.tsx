'use client'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function MarkTraiteButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleMark() {
    await fetch('/api/admin/inscriptions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    router.refresh()
  }

  return (
    <button onClick={handleMark} className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Marquer comme traité">
      <CheckCircle size={16} />
    </button>
  )
}
