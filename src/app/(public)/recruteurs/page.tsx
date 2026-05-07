'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import Link from 'next/link'
import {
  Building2, Users, GraduationCap, Globe, CheckCircle,
  Loader2, Briefcase, Award, ArrowRight, Mail
} from 'lucide-react'

const schema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  entreprise: z.string().min(2, 'Entreprise requise'),
  role: z.string().min(2, 'Rôle requis'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Message trop court'),
})

type FormData = z.infer<typeof schema>

const atouts = [
  {
    icon: GraduationCap,
    titre: 'Apprenants certifiés',
    desc: 'Nos candidats obtiennent des certifications officielles Goethe, TELC ou ÖSD — garantie d\'un niveau d\'allemand vérifié et reconnu.',
  },
  {
    icon: Globe,
    titre: 'Profils motivés & sélectionnés',
    desc: 'Chaque apprenant a choisi d\'apprendre l\'allemand avec un objectif professionnel clair. Leur motivation est un atout majeur pour l\'intégration en entreprise.',
  },
  {
    icon: Users,
    titre: 'Accompagnement culturel',
    desc: 'Au-delà de la langue, nos formations intègrent la culture, les codes professionnels et les usages du monde du travail germanophone.',
  },
  {
    icon: Briefcase,
    titre: 'Prêts pour l\'Ausbildung',
    desc: 'Nos apprenants de niveau B1/B2 sont spécifiquement préparés aux exigences de l\'Ausbildung et aux procédures de visa de travail.',
  },
]

const secteurs = [
  'Santé & Soins infirmiers', 'Petite enfance & Social', 'Informatique & Digital',
  'Hôtellerie & Restauration', 'Artisanat & Technique', 'Commerce & Gestion',
  'Agriculture & Environnement', 'Beauté & Bien-être',
]

export default function RecruteursPage() {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/recruteurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    } catch {
      setError('Impossible de contacter le serveur. Vérifiez votre connexion.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] text-white py-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* <span className="badge bg-[#5ECFCF]/20 text-[#5ECFCF] mb-5 inline-block px-4 py-1.5 text-sm">
              🇩🇪 Espace Recruteurs Allemands
            </span> */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Trouvez vos futurs collaborateurs<br />
              <span className="text-[#5ECFCF]">formés en allemand au Cameroun</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Visum+ Akademie forme chaque année des candidats africains motivés, certifiés en langue allemande et prêts à s&apos;intégrer dans le monde du travail en Allemagne, Autriche et Suisse.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#formulaire" className="btn-primary">Nous contacter</a>
              <Link href="/formations" className="btn-outline-white">Voir nos formations</Link>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {[
              { value: 'B1 – C1', label: 'Niveaux disponibles' },
              { value: '94%', label: 'Taux de réussite aux certifications' },
              { value: '300+', label: 'Métiers en Ausbildung' },
              { value: '0 €', label: 'Frais de mise en relation' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-[#5ECFCF] mb-2">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI RECRUTER CHEZ NOUS ── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#5ECFCF]/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title">Pourquoi recruter via Visum+ Akademie ?</h2>
            <p className="section-subtitle">
              Nos apprenants ne sont pas de simples candidats — ce sont des professionnels en devenir, formés avec rigueur et passion pour réussir en Allemagne.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {atouts.map(({ icon: Icon, titre, desc }) => (
              <div key={titre} className="border border-gray-100 rounded-2xl p-6 hover:border-[#E8001C] hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-[#E8001C]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#E8001C] transition-colors">
                  <Icon size={22} className="text-[#E8001C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{titre}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTEURS ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #F5F5F5 50%, #fff5f5 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Secteurs de formation disponibles</h2>
            <p className="section-subtitle">
              Nos apprenants se préparent à intégrer des entreprises dans ces secteurs clés de l&apos;économie allemande.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {secteurs.map(s => (
              <div key={s} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:border-[#E8001C] hover:shadow-md transition-all">
                <CheckCircle size={18} className="text-[#E8001C] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#1A1A2E]">{s}</p>
              </div>
            ))}
          </div>

          {/* Bloc processus */}
          <div className="bg-[#1A1A2E] rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold text-[#5ECFCF] mb-8 text-center">Comment fonctionne la mise en relation ?</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: '01', titre: 'Vous nous contactez', desc: 'Remplissez le formulaire ci-dessous avec vos besoins en recrutement.' },
                { num: '02', titre: 'Nous analysons', desc: 'Notre équipe identifie les profils correspondant à vos critères parmi nos apprenants.' },
                { num: '03', titre: 'Mise en relation', desc: 'Nous vous transmettons les profils sélectionnés avec leur niveau certifié et leur CV.' },
                { num: '04', titre: 'Recrutement', desc: 'Vous échangez directement avec les candidats et finalisez le recrutement.' },
              ].map(e => (
                <div key={e.num} className="text-center">
                  <div className="w-12 h-12 bg-[#E8001C] rounded-xl flex items-center justify-center font-black text-white text-lg mx-auto mb-4">
                    {e.num}
                  </div>
                  <h4 className="font-bold text-white mb-2 text-sm">{e.titre}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE ── */}
      <section id="formulaire" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E8001C]/4 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Déposer une demande de recrutement</h2>
            <p className="section-subtitle">
              Décrivez votre besoin et nous vous recontacterons avec des profils adaptés dans les plus brefs délais.
            </p>
          </div>

          {success ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">Demande envoyée avec succès !</h3>
              <p className="text-gray-500 mb-2">
                Merci pour votre intérêt envers nos apprenants.
              </p>
              <p className="text-gray-400 text-sm mb-2 max-w-md mx-auto">
                Notre équipe pédagogique va analyser votre demande et vous recontacter dans les <strong>48 à 72 heures</strong> avec une sélection de profils correspondant à vos critères.
              </p>
              <p className="text-gray-400 text-sm mb-10 max-w-md mx-auto">
                En attendant, n&apos;hésitez pas à consulter notre catalogue de formations pour mieux comprendre le niveau de préparation de nos apprenants.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/formations" className="btn-primary inline-flex items-center gap-2">
                  Voir nos formations <ArrowRight size={16} />
                </Link>
                <Link href="/" className="btn-secondary">Retour à l&apos;accueil</Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-10 h-10 bg-[#E8001C]/10 rounded-xl flex items-center justify-center">
                  <Building2 size={20} className="text-[#E8001C]" />
                </div>
                <div>
                  <p className="font-bold text-[#1A1A2E]">Formulaire Recruteur</p>
                  <p className="text-gray-400 text-xs">Réservé aux entreprises germanophones</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                    <input {...register('nom')} placeholder="Max Müller"
                      className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
                    {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise *</label>
                    <input {...register('entreprise')} placeholder="Müller GmbH"
                      className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
                    {errors.entreprise && <p className="text-red-500 text-xs mt-1">{errors.entreprise.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Votre rôle dans l&apos;entreprise *</label>
                    <input {...register('role')} placeholder="Responsable RH, Directeur..."
                      className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel *</label>
                    <input {...register('email')} type="email" placeholder="max@mueller-gmbh.de"
                      className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C]" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre besoin en recrutement *
                  </label>
                  <textarea {...register('message')} rows={5}
                    placeholder="Décrivez le ou les postes recherchés, le secteur d'activité, le niveau d'allemand requis, le nombre de candidats souhaités, la date de début souhaitée..."
                    className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8001C] resize-none" />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="flex items-start gap-3 bg-[#F5F5F5] rounded-xl p-4">
                  <Award size={18} className="text-[#E8001C] shrink-0 mt-0.5" />
                  <p className="text-gray-500 text-xs leading-relaxed">
                    La mise en relation est <strong>entièrement gratuite</strong>. Visum+ Akademie ne perçoit aucune commission sur le recrutement. Notre objectif est uniquement de faciliter l&apos;accès à l&apos;emploi pour nos apprenants.
                  </p>
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full disabled:opacity-60 inline-flex items-center justify-center gap-2">
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? 'Envoi en cours...' : 'Envoyer ma demande de recrutement'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA CONTACT DIRECT ── */}
      <section className="py-16 bg-[#1A1A2E] text-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <Mail size={36} className="text-[#5ECFCF] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Besoin d&apos;une réponse rapide ?</h2>
          <p className="text-gray-400 mb-6">
            Contactez-nous directement par email pour toute demande urgente ou question spécifique.
          </p>
          <a href="mailto:contact@visumplusakademie.com?subject=Demande de recrutement"
            className="btn-outline-white inline-flex items-center gap-2">
            contact@visumplusakademie.com <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  )
}
