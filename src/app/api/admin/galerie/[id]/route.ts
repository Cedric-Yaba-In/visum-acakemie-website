import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  titre: z.string().min(2),
  description: z.string().optional(),
  url: z.string().url(),
  type: z.enum(['PHOTO', 'VIDEO']),
  categorie: z.enum(['COURS', 'EVENEMENT', 'EXAMENS', 'VIE_CAMPUS', 'ALLEMAGNE', 'AUTRE']),
  publie: z.boolean(),
  ordre: z.number(),
})

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const media = await prisma.media.findUnique({ where: { id: params.id } })
  if (!media) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  return NextResponse.json(media)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = schema.parse(await req.json())
    const media = await prisma.media.update({ where: { id: params.id }, data: body })
    return NextResponse.json(media)
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.media.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
