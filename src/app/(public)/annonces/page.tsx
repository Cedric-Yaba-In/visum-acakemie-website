import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Calendar, Tag, Bell } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Annonces' }

const categorieColors: Record<string, string> = {
  ACTUALITE: 'bg-blue-100 text-blue-700',
  EVENEMENT: 'bg-purple-100 text-purple-700',
  OFFRE: 'bg-green-100 text-green-700',
  RESULTAT: 'bg-yellow-100 text-yellow-700',
  AUTRE: 'bg-gray-100 text-gray-700',
}

const categories = ['ACTUALITE', 'EVENEMENT', 'OFFRE', 'RESULTAT', 'AUTRE']

export default async function AnnoncesPage({ searchParams }: { searchParams: { categorie?: string } }) {
  const { categorie } = searchParams

  const annonces = await prisma.annonce.findMany({
    where: {
      statut: 'PUBLIE',
      ...(categorie ? { categorie: categorie as any } : {}),
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <section className="bg-[#1A1A2E] text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Annonces</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Actualités, événements, offres et résultats de Visum Akademie.</p>
      </section>

      <section className="py-10 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-3 mb-10">
          <Link href="/annonces" className={`badge px-4 py-2 text-sm font-medium rounded-full border transition-colors ${!categorie ? 'bg-[#E8001C] text-white border-[#E8001C]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#E8001C]'}`}>
            Toutes
          </Link>
          {categories.map(c => (
            <Link key={c} href={`/annonces?categorie=${c}`} className={`badge px-4 py-2 text-sm font-medium rounded-full border transition-colors ${categorie === c ? 'bg-[#E8001C] text-white border-[#E8001C]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#E8001C]'}`}>
              {c.charAt(0) + c.slice(1).toLowerCase()}
            </Link>
          ))}
        </div>

        {annonces.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Bell size={48} className="mx-auto mb-4 opacity-30" />
            <p>Aucune annonce pour le moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {annonces.map(a => (
              <Link href={`/annonces/${a.slug}`} key={a.id} className="card group p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`badge ${categorieColors[a.categorie] || 'bg-gray-100 text-gray-700'}`}>
                    <Tag size={10} className="inline mr-1" />{a.categorie}
                  </span>
                </div>
                <h3 className="font-bold text-[#1A1A2E] text-lg mb-2 group-hover:text-[#E8001C] transition-colors">{a.titre}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3">{a.extrait}</p>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Calendar size={12} />
                  <span>{new Date(a.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
