'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'

type Company = {
  id: string
  name: string
  website: string | null
  billing_email: string | null
  notes: string | null
  created_at: string
}

export default function ClientesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()
  const [name, setName] = useState('')
  const [website, setWebsite] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => { fetchCompanies() }, [])

  const fetchCompanies = async () => {
    const { data } = await supabase.from('companies').select('*').order('created_at', { ascending: false })
    setCompanies(data || [])
    setLoading(false)
  }

  const addCompany = async () => {
    if (!name) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('companies').insert({ 
      name, 
      website, 
      billing_email: email,
      user_id: user.id 
    })
    setName(''); setWebsite(''); setEmail('')
    setShowForm(false)
    fetchCompanies()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ color: '#F5EFF5', fontFamily: 'serif', fontSize: 28, fontWeight: 400, margin: 0 }}>Clientes</h1>
          <p style={{ color: '#B89FBD', fontSize: 13, margin: '4px 0 0' }}>{companies.length} empresas</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          background: '#E85D9B', border: 'none', borderRadius: 10,
          padding: '10px 20px', color: '#F5EFF5', fontSize: 13, cursor: 'pointer'
        }}>
          + Nuevo cliente
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#251A28', borderRadius: 16, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input placeholder="Nombre de la empresa *" value={name} onChange={e => setName(e.target.value)}
            style={{ background: '#2E2035', border: 'none', borderRadius: 8, padding: '12px 14px', color: '#F5EFF5', fontSize: 13, outline: 'none' }} />
          <input placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)}
            style={{ background: '#2E2035', border: 'none', borderRadius: 8, padding: '12px 14px', color: '#F5EFF5', fontSize: 13, outline: 'none' }} />
          <input placeholder="Email de facturación" value={email} onChange={e => setEmail(e.target.value)}
            style={{ background: '#2E2035', border: 'none', borderRadius: 8, padding: '12px 14px', color: '#F5EFF5', fontSize: 13, outline: 'none' }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={addCompany} style={{ background: '#E85D9B', border: 'none', borderRadius: 8, padding: '10px 20px', color: '#F5EFF5', fontSize: 13, cursor: 'pointer' }}>
              Guardar
            </button>
            <button onClick={() => setShowForm(false)} style={{ background: '#2E2035', border: 'none', borderRadius: 8, padding: '10px 20px', color: '#B89FBD', fontSize: 13, cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p style={{ color: '#B89FBD', fontSize: 13 }}>Cargando...</p>
      ) : companies.length === 0 ? (
        <div style={{ background: '#251A28', borderRadius: 16, padding: '48px', textAlign: 'center' }}>
          <p style={{ color: '#B89FBD', fontSize: 14, margin: 0 }}>Todavía no hay clientes. ¡Agregá el primero!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {companies.map(company => (
            <div key={company.id} style={{
              background: '#251A28', borderRadius: 14, padding: '20px 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer'
            }} onClick={() => router.push(`/dashboard/clientes/${company.id}`)}>
              <div>
                <p style={{ color: '#F5EFF5', fontSize: 15, margin: '0 0 4px', fontFamily: 'serif' }}>{company.name}</p>
                <p style={{ color: '#B89FBD', fontSize: 12, margin: 0 }}>{company.billing_email || company.website || '—'}</p>
              </div>
              <span style={{ color: '#E85D9B', fontSize: 11 }}>→</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
