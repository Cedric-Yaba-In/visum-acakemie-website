import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin par défaut
  const hashedPassword = await bcrypt.hash('Admin@2024!', 12)
  await prisma.admin.upsert({
    where: { email: 'admin@visum-akademie.com' },
    update: {},
    create: {
      email: 'admin@visum-akademie.com',
      password: hashedPassword,
      nom: 'Administrateur',
    },
  })
  console.log('✅ Admin créé : admin@visum-akademie.com / Admin@2024!')

  // Formations de démo
  const formations = [
    {
      titre: 'Allemand Débutant A1',
      slug: 'allemand-debutant-a1',
      niveau: 'DEBUTANT' as const,
      domaine: 'Langue allemande',
      description: 'Découvrez les bases de la langue allemande. Idéal pour les personnes sans aucune connaissance préalable.',
      programme: 'Module 1 : Alphabet et prononciation\nModule 2 : Salutations et présentations\nModule 3 : Chiffres et couleurs\nModule 4 : La famille et le quotidien\nModule 5 : Évaluation finale',
      prerequis: 'Aucun prérequis nécessaire',
      debouches: 'Niveau A1 certifié\nBase pour continuer vers A2',
      formateur: 'Dr. Klaus Müller',
      duree: '2 mois',
      prix: 299,
      publie: true,
    },
    {
      titre: 'Allemand Intermédiaire B1',
      slug: 'allemand-intermediaire-b1',
      niveau: 'INTERMEDIAIRE' as const,
      domaine: 'Langue allemande',
      description: 'Renforcez vos compétences en allemand et atteignez un niveau d\'autonomie réelle dans les situations courantes.',
      programme: 'Module 1 : Grammaire avancée\nModule 2 : Expression orale et écrite\nModule 3 : Vocabulaire professionnel\nModule 4 : Culture et civilisation allemande\nModule 5 : Préparation à la certification B1',
      prerequis: 'Niveau A2 validé ou équivalent',
      debouches: 'Certification B1 reconnue\nAccès aux formations B2\nOpportunités professionnelles en entreprise',
      formateur: 'Prof. Anna Schmidt',
      duree: '4 mois',
      prix: 499,
      publie: true,
    },
    {
      titre: 'Certification Expert C2',
      slug: 'certification-expert-c2',
      niveau: 'EXPERT' as const,
      domaine: 'Langue allemande',
      description: 'Préparez-vous à la certification C2, le plus haut niveau de maîtrise de la langue allemande.',
      programme: 'Module 1 : Maîtrise de la langue écrite\nModule 2 : Expression orale avancée\nModule 3 : Littérature et culture\nModule 4 : Simulation d\'examens\nModule 5 : Certification officielle',
      prerequis: 'Niveau C1 validé\nExpérience professionnelle recommandée',
      debouches: 'Certification C2 internationale\nCarrière diplomatique ou académique\nTraduction et interprétariat',
      formateur: 'Dr. Hans Weber',
      duree: '6 mois',
      prix: 899,
      publie: true,
    },
  ]

  for (const f of formations) {
    await prisma.formation.upsert({ where: { slug: f.slug }, update: {}, create: f })
  }
  console.log('✅ Formations de démo créées')

  // Annonces de démo
  const annonces = [
    {
      titre: 'Ouverture des inscriptions — Session Automne 2024',
      slug: 'ouverture-inscriptions-automne-2024',
      extrait: 'Les inscriptions pour la session d\'automne 2024 sont désormais ouvertes. Profitez des tarifs préférentiels jusqu\'au 30 septembre.',
      contenu: 'Nous avons le plaisir d\'annoncer l\'ouverture des inscriptions pour notre session d\'automne 2024.\n\nToutes nos formations sont disponibles à partir du 1er octobre 2024. Les places sont limitées, nous vous encourageons à vous inscrire rapidement.\n\nTarifs préférentiels :\n- 10% de réduction pour toute inscription avant le 30 septembre\n- 15% de réduction pour les groupes de 3 personnes et plus\n\nPour vous inscrire, rendez-vous sur notre page d\'inscription ou contactez-nous directement.',
      categorie: 'ACTUALITE' as const,
      statut: 'PUBLIE' as const,
    },
    {
      titre: 'Journée Portes Ouvertes — 15 Octobre 2024',
      slug: 'journee-portes-ouvertes-octobre-2024',
      extrait: 'Venez découvrir Visum Akademie lors de notre journée portes ouvertes. Rencontrez nos formateurs et visitez nos locaux.',
      contenu: 'Visum Akademie vous invite à sa journée portes ouvertes le 15 octobre 2024 de 10h à 17h.\n\nAu programme :\n- Visite des locaux et des salles de formation\n- Rencontre avec nos formateurs\n- Présentation de toutes nos formations\n- Tests de positionnement gratuits\n- Ateliers de découverte\n\nEntrée libre et gratuite. Venez accompagné(e) !',
      categorie: 'EVENEMENT' as const,
      statut: 'PUBLIE' as const,
    },
  ]

  for (const a of annonces) {
    await prisma.annonce.upsert({ where: { slug: a.slug }, update: {}, create: a })
  }
  console.log('✅ Annonces de démo créées')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
