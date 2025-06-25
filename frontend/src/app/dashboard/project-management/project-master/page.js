'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import styles from './ProjectMaster.module.css'

export default function ProjectMasterPage() {
  const { projectId } = useParams()
  const router = useRouter()

  const [project, setProject] = useState(null)
  const [form, setForm] = useState({
    projectNumber: '',
    companyName: '',
    city: '',
    projectMode: '',
    projectName: '',
    startDate: '',
    endDate: '',
    completionDate: '',
    targetDate: ''
  })

  // Load project on mount
  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then(r => r.json())
      .then(data => {
        setProject(data)
        setForm({
          projectNumber: data.projectNumber || '',
          companyName:  data.client || '',
          city:         data.city || '',
          projectMode:  data.mode || '',
          projectName:  data.name || '',
          startDate:    data.startDate?.split('T')[0] || '',
          endDate:      data.endDate?.split('T')[0] || '',
          completionDate: data.completionDate?.split('T')[0] || '',
          targetDate:   data.targetDate?.split('T')[0] || ''
        })
      })
  }, [projectId])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch(`/api/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    router.refresh()
  }

  if (!project) return <p>Loading…</p>

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link href="/project-management/all-projects">All Projects</Link>
        <ChevronRight size={14} />
        <span>{project.name || 'Project #' + projectId}</span>
        <div className={styles.meta}>
          <span className={styles.status}>{project.status}</span>
          <span className={styles.assigned}>Assigned to: {project.pmName}</span>
        </div>
      </nav>

      <h1 className={styles.title}>Project Details</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Project Number
          <input
            name="projectNumber"
            value={form.projectNumber}
            onChange={handleChange}
            readOnly
          />
        </label>

        <label>
          Company Name
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
          />
        </label>

        <label>
          City
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
          />
        </label>

        <label>
          Project Mode
          <select
            name="projectMode"
            value={form.projectMode}
            onChange={handleChange}
          >
            <option value="">— select —</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </label>

        <label className={styles.fullWidth}>
          Project Name / Description
          <input
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
          />
        </label>

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

        <div className={styles.actions}>
          <button type="button" onClick={() => router.back()} className={styles.cancel}>
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