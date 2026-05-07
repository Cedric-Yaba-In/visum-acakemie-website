import { prisma } from '@/lib/prisma'
import { Building2, Mail, MailOpen } from 'lucide-react'
import DeleteRecruteurButton from './DeleteButton'
import MarkRecruteurLuButton from './MarkLuButton'

export default async function AdminRecruteursPage() {
  const recruteurs = await prisma.recruteur.findMany({ orderBy: { createdAt: 'desc' } })
  const nonLus = recruteurs.filter(r => !r.lu).length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Demandes Recruteurs</h1>
        <p className="text-gray-500 text-sm">{nonLus} demande(s) non lue(s) sur {recruteurs.length}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total', value: recruteurs.length, color: 'bg-blue-500' },
          { label: 'Non lues', value: nonLus, color: 'bg-[#E8001C]' },
          { label: 'Traitées', value: recruteurs.length - nonLus, color: 'bg-green-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className={`${s.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
              <Building2 size={18} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1A1A2E]">{s.value}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-4">
        {recruteurs.map(r => (
          <div key={r.id} className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${r.lu ? 'border-gray-200' : 'border-[#E8001C]'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`mt-1 shrink-0 ${r.lu ? 'text-gray-300' : 'text-[#E8001C]'}`}>
                  {r.lu ? <MailOpen size={18} /> : <Mail size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="font-semibold text-[#1A1A2E]">{r.nom}</span>
                    <span className="badge bg-[#E8001C]/10 text-[#E8001C] text-xs">{r.role}</span>
                    <span className="badge bg-blue-100 text-blue-700 text-xs flex items-center gap-1">
                      <Building2 size={10} />{r.entreprise}
                    </span>
                    <a href={`mailto:${r.email}`} className="text-[#5ECFCF] text-sm hover:underline">{r.email}</a>
                    <span className="text-gray-300 text-xs">
                      {new Date(r.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mt-2 whitespace-pre-line">{r.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {!r.lu && <MarkRecruteurLuButton id={r.id} />}
                <a
                  href={`mailto:${r.email}?subject=Re: Votre demande de recrutement — Visum+ Akademie`}
                  className="px-3 py-1.5 text-xs font-medium bg-[#E8001C]/10 text-[#E8001C] rounded-lg hover:bg-[#E8001C] hover:text-white transition-colors"
                >
                  Répondre
                </a>
                <DeleteRecruteurButton id={r.id} />
              </div>
            </div>
          </div>
        ))}

        {recruteurs.length === 0 && (
          <div className="text-center py-20 text-gray-400 bg-white rounded-xl">
            <Building2 size={48} className="mx-auto mb-4 opacity-20" />
            <p>Aucune demande de recruteur reçue</p>
          </div>
        )}
      </div>
    </div>
  )
}
