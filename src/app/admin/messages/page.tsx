import { prisma } from '@/lib/prisma'
import MarkAsReadButton from './MarkAsReadButton'
import DeleteMessageButton from './DeleteMessageButton'
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
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`mt-1 shrink-0 ${m.lu ? 'text-gray-300' : 'text-[#E8001C]'}`}>
                  {m.lu ? <MailOpen size={18} /> : <Mail size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="font-semibold text-[#1A1A2E]">{m.nom}</span>
                    <a href={`mailto:${m.email}`} className="text-[#5ECFCF] text-sm hover:underline">{m.email}</a>
                    <span className="text-gray-300 text-xs">
                      {new Date(m.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="font-medium text-gray-700 mb-2">{m.sujet}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {!m.lu && <MarkAsReadButton id={m.id} />}
                <a
                  href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.sujet)}`}
                  className="px-3 py-1.5 text-xs font-medium bg-[#E8001C]/10 text-[#E8001C] rounded-lg hover:bg-[#E8001C] hover:text-white transition-colors"
                  title="Répondre par email"
                >
                  Répondre
                </a>
                <DeleteMessageButton id={m.id} />
              </div>
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
