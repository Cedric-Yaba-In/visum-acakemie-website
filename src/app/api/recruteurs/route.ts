import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  entreprise: z.string().min(2, 'Entreprise requise'),
  role: z.string().min(2, 'Rôle requis'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Message trop court'),
})

export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json())
    await prisma.recruteur.create({ data: body })
    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
}
