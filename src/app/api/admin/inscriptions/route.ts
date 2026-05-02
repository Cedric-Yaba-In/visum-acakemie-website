import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const inscriptions = await prisma.inscription.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(inscriptions)
}

export async function PATCH(req: NextRequest) {
  const { id } = await req.json()
  const inscription = await prisma.inscription.update({ where: { id }, data: { traite: true } })
  return NextResponse.json(inscription)
}
