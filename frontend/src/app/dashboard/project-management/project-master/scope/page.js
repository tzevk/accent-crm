'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import styles from './ScopeDefinition.module.css'

export default function ScopeDefinitionPage() {
  const { projectId } = useParams()
  const router = useRouter()

  // form state
  const [objectives, setObjectives] = useState([''])
  const [deliverables, setDeliverables] = useState([''])
  const [exclusions, setExclusions] = useState([''])
  const [assumptions, setAssumptions] = useState([''])
  const [timeline, setTimeline] = useState({ start: '', end: '' })

  // load existing if any
  useEffect(() => {
    fetch(`/api/projects/${projectId}/scope`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setObjectives(data.objectives || [''])
          setDeliverables(data.deliverables || [''])
          setExclusions(data.exclusions || [''])
          setAssumptions(data.assumptions || [''])
          setTimeline({
            start: data.timelineStart?.split('T')[0] || '',
            end:   data.timelineEnd?.split('T')[0]   || ''
          })
        }
      })
      .catch(() => {})
  }, [projectId])

  const updateList = (setter) => (idx, value) =>
    setter((prev) => prev.map((it, i) => (i === idx ? value : it)))

  const addItem = (setter) =>
    setter((prev) => [...prev, ''])

  const removeItem = (setter) => (idx) =>
    setter((prev) => prev.filter((_, i) => i !== idx))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      objectives,
      deliverables,
      exclusions,
      assumptions,
      timelineStart: timeline.start,
      timelineEnd:   timeline.end
    }
    await fetch(`/api/projects/${projectId}/scope`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    router.push(`/project-management/project-master/${projectId}`)
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link href="/project-management/all-projects">All Projects</Link>
        <ChevronRight size={14} />
        <Link href={`/project-management/project-master/${projectId}`}>Project Details</Link>
        <ChevronRight size={14} />
        <span>Define Scope</span>
      </nav>

      <h1 className={styles.title}>Scope Definition</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Objectives */}
        <section className={styles.section}>
          <h2>Objectives</h2>
          {objectives.map((val, i) => (
            <div key={i} className={styles.row}>
              <input
                type="text"
                placeholder="Objective description"
                value={val}
                onChange={(e) => updateList(setObjectives)(i, e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => removeItem(setObjectives)(i)}
                className={styles.remove}
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem(setObjectives)}
            className={styles.addBtn}
          >
            + Add Objective
          </button>
        </section>

        {/* Deliverables */}
        <section className={styles.section}>
          <h2>Deliverables</h2>
          {deliverables.map((val, i) => (
            <div key={i} className={styles.row}>
              <input
                type="text"
                placeholder="Deliverable item"
                value={val}
                onChange={(e) => updateList(setDeliverables)(i, e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => removeItem(setDeliverables)(i)}
                className={styles.remove}
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem(setDeliverables)}
            className={styles.addBtn}
          >
            + Add Deliverable
          </button>
        </section>

        {/* Exclusions */}
        <section className={styles.section}>
          <h2>Exclusions</h2>
          {exclusions.map((val, i) => (
            <div key={i} className={styles.row}>
              <input
                type="text"
                placeholder="Exclusion item"
                value={val}
                onChange={(e) => updateList(setExclusions)(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeItem(setExclusions)(i)}
                className={styles.remove}
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem(setExclusions)}
            className={styles.addBtn}
          >
            + Add Exclusion
          </button>
        </section>

        {/* Assumptions */}
        <section className={styles.section}>
          <h2>Assumptions</h2>
          {assumptions.map((val, i) => (
            <div key={i} className={styles.row}>
              <input
                type="text"
                placeholder="Assumption item"
                value={val}
                onChange={(e) => updateList(setAssumptions)(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeItem(setAssumptions)(i)}
                className={styles.remove}
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem(setAssumptions)}
            className={styles.addBtn}
          >
            + Add Assumption
          </button>
        </section>

        {/* Timeline */}
        <section className={styles.section}>
          <h2>Timeline</h2>
          <div className={styles.timeline}>
            <label>
              Start Date
              <input
                type="date"
                value={timeline.start}
                onChange={(e) =>
                  setTimeline((t) => ({ ...t, start: e.target.value }))
                }
                required
              />
            </label>
            <label>
              End Date
              <input
                type="date"
                value={timeline.end}
                onChange={(e) =>
                  setTimeline((t) => ({ ...t, end: e.target.value }))
                }
                required
              />
            </label>
          </div>
        </section>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.cancel}
          >
            Cancel
          </button>
          <button type="submit" className={styles.save}>
            Save Scope
          </button>
        </div>
      </form>
    </div>
  )
}