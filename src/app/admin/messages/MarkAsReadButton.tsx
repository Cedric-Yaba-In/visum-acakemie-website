'use client'
import { useRouter } from 'next/navigation'

export default function MarkAsReadButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleMark() {
    await fetch('/api/admin/messages', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    router.refresh()
  }

  return (
    <button onClick={handleMark} className="text-xs text-gray-400 hover:text-[#E8001C] whitespace-nowrap transition-colors shrink-0">
      Marquer lu
    </button>
  )
}
