'use client'
import React, { useState } from 'react'
import { Calendar, Clock, User, FileText, Phone, Tag, AlertCircle } from 'lucide-react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './ScheduleFollowUp.module.css'

const steps = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Lead Management', href: '/dashboard/lead-management' },
  { label: 'Follow-ups', href: '/dashboard/lead-management/all-leads/follow-ups' },
  { label: 'Schedule Follow-up', href: '/dashboard/lead-management/all-leads/follow-ups/schedule' },
]

const priorityOptions = [
  { value: 'high', label: 'High', color: '#dc3545' },
  { value: 'medium', label: 'Medium', color: '#fd7e14' },
  { value: 'low', label: 'Low', color: '#198754' },
]

const reminderOptions = [
  { value: '15', label: '15 minutes before' },
  { value: '30', label: '30 minutes before' },
  { value: '60', label: '1 hour before' },
  { value: '120', label: '2 hours before' },
  { value: '1440', label: '1 day before' },
]

export default function ScheduleFollowUpPage() {
  const [formData, setFormData] = useState({
    leadName: '',
    date: '',
    time: '',
    type: 'call',
    priority: 'medium',
    reminder: '30',
    notes: '',
    assignedTo: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate form
      if (!formData.leadName || !formData.date || !formData.time) {
        throw new Error('Please fill in all required fields')
      }

      // TODO: Replace with your API endpoint
      const response = await fetch('/api/follow-ups/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to schedule follow-up')
      }

      // Reset form on success
      setFormData({
        leadName: '',
        date: '',
        time: '',
        type: 'call',
        priority: 'medium',
        reminder: '30',
        notes: '',
        assignedTo: ''
      })

      // Show success message or redirect
      // You can add a toast notification here

    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={3} />

      <div className={styles.header}>
        <h1 className={styles.title}>Schedule Follow-up</h1>
      </div>

      {error && (
        <div className={styles.error}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="leadName">
              <User size={18} />
              Lead Name*
            </label>
            <input
              type="text"
              id="leadName"
              name="leadName"
              value={formData.leadName}
              onChange={handleChange}
              placeholder="Select or enter lead name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">
              <Calendar size={18} />
              Date*
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="time">
              <Clock size={18} />
              Time*
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="type">
              <Phone size={18} />
              Follow-up Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="call">Phone Call</option>
              <option value="meeting">Meeting</option>
              <option value="email">Email</option>
              <option value="site-visit">Site Visit</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="priority">
              <Tag size={18} />
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={styles[`priority${formData.priority}`]}
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reminder">
              <AlertCircle size={18} />
              Reminder
            </label>
            <select
              id="reminder"
              name="reminder"
              value={formData.reminder}
              onChange={handleChange}
            >
              {reminderOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="assignedTo">
              <User size={18} />
              Assigned To
            </label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              placeholder="Enter team member name"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="notes">
            <FileText size={18} />
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any additional notes or talking points"
            rows={4}
          />
        </div>

        <div className={styles.actions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Follow-up'}
          </button>
        </div>
      </form>
    </div>
  )
}
