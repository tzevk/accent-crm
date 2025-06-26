// src/app/dashboard/layout.js
'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import '../../styles/dashboard.css'
import Sidebar from './components/Sidebar'
import Header  from './components/Header'

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change in mobile view
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setOpen(false)
    }
  }, [pathname])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar')
        if (sidebar && !sidebar.contains(event.target)) {
          setOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (window.innerWidth <= 768) {
      document.body.style.overflow = open ? 'hidden' : ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <nav>
          <Sidebar onLinkClick={() => window.innerWidth <= 1024 && setOpen(false)} />
        </nav>
      </aside>

      <div className="main-area">
        <Header 
          className="dashboard-header"
          onMenuToggle={() => setOpen(o => !o)} 
        />
        <div className="content">
          <div className="page-wrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}