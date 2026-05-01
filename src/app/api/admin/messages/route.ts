import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(messages)
}

export async function PATCH(req: NextRequest) {
  const { id } = await req.json()
  const msg = await prisma.message.update({ where: { id }, data: { lu: true } })
  return NextResponse.json(msg)
}
