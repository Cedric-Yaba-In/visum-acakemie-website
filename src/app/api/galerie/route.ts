import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { CategorieMedia, MediaType } from '@prisma/client'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const categorie = searchParams.get('categorie')
  const type = searchParams.get('type')

  const medias = await prisma.media.findMany({
    where: {
      publie: true,
      ...(categorie ? { categorie: categorie as CategorieMedia } : {}),
      ...(type ? { type: type as MediaType } : {}),
    },
    orderBy: [{ ordre: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json(medias)
}
