'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import Toast, { ToastData } from '@/components/Toast'

const schema = z.object({
  titre: z.string().min(3, 'Titre requis'),
  extrait: z.string().min(10, 'Extrait requis'),
  contenu: z.string().min(10, 'Contenu requis'),
  categorie: z.enum(['ACTUALITE', 'EVENEMENT', 'OFFRE', 'RESULTAT', 'AUTRE']),
  statut: z.enum(['BROUILLON', 'PUBLIE']),
})

type FormData = z.infer<typeof schema>

type Props = {
  defaultValues?: Partial<FormData>
  annonceId?: string
}

export default function AnnonceForm({ defaultValues, annonceId }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ToastData | null>(null)
  const closeToast = useCallback(() => setToast(null), [])

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { statut: 'BROUILLON', categorie: 'ACTUALITE', ...defaultValues },
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    const url = annonceId ? `/api/admin/annonces/${annonceId}` : '/api/admin/annonces'
    const method = annonceId ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setLoading(false)
    if (res.ok) {
      setToast({ type: 'success', message: annonceId ? 'Annonce mise à jour !' : 'Annonce créée avec succès !' })
      setTimeout(() => { router.push('/admin/annonces'); router.refresh() }, 1200)
    } else {
      setToast({ type: 'error', message: 'Une erreur est survenue. Veuillez réessayer.' })
    }
  }

  return (
    <>
      {toast && <Toast {...toast} onClose={closeToast} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow-sm p-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input {...register('titre')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
          {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Extrait *</label>
          <textarea {...register('extrait')} rows={2} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C] resize-none" placeholder="Résumé court affiché dans les listes..." />
          {errors.extrait && <p className="text-red-500 text-xs mt-1">{errors.extrait.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contenu complet *</label>
          <textarea {...register('contenu')} rows={10} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C] resize-none font-mono text-sm" />
          {errors.contenu && <p className="text-red-500 text-xs mt-1">{errors.contenu.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
            <select {...register('categorie')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]">
              {['ACTUALITE', 'EVENEMENT', 'OFFRE', 'RESULTAT', 'AUTRE'].map(c => (
                <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut *</label>
            <select {...register('statut')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]">
              <option value="BROUILLON">Brouillon</option>
              <option value="PUBLIE">Publié</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60 inline-flex items-center gap-2">
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Enregistrement...' : annonceId ? 'Mettre à jour' : 'Créer l\'annonce'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary">Annuler</button>
        </div>
      </form>
    </>
  )
}
