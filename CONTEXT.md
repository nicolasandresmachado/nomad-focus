# Nomad Focus — Contexto del proyecto

## Qué es
CRM interno para freelancers. Gestión de clientes, suscripciones, presupuestos y reportes. Objetivo a largo plazo: convertirlo en SaaS vendible a otros freelancers creativos.

## Stack
- Next.js 16 (App Router)
- Supabase (base de datos + autenticación)
- Vercel (hosting)
- TypeScript + Tailwind

## Repositorio
https://github.com/nicolasandresmachado/nomad-focus

## Identidad visual
- Símbolo: asterisco floral F1, 8 pétalos (elipses rotadas)
- Tipografía: Playfair Display (títulos) + DM Sans (interfaz)
- Paleta dark: fondo #1E1520, cards #251A28, acento #E85D9B, texto #F5EFF5
- Paleta light: fondo #F5EEF5, cards #EDE4ED, texto #1E1520
- Tagline: "Your freelance command center"
- Usuario objetivo: freelancer creativo, early adopter

## Estructura de archivos
- app/login/page.tsx — pantalla de login y registro
- app/dashboard/layout.tsx — sidebar de navegación
- app/dashboard/page.tsx — dashboard principal con stats y quotes
- app/dashboard/clientes/page.tsx — lista y creación de clientes
- lib/supabase.ts — cliente de Supabase

## Base de datos (Supabase)
Tablas creadas con Row Level Security activado:
- companies (id, user_id, name, website, billing_email, billing_address, billing_vat, notes)
- contacts (id, user_id, company_id, first_name, last_name, email, phone, role, notes)
- subscriptions (id, user_id, company_id, contact_id, name, description, amount, currency, billing_cycle, status, start_date, renewal_date)

## Lo que está construido
- Login y registro con email (Supabase Auth)
- Dashboard con stats (clientes, suscripciones, presupuestos) y quotes motivadoras
- Vista de clientes con formulario para agregar empresas

## Pendiente próximas sesiones
- Vista detallada de cada cliente (contactos, suscripciones, notas personales)
- Módulo de suscripciones
- Módulo de presupuestos
- Gráficos de facturación en el dashboard
- Login con Google y Microsoft
- Portal de cliente (acceso externo para ver suscripciones)
- Reportes mensuales de mantenimiento
- Integración con Microsoft email + resumen IA de conversaciones
- Multiidioma: español, inglés, neerlandés

## Decisiones tomadas
- Dark mode por defecto con toggle a light
- Filosofía: menos es más, belleza funcional, sin ruido
- Sin confirmar email en desarrollo (activar en producción)
- Multi-usuario desde el principio con RLS en Supabase
