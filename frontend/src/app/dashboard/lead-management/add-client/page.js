// src/app/dashboard/lead-management/add-client/page.js
'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './AddClient.module.css'

const steps = [
  { label: 'Overview',           href: '/dashboard' },
  { label: 'Lead Management',    href: '/dashboard/lead-management' },
  { label: 'Add Client',         href: '/dashboard/lead-management/add-client' },
]

export default function AddClientPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Basic required‐fields check
    const required = ['name', 'email', 'company']
    const filled = required.every(key => form[key].trim() !== '')
    setIsValid(filled)
  }, [form])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || ''
      const res = await fetch(`${API_BASE}/lead-management/add-client`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to add client')
      alert('Client added successfully!')
      setForm({ name: '', email: '', phone: '', company: '', address: '', notes: '' })
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={2} />

      <h2 className={styles.title}>Add Client</h2>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} noValidate>
          {[
            { name: 'name',     label: 'Client Name',      type: 'text',    required: true },
            { name: 'email',    label: 'Email',            type: 'email',   required: true },
            { name: 'phone',    label: 'Phone',            type: 'tel',     required: false },
            { name: 'company',  label: 'Company',          type: 'text',    required: true },
            { name: 'address',  label: 'Address',          type: 'text',    required: false },
          ].map(field => (
            <div key={field.name} className={styles.formGroup}>
              <label htmlFor={field.name} className={styles.label}>
                {field.label}{field.required && <span className={styles.required}>*</span>}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                className={styles.input}
                value={form[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            </div>
          ))}

          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>Notes</label>
            <textarea
              id="notes"
              name="notes"
              className={styles.textarea}
              value={form.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={!isValid || submitting}
          >
            {submitting ? 'Adding…' : 'Add Client'}
          </button>
        </form>
      </div>
    </div>
  )
}