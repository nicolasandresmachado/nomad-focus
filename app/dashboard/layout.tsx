'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Inicio' },
    { href: '/dashboard/clientes', label: 'Clientes' },
    { href: '/dashboard/suscripciones', label: 'Suscripciones' },
    { href: '/dashboard/presupuestos', label: 'Presupuestos' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#1E1520' }}>
      <aside style={{
        width: 220,
        background: '#251A28',
        padding: '32px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="22" rx="5.5" ry="13" fill="#E85D9B" opacity="0.95"/>
            <ellipse cx="50" cy="78" rx="5" ry="13" fill="#E85D9B" opacity="0.85"/>
            <ellipse cx="22" cy="50" rx="13" ry="5.5" fill="#E85D9B" opacity="0.95"/>
            <ellipse cx="78" cy="50" rx="13" ry="5" fill="#E85D9B" opacity="0.85"/>
            <ellipse cx="28.5" cy="28.5" rx="5" ry="12" fill="#E85D9B" opacity="0.8" transform="rotate(-45 28.5 28.5)"/>
            <ellipse cx="71.5" cy="71.5" rx="5" ry="11" fill="#E85D9B" opacity="0.75" transform="rotate(-45 71.5 71.5)"/>
            <ellipse cx="71.5" cy="28.5" rx="5" ry="12" fill="#E85D9B" opacity="0.82" transform="rotate(45 71.5 28.5)"/>
            <ellipse cx="28.5" cy="71.5" rx="4.5" ry="11" fill="#E85D9B" opacity="0.78" transform="rotate(45 28.5 71.5)"/>
            <circle cx="50" cy="50" r="8" fill="#E85D9B"/>
          </svg>
          <span style={{ color: '#F5EFF5', fontFamily: 'serif', fontSize: 16, fontWeight: 400 }}>Nomad Focus</span>
        </div>

        {links.map(link => (
          <Link key={link.href} href={link.href} style={{
            padding: '10px 14px',
            borderRadius: 10,
            color: pathname === link.href ? '#F5EFF5' : '#B89FBD',
            background: pathname === link.href ? '#2E2035' : 'transparent',
            textDecoration: 'none',
            fontSize: 14,
            transition: 'all 0.2s'
          }}>
            {link.label}
          </Link>
        ))}
      </aside>

      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
