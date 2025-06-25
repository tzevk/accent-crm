'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './Qualifications.module.css'

const steps = [
  { label: 'Account Info',     href: '/dashboard/user-management/create-user' },
  { label: 'Personal Details', href: '/dashboard/user-management/personal-details' },
  { label: 'Qualifications',   href: '/dashboard/user-management/qualifications' },
  { label: 'Documents',        href: '/dashboard/user-management/documents' },
]

// Degree enum options
const degreeOptions = [
  'Diploma',
  'Bachelor',
  'Master',
  'PhD',
  'Other',
]

export default function QualificationsPage() {
  const [form, setForm] = useState({
    degree_level: '',
    degree_name: '',
    institution_name: '',
    specialization: '',
    start_year: '',
    end_year: '',
    grade: '',
    document_url: '',
  })
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // required fields must be non-empty
    const required = [
      'degree_level',
      'degree_name',
      'institution_name',
      'specialization',
      'start_year',
      'end_year',
      'grade',
      'document_url',
    ]
    const allFilled = required.every(k => form[k].toString().trim() !== '')
    const noErr = Object.values(errors).every(e => !e)
    setIsValid(allFilled && noErr)
  }, [form, errors])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // simple validation
    if (!value.trim()) {
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
      const res = await fetch('/api/users/create-step3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          start_year: Number(form.start_year),
          end_year:   Number(form.end_year),
        }),
      })
      if (!res.ok) throw new Error('Failed to save qualifications')
      // proceed to Documents step
      window.location.href = steps[3].href
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={2} />

      <div className={styles.progress}>
        <div className={styles.progress__fill} />
      </div>

      <h2 className={styles.title}>Qualifications</h2>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Degree Level */}
          <div className={styles.formGroup}>
            <label htmlFor="degree_level" className={styles.label}>
              Degree Level
            </label>
            <select
              id="degree_level"
              name="degree_level"
              className={styles.select}
              value={form.degree_level}
              onChange={handleChange}
            >
              <option value="">Select Degree Level</option>
              {degreeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.degree_level && (
              <div className={styles.error}>{errors.degree_level}</div>
            )}
          </div>

          {/* Degree Name */}
          <div className={styles.formGroup}>
            <label htmlFor="degree_name" className={styles.label}>
              Degree Name
            </label>
            <input
              id="degree_name"
              name="degree_name"
              type="text"
              className={styles.input}
              value={form.degree_name}
              onChange={handleChange}
            />
            {errors.degree_name && (
              <div className={styles.error}>{errors.degree_name}</div>
            )}
          </div>

          {/* Institution Name */}
          <div className={styles.formGroup}>
            <label htmlFor="institution_name" className={styles.label}>
              Institution Name
            </label>
            <input
              id="institution_name"
              name="institution_name"
              type="text"
              className={styles.input}
              value={form.institution_name}
              onChange={handleChange}
            />
            {errors.institution_name && (
              <div className={styles.error}>{errors.institution_name}</div>
            )}
          </div>

          {/* Specialization */}
          <div className={styles.formGroup}>
            <label htmlFor="specialization" className={styles.label}>
              Specialization
            </label>
            <input
              id="specialization"
              name="specialization"
              type="text"
              className={styles.input}
              value={form.specialization}
              onChange={handleChange}
            />
            {errors.specialization && (
              <div className={styles.error}>{errors.specialization}</div>
            )}
          </div>

          {/* Start Year */}
          <div className={styles.formGroup}>
            <label htmlFor="start_year" className={styles.label}>
              Start Year
            </label>
            <input
              id="start_year"
              name="start_year"
              type="number"
              className={styles.input}
              value={form.start_year}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
            />
            {errors.start_year && (
              <div className={styles.error}>{errors.start_year}</div>
            )}
          </div>

          {/* End Year */}
          <div className={styles.formGroup}>
            <label htmlFor="end_year" className={styles.label}>
              End Year
            </label>
            <input
              id="end_year"
              name="end_year"
              type="number"
              className={styles.input}
              value={form.end_year}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear() + 5}
            />
            {errors.end_year && (
              <div className={styles.error}>{errors.end_year}</div>
            )}
          </div>

          {/* Grade */}
          <div className={styles.formGroup}>
            <label htmlFor="grade" className={styles.label}>
              Grade/Percentage
            </label>
            <input
              id="grade"
              name="grade"
              type="text"
              className={styles.input}
              value={form.grade}
              onChange={handleChange}
            />
            {errors.grade && (
              <div className={styles.error}>{errors.grade}</div>
            )}
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
              placeholder="https://example.com/document.pdf"
            />
            {errors.document_url && (
              <div className={styles.error}>{errors.document_url}</div>
            )}
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={!isValid || submitting}
          >
            {submitting ? 'Saving…' : 'Save & Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}