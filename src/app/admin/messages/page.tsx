import { prisma } from '@/lib/prisma'
import MarkAsReadButton from './MarkAsReadButton'
import { Mail, MailOpen } from 'lucide-react'

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
  const nonLus = messages.filter(m => !m.lu).length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Messages</h1>
        <p className="text-gray-500 text-sm">{nonLus} message(s) non lu(s) sur {messages.length}</p>
      </div>

      <div className="space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${m.lu ? 'border-gray-200' : 'border-[#E8001C]'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${m.lu ? 'text-gray-300' : 'text-[#E8001C]'}`}>
                  {m.lu ? <MailOpen size={18} /> : <Mail size={18} />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-[#1A1A2E]">{m.nom}</span>
                    <span className="text-gray-400 text-sm">{m.email}</span>
                    <span className="text-gray-300 text-xs">{new Date(m.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="font-medium text-gray-700 mb-2">{m.sujet}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.message}</p>
                </div>
              </div>
              {!m.lu && <MarkAsReadButton id={m.id} />}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Mail size={48} className="mx-auto mb-4 opacity-30" />
            <p>Aucun message reçu</p>
          </div>
        )}
      </div>
    </div>
  )
}
