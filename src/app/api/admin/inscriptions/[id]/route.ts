import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const inscription = await prisma.inscription.findUnique({ where: { id: params.id } })
  if (!inscription) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  return NextResponse.json(inscription)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.inscription.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
