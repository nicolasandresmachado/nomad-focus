'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1E1520',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        background: '#251A28',
        borderRadius: 20,
        padding: '48px 52px',
        width: '100%',
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}>
        <div style={{ textAlign: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
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
          <h1 style={{ color: '#F5EFF5', fontSize: 24, fontWeight: 400, margin: '12px 0 4px' }}>
            Nomad Focus
          </h1>
          <p style={{ color: '#E85D9B', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', margin: 0 }}>
            Your freelance command center
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              background: '#2E2035',
              border: 'none',
              borderRadius: 10,
              padding: '14px 16px',
              color: '#F5EFF5',
              fontSize: 14,
              outline: 'none'
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              background: '#2E2035',
              border: 'none',
              borderRadius: 10,
              padding: '14px 16px',
              color: '#F5EFF5',
              fontSize: 14,
              outline: 'none'
            }}
          />
        </div>

        {error && <p style={{ color: '#E85D9B', fontSize: 13, margin: 0 }}>{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: '#E85D9B',
            border: 'none',
            borderRadius: 10,
            padding: '14px',
            color: '#F5EFF5',
            fontSize: 14,
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Cargando...' : isSignUp ? 'Crear cuenta' : 'Entrar'}
        </button>

        <p
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ color: '#B89FBD', fontSize: 13, textAlign: 'center', cursor: 'pointer', margin: 0 }}
        >
          {isSignUp ? '¿Ya tenés cuenta? Entrá' : '¿No tenés cuenta? Registrate'}
        </p>
      </div>
    </div>
  )
}