'use client'
import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Plus, Filter, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './FollowUpCalendar.module.css'

const steps = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Lead Management', href: '/dashboard/lead-management' },
  { label: 'Follow-ups', href: '/dashboard/lead-management/all-leads/follow-ups' },
  { label: 'Calendar', href: '/dashboard/lead-management/all-leads/follow-ups/calendar' },
]

// Sample data - replace with actual API data
const sampleEvents = [
  {
    id: '1',
    title: 'Follow-up with ABC Corp',
    start: '2025-06-26T10:00:00',
    end: '2025-06-26T11:00:00',
    backgroundColor: '#64126d',
    borderColor: '#64126d',
    extendedProps: {
      type: 'call',
      priority: 'high',
      leadName: 'John Smith',
      company: 'ABC Corp'
    }
  },
  {
    id: '2',
    title: 'Site Visit - XYZ Industries',
    start: '2025-06-27T14:00:00',
    end: '2025-06-27T16:00:00',
    backgroundColor: '#198754',
    borderColor: '#198754',
    extendedProps: {
      type: 'site-visit',
      priority: 'medium',
      leadName: 'Sarah Johnson',
      company: 'XYZ Industries'
    }
  }
]

export default function FollowUpCalendarPage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [filters, setFilters] = useState({
    type: 'all',
    priority: 'all',
    assignedTo: 'all'
  })

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const renderEventContent = (eventInfo) => {
    const { type, priority } = eventInfo.event.extendedProps
    return (
      <div className={styles.calendarEvent}>
        <div className={styles.eventTime}>
          {eventInfo.timeText}
        </div>
        <div className={styles.eventTitle}>
          {eventInfo.event.title}
        </div>
        <div className={styles.eventMeta}>
          <span className={styles[`type${type}`]}>{type}</span>
          <span className={styles[`priority${priority}`]}>{priority}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={3} />
      
      <div className={styles.header}>
        <h1 className={styles.title}>Follow-up Calendar</h1>
        <div className={styles.headerActions}>
          <button 
            className={styles.filterButton} 
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={18} />
            Filters
            <ChevronDown size={16} className={filterOpen ? styles.chevronOpen : ''} />
          </button>
          <Link 
            href="/dashboard/lead-management/all-leads/follow-ups/schedule" 
            className={styles.addButton}
          >
            <Plus size={18} />
            Schedule Follow-up
          </Link>
        </div>
      </div>

      {filterOpen && (
        <div className={styles.filterPanel}>
          <div className={styles.filterGroup}>
            <label htmlFor="type">Type</label>
            <select 
              id="type" 
              name="type" 
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="all">All Types</option>
              <option value="call">Call</option>
              <option value="meeting">Meeting</option>
              <option value="email">Email</option>
              <option value="site-visit">Site Visit</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="priority">Priority</label>
            <select 
              id="priority" 
              name="priority" 
              value={filters.priority}
              onChange={handleFilterChange}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="assignedTo">Assigned To</label>
            <select 
              id="assignedTo" 
              name="assignedTo" 
              value={filters.assignedTo}
              onChange={handleFilterChange}
            >
              <option value="all">All Team Members</option>
              <option value="me">Assigned to Me</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>
        </div>
      )}

      <div className={styles.calendarWrapper}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={sampleEvents}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          height="auto"
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
          allDaySlot={false}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '08:00',
            endTime: '18:00',
          }}
          nowIndicator={true}
          weekends={false}
        />
      </div>

      {selectedEvent && (
        <div className={styles.eventModal}>
          <div className={styles.modalContent}>
            <h2>{selectedEvent.title}</h2>
            <div className={styles.modalDetails}>
              <div className={styles.modalDetail}>
                <strong>Date:</strong> {selectedEvent.start.toLocaleDateString()}
              </div>
              <div className={styles.modalDetail}>
                <strong>Time:</strong> {selectedEvent.start.toLocaleTimeString()} - {selectedEvent.end.toLocaleTimeString()}
              </div>
              <div className={styles.modalDetail}>
                <strong>Type:</strong> {selectedEvent.extendedProps.type}
              </div>
              <div className={styles.modalDetail}>
                <strong>Priority:</strong> {selectedEvent.extendedProps.priority}
              </div>
              <div className={styles.modalDetail}>
                <strong>Lead:</strong> {selectedEvent.extendedProps.leadName}
              </div>
              <div className={styles.modalDetail}>
                <strong>Company:</strong> {selectedEvent.extendedProps.company}
              </div>
            </div>
            <div className={styles.modalActions}>
              <button 
                className={styles.modalClose}
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
