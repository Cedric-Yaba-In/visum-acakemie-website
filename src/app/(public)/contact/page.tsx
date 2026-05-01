'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'

const schema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  sujet: z.string().min(3, 'Sujet requis'),
  message: z.string().min(10, 'Message trop court'),
})

type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setLoading(true)
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setLoading(false)
    if (res.ok) setSuccess(true)
  }

  return (
    <>
      <section className="bg-[#1A1A2E] text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Notre équipe est disponible pour répondre à toutes vos questions.</p>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Envoyez-nous un message</h2>
          {success ? (
            <div className="text-center py-12">
              <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">Message envoyé !</h3>
              <p className="text-gray-500">Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                <input {...register('nom')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
                {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input {...register('email')} type="email" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                <input {...register('sujet')} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
                {errors.sujet && <p className="text-red-500 text-xs mt-1">{errors.sujet.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea {...register('message')} rows={5} className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C] resize-none" />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
                {loading ? 'Envoi...' : 'Envoyer le message'}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Nos coordonnées</h2>
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Adresse', value: '123 Rue de la Formation, 75000 Paris' },
                { icon: Phone, label: 'Téléphone', value: '+33 1 23 45 67 89' },
                { icon: Mail, label: 'Email', value: 'contact@visum-akademie.com' },
                { icon: Clock, label: 'Horaires', value: 'Lun–Ven : 8h–18h | Sam : 9h–13h' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#E8001C]/10 rounded-full flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#E8001C]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1A2E] text-sm">{label}</div>
                    <div className="text-gray-500 text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden h-64 bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615674!3d48.858370079287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzMwLjEiTiAywr8xNyczMi4yIkU!5e0!3m2!1sfr!2sfr!4v1620000000000"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  )
}
