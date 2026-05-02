import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Bell, BookOpen, MessageSquare, Users, Plus, ArrowRight } from 'lucide-react'

export default async function AdminDashboardPage() {
  const [annonces, formations, messages, inscriptions] = await Promise.all([
    prisma.annonce.count(),
    prisma.formation.count(),
    prisma.message.count({ where: { lu: false } }),
    prisma.inscription.count({ where: { traite: false } }),
  ])

  const dernieresAnnonces = await prisma.annonce.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
  const derniersMessages = await prisma.message.findMany({ take: 5, orderBy: { createdAt: 'desc' } })

  const stats = [
    { icon: Bell, label: 'Annonces', value: annonces, href: '/admin/annonces', color: 'bg-blue-500' },
    { icon: BookOpen, label: 'Formations', value: formations, href: '/admin/formations', color: 'bg-green-500' },
    { icon: MessageSquare, label: 'Messages non lus', value: messages, href: '/admin/messages', color: 'bg-orange-500' },
    { icon: Users, label: 'Inscriptions en attente', value: inscriptions, href: '/admin/inscriptions?statut=en-attente', color: 'bg-[#E8001C]' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Dashboard</h1>
          <p className="text-gray-500 text-sm">Bienvenue sur le panneau d&apos;administration de Visum Akademie</p>
        </div>
        <Link href="/admin/annonces/new" className="btn-primary inline-flex items-center gap-2 text-sm">
          <Plus size={16} />Nouvelle annonce
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ icon: Icon, label, value, href, color }) => (
          <Link href={href} key={label} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
              <Icon size={22} className="text-white" />
            </div>
            <div className="text-3xl font-bold text-[#1A1A2E]">{value}</div>
            <div className="text-gray-500 text-sm mt-1">{label}</div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1A1A2E]">Dernières annonces</h2>
            <Link href="/admin/annonces" className="text-[#E8001C] text-sm flex items-center gap-1">Voir tout <ArrowRight size={14} /></Link>
          </div>
          <div className="space-y-3">
            {dernieresAnnonces.map(a => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#1A1A2E] truncate max-w-[200px]">{a.titre}</p>
                  <p className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
                <span className={`badge text-xs ${a.statut === 'PUBLIE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {a.statut}
                </span>
              </div>
            ))}
            {dernieresAnnonces.length === 0 && <p className="text-gray-400 text-sm">Aucune annonce</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1A1A2E]">Derniers messages</h2>
            <Link href="/admin/messages" className="text-[#E8001C] text-sm flex items-center gap-1">Voir tout <ArrowRight size={14} /></Link>
          </div>
          <div className="space-y-3">
            {derniersMessages.map(m => (
              <div key={m.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#1A1A2E]">{m.nom}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[200px]">{m.sujet}</p>
                </div>
                {!m.lu && <span className="w-2 h-2 bg-[#E8001C] rounded-full" />}
              </div>
            ))}
            {derniersMessages.length === 0 && <p className="text-gray-400 text-sm">Aucun message</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
