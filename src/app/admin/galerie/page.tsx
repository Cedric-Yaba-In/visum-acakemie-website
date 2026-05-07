import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import NextImage from 'next/image'
import { Plus, Pencil, Eye, Image as ImageIcon, Play } from 'lucide-react'
import DeleteMediaButton from './DeleteButton'

const catLabels: Record<string, string> = {
  COURS: 'Cours', EVENEMENT: 'Événements', EXAMENS: 'Examens',
  VIE_CAMPUS: 'Vie campus', ALLEMAGNE: 'Allemagne', AUTRE: 'Autre',
}

export default async function AdminGaleriePage() {
  const medias = await prisma.media.findMany({ orderBy: [{ ordre: 'asc' }, { createdAt: 'desc' }] })
  const photos = medias.filter(m => m.type === 'PHOTO').length
  const videos = medias.filter(m => m.type === 'VIDEO').length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Galerie</h1>
          <p className="text-gray-500 text-sm">{photos} photo(s) · {videos} vidéo(s)</p>
        </div>
        <Link href="/admin/galerie/new" className="btn-primary inline-flex items-center gap-2 text-sm">
          <Plus size={16} />Ajouter un média
        </Link>
      </div>

      {/* Grille aperçu */}
      {medias.length === 0 ? (
        <div className="text-center py-20 text-gray-400 bg-white rounded-xl">
          <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
          <p>Aucun média dans la galerie</p>
          <Link href="/admin/galerie/new" className="btn-primary inline-flex items-center gap-2 text-sm mt-4">
            <Plus size={16} />Ajouter le premier média
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {medias.map(m => (
            <div key={m.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              {/* Miniature */}
              <div className="relative h-40 bg-gray-100">
                {m.type === 'PHOTO' ? (
                  <NextImage src={m.url} alt={m.titre} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#1A1A2E]">
                    {m.url.includes('youtube') || m.url.includes('youtu.be') ? (
                      <NextImage
                        src={`https://img.youtube.com/vi/${m.url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/)?.[1]}/hqdefault.jpg`}
                        alt={m.titre} fill className="object-cover opacity-70" unoptimized
                      />
                    ) : (
                      <Play size={32} className="text-white/50" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-[#E8001C]/90 rounded-full flex items-center justify-center">
                        <Play size={18} className="text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className={`badge text-xs ${m.type === 'PHOTO' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {m.type === 'PHOTO' ? '📷' : '▶'} {m.type}
                  </span>
                </div>
                {!m.publie && (
                  <div className="absolute top-2 right-2">
                    <span className="badge bg-gray-800/80 text-gray-300 text-xs">Masqué</span>
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="p-3">
                <p className="font-semibold text-[#1A1A2E] text-sm truncate">{m.titre}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="badge bg-[#E8001C]/10 text-[#E8001C] text-xs">{catLabels[m.categorie] || m.categorie}</span>
                  <span className="text-gray-400 text-xs">#{m.ordre}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="px-3 pb-3 flex items-center justify-between border-t pt-2">
                <a href={m.url} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 text-gray-400 hover:text-[#5ECFCF] transition-colors" title="Voir">
                  <Eye size={15} />
                </a>
                <Link href={`/admin/galerie/${m.id}`} className="p-1.5 text-gray-400 hover:text-[#E8001C] transition-colors" title="Modifier">
                  <Pencil size={15} />
                </Link>
                <DeleteMediaButton id={m.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
