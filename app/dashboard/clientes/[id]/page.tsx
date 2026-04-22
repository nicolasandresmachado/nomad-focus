'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabase'
import { useParams } from 'next/navigation'

type Company = {
  id: string
  name: string
  website: string | null
  billing_name: string | null
  billing_email: string | null
  billing_address: string | null
  billing_vat: string | null
  phone: string | null
  vat_number: string | null
  country: string | null
  language: string | null
  notes: string | null
}

export default function ClienteDetalle() {
  const { id } = useParams()
  const [company, setCompany] = useState<Company | null>(null)
  const [form, setForm] = useState<Partial<Company>>({})
  const [originalNotes, setOriginalNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { fetchCompany() }, [id])

  const fetchCompany = async () => {
    const { data } = await supabase.from('companies').select('*').eq('id', id).single()
    if (data) {
      setCompany(data)
      setForm(data)
      setOriginalNotes(data.notes || '')
    }
  }

  const hasChanges = JSON.stringify(form) !== JSON.stringify(company)

  const save = async () => {
    setSaving(true)
    await supabase.from('companies').update(form).eq('id', id as string)
    setCompany({ ...company, ...form } as Company)
    setOriginalNotes(form.notes || '')
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const field = (label: string, key: keyof Company, placeholder?: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ color: '#B89FBD', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</label>
      <input
        value={(form[key] as string) || ''}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder || label}
        style={{ background: '#2E2035', border: 'none', borderRadius: 8, padding: '12px 14px', color: '#F5EFF5', fontSize: 13, outline: 'none' }}
      />
    </div>
  )

  if (!company) return <div style={{ color: '#B89FBD' }}>Cargando...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 720 }}>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ color: '#F5EFF5', fontFamily: 'serif', fontSize: 28, fontWeight: 400, margin: 0 }}>{company.name}</h1>
          {company.website && <a href={company.website} target="_blank" rel="noreferrer" style={{ color: '#E85D9B', fontSize: 13 }}>{company.website}</a>}
        </div>
        <button
          onClick={save}
          disabled={!hasChanges || saving}
          style={{
            background: hasChanges ? '#E85D9B' : '#2E2035',
            border: 'none', borderRadius: 10,
            padding: '10px 20px', color: hasChanges ? '#F5EFF5' : '#B89FBD',
            fontSize: 13, cursor: hasChanges ? 'pointer' : 'default',
            transition: 'all 0.2s'
          }}
        >
          {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar cambios'}
        </button>
      </div>

      <div style={{ background: '#251A28', borderRadius: 14, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={{ color: '#B89FBD', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Información general</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {field('Nombre empresa', 'name')}
          {field('Website', 'website')}
          {field('Teléfono', 'phone')}
          {field('País', 'country')}
          {field('Idioma', 'language')}
          {field('Número IVA / BTW', 'vat_number', 'BE0123456789')}
        </div>
      </div>

      <div style={{ background: '#251A28', borderRadius: 14, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={{ color: '#B89FBD', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Facturación</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {field('Nombre facturación', 'billing_name')}
          {field('Email facturación', 'billing_email')}
          {field('Dirección', 'billing_address')}
          {field('IVA / BTW (facturación)', 'billing_vat')}
        </div>
      </div>

      <div style={{ background: '#251A28', borderRadius: 14, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ color: '#B89FBD', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Notas privadas</span>
        <textarea
          value={form.notes || ''}
          onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
          rows={5}
          placeholder="Percepción personal, datos útiles, historial de relación..."
          style={{
            background: '#2E2035', border: 'none', borderRadius: 8,
            padding: '12px 14px', color: '#F5EFF5', fontSize: 13,
            outline: 'none', resize: 'vertical', fontFamily: 'sans-serif'
          }}
        />
      </div>

    </div>
  )
}
