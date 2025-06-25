'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './Documents.module.css'

const steps = [
  { label: 'Account Info',     href: '/dashboard/user-management/create-user' },
  { label: 'Personal Details', href: '/dashboard/user-management/personal-details' },
  { label: 'Qualifications',   href: '/dashboard/user-management/qualifications' },
  { label: 'Documents',        href: '/dashboard/user-management/documents' },
]

const docTypes = [
  'Resume',
  'Aadhar',
  'PAN',
  'Degree',
  'Other',
]

export default function DocumentsPage() {
  const [form, setForm] = useState({
    document_type: '',
    document_name: '',
    document_url: '',
    verified: false,
  })
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const required = ['document_type','document_url']
    const allFilled = required.every(k => form[k].toString().trim() !== '')
    const noErr = Object.values(errors).every(e => !e)
    setIsValid(allFilled && noErr)
  }, [form, errors])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // simple validation
    if ((name === 'document_type' || name === 'document_url') && !value.trim()) {
      setErrors(prev => ({ ...prev, [name]: 'This field is required' }))
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/users/create-step4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to save documents')
      alert('All steps complete! User onboarded.')
      // optionally redirect to user list or details page
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={3} />

      <div className={styles.progress}>
        <div className={styles.progress__fill} />
      </div>

      <h2 className={styles.title}>Upload Documents</h2>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Document Type */}
          <div className={styles.formGroup}>
            <label htmlFor="document_type" className={styles.label}>
              Document Type
            </label>
            <select
              id="document_type"
              name="document_type"
              className={styles.select}
              value={form.document_type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              {docTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.document_type && (
              <div className={styles.error}>{errors.document_type}</div>
            )}
          </div>

          {/* Document Name (optional) */}
          <div className={styles.formGroup}>
            <label htmlFor="document_name" className={styles.label}>
              Document Name (optional)
            </label>
            <input
              id="document_name"
              name="document_name"
              type="text"
              className={styles.input}
              value={form.document_name}
              onChange={handleChange}
              placeholder="e.g. Jane_Doe_Resume.pdf"
            />
          </div>

          {/* Document URL */}
          <div className={styles.formGroup}>
            <label htmlFor="document_url" className={styles.label}>
              Document URL
            </label>
            <input
              id="document_url"
              name="document_url"
              type="url"
              className={styles.url}
              value={form.document_url}
              onChange={handleChange}
              placeholder="https://example.com/doc.pdf"
            />
            {errors.document_url && (
              <div className={styles.error}>{errors.document_url}</div>
            )}
          </div>

          {/* Verified */}
          <div className={styles.checkboxGroup}>
            <input
              id="verified"
              name="verified"
              type="checkbox"
              checked={form.verified}
              onChange={handleChange}
            />
            <label htmlFor="verified" className={styles.label}>
              Mark as Verified
            </label>
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={!isValid || submitting}
          >
            {submitting ? 'Saving…' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}