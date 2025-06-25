// src/app/dashboard/layout.js
'use client'
import { useState } from 'react'
import '../../styles/dashboard.css'
import Sidebar from './components/Sidebar'
import Header  from './components/Header'

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <nav>
          <Sidebar closeMenu={() => setOpen(false)} />
        </nav>
      </aside>

      <div className="main-area">
        <Header onMenuToggle={() => setOpen(o => !o)} />
        <div className="content">{children}</div>
      </div>
    </div>
  )
}