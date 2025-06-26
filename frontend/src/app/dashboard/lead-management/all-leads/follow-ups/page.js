'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Tag,
  CheckCircle,
  XCircle,
  Filter,
  Plus,
  Search,
  ChevronDown,
  Calendar as CalendarIcon
} from 'lucide-react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './FollowUps.module.css'

const steps = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Lead Management', href: '/dashboard/lead-management' },
  { label: 'Follow-ups', href: '/dashboard/lead-management/all-leads/follow-ups' },
]

const typeIcons = {
  call: <Phone size={16} />,
  meeting: <User size={16} />,
  email: <Mail size={16} />,
  'site-visit': <MapPin size={16} />
}

// Sample data - replace with API data
const sampleFollowUps = [
  {
    id: 1,
    leadName: 'Lead ID: CRM001',
    company: 'Tech Solutions Ltd.',
    type: 'call',
    date: '2025-06-26',
    time: '10:00',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Agent ID: A101',
    notes: 'Initial discussion regarding software requirements'
  },
  {
    id: 2,
    leadName: 'Lead ID: CRM002',
    company: 'Global Services Co.',
    type: 'site-visit',
    date: '2025-06-27',
    time: '14:00',
    priority: 'medium',
    status: 'completed',
    assignedTo: 'Agent ID: A102',
    notes: 'Infrastructure assessment for proposed system'
  },
  {
    id: 3,
    leadName: 'Lead ID: CRM003',
    company: 'Digital Solutions Inc.',
    type: 'email',
    date: '2025-06-28',
    time: '11:30',
    priority: 'low',
    status: 'pending',
    assignedTo: 'Agent ID: A103',
    notes: 'Follow-up on product demo request'
  },
  {
    id: 4,
    leadName: 'Lead ID: CRM004',
    company: 'Innovation Systems',
    type: 'meeting',
    date: '2025-06-29',
    time: '15:30',
    priority: 'high',
    status: 'cancelled',
    assignedTo: 'Agent ID: A104',
    notes: 'Project scope discussion - rescheduling needed'
  },
  {
    id: 5,
    leadName: 'Lead ID: CRM005',
    company: 'Enterprise Corp',
    type: 'call',
    date: '2025-06-30',
    time: '09:00',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'Agent ID: A105',
    notes: 'Quarterly service review call'
  }
]

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState(sampleFollowUps)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    type: 'all'
  })
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({
    leadId: '',
    date: '',
    notes: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filteredFollowUps = followUps
    .filter(fu => {
      if (filters.status !== 'all' && fu.status !== filters.status) return false
      if (filters.priority !== 'all' && fu.priority !== filters.priority) return false
      if (filters.type !== 'all' && fu.type !== filters.type) return false
      if (search && !fu.leadName.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API}/lead-management/follow-ups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        throw new Error('Failed to create follow-up')
      }

      const newFollowUp = await res.json()
      setFollowUps(prev => [newFollowUp, ...prev])
      setForm({ leadId: '', date: '', notes: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={3} />
      
      <div className={styles.header}>
        <h2 className={styles.title}>Follow Ups</h2>
        <div className={styles.actions}>
          <Link href="/dashboard/lead-management/all-leads/follow-ups/schedule" className={styles.addButton}>
            <Plus size={16} />
            Schedule Follow-up
          </Link>
          <Link href="/dashboard/lead-management/all-leads/follow-ups/calendar" className={styles.calendarButton}>
            <CalendarIcon size={16} />
            Calendar View
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.controls}>
        <div className={styles.filters}>
          <Filter size={16} />
          <select 
            value={filters.status} 
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select 
            value={filters.priority} 
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select 
            value={filters.type} 
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="call">Call</option>
            <option value="meeting">Meeting</option>
            <option value="email">Email</option>
            <option value="site-visit">Site Visit</option>
          </select>
        </div>

        <div className={styles.search}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {/* Follow-ups List */}
      <div className={styles.list}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : filteredFollowUps.length === 0 ? (
          <div className={styles.empty}>No follow-ups found</div>
        ) : (
          filteredFollowUps.map(followUp => (
            <div key={followUp.id} className={styles.followUpCard}>
              <div className={styles.cardHeader}>
                <div className={styles.leadInfo}>
                  <h3>{followUp.leadName}</h3>
                  <span>{followUp.company}</span>
                </div>
                <div className={styles.typeTag}>
                  {typeIcons[followUp.type]}
                  <span>{followUp.type}</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.detail}>
                  <Calendar size={16} />
                  <span>{new Date(followUp.date).toLocaleDateString()}</span>
                </div>
                <div className={styles.detail}>
                  <Clock size={16} />
                  <span>{followUp.time}</span>
                </div>
                <div className={styles.detail}>
                  <User size={16} />
                  <span>{followUp.assignedTo}</span>
                </div>
                <div className={styles.detail}>
                  <Tag size={16} />
                  <span className={styles[`priority-${followUp.priority}`]}>
                    {followUp.priority}
                  </span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <p className={styles.notes}>{followUp.notes}</p>
                <div className={styles.status}>
                  {followUp.status === 'completed' ? (
                    <span className={styles.completed}>
                      <CheckCircle size={16} />
                      Completed
                    </span>
                  ) : followUp.status === 'cancelled' ? (
                    <span className={styles.cancelled}>
                      <XCircle size={16} />
                      Cancelled
                    </span>
                  ) : (
                    <span className={styles.pending}>
                      <Clock size={16} />
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}