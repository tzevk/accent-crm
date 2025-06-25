// src/app/dashboard/lead-management/all-leads/page.js
'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './AllLeads.module.css'

const steps = [
  { label: 'Overview',        href: '/dashboard' },
  { label: 'Lead Management', href: '/dashboard/lead-management' },
  { label: 'All Leads',       href: '/dashboard/lead-management/all-leads' },
]

export default function AllLeadsPage() {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    fetch(`${API_BASE}/lead-management/all-leads`)
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(console.error)
  }, [])

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={2} />
      <h2 className={styles.title}>All Leads</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Source</th>
              <th>Status</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.empty}>
                  No leads available.
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.company || '-'}</td>
                  <td>{lead.source || '-'}</td>
                  <td>{lead.status}</td>
                  <td>{lead.contact_email || lead.contact_phone || '-'}</td>
                  <td>
                    <button
                      className={styles.actionBtn}
                      onClick={() => window.alert(`Viewing lead ${lead.name}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}