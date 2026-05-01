import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, User, Euro, CheckCircle, ArrowLeft, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = await prisma.formation.findUnique({ where: { slug: params.slug } })
  return { title: f?.titre ?? 'Formation' }
}

export default async function FormationDetailPage({ params }: Props) {
  const formation = await prisma.formation.findUnique({ where: { slug: params.slug, publie: true } })
  if (!formation) notFound()

  const niveauColors: Record<string, string> = {
    DEBUTANT: 'bg-green-100 text-green-700',
    ELEMENTAIRE: 'bg-teal-100 text-teal-700',
    INTERMEDIAIRE: 'bg-blue-100 text-blue-700',
    AVANCE: 'bg-orange-100 text-orange-700',
    EXPERT: 'bg-red-100 text-red-700',
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/formations" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E8001C] mb-8 transition-colors">
        <ArrowLeft size={16} /> Retour aux formations
      </Link>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`badge ${niveauColors[formation.niveau] || 'bg-gray-100 text-gray-700'}`}>{formation.niveau}</span>
            <span className="badge bg-[#5ECFCF]/20 text-[#0a9a9a]">{formation.domaine}</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4">{formation.titre}</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">{formation.description}</p>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-4 flex items-center gap-2"><BookOpen size={20} className="text-[#E8001C]" />Programme</h2>
            <div className="bg-[#F5F5F5] rounded-xl p-6 whitespace-pre-line text-gray-700">{formation.programme}</div>
          </div>

          {formation.prerequis && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">Prérequis</h2>
              <div className="space-y-2">
                {formation.prerequis.split('\n').map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle size={16} className="text-[#5ECFCF] mt-0.5 shrink-0" />{p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {formation.debouches && (
            <div>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">Débouchés</h2>
              <div className="space-y-2">
                {formation.debouches.split('\n').map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />{d}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="card p-6 sticky top-24">
            <div className="text-3xl font-bold text-[#E8001C] mb-6">{formation.prix} €</div>
            <div className="space-y-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-3"><Clock size={16} className="text-[#5ECFCF]" /><span><strong>Durée :</strong> {formation.duree}</span></div>
              <div className="flex items-center gap-3"><User size={16} className="text-[#5ECFCF]" /><span><strong>Formateur :</strong> {formation.formateur}</span></div>
              <div className="flex items-center gap-3"><Euro size={16} className="text-[#5ECFCF]" /><span><strong>Niveau :</strong> {formation.niveau}</span></div>
            </div>
            <Link href={`/inscription?formation=${encodeURIComponent(formation.titre)}`} className="btn-primary w-full text-center block">
              S&apos;inscrire à cette formation
            </Link>
            <Link href="/contact" className="btn-secondary w-full text-center block mt-3">
              Demander des infos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
