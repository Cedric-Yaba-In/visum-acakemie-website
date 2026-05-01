import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Calendar, Tag } from 'lucide-react'

const stats = [
  { icon: Users, value: '2 000+', label: 'Apprenants formés' },
  { icon: BookOpen, value: '50+', label: 'Formations disponibles' },
  { icon: Award, value: '15+', label: 'Années d\'expérience' },
  { icon: TrendingUp, value: '95%', label: 'Taux de satisfaction' },
]

const temoignages = [
  { nom: 'Sophie M.', texte: 'Visum Akademie a transformé ma carrière. Les formateurs sont excellents et très disponibles.', formation: 'Formation Avancée' },
  { nom: 'Karim B.', texte: 'Une pédagogie claire, des supports de qualité. Je recommande vivement à tous.', formation: 'Niveau Intermédiaire' },
  { nom: 'Amina D.', texte: 'J\'ai obtenu ma certification en 3 mois. Merci à toute l\'équipe de Visum Akademie !', formation: 'Certification Expert' },
]

const categorieColors: Record<string, string> = {
  ACTUALITE: 'bg-blue-100 text-blue-700',
  EVENEMENT: 'bg-purple-100 text-purple-700',
  OFFRE: 'bg-green-100 text-green-700',
  RESULTAT: 'bg-yellow-100 text-yellow-700',
  AUTRE: 'bg-gray-100 text-gray-700',
}

export default async function HomePage() {
  const [formations, annonces] = await Promise.all([
    prisma.formation.findMany({ where: { publie: true }, take: 4, orderBy: { createdAt: 'desc' } }),
    prisma.annonce.findMany({ where: { statut: 'PUBLIE' }, take: 3, orderBy: { createdAt: 'desc' } }),
  ])

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] text-white py-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge bg-[#E8001C]/20 text-[#ff6b6b] mb-4 inline-block">🎓 Centre de formation certifié</span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Formez-vous avec <span className="text-[#5ECFCF]">Visum Akademie</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Des formations de qualité pour tous les niveaux. Développez vos compétences avec nos experts et obtenez des certifications reconnues.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/formations" className="btn-primary">Voir les formations</Link>
              <Link href="/niveaux" className="btn-outline-white">Tester mon niveau</Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <Image src="/logo-nobg.png" alt="Visum Akademie" width={400} height={280} className="object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#E8001C]/10 rounded-full mb-3">
                <Icon size={24} className="text-[#E8001C]" />
              </div>
              <div className="text-3xl font-bold text-[#1A1A2E]">{value}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FORMATIONS */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos formations</h2>
            <p className="section-subtitle">Découvrez notre catalogue de formations adaptées à chaque niveau et objectif professionnel.</p>
          </div>
          {formations.length === 0 ? (
            <p className="text-center text-gray-400">Aucune formation disponible pour le moment.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {formations.map(f => (
                <Link href={`/formations/${f.slug}`} key={f.id} className="card group">
                  <div className="h-40 bg-gradient-to-br from-[#E8001C] to-[#5ECFCF] flex items-center justify-center">
                    <BookOpen size={40} className="text-white" />
                  </div>
                  <div className="p-5">
                    <span className="badge bg-[#E8001C]/10 text-[#E8001C] mb-2">{f.niveau}</span>
                    <h3 className="font-bold text-[#1A1A2E] mb-1 group-hover:text-[#E8001C] transition-colors">{f.titre}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{f.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#E8001C] font-bold">{f.prix} €</span>
                      <span className="text-gray-400 text-xs">{f.duree}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/formations" className="btn-secondary inline-flex items-center gap-2">
              Toutes les formations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ANNONCES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Dernières annonces</h2>
            <p className="section-subtitle">Restez informé des actualités, événements et offres de Visum Akademie.</p>
          </div>
          {annonces.length === 0 ? (
            <p className="text-center text-gray-400">Aucune annonce pour le moment.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {annonces.map(a => (
                <Link href={`/annonces/${a.slug}`} key={a.id} className="card group p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`badge ${categorieColors[a.categorie] || 'bg-gray-100 text-gray-700'}`}>
                      <Tag size={10} className="inline mr-1" />{a.categorie}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] mb-2 group-hover:text-[#E8001C] transition-colors">{a.titre}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">{a.extrait}</p>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Calendar size={12} />
                    <span>{new Date(a.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/annonces" className="btn-secondary inline-flex items-center gap-2">
              Toutes les annonces <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="py-20 bg-[#1A1A2E] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos apprenants</h2>
            <p className="text-gray-400 text-lg">Des témoignages authentiques de notre communauté.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {temoignages.map(t => (
              <div key={t.nom} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-gray-300 mb-4 italic">&ldquo;{t.texte}&rdquo;</p>
                <div>
                  <div className="font-semibold text-[#5ECFCF]">{t.nom}</div>
                  <div className="text-gray-500 text-sm">{t.formation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-[#E8001C] text-white text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à commencer votre parcours ?</h2>
        <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">Rejoignez des milliers d&apos;apprenants qui ont fait confiance à Visum Akademie.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/inscription" className="bg-white text-[#E8001C] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            S&apos;inscrire maintenant
          </Link>
          <Link href="/contact" className="btn-outline-white">Nous contacter</Link>
        </div>
      </section>
    </>
  )
}
