'use client'

import { useEffect, useState } from 'react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles    from './AllProjects.module.css'

const steps = [
  { label: 'Overview',           href: '/dashboard' },
  { label: 'Project Management', href: '/dashboard/project-management' },
  { label: 'All Projects',       href: '/dashboard/project-management/all-projects' },
]

export default function AllProjectsPage() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    fetch(`${API}/project-management/all-projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error)
  }, [])

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={2} />
      <h2 className={styles.title}>All Projects</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Client</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  No projects available.
                </td>
              </tr>
            ) : (
              projects.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.client}</td>
                  <td>{p.status}</td>
                  <td>{new Date(p.startDate).toLocaleDateString()}</td>
                  <td>{new Date(p.endDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={styles.actionBtn}
                      onClick={() => {/* navigate to detail/edit */}}
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