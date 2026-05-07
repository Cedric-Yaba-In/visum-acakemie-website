import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const recruteurs = await prisma.recruteur.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(recruteurs)
}
