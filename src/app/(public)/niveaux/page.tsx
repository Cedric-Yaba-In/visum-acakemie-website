import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Niveaux de formation' }

const niveaux = [
  { code: 'A1', label: 'Débutant', couleur: 'bg-green-500', description: 'Vous découvrez la discipline pour la première fois. Aucun prérequis nécessaire.', duree: '2-3 mois', objectif: 'Acquérir les bases fondamentales' },
  { code: 'A2', label: 'Élémentaire', couleur: 'bg-teal-500', description: 'Vous avez quelques notions de base et souhaitez les consolider.', duree: '3-4 mois', objectif: 'Maîtriser les éléments essentiels' },
  { code: 'B1', label: 'Intermédiaire', couleur: 'bg-blue-500', description: 'Vous avez une base solide et pouvez aborder des sujets plus complexes.', duree: '4-5 mois', objectif: 'Développer une autonomie réelle' },
  { code: 'B2', label: 'Avancé', couleur: 'bg-orange-500', description: 'Vous maîtrisez bien la discipline et visez l\'excellence.', duree: '5-6 mois', objectif: 'Atteindre un niveau professionnel' },
  { code: 'C1/C2', label: 'Expert', couleur: 'bg-red-600', description: 'Vous êtes expert et souhaitez obtenir une certification de haut niveau.', duree: '6+ mois', objectif: 'Certification et expertise reconnue' },
]

const questions = [
  { q: 'Avez-vous déjà suivi une formation dans ce domaine ?', oui: 'Passez à la question suivante', non: '→ Niveau Débutant (A1)' },
  { q: 'Pouvez-vous réaliser des tâches simples de manière autonome ?', oui: 'Passez à la question suivante', non: '→ Niveau Élémentaire (A2)' },
  { q: 'Êtes-vous à l\'aise avec des situations complexes ?', oui: 'Passez à la question suivante', non: '→ Niveau Intermédiaire (B1)' },
  { q: 'Avez-vous une expérience professionnelle dans ce domaine ?', oui: '→ Niveau Expert (C1/C2)', non: '→ Niveau Avancé (B2)' },
]

export default function NiveauxPage() {
  return (
    <>
      <section className="bg-[#1A1A2E] text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Nos Niveaux de Formation</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Un parcours progressif adapté à chaque apprenant, du débutant à l&apos;expert.</p>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center">Le système de niveaux</h2>
        <p className="section-subtitle text-center">Inspiré du Cadre Européen Commun de Référence (CECR)</p>

        <div className="grid md:grid-cols-5 gap-4 mb-16">
          {niveaux.map((n, i) => (
            <div key={n.code} className="text-center">
              <div className={`${n.couleur} text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-3`}>
                {n.code}
              </div>
              <h3 className="font-bold text-[#1A1A2E] mb-1">{n.label}</h3>
              <p className="text-gray-500 text-xs mb-2">{n.description}</p>
              <div className="text-xs text-gray-400">⏱ {n.duree}</div>
              <div className="text-xs text-[#E8001C] mt-1">{n.objectif}</div>
              {i < niveaux.length - 1 && <div className="hidden md:block text-gray-300 text-2xl mt-2">→</div>}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Guide d&apos;orientation</h2>
            <p className="text-gray-500 mb-6">Répondez à ces questions pour identifier votre niveau :</p>
            <div className="space-y-4">
              {questions.map((item, i) => (
                <div key={i} className="bg-[#F5F5F5] rounded-xl p-4">
                  <p className="font-semibold text-[#1A1A2E] mb-2">{i + 1}. {item.q}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-green-50 text-green-700 rounded-lg p-2">✓ Oui : {item.oui}</div>
                    <div className="bg-red-50 text-red-700 rounded-lg p-2">✗ Non : {item.non}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1A1A2E] text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Toujours pas sûr ?</h2>
            <p className="text-gray-300 mb-6">Nos conseillers pédagogiques peuvent vous aider à identifier le niveau le plus adapté à votre profil lors d&apos;un entretien gratuit.</p>
            <Link href="/contact" className="btn-primary block text-center mb-4">Prendre rendez-vous</Link>
            <Link href="/formations" className="btn-outline-white block text-center">Voir toutes les formations</Link>
          </div>
        </div>
      </section>
    </>
  )
}
