import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Calendar, Tag, Quote, CheckCircle, Globe, GraduationCap, Mic, PenLine, Target, Eye, Heart, Mail, FileText, Headphones } from 'lucide-react'
import Reveal from '@/components/Reveal'
import CountUp from '@/components/CountUp'

function IconLinkedin() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

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
  // { code: 'C2', label: 'Expert', desc: 'Niveau bilingue certifié' },
]

const competences = [
  { icon: Mic,         label: 'Expression orale',    labelDE: 'Mündlicher Ausdruck',   desc: 'Conversations, présentations et débats en allemand' },
  { icon: PenLine,     label: 'Expression écrite',    labelDE: 'Schriftlicher Ausdruck', desc: 'Rédaction, correspondance et rapports professionnels' },
  { icon: FileText,    label: 'Compréhension écrite', labelDE: 'Leseverstehen',          desc: 'Lecture et analyse de documents authentiques en allemand' },
  { icon: Headphones,  label: 'Compréhension orale',  labelDE: 'Hörverstehen',           desc: 'Écoute et compréhension de documents audio et vidéo' },
]

const raisons = [
  'Formateurs certifiés',
  'Méthode communicative et immersive',
  'Petits groupes (max. 12 apprenants)',
  'Préparation aux certifications officielles (Goethe, TELC, ÖSD, ECL)',
  'Cours en présentiel et en ligne',
  'Matériel pédagogique inclus',
  'Cadre d\'apprentissage convivial et motivant',
  'Internet illimité',
  'Cours de répétition gratuit'
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

const equipe = [
  {
    nom: 'Boris Kouamen Nwandji',
    titre: 'Co-Fondateur & CEO',
    role: 'Direction',
    bio: 'Passionné de langue allemande et d\'entrepreneuriat, Boris a fondé Visum+ Akademie avec la conviction que l\'allemand est un vecteur d\'opportunités exceptionnelles pour la jeunesse africaine.',
    photo: null,
    linkedin: '#',
    facebook: '#',
    instagram: '#',
    email: 'boris@visumplusakademie.com',
  },
  {
    nom: 'Formateur Principal',
    titre: 'Formateur certifié — Niveaux A1 à C1',
    role: 'Pédagogie',
    bio: 'Certifié Goethe-Institut, notre formateur principal accompagne les apprenants de tous niveaux avec une méthode communicative et immersive, axée sur la pratique orale et écrite.',
    photo: null,
    linkedin: '#',
    facebook: '#',
    instagram: null,
    email: 'formation@visumplusakademie.com',
  },
  {
    nom: 'Coordinatrice Pédagogique',
    titre: 'Coordination & Suivi des apprenants',
    role: 'Administration',
    bio: 'Responsable du suivi individuel de chaque apprenant, elle veille à la qualité des parcours de formation et assure le lien entre les apprenants, les formateurs et les partenaires.',
    photo: null,
    linkedin: '#',
    facebook: '#',
    instagram: '#',
    email: 'contact@visumplusakademie.com',
  },
]

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
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Apprenez l&apos;allemand avec <span className="text-[#5ECFCF]">Visum+Akademie</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Du niveau A1 au C2, nos formateurs natifs vous accompagnent vers la maîtrise de la langue allemande. Préparez vos certifications Goethe, TELC et ÖSD avec confiance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/formations" className="btn-primary">Offre de formations</Link>
              <Link href="/formations-professionnelles" className="btn-outline-white">Formations en Allemagne</Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <Image src="/logo-nobg.png" alt="Visum Akademie" width={400} height={280} className="object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#E8001C]/4" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#5ECFCF]/4" />
        </div>
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} animation="fade-up" delay={i * 100}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#E8001C]/10 rounded-full mb-3">
                  <Icon size={24} className="text-[#E8001C]" />
                </div>
                <div className="text-3xl font-bold text-[#1A1A2E]"><CountUp value={value.trim()} /></div>
                <div className="text-gray-500 text-sm mt-1">{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── NIVEAUX CECR ── */}
      <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #f0f4ff 0%, #F5F5F5 50%, #fff5f5 100%)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="section-title">Tous les niveaux d'apprentissage</h2>
              <p className="section-subtitle">
                Du grand débutant au bilingue, Visum Akademie propose un parcours complet conforme au Cadre Européen Commun de Référence pour les langues.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
            {niveaux.map((n, i) => {
              const colors = ['bg-green-500', 'bg-teal-500', 'bg-blue-500', 'bg-orange-500', 'bg-red-500']
              return (
                <Reveal key={n.code} animation="zoom" delay={i * 80} as={Link} href="/formations" className="card p-5 text-center group hover:scale-105 transition-transform w-full">
                  <div className={`${colors[i]} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm mx-auto mb-3`}>
                    {n.code}
                  </div>
                  <div className="font-bold text-[#1A1A2E] text-sm mb-1">{n.label}</div>
                  <div className="text-gray-400 text-xs">{n.desc}</div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── COMPÉTENCES TRAVAILLÉES ── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots-comp" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="#1A1A2E" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-comp)" />
          </svg>
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#5ECFCF]/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="section-title">4 compétences, une langue maîtrisée</h2>
              <p className="section-subtitle">Notre approche pédagogique couvre toutes les dimensions de la langue allemande.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competences.map(({ icon: Icon, label, labelDE, desc }, i) => (
              <Reveal key={label} animation="fade-up" delay={i * 100} className="border border-gray-100 rounded-xl p-6 hover:border-[#E8001C] hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-[#E8001C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#E8001C] transition-colors">
                  <Icon size={22} className="text-[#E8001C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-1">{label}</h3>
                <p className="text-[#5ECFCF] text-xs font-semibold mb-3 tracking-wide">{labelDE}</p>
                <p className="text-gray-500 text-sm">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOT DU PROMOTEUR ── */}
      <section className="py-20 bg-[#1A1A2E] text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <Reveal animation="fade-right" className="md:col-span-1 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E8001C] to-[#5ECFCF] flex items-center justify-center mb-4">
                <GraduationCap size={52} className="text-white" />
              </div>
              <div className="font-bold text-lg text-white">Boris Kouamen Nwandji</div>
              <div className="text-[#5ECFCF] text-sm mt-1">Co-Fondateur & CEO</div>
            </Reveal>
            <Reveal animation="fade-left" delay={150} className="md:col-span-2">
              <Quote size={40} className="text-[#E8001C] mb-4 opacity-60" />
              <p className="text-gray-300 text-lg leading-relaxed mb-4 italic">
                &ldquo;Chez Visum+ Akademie, nous croyons que l&apos;apprentissage de l&apos;allemand est bien plus qu&apos;une comp&eacute;tence linguistique &mdash; c&apos;est une ouverture sur une culture riche, une &eacute;conomie dynamique et des opportunit&eacute;s professionnelles exceptionnelles.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                Notre mission est de vous offrir un enseignement rigoureux, vivant et adapt&eacute; &agrave; vos objectifs, qu&apos;il s&apos;agisse de voyager, de travailler ou de vous certifier. Chaque apprenant est unique, et nous nous engageons &agrave; l&apos;accompagner jusqu&apos;&agrave; la r&eacute;ussite.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-0.5 bg-[#E8001C]" />
                <span className="text-[#5ECFCF] font-semibold text-sm">Willkommen bei Visum+ Akademie !</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS CHOISIR ── */}
      <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(160deg, #fafafa 0%, #F5F5F5 40%, #f0f8ff 100%)'}}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8001C]/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#5ECFCF]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <Reveal animation="fade-right">
            <h2 className="section-title">Pourquoi choisir Visum+ Akademie ?</h2>
            <p className="text-gray-500 mb-8">
              Nous ne nous contentons pas d&apos;enseigner l&apos;allemand &mdash; nous vous pr&eacute;parons &agrave; l&apos;utiliser dans la vraie vie, avec confiance et efficacit&eacute;.
            </p>
            <ul className="space-y-3">
              {raisons.map(r => (
                <li key={r} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#E8001C] mt-0.5 shrink-0" />
                  <span className="text-gray-700">{r}</span>
                </li>
              ))}
            </ul>
            <Link href="/galerie" className="btn-primary inline-flex items-center gap-2 mt-8">
              D&eacute;couvrir notre centre <ArrowRight size={16} />
            </Link>
          </Reveal>
          <Reveal animation="fade-left" delay={150}>
          <div className="bg-[#1A1A2E] rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6 text-[#5ECFCF]">Certifications préparées</h3>
            <div className="space-y-4">
              {[
                { cert: 'Goethe-Zertifikat', niveaux: 'A1 → C1', desc: 'La certification allemande la plus reconnue mondialement' },
                { cert: 'TELC Deutsch', niveaux: 'A1 → C1', desc: 'Certification européenne des langues, reconnue par les employeurs' },
                { cert: 'ÖSD', niveaux: 'A2 → C1', desc: 'Diplôme autrichien de langue allemande' },
                { cert: 'ECL', niveaux: 'B2 → C1', desc: 'Requis pour les études universitaires en Allemagne' },
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
          </Reveal>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-vision" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A1A2E" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-vision)" />
          </svg>
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#E8001C]/4 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#5ECFCF]/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal animation="fade-up">
            <div className="text-center mb-14">
              <h2 className="section-title">Notre Vision</h2>
              <p className="section-subtitle">
                Ce qui nous anime chaque jour et guide chacune de nos d&eacute;cisions p&eacute;dagogiques.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {[
              {
                icon: Target,
                titre: 'Notre Mission',
                couleur: 'bg-[#E8001C]',
                texte: 'Rendre la langue allemande accessible à tous les apprenants africains, en leur offrant une formation de qualité internationale, ancrée dans leur réalité et orientée vers leurs ambitions.',
              },
              {
                icon: Eye,
                titre: 'Notre Vision',
                couleur: 'bg-[#1A1A2E]',
                texte: 'Devenir le centre de référence en Afrique centrale pour l\'apprentissage de l\'allemand et l\'accompagnement vers les opportunités professionnelles en Allemagne et en Europe.',
              },
              {
                icon: Heart,
                titre: 'Nos Valeurs',
                couleur: 'bg-[#5ECFCF]',
                texte: 'Excellence pédagogique, bienveillance envers chaque apprenant, rigueur dans l\'enseignement, ouverture culturelle et engagement total pour la réussite de chacun.',
              },
            ].map(({ icon: Icon, titre, couleur, texte }, i) => (
              <Reveal key={titre} animation="fade-up" delay={i * 120} className="relative bg-[#F5F5F5] rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className={`${couleur} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{titre}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{texte}</p>
                <div className={`absolute bottom-0 left-8 right-8 h-0.5 ${couleur} rounded-full opacity-30`} />
              </Reveal>
            ))}
          </div>

          <Reveal animation="fade-up" delay={100}>
          <div className="bg-gradient-to-r from-[#1A1A2E] to-[#0F3460] rounded-2xl p-8 grid grid-cols-2 md:grid-cols-3 gap-6 text-white text-center">
            {[
              { value: '2022', label: 'Année de fondation' },
              { value: 'Bangangté', label: 'Siège — Cameroun' },
              { value: 'A1 → C1', label: 'Niveaux couverts' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-black text-[#5ECFCF] mb-1">{s.value}</div>
                <div className="text-gray-400 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* ── ÉQUIPE ── */}
      <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(180deg, #F5F5F5 0%, #eef2ff 50%, #F5F5F5 100%)'}}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots-equipe" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#1A1A2E" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-equipe)" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8001C]/3 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal animation="fade-up">
            <div className="text-center mb-14">
              <h2 className="section-title">Notre &Eacute;quipe</h2>
              <p className="section-subtitle">
                Des professionnels passionn&eacute;s, engag&eacute;s pour votre r&eacute;ussite en langue allemande.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipe.map((membre, i) => (
              <Reveal key={membre.nom} animation="fade-up" delay={i * 120} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
                {/* Photo */}
                <div className="relative h-64 bg-gradient-to-br from-[#1A1A2E] to-[#0F3460] overflow-hidden">
                  {membre.photo ? (
                    <Image src={membre.photo} alt={membre.nom} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E8001C] to-[#5ECFCF] flex items-center justify-center">
                        <GraduationCap size={40} className="text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="badge bg-[#E8001C] text-white text-xs">{membre.role}</span>
                  </div>
                </div>
                {/* Infos */}
                <div className="p-6">
                  <h3 className="font-bold text-[#1A1A2E] text-lg mb-0.5">{membre.nom}</h3>
                  <p className="text-[#5ECFCF] text-sm font-medium mb-3">{membre.titre}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{membre.bio}</p>
                  {/* Réseaux sociaux */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {membre.linkedin && (
                      <a href={membre.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-[#0077B5]/10 flex items-center justify-center text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-colors">
                        <IconLinkedin />
                      </a>
                    )}
                    {membre.facebook && (
                      <a href={membre.facebook} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors">
                        <IconFacebook />
                      </a>
                    )}
                    {membre.instagram && (
                      <a href={membre.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors">
                        <IconInstagram />
                      </a>
                    )}
                    {membre.email && (
                      <a href={`mailto:${membre.email}`}
                        className="w-8 h-8 rounded-lg bg-[#E8001C]/10 flex items-center justify-center text-[#E8001C] hover:bg-[#E8001C] hover:text-white transition-colors">
                        <Mail size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATIONS ── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#E8001C]/20 to-transparent" />
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#5ECFCF]/5 blur-3xl" />
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E8001C]/4 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="section-title">Nos cours d&apos;allemand</h2>
              <p className="section-subtitle">Des cours structur&eacute;s pour chaque niveau, anim&eacute;s par des formateurs natifs et certifi&eacute;s.</p>
            </div>
          </Reveal>
          {formations.length === 0 ? (
            <p className="text-center text-gray-400">Aucun cours disponible pour le moment.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {formations.map((f, i) => (
                <Reveal key={f.id} animation="fade-up" delay={i * 80} as={Link} href={`/formations/${f.slug}`} className="card group">
                  <div className="h-40 bg-gradient-to-br from-[#E8001C] to-[#5ECFCF] flex items-center justify-center relative overflow-hidden">
                    <span className="text-white/20 text-7xl font-black absolute -right-2 -bottom-2 select-none">DE</span>
                    <BookOpen size={40} className="text-white relative z-10" />
                  </div>
                  <div className="p-5">
                    <span className="badge bg-[#E8001C]/10 text-[#E8001C] mb-2">{f.niveau}</span>
                    <h3 className="font-bold text-[#1A1A2E] mb-1 group-hover:text-[#E8001C] transition-colors">{f.titre}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{f.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#E8001C] font-bold">{f.prix.toLocaleString('fr-FR')} FCFA</span>
                      <span className="text-gray-400 text-xs">{f.duree}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
          <Reveal animation="fade-up" delay={100}>
          <div className="text-center mt-10">
            <Link href="/formations" className="btn-secondary inline-flex items-center gap-2">
              Tous les cours <ArrowRight size={16} />
            </Link>
          </div>
          </Reveal>
        </div>
      </section>

      {/* ── ANNONCES ── */}
      <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #F5F5F5 0%, #f8f4ff 50%, #F5F5F5 100%)'}}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots-annonces" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#1A1A2E" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-annonces)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="section-title">Derni&egrave;res annonces</h2>
              <p className="section-subtitle">Actualit&eacute;s, &eacute;v&eacute;nements, r&eacute;sultats d&apos;examens et offres sp&eacute;ciales de Visum Akademie.</p>
            </div>
          </Reveal>
          {annonces.length === 0 ? (
            <p className="text-center text-gray-400">Aucune annonce pour le moment.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {annonces.map((a, i) => (
                <Reveal key={a.id} animation="fade-up" delay={i * 100} as={Link} href={`/annonces/${a.slug}`} className="card group p-6">
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
                </Reveal>
              ))}
            </div>
          )}
          <Reveal animation="fade-up" delay={100}>
          <div className="text-center mt-10">
            <Link href="/annonces" className="btn-secondary inline-flex items-center gap-2">
              Toutes les annonces <ArrowRight size={16} />
            </Link>
          </div>
          </Reveal>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-20 bg-[#1A1A2E] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos apprenants</h2>
              <p className="text-gray-400 text-lg">Des t&eacute;moignages authentiques de notre communaut&eacute; germanophone.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {temoignages.map((t, i) => (
              <Reveal key={t.nom} animation="fade-up" delay={i * 120} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Quote size={24} className="text-[#E8001C] mb-3 opacity-60" />
                <p className="text-gray-300 mb-5 italic leading-relaxed">{t.texte}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#5ECFCF]">{t.nom}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{t.niveau}</div>
                  </div>
                  <span className="text-2xl">🇩🇪</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 bg-[#E8001C] text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal animation="zoom">
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
          </Reveal>
        </div>
      </section>
    </>
  )
}
