'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Bell, BookOpen, MessageSquare, LogOut, Users } from 'lucide-react'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/annonces', icon: Bell, label: 'Annonces' },
  { href: '/admin/formations', icon: BookOpen, label: 'Formations' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <aside className="w-64 bg-[#1A1A2E] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Image src="/logo-nobg.png" alt="Visum Akademie" width={120} height={40} className="object-contain brightness-0 invert" />
          <p className="text-gray-400 text-xs mt-2">Administration</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[#E8001C] text-white' : 'text-gray-300 hover:bg-white/10'}`}>
                <Icon size={18} />{label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 w-full transition-colors">
            <LogOut size={18} />Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
