import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  titre: z.string().min(2, 'Titre requis'),
  description: z.string().optional(),
  url: z.string().url('URL invalide'),
  type: z.enum(['PHOTO', 'VIDEO']),
  categorie: z.enum(['COURS', 'EVENEMENT', 'EXAMENS', 'VIE_CAMPUS', 'ALLEMAGNE', 'AUTRE']),
  publie: z.boolean().default(true),
  ordre: z.number().default(0),
})

export async function GET() {
  const medias = await prisma.media.findMany({
    orderBy: [{ ordre: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json(medias)
}

export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json())
    const media = await prisma.media.create({ data: body })
    return NextResponse.json(media, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}
