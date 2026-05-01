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
  publie: z.boolean().default(true),
})

export async function GET() {
  const formations = await prisma.formation.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(formations)
}

export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json())
    const slug = createSlug(body.titre)
    const formation = await prisma.formation.create({ data: { ...body, slug } })
    return NextResponse.json(formation, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}
