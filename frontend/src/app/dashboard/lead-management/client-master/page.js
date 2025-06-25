// src/app/dashboard/lead-management/client-master/page.js
'use client'

import { useEffect, useState } from 'react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './ClientMaster.module.css'

const steps = [
  { label: 'Overview',           href: '/dashboard' },
  { label: 'Lead Management',    href: '/dashboard/lead-management' },
  { label: 'Client Master',      href: '/dashboard/lead-management/client-master' },
]

export default function ClientMasterPage() {
  const [clients, setClients] = useState([])

  useEffect(() => {
    // Replace with your Plesk‐hosted API base
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    fetch(`${API_BASE}/lead-management/clients`)
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(console.error)
  }, [])

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={2} />
      <h2 className={styles.title}>Client Master</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>
                  No clients found.
                </td>
              </tr>
            ) : (
              clients.map(client => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone || '-'}</td>
                  <td>{client.company}</td>
                  <td>{client.address || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}