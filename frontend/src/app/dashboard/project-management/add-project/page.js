'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import styles from './AddProject.module.css'

export default function AddProjectPage() {
  const [leads, setLeads] = useState([])
  const [form, setForm] = useState({
    leadId: '',
    projectNumber: '',
    client: '',
    city: '',
    mode: '',
    projectName: '',
    startDate: '',
    endDate: '',
    completionDate: '',
    targetDate: ''
  })
  const router = useRouter()

  // 1. Fetch qualified leads
  useEffect(() => {
    fetch('/api/leads?status=qualified')
      .then(r => r.json())
      .then(data => setLeads(data))
      .catch(console.error)
  }, [])

  // 2. When lead picks, auto-fill projectNumber & client
  useEffect(() => {
    const lead = leads.find(l => l.id === form.leadId)
    if (lead) {
      setForm(f => ({
        ...f,
        projectNumber: `PRJ-${new Date().getFullYear()}-${lead.id.slice(-3)}`,
        client: lead.company
      }))
    }
  }, [form.leadId, leads])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    router.push('/project-management/all-projects')
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link href="/project-management/all-projects">All Projects</Link>
        <ChevronRight size={14} />
        <span>Add Project</span>
               <div className={styles.meta}>
         <span className={styles.status}>Status: Initiation</span>
         <span className={styles.assigned}>Assigned to: —</span>
       </div>
      </nav>

      <h1 className={styles.title}>Convert Lead into Project</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Lead selector */}
        <label>
          Select Lead
          <select
            name="leadId"
            value={form.leadId}
            onChange={handleChange}
            required
          >
            <option value="">— pick a lead —</option>
            {leads.map(l => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.company})
              </option>
            ))}
          </select>
        </label>

        {/* Auto-generated Project Number */}
        <label>
          Project Number
          <input
            name="projectNumber"
            value={form.projectNumber}
            readOnly
          />
        </label>

        {/* Client */}
        <label>
          Client
          <input
            name="client"
            value={form.client}
            readOnly
          />
        </label>

        {/* City */}
        <label>
          City
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Mumbai"
          />
        </label>

        {/* Mode */}
        <label>
          Project Mode
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
          >
            <option value="">— select —</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </label>

        {/* Project Name */}
        <label className={styles.fullWidth}>
          Project Name / Description
          <input
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="e.g. Website Redesign"
            required
          />
        </label>

        {/* Dates */}
        <label>
          Start Date
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Completion
          <input
            name="completionDate"
            type="date"
            value={form.completionDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Target Date
          <input
            name="targetDate"
            type="date"
            value={form.targetDate}
            onChange={handleChange}
          />
        </label>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.cancel}
          >
            Cancel
          </button>
          <button type="submit" className={styles.save}>
            Save Project
          </button>
        </div>
      </form>
    </div>
  )
}