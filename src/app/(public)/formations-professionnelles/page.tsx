import Link from 'next/link'
import type { Metadata } from 'next'
import {
  CheckCircle, ArrowRight, Star, Clock, Globe, Shield,
  Heart, Stethoscope, Wrench, ChefHat, Baby, Leaf,
  Building2, Cpu, Truck, Scissors, AlertCircle, FileText,
  Banknote, Home, Users, GraduationCap, Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Formations Professionnelles en Allemagne',
  description: 'Découvrez les formations professionnelles rémunérées en Allemagne (Ausbildung) — diplômes reconnus, résidence permanente, salaire dès le 1er jour.',
}

const avantages = [
  {
    icon: Banknote,
    titre: 'Formation rémunérée',
    desc: 'Vous percevez un salaire dès le premier jour de formation, entre 600 € et 1 200 € par mois selon le secteur et l\'année.',
    color: 'bg-green-500',
  },
  {
    icon: Award,
    titre: 'Diplôme reconnu internationalement',
    desc: 'Le diplôme allemand (Berufsabschluss) est reconnu dans toute l\'Union Européenne et dans de nombreux pays du monde.',
    color: 'bg-blue-500',
  },
  {
    icon: Home,
    titre: 'Résidence permanente',
    desc: 'Après 2 ans de travail post-formation, vous pouvez obtenir un titre de séjour permanent en Allemagne.',
    color: 'bg-purple-500',
  },
  {
    icon: Shield,
    titre: 'Protection sociale complète',
    desc: 'Assurance maladie, retraite, chômage — vous bénéficiez de toute la protection sociale allemande dès le début.',
    color: 'bg-orange-500',
  },
  {
    icon: Globe,
    titre: 'Visa de travail facilité',
    desc: 'L\'Allemagne délivre des visas spéciaux pour les candidats à l\'Ausbildung. Visum Akademie vous accompagne dans les démarches.',
    color: 'bg-[#5ECFCF]',
  },
  {
    icon: Star,
    titre: 'Évolution de carrière rapide',
    desc: 'Après votre Ausbildung, vous pouvez évoluer vers un poste de Meister (maître artisan) ou poursuivre des études supérieures.',
    color: 'bg-[#E8001C]',
  },
]

const formations = [
  {
    icon: Stethoscope,
    secteur: 'Santé',
    metiers: [
      { nom: 'Infirmier(ère) (Pflegefachmann/-frau)', duree: '3 ans', salaire: '1 100 – 1 400 €/mois' },
      { nom: 'Aide-soignant(e) (Pflegehelfer/in)', duree: '1 an', salaire: '800 – 1 000 €/mois' },
      { nom: 'Assistant(e) médical(e) (MFA)', duree: '3 ans', salaire: '700 – 950 €/mois' },
      { nom: 'Technicien(ne) de radiologie', duree: '3 ans', salaire: '1 000 – 1 200 €/mois' },
      { nom: 'Pharmacien(ne) assistant(e)', duree: '3 ans', salaire: '900 – 1 100 €/mois' },
    ],
    color: 'border-red-200 bg-red-50',
    badge: 'bg-red-100 text-red-700',
  },
  {
    icon: Baby,
    secteur: 'Petite enfance & Social',
    metiers: [
      { nom: 'Éducateur(trice) de jeunes enfants (Erzieher/in)', duree: '3 ans', salaire: '1 000 – 1 300 €/mois' },
      { nom: 'Assistant(e) social(e)', duree: '3 ans', salaire: '900 – 1 100 €/mois' },
      { nom: 'Auxiliaire de vie (Altenpfleger/in)', duree: '3 ans', salaire: '1 000 – 1 200 €/mois' },
    ],
    color: 'border-pink-200 bg-pink-50',
    badge: 'bg-pink-100 text-pink-700',
  },
  {
    icon: Wrench,
    secteur: 'Artisanat & Technique',
    metiers: [
      { nom: 'Électricien(ne) (Elektroniker/in)', duree: '3,5 ans', salaire: '700 – 1 000 €/mois' },
      { nom: 'Mécanicien(ne) automobile (KFZ-Mechatroniker/in)', duree: '3,5 ans', salaire: '700 – 950 €/mois' },
      { nom: 'Plombier / Chauffagiste (Anlagenmechaniker/in)', duree: '3,5 ans', salaire: '700 – 950 €/mois' },
      { nom: 'Menuisier(ère) (Tischler/in)', duree: '3 ans', salaire: '600 – 850 €/mois' },
    ],
    color: 'border-orange-200 bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    icon: ChefHat,
    secteur: 'Hôtellerie & Restauration',
    metiers: [
      { nom: 'Cuisinier(ère) (Koch/Köchin)', duree: '3 ans', salaire: '600 – 900 €/mois' },
      { nom: 'Serveur(euse) / Restauration (Restaurantfachmann/-frau)', duree: '3 ans', salaire: '600 – 850 €/mois' },
      { nom: 'Réceptionniste hôtelier(ère)', duree: '3 ans', salaire: '700 – 950 €/mois' },
    ],
    color: 'border-yellow-200 bg-yellow-50',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  {
    icon: Cpu,
    secteur: 'Informatique & Digital',
    metiers: [
      { nom: 'Informaticien(ne) (Fachinformatiker/in)', duree: '3 ans', salaire: '800 – 1 100 €/mois' },
      { nom: 'Technicien(ne) systèmes & réseaux', duree: '3 ans', salaire: '800 – 1 050 €/mois' },
      { nom: 'Développeur(euse) web (Mediengestalter/in)', duree: '3 ans', salaire: '750 – 1 000 €/mois' },
    ],
    color: 'border-blue-200 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Building2,
    secteur: 'Commerce & Gestion',
    metiers: [
      { nom: 'Assistant(e) commercial(e) (Kaufmann/-frau)', duree: '3 ans', salaire: '700 – 1 000 €/mois' },
      { nom: 'Gestionnaire de paie (Steuerfachangestellte/r)', duree: '3 ans', salaire: '700 – 950 €/mois' },
      { nom: 'Logisticien(ne) (Fachkraft für Lagerlogistik)', duree: '3 ans', salaire: '700 – 900 €/mois' },
    ],
    color: 'border-teal-200 bg-teal-50',
    badge: 'bg-teal-100 text-teal-700',
  },
  {
    icon: Leaf,
    secteur: 'Agriculture & Environnement',
    metiers: [
      { nom: 'Agriculteur(trice) (Landwirt/in)', duree: '3 ans', salaire: '600 – 850 €/mois' },
      { nom: 'Jardinier(ère) paysagiste (Gärtner/in)', duree: '3 ans', salaire: '600 – 800 €/mois' },
    ],
    color: 'border-green-200 bg-green-50',
    badge: 'bg-green-100 text-green-700',
  },
  {
    icon: Scissors,
    secteur: 'Beauté & Bien-être',
    metiers: [
      { nom: 'Coiffeur(euse) (Friseur/in)', duree: '3 ans', salaire: '600 – 800 €/mois' },
      { nom: 'Esthéticien(ne) (Kosmetiker/in)', duree: '3 ans', salaire: '600 – 800 €/mois' },
    ],
    color: 'border-purple-200 bg-purple-50',
    badge: 'bg-purple-100 text-purple-700',
  },
]

const criteres = [
  {
    icon: GraduationCap,
    titre: 'Niveau scolaire',
    items: [
      'Baccalauréat ou équivalent (minimum)',
      'BEP / CAP accepté pour certains métiers techniques',
      'Diplôme universitaire (Licence) pour les filières santé avancées',
    ],
  },
  {
    icon: Globe,
    titre: 'Niveau d\'allemand',
    items: [
      'B1 minimum requis pour la plupart des formations',
      'B2 recommandé pour les filières santé et social',
      'A2 accepté pour certains postes techniques avec formation linguistique intégrée',
      'Certification Goethe, TELC ou ÖSD exigée',
    ],
  },
  {
    icon: FileText,
    titre: 'Documents requis',
    items: [
      'Passeport valide (minimum 2 ans)',
      'Diplômes traduits et apostillés',
      'Casier judiciaire vierge',
      'Certificat médical d\'aptitude',
      'Lettre de motivation en allemand',
      'CV en format Europass (en allemand)',
    ],
  },
  {
    icon: Users,
    titre: 'Critères personnels',
    items: [
      'Âge : 18 à 35 ans (selon les employeurs)',
      'Bonne condition physique (surtout pour la santé)',
      'Motivation et sérieux démontrables',
      'Capacité d\'adaptation culturelle',
    ],
  },
]

const etapes = [
  { num: '01', titre: 'Apprendre l\'allemand', desc: 'Atteindre le niveau B1/B2 avec Visum Akademie. Durée : 6 à 18 mois selon votre point de départ.', color: 'bg-[#E8001C]' },
  { num: '02', titre: 'Obtenir la certification', desc: 'Passer et réussir l\'examen Goethe-Zertifikat ou TELC pour valider officiellement votre niveau.', color: 'bg-orange-500' },
  { num: '03', titre: 'Préparer le dossier', desc: 'Rassembler et faire traduire tous vos documents. Visum Akademie vous accompagne dans cette étape.', color: 'bg-blue-500' },
  { num: '04', titre: 'Trouver un employeur', desc: 'Postuler auprès d\'entreprises allemandes. Nous vous mettons en relation avec nos partenaires.', color: 'bg-purple-500' },
  { num: '05', titre: 'Obtenir le visa', desc: 'Déposer votre demande de visa Ausbildung à l\'ambassade d\'Allemagne. Délai : 4 à 8 semaines.', color: 'bg-teal-500' },
  { num: '06', titre: 'Démarrer en Allemagne', desc: 'Arriver en Allemagne, intégrer votre entreprise et commencer à percevoir votre salaire de formation.', color: 'bg-green-500' },
]

export default function FormationsProfessionnellesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* <span className="badge bg-[#E8001C]/20 text-[#ff6b6b] mb-6 inline-block px-4 py-2 text-sm">
            🇩🇪 Ausbildung — Formation Professionnelle Duale
          </span> */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Formez-vous en Allemagne,<br />
            <span className="text-[#5ECFCF]">soyez payé dès le 1er jour</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
            L&apos;Ausbildung est le système de formation professionnelle allemand reconnu mondialement. Vous travaillez en entreprise, vous êtes rémunéré, et vous obtenez un diplôme qui ouvre les portes de toute l&apos;Europe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inscription" className="btn-primary px-8 py-3 text-base">
              Démarrer mon parcours
            </Link>
            <Link href="/contact" className="btn-outline-white px-8 py-3 text-base">
              Parler à un conseiller
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/10">
            {[
              { value: '1 – 3 ans', label: 'Durée de formation' },
              { value: '600 – 1 400 €', label: 'Salaire mensuel' },
              { value: '300+', label: 'Métiers disponibles' },
              { value: '100%', label: 'Diplôme reconnu UE' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-black text-[#5ECFCF]">{s.value}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVANTAGES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title">Pourquoi choisir l&apos;Ausbildung ?</h2>
            <p className="section-subtitle">
              Un système unique au monde qui combine travail, formation et rémunération dès le premier jour.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {avantages.map(({ icon: Icon, titre, desc, color }) => (
              <div key={titre} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow group">
                <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">{titre}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATIONS DISPONIBLES ── */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title">Formations disponibles en Allemagne</h2>
            <p className="section-subtitle">
              Plus de 300 métiers sont accessibles via l&apos;Ausbildung. Voici les secteurs les plus demandés par les candidats africains.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {formations.map(({ icon: Icon, secteur, metiers, color, badge }) => (
              <div key={secteur} className={`rounded-2xl border-2 ${color} p-6`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Icon size={20} className="text-[#1A1A2E]" />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-lg">{secteur}</h3>
                </div>
                <div className="space-y-3">
                  {metiers.map(m => (
                    <div key={m.nom} className="bg-white rounded-xl p-4 flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-[#1A1A2E] text-sm">{m.nom}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={11} />{m.duree}
                          </span>
                        </div>
                      </div>
                      <span className={`badge ${badge} text-xs whitespace-nowrap shrink-0`}>
                        {m.salaire}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">
            * Salaires indicatifs bruts. Ils varient selon la région, l&apos;entreprise et l&apos;année de formation.
          </p>
        </div>
      </section>

      {/* ── CRITÈRES D'ADMISSIBILITÉ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title">Critères d&apos;admissibilité</h2>
            <p className="section-subtitle">
              Voici les conditions générales pour accéder à une formation professionnelle en Allemagne. Certains critères varient selon le secteur.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {criteres.map(({ icon: Icon, titre, items }) => (
              <div key={titre} className="bg-[#F5F5F5] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#E8001C]/10 rounded-xl flex items-center justify-center">
                    <Icon size={20} className="text-[#E8001C]" />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E]">{titre}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Alerte niveau allemand */}
          <div className="bg-[#E8001C]/5 border-2 border-[#E8001C]/20 rounded-2xl p-6 flex items-start gap-4">
            <AlertCircle size={24} className="text-[#E8001C] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#1A1A2E] mb-1">Le niveau d&apos;allemand est la clé</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sans un niveau B1 minimum certifié, votre dossier ne sera pas retenu par les employeurs allemands. C&apos;est pourquoi Visum Akademie vous prépare spécifiquement aux certifications officielles (Goethe, TELC) avant de vous accompagner dans vos démarches d&apos;Ausbildung.
              </p>
              <Link href="/formations" className="inline-flex items-center gap-2 text-[#E8001C] font-semibold text-sm mt-3 hover:underline">
                Voir nos cours d&apos;allemand <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARCOURS EN 6 ÉTAPES ── */}
      <section className="py-20 bg-[#1A1A2E] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Votre parcours en 6 étapes</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              De l&apos;apprentissage de l&apos;allemand à votre premier jour en entreprise en Allemagne — Visum Akademie vous accompagne à chaque étape.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {etapes.map(({ num, titre, desc, color }) => (
              <div key={num} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg mb-4`}>
                  {num}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{titre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARATIF ── */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title">Ausbildung vs Études classiques</h2>
            <p className="section-subtitle">Pourquoi l&apos;Ausbildung est souvent le meilleur choix pour les candidats africains.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1A1A2E] text-white">
                  <th className="text-left px-6 py-4 font-semibold">Critère</th>
                  <th className="text-center px-6 py-4 font-semibold text-[#5ECFCF]">Ausbildung 🇩🇪</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-400">Études universitaires</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Rémunération', '✅ Oui, dès le 1er jour', '❌ Non (frais de scolarité)'],
                  ['Durée', '1 à 3 ans', '3 à 5 ans'],
                  ['Niveau allemand requis', 'B1 / B2', 'C1 minimum'],
                  ['Visa', 'Visa Ausbildung (accessible)', 'Visa étudiant (plus strict)'],
                  ['Résidence permanente', '✅ Après 2 ans de travail', '✅ Après études + travail'],
                  ['Insertion professionnelle', '✅ Quasi immédiate', '⏳ Variable'],
                  ['Reconnaissance diplôme', '✅ UE + international', '✅ UE + international'],
                ].map(([critere, ausbildung, etudes]) => (
                  <tr key={critere} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-[#1A1A2E]">{critere}</td>
                    <td className="px-6 py-4 text-center text-green-700 font-medium">{ausbildung}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{etudes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 bg-[#E8001C] text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">🇩🇪</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à construire votre avenir en Allemagne ?</h2>
          <p className="text-red-100 text-lg mb-2">La première étape, c&apos;est l&apos;allemand.</p>
          <p className="text-red-200 text-sm mb-10 max-w-xl mx-auto">
            Commencez dès aujourd&apos;hui votre formation linguistique avec Visum Akademie. Nos formateurs vous préparent spécifiquement aux exigences de l&apos;Ausbildung.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inscription" className="bg-white text-[#E8001C] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              S&apos;inscrire maintenant
            </Link>
            <Link href="/formations" className="btn-outline-white px-8 py-3">
              Voir nos cours d&apos;allemand
            </Link>
            <Link href="/contact" className="btn-outline-white px-8 py-3">
              Parler à un conseiller
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
