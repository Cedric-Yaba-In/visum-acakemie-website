import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // ── Nettoyage complet dans l'ordre des dépendances ──
  await prisma.inscription.deleteMany()
  await prisma.message.deleteMany()
  await prisma.annonce.deleteMany()
  await prisma.formation.deleteMany()
  await prisma.admin.deleteMany()
  console.log('🗑️  Base de données nettoyée')

  // ── Admin ──
  const hashedPassword = await bcrypt.hash('Admin@2026!', 12)
  await prisma.admin.create({
    data: {
      email: 'admin@visum-akademie.com',
      password: hashedPassword,
      nom: 'Administrateur',
    },
  })
  console.log('✅ Admin créé : admin@visum-akademie.com / Admin@2026!')

  // ── Formations ──
  await prisma.formation.createMany({
    data: [
      {
        titre: 'Allemand Débutant A1',
        slug: 'allemand-debutant-a1',
        niveau: 'DEBUTANT',
        domaine: 'Langue allemande',
        description: 'Découvrez les bases de la langue allemande. Idéal pour les personnes sans aucune connaissance préalable.',
        programme: 'Module 1 : Alphabet et prononciation\nModule 2 : Salutations et présentations\nModule 3 : Chiffres et couleurs\nModule 4 : La famille et le quotidien\nModule 5 : Évaluation finale',
        prerequis: 'Aucun prérequis nécessaire',
        debouches: 'Niveau A1 certifié\nBase pour continuer vers A2',
        formateur: 'M. Boris Kouamen',
        duree: '2 mois',
        prix: 45000,
        publie: true,
      },
      {
        titre: 'Allemand Élémentaire A2',
        slug: 'allemand-elementaire-a2',
        niveau: 'ELEMENTAIRE',
        domaine: 'Langue allemande',
        description: 'Consolidez vos acquis du niveau A1 et apprenez à communiquer dans les situations courantes de la vie quotidienne.',
        programme: 'Module 1 : Révision et approfondissement A1\nModule 2 : La vie quotidienne et les loisirs\nModule 3 : Les achats et les services\nModule 4 : Voyages et transports\nModule 5 : Préparation à la certification A2',
        prerequis: 'Niveau A1 validé ou équivalent',
        debouches: 'Certification A2 reconnue\nAccès aux formations B1',
        formateur: 'M. Boris Kouamen',
        duree: '3 mois',
        prix: 55000,
        publie: true,
      },
      {
        titre: 'Allemand Intermédiaire B1',
        slug: 'allemand-intermediaire-b1',
        niveau: 'INTERMEDIAIRE',
        domaine: 'Langue allemande',
        description: 'Renforcez vos compétences en allemand et atteignez un niveau d\'autonomie réelle dans les situations courantes.',
        programme: 'Module 1 : Grammaire avancée\nModule 2 : Expression orale et écrite\nModule 3 : Vocabulaire professionnel\nModule 4 : Culture et civilisation allemande\nModule 5 : Préparation à la certification B1',
        prerequis: 'Niveau A2 validé ou équivalent',
        debouches: 'Certification B1 reconnue\nAccès aux formations B2\nOpportunités professionnelles en entreprise',
        formateur: 'M. Boris Kouamen',
        duree: '4 mois',
        prix: 70000,
        publie: true,
      },
      {
        titre: 'Allemand Avancé B2',
        slug: 'allemand-avance-b2',
        niveau: 'AVANCE',
        domaine: 'Langue allemande',
        description: 'Atteignez une aisance professionnelle en allemand. Idéal pour les candidats à des postes en entreprise ou à des études en Allemagne.',
        programme: 'Module 1 : Expression orale avancée\nModule 2 : Rédaction professionnelle\nModule 3 : Allemand des affaires\nModule 4 : Littérature et médias germanophones\nModule 5 : Simulation d\'examens B2',
        prerequis: 'Niveau B1 validé ou équivalent',
        debouches: 'Certification B2 Goethe ou TELC\nAccès aux universités germanophones\nCarrière en entreprise internationale',
        formateur: 'M. Boris Kouamen',
        duree: '5 mois',
        prix: 85000,
        publie: true,
      },
      {
        titre: 'Certification Expert C1/C2',
        slug: 'certification-expert-c1-c2',
        niveau: 'EXPERT',
        domaine: 'Langue allemande',
        description: 'Préparez-vous aux certifications C1 et C2, les plus hauts niveaux de maîtrise de la langue allemande reconnus internationalement.',
        programme: 'Module 1 : Maîtrise de la langue écrite\nModule 2 : Expression orale avancée\nModule 3 : Littérature et culture germanophone\nModule 4 : Simulation d\'examens officiels\nModule 5 : Certification Goethe / TELC / ÖSD',
        prerequis: 'Niveau B2 validé\nExpérience professionnelle recommandée',
        debouches: 'Certification C1/C2 internationale\nCarrière diplomatique ou académique\nTraduction et interprétariat\nÉtudes supérieures en Allemagne, Autriche ou Suisse',
        formateur: 'M. Boris Kouamen',
        duree: '6 mois',
        prix: 110000,
        publie: true,
      },
    ],
  })
  console.log('✅ Formations créées')

  // ── Annonces ──
  await prisma.annonce.createMany({
    data: [
      {
        titre: 'Ouverture des inscriptions — Session Juillet 2025',
        slug: 'ouverture-inscriptions-juillet-2025',
        extrait: 'Les inscriptions pour la session de juillet 2025 sont désormais ouvertes. Profitez des tarifs préférentiels jusqu\'au 30 juin.',
        contenu: 'Nous avons le plaisir d\'annoncer l\'ouverture des inscriptions pour notre session de juillet 2025.\n\nToutes nos formations sont disponibles à partir du 1er juillet 2025. Les places sont limitées, nous vous encourageons à vous inscrire rapidement.\n\nTarifs préférentiels :\n- 10% de réduction pour toute inscription avant le 30 juin\n- 15% de réduction pour les groupes de 3 personnes et plus\n\nPour vous inscrire, rendez-vous sur notre page d\'inscription ou contactez-nous directement au +237 653 78 04 08.',
        categorie: 'ACTUALITE',
        statut: 'PUBLIE',
      },
      {
        titre: 'Journée Portes Ouvertes — Bangangté',
        slug: 'journee-portes-ouvertes-bangante',
        extrait: 'Venez découvrir Visum Akademie lors de notre journée portes ouvertes à Bangangté. Rencontrez nos formateurs et testez votre niveau gratuitement.',
        contenu: 'Visum Akademie vous invite à sa journée portes ouvertes le samedi 21 juin 2025 de 9h à 16h à notre siège de Tchougo, Bangangté.\n\nAu programme :\n- Visite des locaux et des salles de formation\n- Rencontre avec nos formateurs\n- Présentation de toutes nos formations\n- Tests de positionnement gratuits\n- Ateliers de découverte de la langue allemande\n- Remise de documentation et de matériel pédagogique\n\nEntrée libre et gratuite. Venez accompagné(e) !',
        categorie: 'EVENEMENT',
        statut: 'PUBLIE',
      },
      {
        titre: 'Résultats Goethe-Zertifikat B1 — Session Avril 2025',
        slug: 'resultats-goethe-b1-avril-2025',
        extrait: 'Félicitations à tous nos apprenants ayant réussi l\'examen Goethe-Zertifikat B1 de la session d\'avril 2025. Taux de réussite : 94%.',
        contenu: 'Visum Akademie est fière d\'annoncer les résultats de la session Goethe-Zertifikat B1 d\'avril 2025.\n\nTaux de réussite global : 94%\nMention Très Bien : 12 apprenants\nMention Bien : 8 apprenants\nMention Passable : 4 apprenants\n\nNous félicitons chaleureusement tous nos apprenants pour leurs efforts et leur persévérance. Ces résultats témoignent de la qualité de notre enseignement et de l\'engagement de nos formateurs.\n\nLa prochaine session d\'examen est prévue pour octobre 2025. Inscrivez-vous dès maintenant !',
        categorie: 'RESULTAT',
        statut: 'PUBLIE',
      },
    ],
  })
  console.log('✅ Annonces créées')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
