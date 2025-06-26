'use client'
import React, { useState, useEffect } from 'react'
import styles from './Requirements.module.css'

const RequirementsPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [requirements, setRequirements] = useState([
    { id: 1, category: 'Functional', description: '', priority: 'Medium' }
  ])

  const [categories] = useState([
    'Functional',
    'Technical',
    'UI/UX',
    'Security',
    'Performance',
    'Integration',
    'Compliance'
  ])

  const [priorities] = useState(['High', 'Medium', 'Low'])

  const addRequirement = () => {
    const newId = requirements.length > 0 
      ? Math.max(...requirements.map(r => r.id)) + 1 
      : 1
    setRequirements([
      ...requirements,
      { id: newId, category: 'Functional', description: '', priority: 'Medium' }
    ])
  }

  const updateRequirement = (id, field, value) => {
    setRequirements(requirements.map(req =>
      req.id === id ? { ...req, [field]: value } : req
    ))
  }

  const removeRequirement = (id) => {
    setRequirements(requirements.filter(req => req.id !== id))
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Validate requirements before saving
      const invalidRequirements = requirements.filter(req => !req.description.trim())
      if (invalidRequirements.length > 0) {
        throw new Error('All requirements must have a description')
      }

      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requirements),
      })

      if (!response.ok) {
        throw new Error('Failed to save requirements')
      }

      const result = await response.json()
      console.log('Requirements saved:', result)
      
      // Show success message or redirect
      // You can add a toast notification here

    } catch (err) {
      setError(err.message)
      console.error('Error saving requirements:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Requirements</h1>
        <button 
          onClick={handleSave} 
          className={styles.saveButton}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Requirements'}
        </button>
      </div>

      <div className={styles.description}>
        <p>Define and manage your project requirements. Be specific and clear about what needs to be achieved.</p>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.requirementsList}>
        {requirements.map((req) => (
          <div key={req.id} className={styles.requirementCard}>
            <div className={styles.requirementHeader}>
              <select
                value={req.category}
                onChange={(e) => updateRequirement(req.id, 'category', e.target.value)}
                className={styles.categorySelect}
                disabled={isLoading}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={req.priority}
                onChange={(e) => updateRequirement(req.id, 'priority', e.target.value)}
                className={`${styles.prioritySelect} ${styles[`priority${req.priority}`]}`}
                disabled={isLoading}
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>

              <button
                onClick={() => removeRequirement(req.id)}
                className={styles.removeButton}
                disabled={isLoading}
              >
                Remove
              </button>
            </div>

            <textarea
              value={req.description}
              onChange={(e) => updateRequirement(req.id, 'description', e.target.value)}
              placeholder="Enter requirement description..."
              className={styles.descriptionInput}
              rows={3}
              disabled={isLoading}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={addRequirement} 
        className={styles.addButton}
        disabled={isLoading}
      >
        Add New Requirement
      </button>
    </div>
  )
}

export default RequirementsPage
