'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const schema = z.object({
  titre: z.string().min(3, 'Titre requis'),
  niveau: z.enum(['DEBUTANT', 'ELEMENTAIRE', 'INTERMEDIAIRE', 'AVANCE', 'EXPERT']),
  domaine: z.string().min(2, 'Domaine requis'),
  description: z.string().min(10, 'Description requise'),
  programme: z.string().min(10, 'Programme requis'),
  prerequis: z.string().optional(),
  debouches: z.string().optional(),
  formateur: z.string().min(2, 'Formateur requis'),
  duree: z.string().min(1, 'Durée requise'),
  prix: z.string().min(1, 'Prix requis').refine(v => !isNaN(Number(v)) && Number(v) > 0, 'Prix invalide'),
  publie: z.boolean(),
})

type FormData = z.infer<typeof schema>

type Props = { defaultValues?: Partial<Omit<FormData, 'prix'>> & { prix?: number | string }; formationId?: string }

export default function FormationForm({ defaultValues, formationId }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { publie: true, niveau: 'DEBUTANT', ...defaultValues, prix: defaultValues?.prix !== undefined ? String(defaultValues.prix) : '' },
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    const url = formationId ? `/api/admin/formations/${formationId}` : '/api/admin/formations'
    const method = formationId ? 'PUT' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, prix: Number(data.prix) }) })
    setLoading(false)
    router.push('/admin/formations')
    router.refresh()
  }

  const textFields: { name: keyof FormData; label: string }[] = [
    { name: 'titre', label: 'Titre' },
    { name: 'domaine', label: 'Domaine' },
    { name: 'formateur', label: 'Formateur' },
    { name: 'duree', label: 'Durée (ex: 3 mois)' },
    { name: 'prix', label: 'Prix (€)' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow-sm p-8">
      <div className="grid md:grid-cols-2 gap-6">
        {textFields.map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
            <input {...register(name)} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message as string}</p>}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Niveau *</label>
          <select {...register('niveau')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]">
            {['DEBUTANT', 'ELEMENTAIRE', 'INTERMEDIAIRE', 'AVANCE', 'EXPERT'].map(n => (
              <option key={n} value={n}>{n.charAt(0) + n.slice(1).toLowerCase()}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea {...register('description')} rows={3} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C] resize-none" />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Programme *</label>
        <textarea {...register('programme')} rows={6} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C] resize-none" placeholder="Détaillez les modules, une ligne par module..." />
        {errors.programme && <p className="text-red-500 text-xs mt-1">{errors.programme.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prérequis</label>
          <textarea {...register('prerequis')} rows={3} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C] resize-none" placeholder="Un prérequis par ligne..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Débouchés</label>
          <textarea {...register('debouches')} rows={3} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C] resize-none" placeholder="Un débouché par ligne..." />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" {...register('publie')} id="publie" className="w-4 h-4 accent-[#E8001C]" />
        <label htmlFor="publie" className="text-sm font-medium text-gray-700">Publier cette formation</label>
      </div>

      <div className="flex gap-4 pt-2">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? 'Enregistrement...' : formationId ? 'Mettre à jour' : 'Créer la formation'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">Annuler</button>
      </div>
    </form>
  )
}
