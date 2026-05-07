import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(_: NextRequest, { params }: { params: { id: string } }) {
  const recruteur = await prisma.recruteur.update({ where: { id: params.id }, data: { lu: true } })
  return NextResponse.json(recruteur)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.recruteur.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
