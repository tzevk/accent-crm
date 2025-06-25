// src/app/dashboard/lead-management/enquiries/follow-ups/page.js
'use client'

import { useEffect, useState } from 'react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './FollowUps.module.css'

const steps = [
  { label: 'Overview',        href: '/dashboard' },
  { label: 'Lead Management', href: '/dashboard/lead-management' },
  { label: 'Enquiries',       href: '/dashboard/lead-management/enquiries' },
  { label: 'Follow Ups',      href: '/dashboard/lead-management/enquiries/follow-ups' },
]

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState([])
  const [form, setForm] = useState({
    leadId: '',
    date: '',
    notes: ''
  })
  const [leads, setLeads] = useState([])
  const [isValid, setIsValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch existing follow ups and lead list
  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_BASE_URL
    fetch(`${API}/lead-management/follow-ups`)
      .then(r => r.json()).then(setFollowUps).catch(console.error)
    fetch(`${API}/lead-management/all-leads`)
      .then(r => r.json()).then(setLeads).catch(console.error)
  }, [])

  // Validate form
  useEffect(() => {
    setIsValid(form.leadId && form.date && form.notes.trim())
  }, [form])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const submit = async e => {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL
      const res = await fetch(`${API}/lead-management/follow-ups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed')
      const newFU = await res.json()
      setFollowUps(fu => [newFU, ...fu])
      setForm({ leadId:'', date:'', notes:'' })
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={3} />
      <h2 className={styles.title}>Follow Ups</h2>

      {/* Form */}
      <div className={styles.formWrapper}>
        <form onSubmit={submit} className={styles.form}>
          <select name="leadId" value={form.leadId} onChange={handleChange} required>
            <option value="">Select Lead…</option>
            {leads.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <textarea
            name="notes"
            rows={3}
            placeholder="Follow up notes…"
            value={form.notes}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={!isValid || submitting}>
            {submitting ? 'Saving…' : 'Add Follow Up'}
          </button>
        </form>
      </div>

      {/* Timeline */}
      <ul className={styles.timeline}>
        {followUps.map(fu => (
          <li key={fu.id} className={styles.entry}>
            <div className={styles.marker} />
            <div className={styles.content}>
              <div className={styles.meta}>
                <strong>{fu.leadName}</strong> on {new Date(fu.date).toLocaleDateString()}
              </div>
              <p>{fu.notes}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}