import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/lib/slugify'
import { z } from 'zod'

const schema = z.object({
  titre: z.string().min(3),
  contenu: z.string().min(10),
  extrait: z.string().min(10),
  categorie: z.enum(['ACTUALITE', 'EVENEMENT', 'OFFRE', 'RESULTAT', 'AUTRE']),
  statut: z.enum(['BROUILLON', 'PUBLIE']).default('BROUILLON'),
  image: z.string().optional(),
})

export async function GET() {
  const annonces = await prisma.annonce.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(annonces)
}

export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json())
    const slug = createSlug(body.titre)
    const annonce = await prisma.annonce.create({ data: { ...body, slug } })
    return NextResponse.json(annonce, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}
