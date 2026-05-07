'use client'
import { useState, useEffect, useCallback } from 'react'
import NextImage from 'next/image'
import { X, Image as ImageIcon, ChevronLeft, ChevronRight, ZoomIn, Camera, Video, BookOpen, CalendarDays, Trophy, Building2, Plane, LayoutGrid, FolderOpen } from 'lucide-react'
import React from 'react'
import Reveal from '@/components/Reveal'

type Media = {
  id: string
  titre: string
  description: string | null
  url: string
  type: 'PHOTO' | 'VIDEO'
  categorie: string
}

const categories: { value: string; label: string; icon: React.ReactNode }[] = [
  { value: '', label: 'Tout voir', icon: <LayoutGrid size={14} /> },
  { value: 'COURS', label: 'Cours', icon: <BookOpen size={14} /> },
  { value: 'EVENEMENT', label: 'Événements', icon: <CalendarDays size={14} /> },
  { value: 'EXAMENS', label: 'Examens & Résultats', icon: <Trophy size={14} /> },
  { value: 'VIE_CAMPUS', label: 'Vie au campus', icon: <Building2 size={14} /> },
  { value: 'ALLEMAGNE', label: 'Vie en Allemagne', icon: <Plane size={14} /> },
  { value: 'AUTRE', label: 'Autre', icon: <FolderOpen size={14} /> },
]

function getYoutubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

function getYoutubeThumbnail(url: string) {
  const id = getYoutubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}

function isYoutube(url: string) {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

export default function GaleriePage() {
  const [medias, setMedias] = useState<Media[]>([])
  const [filtre, setFiltre] = useState('')
  const [typeFiltre, setTypeFiltre] = useState('')
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filtre) params.set('categorie', filtre)
    if (typeFiltre) params.set('type', typeFiltre)
    fetch(`/api/galerie?${params}`)
      .then(r => r.json())
      .then(data => { setMedias(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [filtre, typeFiltre])

  const photos = medias.filter(m => m.type === 'PHOTO')
  const videos = medias.filter(m => m.type === 'VIDEO')
  const lightboxItems = medias.filter(m => m.type === 'PHOTO')

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevPhoto = useCallback(() => setLightbox(i => i !== null ? (i - 1 + lightboxItems.length) % lightboxItems.length : null), [lightboxItems.length])
  const nextPhoto = useCallback(() => setLightbox(i => i !== null ? (i + 1) % lightboxItems.length : null), [lightboxItems.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightbox === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, prevPhoto, nextPhoto])

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Galerie</h1>
        <p className="text-gray-300 max-w-xl mx-auto text-lg">
          Photos et vidéos de nos cours, événements, examens et de la vie de nos apprenants en Allemagne.
        </p>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4">

        {/* FILTRES */}
        <div className="flex flex-wrap gap-3 mb-4">
          {categories.map(c => (
            <button key={c.value} onClick={() => setFiltre(c.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors
                ${filtre === c.value
                  ? 'bg-[#E8001C] text-white border-[#E8001C]'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-[#E8001C] hover:text-[#E8001C]'}`}>
              {c.icon}
              {c.label}
            </button>
          ))}
        </div>

        {/* FILTRE TYPE */}
        <div className="flex gap-3 mb-10">
          {[
            { value: '', label: 'Tous les médias', icon: <LayoutGrid size={15} /> },
            { value: 'PHOTO', label: 'Photos', icon: <Camera size={15} /> },
            { value: 'VIDEO', label: 'Vidéos', icon: <Video size={15} /> },
          ].map(t => (
            <button key={t.value} onClick={() => setTypeFiltre(t.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border
                ${typeFiltre === t.value
                  ? 'bg-[#1A1A2E] text-white border-[#1A1A2E]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#1A1A2E] hover:text-[#1A1A2E]'}`}>
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-4 border-[#E8001C] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : medias.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
            <p>Aucun média pour le moment.</p>
          </div>
        ) : (
          <>
            {/* SECTION PHOTOS */}
            {(typeFiltre === '' || typeFiltre === 'PHOTO') && photos.length > 0 && (
              <div className="mb-14">
                {typeFiltre === '' && (
                  <Reveal animation="fade-up">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-[#E8001C] rounded-full" />
                    <h2 className="text-xl font-bold text-[#1A1A2E]">Photos ({photos.length})</h2>
                  </div>
                  </Reveal>
                )}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {photos.map((m, idx) => (
                    <Reveal key={m.id} animation="zoom" delay={idx * 40}>
                    <div
                      className="break-inside-avoid group relative cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                      onClick={() => setLightbox(lightboxItems.findIndex(li => li.id === m.id))}>
                      <NextImage src={m.url} alt={m.titre} fill className="w-full object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 25vw" unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-semibold text-sm">{m.titre}</p>
                          {m.description && <p className="text-gray-300 text-xs mt-1 line-clamp-2">{m.description}</p>}
                        </div>
                        <div className="absolute top-3 right-3"><ZoomIn size={20} className="text-white" /></div>
                      </div>
                      <span className="absolute top-3 left-3 flex items-center gap-1 bg-[#E8001C]/80 text-white text-xs backdrop-blur-sm px-2 py-1 rounded-full">
                        {categories.find(c => c.value === m.categorie)?.icon}
                        {categories.find(c => c.value === m.categorie)?.label || m.categorie}
                      </span>
                    </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION VIDÉOS */}
            {(typeFiltre === '' || typeFiltre === 'VIDEO') && videos.length > 0 && (
              <div>
                {typeFiltre === '' && (
                  <Reveal animation="fade-up">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-[#5ECFCF] rounded-full" />
                    <h2 className="text-xl font-bold text-[#1A1A2E]">Vidéos ({videos.length})</h2>
                  </div>
                  </Reveal>
                )}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((m, idx) => {
                    const ytId = isYoutube(m.url) ? getYoutubeId(m.url) : null
                    return (
                      <Reveal key={m.id} animation="fade-up" delay={idx * 80}>
                      <div className="card group overflow-hidden">
                        <div className="relative aspect-video bg-[#1A1A2E]">
                          {ytId ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${ytId}`}
                              title={m.titre}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              src={m.url}
                              controls
                              className="w-full h-full object-cover"
                              poster={getYoutubeThumbnail(m.url) || undefined}
                            />
                          )}
                          <span className="absolute top-2 left-2 badge bg-[#5ECFCF]/90 text-[#1A1A2E] text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                            <Video size={11} /> Vidéo
                          </span>
                        </div>
                        <div className="p-4">
                          <span className="flex items-center gap-1 bg-[#E8001C]/10 text-[#E8001C] text-xs mb-2 inline-flex w-fit px-2 py-1 rounded-full">
                            {categories.find(c => c.value === m.categorie)?.icon}
                            {categories.find(c => c.value === m.categorie)?.label || m.categorie}
                          </span>
                          <h3 className="font-bold text-[#1A1A2E] mb-1">{m.titre}</h3>
                          {m.description && <p className="text-gray-500 text-sm line-clamp-2">{m.description}</p>}
                        </div>
                      </div>
                      </Reveal>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && lightboxItems[lightbox] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-[#E8001C] transition-colors z-10">
            <X size={32} />
          </button>

          {lightboxItems.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); prevPhoto() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#5ECFCF] transition-colors z-10 bg-black/40 rounded-full p-2">
                <ChevronLeft size={32} />
              </button>
              <button onClick={e => { e.stopPropagation(); nextPhoto() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#5ECFCF] transition-colors z-10 bg-black/40 rounded-full p-2">
                <ChevronRight size={32} />
              </button>
            </>
          )}

            <div className="max-w-5xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="relative max-h-[75vh] w-full">
              <NextImage
                src={lightboxItems[lightbox].url}
                alt={lightboxItems[lightbox].titre}
                width={1200}
                height={800}
                className="max-h-[75vh] w-full object-contain rounded-xl"
                unoptimized
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white font-semibold text-lg">{lightboxItems[lightbox].titre}</p>
              {lightboxItems[lightbox].description && (
                <p className="text-gray-400 text-sm mt-1">{lightboxItems[lightbox].description}</p>
              )}
              <p className="text-gray-600 text-xs mt-2">{lightbox + 1} / {lightboxItems.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
