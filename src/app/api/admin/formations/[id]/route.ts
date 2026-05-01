import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/lib/slugify'
import { z } from 'zod'

const schema = z.object({
  titre: z.string().min(3),
  niveau: z.enum(['DEBUTANT', 'ELEMENTAIRE', 'INTERMEDIAIRE', 'AVANCE', 'EXPERT']),
  domaine: z.string().min(2),
  description: z.string().min(10),
  programme: z.string().min(10),
  prerequis: z.string().optional(),
  debouches: z.string().optional(),
  formateur: z.string().min(2),
  duree: z.string().min(1),
  prix: z.number().positive(),
  image: z.string().optional(),
  publie: z.boolean(),
})

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const f = await prisma.formation.findUnique({ where: { id: params.id } })
  if (!f) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  return NextResponse.json(f)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = schema.parse(await req.json())
    const slug = createSlug(body.titre)
    const f = await prisma.formation.update({ where: { id: params.id }, data: { ...body, slug } })
    return NextResponse.json(f)
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.formation.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
