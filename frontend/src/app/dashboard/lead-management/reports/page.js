'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './Reports.module.css'

const steps = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Lead Management', href: '/dashboard/lead-management' },
  { label: 'Reports', href: '/dashboard/lead-management/reports' },
]

const leadsBySource = [
  { name: 'Website', value: 45 },
  { name: 'Referral', value: 30 },
  { name: 'Social Media', value: 15 },
  { name: 'Direct', value: 10 },
]

const conversionData = [
  { month: 'Jan', converted: 4, total: 20 },
  { month: 'Feb', converted: 6, total: 25 },
  { month: 'Mar', converted: 8, total: 30 },
  { month: 'Apr', converted: 5, total: 22 },
  { month: 'May', converted: 7, total: 28 },
  { month: 'Jun', converted: 9, total: 35 },
]

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300']

export default function ReportsPage() {
  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={2} />
      
      <div className={styles.header}>
        <h1 className={styles.title}>Lead Reports</h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Lead Conversion Rate</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="converted" fill="#8884d8" name="Converted" />
                <Bar dataKey="total" fill="#82ca9d" name="Total Leads" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Leads by Source</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadsBySource}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {leadsBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Performance Metrics</h2>
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <h3>Average Response Time</h3>
              <p>2.5 hours</p>
            </div>
            <div className={styles.metric}>
              <h3>Conversion Rate</h3>
              <p>24%</p>
            </div>
            <div className={styles.metric}>
              <h3>Active Leads</h3>
              <p>156</p>
            </div>
            <div className={styles.metric}>
              <h3>Success Rate</h3>
              <p>68%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
