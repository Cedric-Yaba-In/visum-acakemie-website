import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { BookOpen, Clock, Euro, User } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Formations' }

const niveauColors: Record<string, string> = {
  DEBUTANT: 'bg-green-100 text-green-700',
  ELEMENTAIRE: 'bg-teal-100 text-teal-700',
  INTERMEDIAIRE: 'bg-blue-100 text-blue-700',
  AVANCE: 'bg-orange-100 text-orange-700',
  EXPERT: 'bg-red-100 text-red-700',
}

export default async function FormationsPage({ searchParams }: { searchParams: { niveau?: string; domaine?: string } }) {
  const { niveau, domaine } = searchParams

  const formations = await prisma.formation.findMany({
    where: {
      publie: true,
      ...(niveau ? { niveau: niveau as any } : {}),
      ...(domaine ? { domaine: { contains: domaine, mode: 'insensitive' } } : {}),
    },
    orderBy: { createdAt: 'desc' },
  })

  const domaines = await prisma.formation.findMany({
    where: { publie: true },
    select: { domaine: true },
    distinct: ['domaine'],
  })

  return (
    <>
      <section className="bg-[#1A1A2E] text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Nos Formations</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Choisissez parmi notre catalogue de formations adaptées à votre niveau et vos objectifs.</p>
      </section>

      <section className="py-10 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <form className="flex flex-wrap gap-4 mb-10">
            <select name="niveau" defaultValue={niveau || ''} className="border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E8001C]">
              <option value="">Tous les niveaux</option>
              {['DEBUTANT', 'ELEMENTAIRE', 'INTERMEDIAIRE', 'AVANCE', 'EXPERT'].map(n => (
                <option key={n} value={n}>{n.charAt(0) + n.slice(1).toLowerCase()}</option>
              ))}
            </select>
            <select name="domaine" defaultValue={domaine || ''} className="border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E8001C]">
              <option value="">Tous les domaines</option>
              {domaines.map(d => <option key={d.domaine} value={d.domaine}>{d.domaine}</option>)}
            </select>
            <button type="submit" className="btn-primary text-sm py-2">Filtrer</button>
            {(niveau || domaine) && <Link href="/formations" className="btn-secondary text-sm py-2">Réinitialiser</Link>}
          </form>

          {formations.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p>Aucune formation trouvée pour ces critères.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map(f => (
                <Link href={`/formations/${f.slug}`} key={f.id} className="card group">
                  <div className="h-44 bg-gradient-to-br from-[#1A1A2E] to-[#E8001C] flex items-center justify-center">
                    <BookOpen size={48} className="text-white/80" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`badge ${niveauColors[f.niveau] || 'bg-gray-100 text-gray-700'}`}>{f.niveau}</span>
                      <span className="badge bg-[#5ECFCF]/20 text-[#0a9a9a]">{f.domaine}</span>
                    </div>
                    <h3 className="font-bold text-[#1A1A2E] text-lg mb-2 group-hover:text-[#E8001C] transition-colors">{f.titre}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{f.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 border-t pt-4">
                      <div className="flex items-center gap-1"><Clock size={12} />{f.duree}</div>
                      <div className="flex items-center gap-1"><User size={12} />{f.formateur}</div>
                      <div className="flex items-center gap-1 font-bold text-[#E8001C]"><Euro size={12} />{f.prix}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
