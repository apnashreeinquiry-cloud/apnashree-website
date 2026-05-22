'use client'
import dynamic from 'next/dynamic'

const AdminPanel = dynamic(() => import('./AdminPanel'), { ssr: false, loading: () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Space Grotesk, sans-serif', background: '#f8f6f1' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>⚙️</div>
      <p style={{ fontSize: 16, color: '#888' }}>Loading Admin Panel...</p>
    </div>
  </div>
)})

export default function AdminPage() {
  return <AdminPanel />
}