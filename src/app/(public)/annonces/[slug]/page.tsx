import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await prisma.annonce.findUnique({ where: { slug: params.slug } })
  return { title: a?.titre ?? 'Annonce' }
}

const categorieColors: Record<string, string> = {
  ACTUALITE: 'bg-blue-100 text-blue-700',
  EVENEMENT: 'bg-purple-100 text-purple-700',
  OFFRE: 'bg-green-100 text-green-700',
  RESULTAT: 'bg-yellow-100 text-yellow-700',
  AUTRE: 'bg-gray-100 text-gray-700',
}

export default async function AnnonceDetailPage({ params }: Props) {
  const annonce = await prisma.annonce.findUnique({ where: { slug: params.slug, statut: 'PUBLIE' } })
  if (!annonce) notFound()

  const autres = await prisma.annonce.findMany({
    where: { statut: 'PUBLIE', id: { not: annonce.id } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/annonces" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E8001C] mb-8 transition-colors">
        <ArrowLeft size={16} /> Retour aux annonces
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className={`badge ${categorieColors[annonce.categorie] || 'bg-gray-100 text-gray-700'}`}>
          <Tag size={10} className="inline mr-1" />{annonce.categorie}
        </span>
        <span className="flex items-center gap-1 text-gray-400 text-sm">
          <Calendar size={14} />
          {new Date(annonce.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">{annonce.titre}</h1>
      <p className="text-gray-500 text-lg mb-8 italic border-l-4 border-[#E8001C] pl-4">{annonce.extrait}</p>

      <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed mb-12">
        {annonce.contenu}
      </div>

      {autres.length > 0 && (
        <div className="border-t pt-10">
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Autres annonces</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {autres.map(a => (
              <Link href={`/annonces/${a.slug}`} key={a.id} className="card p-4 group">
                <span className={`badge text-xs mb-2 inline-block ${categorieColors[a.categorie] || 'bg-gray-100 text-gray-700'}`}>{a.categorie}</span>
                <h3 className="font-semibold text-sm text-[#1A1A2E] group-hover:text-[#E8001C] transition-colors">{a.titre}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
