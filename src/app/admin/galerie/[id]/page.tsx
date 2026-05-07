import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import MediaForm from '../MediaForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditMediaPage({ params }: { params: { id: string } }) {
  const media = await prisma.media.findUnique({ where: { id: params.id } })
  if (!media) notFound()

  return (
    <div>
      <Link href="/admin/galerie" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E8001C] mb-6 transition-colors text-sm">
        <ArrowLeft size={16} />Retour à la galerie
      </Link>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Modifier le média</h1>
      <MediaForm
        mediaId={media.id}
        defaultValues={{
          titre: media.titre,
          description: media.description ?? '',
          url: media.url,
          type: media.type,
          categorie: media.categorie,
          publie: media.publie,
          ordre: media.ordre,
        }}
      />
    </div>
  )
}
