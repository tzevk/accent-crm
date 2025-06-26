'use client'
import React from 'react'
import Link from 'next/link'
import { 
  UserPlus, 
  Users, 
  FileText, 
  PhoneCall, 
  Inbox, 
  BarChart2, 
  MessageCircle,
  Calendar
} from 'lucide-react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './LeadManagement.module.css'

const steps = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Lead Management', href: '/dashboard/lead-management' },
]

export default function LeadManagementPage() {
  const cards = [
    {
      title: 'New Leads',
      count: '28',
      trend: '+12%',
      icon: <UserPlus size={24} />,
      color: '#4CAF50'
    },
    {
      title: 'Total Leads',
      count: '156',
      trend: '+5%',
      icon: <Users size={24} />,
      color: '#2196F3'
    },
    {
      title: 'Follow Ups',
      count: '42',
      trend: '-8%',
      icon: <PhoneCall size={24} />,
      color: '#FF9800'
    },
    {
      title: 'Converted',
      count: '18',
      trend: '+15%',
      icon: <FileText size={24} />,
      color: '#9C27B0'
    },
  ]

  const quickActions = [
    {
      title: 'Add New Lead',
      icon: <UserPlus size={20} />,
      href: '/dashboard/lead-management/add-client',
      description: 'Create a new lead profile'
    },
    {
      title: 'Schedule Follow Up',
      icon: <Calendar size={20} />,
      href: '/dashboard/lead-management/all-leads/follow-ups',
      description: 'Plan your next follow up'
    },
    {
      title: 'Add Inquiry',
      icon: <Inbox size={20} />,
      href: '/dashboard/lead-management/all-leads/add-inquiry',
      description: 'Record new inquiry details'
    },
    {
      title: 'View Reports',
      icon: <BarChart2 size={20} />,
      href: '/dashboard/lead-management/reports',
      description: 'Analyze lead performance'
    }
  ]

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={1} />
      
      <div className={styles.header}>
        <h1 className={styles.title}>Lead Management</h1>
      </div>

      <div className={styles.statsGrid}>
        {cards.map((card, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: card.color }}>
              {card.icon}
            </div>
            <div className={styles.statInfo}>
              <h3>{card.title}</h3>
              <div className={styles.statNumbers}>
                <span className={styles.statCount}>{card.count}</span>
                <span className={styles.statTrend} style={{ 
                  color: card.trend.startsWith('+') ? '#4CAF50' : '#F44336'
                }}>
                  {card.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.quickActions}>
          {quickActions.map((action, index) => (
            <Link href={action.href} key={index} className={styles.actionCard}>
              <div className={styles.actionIcon}>
                {action.icon}
              </div>
              <div className={styles.actionInfo}>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Activities</h2>
        <div className={styles.activitiesList}>
          <div className={styles.activity}>
            <MessageCircle size={16} />
            <div className={styles.activityContent}>
              <p><strong>Follow-up Call</strong> with ABC Corp</p>
              <span>2 hours ago</span>
            </div>
          </div>
          <div className={styles.activity}>
            <UserPlus size={16} />
            <div className={styles.activityContent}>
              <p><strong>New Lead</strong> from XYZ Industries added</p>
              <span>5 hours ago</span>
            </div>
          </div>
          <div className={styles.activity}>
            <Inbox size={16} />
            <div className={styles.activityContent}>
              <p><strong>New Inquiry</strong> received from Tech Solutions</p>
              <span>Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
