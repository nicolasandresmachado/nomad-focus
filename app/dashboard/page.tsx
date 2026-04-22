'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const quotes = [
  { text: "El secreto del éxito en las ventas es dejar de vender y empezar a ayudar.", author: "Zig Ziglar" },
  { text: "Tu nivel de éxito raramente excede tu nivel de desarrollo personal.", author: "Jim Rohn" },
  { text: "La persistencia puede cambiar el fracaso en un logro extraordinario.", author: "Matt Biondi" },
  { text: "No cuentes los días, haz que los días cuenten.", author: "Muhammad Ali" },
  { text: "El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el coraje de continuar.", author: "Winston Churchill" },
  { text: "Cree que puedes y ya estás a mitad de camino.", author: "Theodore Roosevelt" },
]

export default function Dashboard() {
  const [stats, setStats] = useState({ clients: 0, subscriptions: 0, quotes: 0 })
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const { count: clients } = await supabase.from('companies').select('*', { count: 'exact', head: true })
    const { count: subscriptions } = await supabase.from('subscriptions').select('*', { count: 'exact', head: true })
    setStats({ clients: clients || 0, subscriptions: subscriptions || 0, quotes: 0 })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Header */}
      <div>
        <h1 style={{ color: '#F5EFF5', fontFamily: 'serif', fontSize: 28, fontWeight: 400, margin: 0 }}>Buenos días</h1>
        <p style={{ color: '#B89FBD', fontSize: 13, margin: '4px 0 0' }}>Aquí está tu resumen de hoy</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Clientes activos', value: stats.clients },
          { label: 'Suscripciones', value: stats.subscriptions },
          { label: 'Presupuestos este año', value: stats.quotes },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#251A28',
            borderRadius: 16,
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}>
            <span style={{ color: '#B89FBD', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{stat.label}</span>
            <span style={{ color: '#F5EFF5', fontSize: 36, fontFamily: 'serif', fontWeight: 400, lineHeight: 1 }}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div style={{
        background: '#251A28',
        borderRadius: 16,
        padding: '32px 36px',
        borderLeft: '3px solid #E85D9B'
      }}>
        <p style={{ color: '#F5EFF5', fontSize: 17, fontFamily: 'serif', fontStyle: 'italic', margin: '0 0 12px', lineHeight: 1.6 }}>
          "{quote.text}"
        </p>
        <span style={{ color: '#E85D9B', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>— {quote.author}</span>
      </div>

    </div>
  )
}
