import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Calendar, Tag, Quote, CheckCircle, Globe, GraduationCap, Mic, PenLine } from 'lucide-react'

const stats = [
  { icon: Users, value: ' 50+', label: 'Apprenants formés' },
  { icon: BookOpen, value: '12', label: 'Cours d\'allemand' },
  { icon: Award, value: '2+', label: 'Années d\'expérience' },
  { icon: TrendingUp, value: '97%', label: 'Taux de réussite' },
]

const niveaux = [
  { code: 'A1', label: 'Débutant', desc: 'Premiers pas en allemand' },
  { code: 'A2', label: 'Élémentaire', desc: 'Situations du quotidien' },
  { code: 'B1', label: 'Intermédiaire', desc: 'Autonomie à l\'oral et à l\'écrit' },
  { code: 'B2', label: 'Avancé', desc: 'Aisance professionnelle' },
  { code: 'C1', label: 'Confirmé', desc: 'Maîtrise approfondie' },
  { code: 'C2', label: 'Expert', desc: 'Niveau bilingue certifié' },
]

const competences = [
  { icon: Mic, label: 'Expression orale', desc: 'Conversations, présentations, débats en allemand' },
  { icon: PenLine, label: 'Expression écrite', desc: 'Rédaction, correspondance, rapports professionnels' },
  { icon: BookOpen, label: 'Compréhension', desc: 'Lecture et écoute de documents authentiques' },
  { icon: Globe, label: 'Culture & Civilisation', desc: 'Histoire, culture et société des pays germanophones' },
]

const raisons = [
  'Formateurs certifiés',
  'Méthode communicative et immersive',
  'Petits groupes (max. 12 apprenants)',
  'Préparation aux certifications officielles (Goethe, TELC, ÖSD)',
  'Cours en présentiel et en ligne',
  'Matériel pédagogique inclus',
]

const temoignages = [
  { nom: 'Sophie M.', texte: 'Grâce à Visum Akademie, j\'ai obtenu mon B2 en 8 mois. Les cours sont dynamiques et les formateurs vraiment passionnés par la langue allemande.', niveau: 'Niveau B2' },
  { nom: 'Karim B.', texte: 'J\'avais besoin de l\'allemand pour mon travail. La méthode immersive de Visum m\'a permis de communiquer avec mes collègues allemands en quelques mois.', niveau: 'Niveau B1' },
  { nom: 'Amina D.', texte: 'J\'ai réussi mon examen Goethe-Zertifikat C1 du premier coup. Merci à toute l\'équipe pour leur accompagnement exceptionnel !', niveau: 'Certification C1' },
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
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] text-white py-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* <span className="badge bg-[#E8001C]/20 text-[#ff6b6b] mb-4 inline-block">
              🇩🇪 Centre de langue allemande certifié
            </span> */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Apprenez l&apos;allemand avec <span className="text-[#5ECFCF]">Visum Akademie</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Du niveau A1 au C2, nos formateurs natifs vous accompagnent vers la maîtrise de la langue allemande. Préparez vos certifications Goethe, TELC et ÖSD avec confiance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/formations" className="btn-primary">Voir les cours</Link>
              <Link href="/niveaux" className="btn-outline-white">Tester mon niveau</Link>
            </div>
            {/* <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10 text-sm text-gray-400">
              <span>🏆 Partenaire Goethe-Institut</span>
              <span>✅ Certifié TELC</span>
              <span>🎓 Accrédité ÖSD</span>
            </div> */}
          </div>
          <div className="hidden md:flex justify-center">
            <Image src="/logo-nobg.png" alt="Visum Akademie" width={400} height={280} className="object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
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

      {/* ── NIVEAUX CECR ── */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Tous les niveaux du CECR</h2>
            <p className="section-subtitle">
              Du grand débutant au bilingue, Visum Akademie propose un parcours complet conforme au Cadre Européen Commun de Référence pour les langues.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {niveaux.map((n, i) => {
              const colors = ['bg-green-500', 'bg-teal-500', 'bg-blue-500', 'bg-orange-500', 'bg-red-500', 'bg-[#1A1A2E]']
              return (
                <Link href="/formations" key={n.code} className="card p-5 text-center group hover:scale-105 transition-transform">
                  <div className={`${colors[i]} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm mx-auto mb-3`}>
                    {n.code}
                  </div>
                  <div className="font-bold text-[#1A1A2E] text-sm mb-1">{n.label}</div>
                  <div className="text-gray-400 text-xs">{n.desc}</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── COMPÉTENCES TRAVAILLÉES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">4 compétences, une langue maîtrisée</h2>
            <p className="section-subtitle">Notre approche pédagogique couvre toutes les dimensions de la langue allemande.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competences.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="border border-gray-100 rounded-xl p-6 hover:border-[#E8001C] hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-[#E8001C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#E8001C] transition-colors">
                  <Icon size={22} className="text-[#E8001C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{label}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOT DU PROMOTEUR ── */}
      <section className="py-20 bg-[#1A1A2E] text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E8001C] to-[#5ECFCF] flex items-center justify-center mb-4">
                <GraduationCap size={52} className="text-white" />
              </div>
              <div className="font-bold text-lg text-white"> Boris Kouamen</div>
              <div className="text-[#5ECFCF] text-sm mt-1">Fondateur & Directeur Pédagogique</div>
              {/* <div className="text-gray-400 text-xs mt-1">Docteur en Linguistique Germanique</div> */}
            </div>
            <div className="md:col-span-2">
              <Quote size={40} className="text-[#E8001C] mb-4 opacity-60" />
              <p className="text-gray-300 text-lg leading-relaxed mb-4 italic">
                &ldquo;Chez Visum Akademie, nous croyons que l&apos;apprentissage de l&apos;allemand est bien plus qu&apos;une compétence linguistique — c&apos;est une ouverture sur une culture riche, une économie dynamique et des opportunités professionnelles exceptionnelles.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                Notre mission est de vous offrir un enseignement rigoureux, vivant et adapté à vos objectifs, qu&apos;il s&apos;agisse de voyager, de travailler ou de vous certifier. Chaque apprenant est unique, et nous nous engageons à l&apos;accompagner jusqu&apos;à la réussite.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-0.5 bg-[#E8001C]" />
                <span className="text-[#5ECFCF] font-semibold text-sm">Willkommen bei Visum Akademie !</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS CHOISIR ── */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">Pourquoi choisir Visum Akademie ?</h2>
            <p className="text-gray-500 mb-8">
              Nous ne nous contentons pas d&apos;enseigner l&apos;allemand — nous vous préparons à l&apos;utiliser dans la vraie vie, avec confiance et efficacité.
            </p>
            <ul className="space-y-3">
              {raisons.map(r => (
                <li key={r} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#E8001C] mt-0.5 shrink-0" />
                  <span className="text-gray-700">{r}</span>
                </li>
              ))}
            </ul>
            <Link href="/formations" className="btn-primary inline-flex items-center gap-2 mt-8">
              Découvrir nos cours <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-[#1A1A2E] rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6 text-[#5ECFCF]">Certifications préparées</h3>
            <div className="space-y-4">
              {[
                { cert: 'Goethe-Zertifikat', niveaux: 'A1 → C2', desc: 'La certification allemande la plus reconnue mondialement' },
                { cert: 'TELC Deutsch', niveaux: 'A1 → C1', desc: 'Certification européenne des langues, reconnue par les employeurs' },
                { cert: 'ÖSD', niveaux: 'A2 → C2', desc: 'Diplôme autrichien de langue allemande' },
                { cert: 'TestDaF', niveaux: 'B2 → C1', desc: 'Requis pour les études universitaires en Allemagne' },
              ].map(c => (
                <div key={c.cert} className="border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{c.cert}</span>
                    <span className="badge bg-[#E8001C]/20 text-[#ff6b6b] text-xs">{c.niveaux}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMATIONS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos cours d&apos;allemand</h2>
            <p className="section-subtitle">Des cours structurés pour chaque niveau, animés par des formateurs natifs et certifiés.</p>
          </div>
          {formations.length === 0 ? (
            <p className="text-center text-gray-400">Aucun cours disponible pour le moment.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {formations.map(f => (
                <Link href={`/formations/${f.slug}`} key={f.id} className="card group">
                  <div className="h-40 bg-gradient-to-br from-[#E8001C] to-[#5ECFCF] flex items-center justify-center relative overflow-hidden">
                    <span className="text-white/20 text-7xl font-black absolute -right-2 -bottom-2 select-none">DE</span>
                    <BookOpen size={40} className="text-white relative z-10" />
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
              Tous les cours <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ANNONCES ── */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Dernières annonces</h2>
            <p className="section-subtitle">Actualités, événements, résultats d&apos;examens et offres spéciales de Visum Akademie.</p>
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

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-20 bg-[#1A1A2E] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos apprenants</h2>
            <p className="text-gray-400 text-lg">Des témoignages authentiques de notre communauté germanophone.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {temoignages.map(t => (
              <div key={t.nom} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Quote size={24} className="text-[#E8001C] mb-3 opacity-60" />
                <p className="text-gray-300 mb-5 italic leading-relaxed">{t.texte}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#5ECFCF]">{t.nom}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{t.niveau}</div>
                  </div>
                  <span className="text-2xl">🇩🇪</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 bg-[#E8001C] text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">🇩🇪</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sprechen Sie Deutsch ?</h2>
          <p className="text-red-100 text-lg mb-2">Pas encore ? C&apos;est le moment de commencer !</p>
          <p className="text-red-200 text-sm mb-8 max-w-xl mx-auto">
            Rejoignez plus de 2 000 apprenants qui ont choisi Visum Akademie pour maîtriser l&apos;allemand et décrocher leurs certifications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inscription" className="bg-white text-[#E8001C] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              S&apos;inscrire maintenant
            </Link>
            <Link href="/niveaux" className="btn-outline-white">Tester mon niveau</Link>
            <Link href="/contact" className="btn-outline-white">Nous contacter</Link>
          </div>
        </div>
      </section>
    </>
  )
}
