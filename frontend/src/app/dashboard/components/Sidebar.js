// src/app/dashboard/components/Sidebar.js
'use client'
import React, { useState } from 'react'
import Link             from 'next/link'
import { usePathname }  from 'next/navigation'
import {
  Home,
  Users,
  ClipboardList,
  Folder,
  FileText,
  FilePlus,
  Settings,
  ChevronDown
} from 'lucide-react'

const navItems = [
  { label: 'Overview', href: '/dashboard',        icon: <Home size={18} /> },
  { label: 'Clients',  href: '/dashboard/clients',icon: <Users size={18} /> },
]

export default function Sidebar({ onLinkClick }) {
  const path = usePathname()
  const toggle = setter => () => setter(o => !o)
  // User Management toggles
  const [umOpen,     setUmOpen]     = useState(path.startsWith('/dashboard/user-management'))
  const [createOpen, setCreateOpen] = useState(path.startsWith('/dashboard/user-management/create-user'))
  const [pmOpen, setPmOpen] = useState(path.startsWith('/dashboard/project-management'))
  const [pmMasterOpen, setPmMasterOpen] = useState(path.startsWith('/dashboard/project-management/project-master'))

  // Lead Management toggles
  const [lmOpen,        setLmOpen]        = useState(path.startsWith('/dashboard/lead-management'))
  const [addClientOpen, setAddClientOpen] = useState(path.startsWith('/dashboard/lead-management/add-client'))
  const [allLeadsOpen,  setAllLeadsOpen]  = useState(path.startsWith('/dashboard/lead-management/all-leads'))
  const [enqOpen,       setEnqOpen]       = useState(path.startsWith('/dashboard/lead-management/all-leads/enquiries'))

  return (
    <div className="sidebar">
      <div className="sidebar__branding">
        <img src="/logo.png" alt="MyCRM Logo" className="sidebar__branding-img" />
        <span className="sidebar__branding-text"></span>
      </div>

      <ul className="sidebar__list">
        {navItems.map(({ label, href, icon }) => (
          <li key={href} className="sidebar__item">
            <Link
              href={href}
              className={`sidebar__link${path === href ? ' active' : ''}`}
              onClick={onLinkClick}
            >
              <span className="sidebar__icon">{icon}</span>
              <span className="sidebar__text">{label}</span>
            </Link>
          </li>
        ))}

        {/* User Management */}
        <li className="sidebar__item">
          <button
            className={`sidebar__link sidebar__toggle${umOpen ? ' open' : ''}`}
            onClick={() => setUmOpen(o => !o)}
          >
            <span className="sidebar__icon"><Users size={18} /></span>
            <span className="sidebar__text">User Management</span>
            <ChevronDown size={16} className="sidebar__chevron" />
          </button>
          {umOpen && (
            <ul className="sidebar__sublist">
              <li className="sidebar__item">
                <button
                  className={`sidebar__sublink sidebar__toggle${createOpen ? ' open' : ''}`}
                  onClick={() => setCreateOpen(o => !o)}
                >
                  Create User
                  <ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {createOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/user-management/create-user"
                        className={`sidebar__sublink${path === '/dashboard/user-management/create-user' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Account Info</Link>
                    </li>
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/user-management/create-user/assign-roles"
                        className={`sidebar__sublink${path === '/dashboard/user-management/create-user/assign-roles' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Assign Roles</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="sidebar__item">
                <Link
                  href="/dashboard/user-management/user-details"
                  className={`sidebar__sublink${path === '/dashboard/user-management/user-details' ? ' active' : ''}`}
                  onClick={onLinkClick}
                >User Details</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Project Management */}
        <li className="sidebar__item">
          <button className={`sidebar__link sidebar__toggle${pmOpen ? ' open' : ''}`} onClick={toggle(setPmOpen)}>
            <Folder size={18} /><span>Project Management</span><ChevronDown size={16} className="sidebar__chevron" />
          </button>
          {pmOpen && (
            <ul className="sidebar__sublist">
              {/* Add & All */}
              <li>
                <Link href="/dashboard/project-management/add-project" className={`sidebar__sublink${path === '/dashboard/project-management/add-project' ? ' active' : ''}`} onClick={onLinkClick}>
                  <FilePlus size={16} /> Add Project
                </Link>
              </li>
              <li>
                <Link href="/dashboard/project-management/all-projects" className={`sidebar__sublink${path === '/dashboard/project-management/all-projects' ? ' active' : ''}`} onClick={onLinkClick}>
                  <FileText size={16} /> All Projects
                </Link>
              </li>

              {/* Project Master accordion */}
              <li className="sidebar__item">
                <button className={`sidebar__sublink sidebar__toggle${pmMasterOpen ? ' open' : ''}`} onClick={toggle(setPmMasterOpen)}>
                  <Settings size={16} /> Project Master<ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {pmMasterOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li>
                      <Link href="/dashboard/project-management/project-master" className={`sidebar__sublink${path === '/dashboard/project-management/project-master' ? ' active' : ''}`} onClick={onLinkClick}>
                        Overview
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/project-management/project-master/scope" className={`sidebar__sublink${path === '/dashboard/project-management/project-master/scope' ? ' active' : ''}`} onClick={onLinkClick}>
                        Define Scope
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        {/* Lead Management */}
        <li className="sidebar__item">
          <button
            className={`sidebar__link sidebar__toggle${lmOpen ? ' open' : ''}`}
            onClick={() => setLmOpen(o => !o)}
          >
            <span className="sidebar__icon"><ClipboardList size={18} /></span>
            <span className="sidebar__text">Lead Management</span>
            <ChevronDown size={16} className="sidebar__chevron" />
          </button>
          {lmOpen && (
            <ul className="sidebar__sublist">
              {/* Add Client */}
              <li className="sidebar__item">
                <button
                  className={`sidebar__sublink sidebar__toggle${addClientOpen ? ' open' : ''}`}
                  onClick={() => setAddClientOpen(o => !o)}
                >
                  Add Client
                  <ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {addClientOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/add-client"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/add-client' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >New Client</Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Client Master */}
              <li className="sidebar__item">
                <Link
                  href="/dashboard/lead-management/client-master"
                  className={`sidebar__sublink${path === '/dashboard/lead-management/client-master' ? ' active' : ''}`}
                  onClick={onLinkClick}
                >Client Master</Link>
              </li>

              {/* All Leads */}
              <li className="sidebar__item">
                <button
                  className={`sidebar__sublink sidebar__toggle${allLeadsOpen ? ' open' : ''}`}
                  onClick={() => setAllLeadsOpen(o => !o)}
                >
                  All Leads
                  <ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {allLeadsOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/all-leads"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/all-leads' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Lead List</Link>
                    </li>

                    {/* Enquiries */}
                    <li className="sidebar__item">
                      <button
                        className={`sidebar__sublink sidebar__toggle${enqOpen ? ' open' : ''}`}
                        onClick={() => setEnqOpen(o => !o)}
                      >
                        Enquiries
                        <ChevronDown size={12} className="sidebar__chevron" />
                      </button>
                      {enqOpen && (
                        <ul className="sidebar__sublist sidebar__sublist--nested">
                          <li className="sidebar__item">
                            <Link
                              href="/dashboard/lead-management/all-leads/add-inquiry"
                              className={`sidebar__sublink${path === '/dashboard/lead-management/all-leads/add-inquiry' ? ' active' : ''}`}
                              onClick={onLinkClick}
                            >Add Inquiry</Link>
                          </li>
                          <li className="sidebar__item">
                            <Link
                              href="/dashboard/lead-management/all-leads/follow-ups"
                              className={`sidebar__sublink${path === '/dashboard/lead-management/all-leads/follow-ups' ? ' active' : ''}`}
                              onClick={onLinkClick}
                            >Follow Ups</Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  )
}