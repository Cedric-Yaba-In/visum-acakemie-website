import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/lib/slugify'
import { z } from 'zod'

const schema = z.object({
  titre: z.string().min(3),
  contenu: z.string().min(10),
  extrait: z.string().min(10),
  categorie: z.enum(['ACTUALITE', 'EVENEMENT', 'OFFRE', 'RESULTAT', 'AUTRE']),
  statut: z.enum(['BROUILLON', 'PUBLIE']),
  image: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const annonce = await prisma.annonce.findUnique({ where: { id: params.id } })
  if (!annonce) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  return NextResponse.json(annonce)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = schema.parse(await req.json())
    const slug = createSlug(body.titre)
    const annonce = await prisma.annonce.update({ where: { id: params.id }, data: { ...body, slug } })
    return NextResponse.json(annonce)
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.annonce.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
