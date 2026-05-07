'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { Loader2, Image as ImageIcon, Play } from 'lucide-react'
import Toast, { ToastData } from '@/components/Toast'

const schema = z.object({
  titre: z.string().min(2, 'Titre requis'),
  description: z.string().optional(),
  url: z.string().url('URL invalide (ex: https://...)'),
  type: z.enum(['PHOTO', 'VIDEO']),
  categorie: z.enum(['COURS', 'EVENEMENT', 'EXAMENS', 'VIE_CAMPUS', 'ALLEMAGNE', 'AUTRE']),
  publie: z.boolean(),
  ordre: z.coerce.number().default(0),
})

type FormData = z.infer<typeof schema>
type Props = { defaultValues?: Partial<FormData>; mediaId?: string }

const categories = [
  { value: 'COURS', label: 'Cours' },
  { value: 'EVENEMENT', label: 'Événements' },
  { value: 'EXAMENS', label: 'Examens & Résultats' },
  { value: 'VIE_CAMPUS', label: 'Vie au campus' },
  { value: 'ALLEMAGNE', label: 'Vie en Allemagne' },
  { value: 'AUTRE', label: 'Autre' },
]

export default function MediaForm({ defaultValues, mediaId }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ToastData | null>(null)
  const [preview, setPreview] = useState(defaultValues?.url || '')
  const closeToast = useCallback(() => setToast(null), [])

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { publie: true, type: 'PHOTO', categorie: 'COURS', ordre: 0, ...defaultValues },
  })

  const urlValue = watch('url')
  const typeValue = watch('type')

  async function onSubmit(data: FormData) {
    setLoading(true)
    const url = mediaId ? `/api/admin/galerie/${mediaId}` : '/api/admin/galerie'
    const method = mediaId ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setLoading(false)
    if (res.ok) {
      setToast({ type: 'success', message: mediaId ? 'Média mis à jour !' : 'Média ajouté à la galerie !' })
      setTimeout(() => { router.push('/admin/galerie'); router.refresh() }, 1200)
    } else {
      setToast({ type: 'error', message: 'Une erreur est survenue.' })
    }
  }

  return (
    <>
      {toast && <Toast {...toast} onClose={closeToast} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow-sm p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            <div className="flex gap-3">
              {[{ value: 'PHOTO', icon: ImageIcon, label: 'Photo' }, { value: 'VIDEO', icon: Play, label: 'Vidéo' }].map(t => (
                <label key={t.value} className={`flex-1 flex items-center gap-2 border-2 rounded-xl p-3 cursor-pointer transition-colors
                  ${typeValue === t.value ? 'border-[#E8001C] bg-[#E8001C]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" value={t.value} {...register('type')} className="sr-only" />
                  <t.icon size={18} className={typeValue === t.value ? 'text-[#E8001C]' : 'text-gray-400'} />
                  <span className={`font-medium text-sm ${typeValue === t.value ? 'text-[#E8001C]' : 'text-gray-600'}`}>{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
            <select {...register('categorie')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]">
              {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        {/* Titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input {...register('titre')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
          {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea {...register('description')} rows={2} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C] resize-none"
            placeholder="Légende ou description courte..." />
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL {typeValue === 'PHOTO' ? 'de l\'image' : 'de la vidéo (YouTube ou lien direct)'} *
          </label>
          <input {...register('url')} onBlur={e => setPreview(e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]"
            placeholder={typeValue === 'VIDEO' ? 'https://www.youtube.com/watch?v=...' : 'https://exemple.com/photo.jpg'} />
          {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url.message}</p>}
          <p className="text-gray-400 text-xs mt-1">
            {typeValue === 'VIDEO' ? 'Accepte les liens YouTube, youtu.be ou URL directe .mp4' : 'URL directe vers l\'image (jpg, png, webp...)'}
          </p>
        </div>

        {/* Prévisualisation */}
        {preview && (
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-400 px-4 py-2 border-b">Prévisualisation</p>
            {typeValue === 'PHOTO' ? (
              <img src={preview} alt="preview" className="max-h-48 w-full object-contain p-2" onError={() => setPreview('')} />
            ) : (
              preview.includes('youtube') || preview.includes('youtu.be') ? (
                <div className="aspect-video">
                  <iframe src={`https://www.youtube.com/embed/${preview.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/)?.[1]}`}
                    className="w-full h-full" allowFullScreen />
                </div>
              ) : (
                <video src={preview} controls className="max-h-48 w-full" />
              )
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {/* Ordre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordre d&apos;affichage</label>
            <input type="number" {...register('ordre')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
            <p className="text-gray-400 text-xs mt-1">0 = premier affiché</p>
          </div>

          {/* Publié */}
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" {...register('publie')} className="w-4 h-4 accent-[#E8001C]" />
              <span className="text-sm font-medium text-gray-700">Publier dans la galerie</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60 inline-flex items-center gap-2">
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Enregistrement...' : mediaId ? 'Mettre à jour' : 'Ajouter à la galerie'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary">Annuler</button>
        </div>
      </form>
    </>
  )
}
