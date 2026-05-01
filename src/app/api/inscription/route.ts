import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().optional(),
  formation: z.string().min(1),
  niveau: z.string().min(1),
  message: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    await prisma.inscription.create({ data })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}
