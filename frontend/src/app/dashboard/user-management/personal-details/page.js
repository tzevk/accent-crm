'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './PersonalDetails.module.css'

const steps = [
  { label: 'Account Info',     href: '/dashboard/user-management/create-user' },
  { label: 'Personal Details', href: '/dashboard/user-management/personal-details' },
  { label: 'Qualifications',   href: '/dashboard/user-management/qualifications' },
  { label: 'Documents',        href: '/dashboard/user-management/documents' },
]

export default function PersonalDetailsPage() {
  const [form, setForm] = useState({
    full_name: '',
    father_name: '',
    gender: '',
    date_of_birth: '',
    marital_status: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    emergency_contact_name: '',
    emergency_contact_number: '',
  })
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // basic check: required fields non-empty and no errors
    const required = [
      'full_name','father_name','gender','date_of_birth',
      'address_line1','city','state','pincode','country',
      'emergency_contact_name','emergency_contact_number'
    ]
    const allFilled = required.every(k => form[k].trim() !== '')
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
      const res = await fetch('/api/users/create-step2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to save personal details')
      // go to next step
      window.location.href = steps[2].href
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={1} />

      <div className={styles.progress}>
        <div className={styles.progress__fill} />
      </div>

      <h2 className={styles.title}>Personal Details</h2>
      <form onSubmit={handleSubmit} noValidate>
        {[
          { name: 'full_name',        label: 'Full Name',       type: 'text' },
          { name: 'father_name',      label: "Father's Name",   type: 'text' },
          { name: 'gender',           label: 'Gender',          type: 'select',
            options: ['male','female','other'] },
          { name: 'date_of_birth',    label: 'Date of Birth',   type: 'date' },
          { name: 'marital_status',   label: 'Marital Status',  type: 'select',
            options: ['single','married','divorced','widowed'] },
          { name: 'address_line1',    label: 'Address Line 1',  type: 'text' },
          { name: 'address_line2',    label: 'Address Line 2',  type: 'text' },
          { name: 'city',             label: 'City',            type: 'text' },
          { name: 'state',            label: 'State',           type: 'text' },
          { name: 'pincode',          label: 'Pincode',         type: 'text' },
          { name: 'country',          label: 'Country',         type: 'text' },
          { name: 'emergency_contact_name',   label: 'Emergency Contact Name',   type: 'text' },
          { name: 'emergency_contact_number', label: 'Emergency Contact Number', type: 'tel' },
        ].map(field => (
          <div key={field.name} className={styles.formGroup}>
            <label htmlFor={field.name} className={styles.label}>
              {field.label}
            </label>

            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                className={styles.select}
                value={form[field.name]}
                onChange={handleChange}
              >
                <option value="">Select {field.label}</option>
                {field.options.map(opt => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                className={
                  field.type === 'date'
                    ? styles.date
                    : styles.input
                }
                value={form[field.name]}
                onChange={handleChange}
              />
            )}

            {errors[field.name] && (
              <div className={styles.error}>{errors[field.name]}</div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className={styles.button}
          disabled={!isValid || submitting}
        >
          {submitting ? 'Saving…' : 'Save & Continue'}
        </button>
      </form>
    </div>
  )
}