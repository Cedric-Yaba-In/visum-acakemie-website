import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const formations = await prisma.formation.findMany({
    where: { publie: true },
    select: { id: true, titre: true, niveau: true },
    orderBy: { niveau: 'asc' },
  })
  return NextResponse.json(formations)
}
