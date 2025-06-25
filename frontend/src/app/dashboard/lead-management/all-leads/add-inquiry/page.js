// src/app/dashboard/lead-management/all-leads/add-inquiry/page.js
'use client'

import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './AddInquiry.module.css'

const steps = [
  { label: 'Overview',        href: '/dashboard' },
  { label: 'Lead Management', href: '/dashboard/lead-management' },
  { label: 'All Leads',       href: '/dashboard/lead-management/all-leads' },
  { label: 'Add Inquiry',     href: '/dashboard/lead-management/all-leads/add-inquiry' },
]

const enquiryTypes = ['New Business','Support','Feedback','Other']
const projectStatuses = ['Prospect','Negotiation','Won','Lost']

export default function AddInquiryPage() {
  const [leads, setLeads] = useState([])
  const [form, setForm] = useState({
    leadId: '',
    companyName: '',
    type: '',
    city: '',
    enquiryDate: '',
    enquiryType: '',
    projectStatus: '',
  })
  const [isValid, setIsValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lead-management/all-leads`)
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    const { leadId, companyName, type, city, enquiryDate, enquiryType, projectStatus } = form
    setIsValid(
      leadId &&
      companyName.trim() &&
      type.trim() &&
      city.trim() &&
      enquiryDate &&
      enquiryType &&
      projectStatus
    )
  }, [form])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lead-management/all-leads/${form.leadId}/inquiries`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            company_name:   form.companyName,
            type:           form.type,
            city:           form.city,
            enquiry_date:   form.enquiryDate,
            enquiry_type:   form.enquiryType,
            project_status: form.projectStatus,
          }),
        }
      )
      if (!res.ok) throw new Error('Failed to add inquiry')
      alert('Inquiry added successfully!')
      setForm({
        leadId: '',
        companyName: '',
        type: '',
        city: '',
        enquiryDate: '',
        enquiryType: '',
        projectStatus: '',
      })
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumb at the very top */}
      <Breadcrumb steps={steps} active={3} />

      <h2 className={styles.title}>Add Inquiry</h2>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} noValidate>
          {[
            { name: 'leadId',        label: 'Select Lead',     type: 'select', options: leads.map(l => ({ value: l.id,  text: `${l.name} (${l.company|| '—'})` })) },
            { name: 'companyName',   label: 'Company Name',    type: 'text' },
            { name: 'type',          label: 'Type',            type: 'text' },
            { name: 'city',          label: 'City',            type: 'text' },
            { name: 'enquiryDate',   label: 'Enquiry Date',    type: 'date' },
            { name: 'enquiryType',   label: 'Enquiry Type',    type: 'select', options: enquiryTypes.map(t => ({ value: t, text: t })) },
            { name: 'projectStatus', label: 'Project Status',  type: 'select', options: projectStatuses.map(s => ({ value: s, text: s })) },
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
                  required
                >
                  <option value="">-- select {field.label.toLowerCase()} --</option>
                  {field.options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.text}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  className={styles.input}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className={styles.button}
            disabled={!isValid || submitting}
          >
            {submitting ? 'Saving…' : 'Add Inquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}