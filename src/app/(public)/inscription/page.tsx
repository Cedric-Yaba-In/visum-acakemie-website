'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

const schema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  prenom: z.string().min(2, 'Prénom requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().optional(),
  formation: z.string().min(1, 'Choisissez une formation'),
  niveau: z.string().min(1, 'Choisissez un niveau'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function InscriptionPage() {
  const searchParams = useSearchParams()
  const formationParam = searchParams.get('formation') || ''
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { formation: formationParam },
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    const res = await fetch('/api/inscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setLoading(false)
    if (res.ok) setSuccess(true)
  }

  if (success) return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">Inscription envoyée !</h2>
        <p className="text-gray-500">Nous avons bien reçu votre demande. Notre équipe vous contactera dans les 48h.</p>
      </div>
    </div>
  )

  return (
    <>
      <section className="bg-[#1A1A2E] text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Inscription</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Remplissez ce formulaire pour vous inscrire à une formation. Notre équipe vous recontactera rapidement.</p>
      </section>

      <section className="py-16 max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input {...register('nom')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
                {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                <input {...register('prenom')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
                {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input {...register('email')} type="email" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input {...register('telephone')} type="tel" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Formation souhaitée *</label>
              <input {...register('formation')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" placeholder="Ex: Formation Intermédiaire" />
              {errors.formation && <p className="text-red-500 text-xs mt-1">{errors.formation.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau actuel *</label>
              <select {...register('niveau')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]">
                <option value="">Sélectionner un niveau</option>
                {['DEBUTANT', 'ELEMENTAIRE', 'INTERMEDIAIRE', 'AVANCE', 'EXPERT'].map(n => (
                  <option key={n} value={n}>{n.charAt(0) + n.slice(1).toLowerCase()}</option>
                ))}
              </select>
              {errors.niveau && <p className="text-red-500 text-xs mt-1">{errors.niveau.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
              <textarea {...register('message')} rows={4} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C] resize-none" placeholder="Questions, précisions..." />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? 'Envoi en cours...' : 'Envoyer ma demande d\'inscription'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
