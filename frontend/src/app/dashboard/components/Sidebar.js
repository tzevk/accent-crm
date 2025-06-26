// src/app/dashboard/components/Sidebar.js
'use client'
import React, { useState } from 'react'
import Link             from 'next/link'
import Image           from 'next/image'
import { usePathname }  from 'next/navigation'
import {
  Home,
  Users,
  ClipboardList,
  Folder,
  FileText,
  FilePlus,
  Settings,
  ChevronDown,
  Database
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
  
  // Project Management toggles
  const [pmOpen, setPmOpen] = useState(path.startsWith('/dashboard/project-management'))
  const [newProjectOpen, setNewProjectOpen] = useState(path.startsWith('/dashboard/project-management/add-project'))
  const [ongoingProjectsOpen, setOngoingProjectsOpen] = useState(path.startsWith('/dashboard/project-management/ongoing'))
  const [completedProjectsOpen, setCompletedProjectsOpen] = useState(path.startsWith('/dashboard/project-management/completed'))
  
  // Lead Management toggles
  const [lmOpen, setLmOpen] = useState(path.startsWith('/dashboard/lead-management'))
  const [addLeadOpen, setAddLeadOpen] = useState(path.startsWith('/dashboard/lead-management/add-client'))
  const [leadsOpen, setLeadsOpen] = useState(path.startsWith('/dashboard/lead-management/all-leads'))
  const [followUpsOpen, setFollowUpsOpen] = useState(path.startsWith('/dashboard/lead-management/follow-ups'))
  const [reportsOpen, setReportsOpen] = useState(path.startsWith('/dashboard/lead-management/reports'))
  
  // Masters toggles
  const [mastersOpen, setMastersOpen] = useState(
    path.includes('master')
  )

  return (
    <div className="sidebar">
      <div className="sidebar__branding">
        <Image 
          src="/logo.png" 
          alt="MyCRM Logo" 
          className="sidebar__branding-img"
          width={100}
          height={50}
          priority
        />
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
            <span className="sidebar__icon"><Folder size={18} /></span>
            <span className="sidebar__text">Project Management</span>
            <ChevronDown size={16} className="sidebar__chevron" />
          </button>
          {pmOpen && (
            <ul className="sidebar__sublist">
              {/* New Project Flow */}
              <li className="sidebar__item">
                <button
                  className={`sidebar__sublink sidebar__toggle${newProjectOpen ? ' open' : ''}`}
                  onClick={() => setNewProjectOpen(o => !o)}
                >
                  <FilePlus size={16} /> New Project
                  <ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {newProjectOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li>
                      <Link
                        href="/dashboard/project-management/add-project"
                        className={`sidebar__sublink${path === '/dashboard/project-management/add-project' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Create Project
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/project-management/add-project/requirements"
                        className={`sidebar__sublink${path === '/dashboard/project-management/add-project/requirements' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Requirements
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/project-management/add-project/timeline"
                        className={`sidebar__sublink${path === '/dashboard/project-management/add-project/timeline' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Timeline
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/project-management/add-project/team"
                        className={`sidebar__sublink${path === '/dashboard/project-management/add-project/team' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Assign Team
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Ongoing Projects */}
              <li className="sidebar__item">
                <button
                  className={`sidebar__sublink sidebar__toggle${ongoingProjectsOpen ? ' open' : ''}`}
                  onClick={() => setOngoingProjectsOpen(o => !o)}
                >
                  <FileText size={16} /> Ongoing Projects
                  <ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {ongoingProjectsOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li>
                      <Link
                        href="/dashboard/project-management/ongoing"
                        className={`sidebar__sublink${path === '/dashboard/project-management/ongoing' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Project List
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/project-management/ongoing/tasks"
                        className={`sidebar__sublink${path === '/dashboard/project-management/ongoing/tasks' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Task Management
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/project-management/ongoing/milestones"
                        className={`sidebar__sublink${path === '/dashboard/project-management/ongoing/milestones' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Milestones
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/project-management/ongoing/issues"
                        className={`sidebar__sublink${path === '/dashboard/project-management/ongoing/issues' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Issues
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Completed Projects */}
              <li className="sidebar__item">
                <button
                  className={`sidebar__sublink sidebar__toggle${completedProjectsOpen ? ' open' : ''}`}
                  onClick={() => setCompletedProjectsOpen(o => !o)}
                >
                  <FileText size={16} /> Completed Projects
                  <ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {completedProjectsOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li>
                      <Link
                        href="/dashboard/project-management/completed"
                        className={`sidebar__sublink${path === '/dashboard/project-management/completed' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Project List
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/project-management/completed/reports"
                        className={`sidebar__sublink${path === '/dashboard/project-management/completed/reports' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Reports
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/project-management/completed/feedback"
                        className={`sidebar__sublink${path === '/dashboard/project-management/completed/feedback' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Client Feedback
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Project Overview */}
              <li>
                <Link
                  href="/dashboard/project-management/overview"
                  className={`sidebar__sublink${path === '/dashboard/project-management/overview' ? ' active' : ''}`}
                  onClick={onLinkClick}
                >
                  <FileText size={16} /> Project Overview
                </Link>
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
              {/* Dashboard */}
              <li className="sidebar__item">
                <Link
                  href="/dashboard/lead-management"
                  className={`sidebar__sublink${path === '/dashboard/lead-management' ? ' active' : ''}`}
                  onClick={onLinkClick}
                >
                  Dashboard
                </Link>
              </li>

              {/* Add Lead */}
              <li className="sidebar__item">
                <button
                  className={`sidebar__sublink sidebar__toggle${addLeadOpen ? ' open' : ''}`}
                  onClick={() => setAddLeadOpen(o => !o)}
                >
                  Add Lead
                  <ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {addLeadOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/add-client"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/add-client' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >New Client</Link>
                    </li>
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/add-client/quick-lead"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/add-client/quick-lead' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Quick Lead</Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Leads */}
              <li className="sidebar__item">
                <button
                  className={`sidebar__sublink sidebar__toggle${leadsOpen ? ' open' : ''}`}
                  onClick={() => setLeadsOpen(o => !o)}
                >
                  Leads
                  <ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {leadsOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/all-leads"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/all-leads' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >All Leads</Link>
                    </li>
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/all-leads/add-inquiry"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/all-leads/add-inquiry' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Add Inquiry</Link>
                    </li>
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/all-leads/active"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/all-leads/active' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Active Leads</Link>
                    </li>
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/all-leads/converted"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/all-leads/converted' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Converted</Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Follow-ups */}
              <li className="sidebar__item">
                <button
                  className={`sidebar__sublink sidebar__toggle${followUpsOpen ? ' open' : ''}`}
                  onClick={() => setFollowUpsOpen(o => !o)}
                >
                  Follow-ups
                  <ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {followUpsOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/all-leads/follow-ups"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/all-leads/follow-ups' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >All Follow-ups</Link>
                    </li>
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/all-leads/follow-ups/schedule"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/all-leads/follow-ups/schedule' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Schedule Follow-up</Link>
                    </li>
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/all-leads/follow-ups/calendar"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/all-leads/follow-ups/calendar' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Calendar View</Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Reports */}
              <li className="sidebar__item">
                <button
                  className={`sidebar__sublink sidebar__toggle${reportsOpen ? ' open' : ''}`}
                  onClick={() => setReportsOpen(o => !o)}
                >
                  Reports & Analytics
                  <ChevronDown size={14} className="sidebar__chevron" />
                </button>
                {reportsOpen && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/reports"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/reports' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Overview</Link>
                    </li>
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/reports/conversion"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/reports/conversion' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Conversion Analytics</Link>
                    </li>
                    <li className="sidebar__item">
                      <Link
                        href="/dashboard/lead-management/reports/source"
                        className={`sidebar__sublink${path === '/dashboard/lead-management/reports/source' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >Source Analysis</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        {/* Masters Section */}
        <li className="sidebar__item">
          <button
            className={`sidebar__link sidebar__toggle${mastersOpen ? ' open' : ''}`}
            onClick={() => setMastersOpen(o => !o)}
          >
            <span className="sidebar__icon"><Database size={18} /></span>
            <span className="sidebar__text">Masters</span>
            <ChevronDown size={16} className="sidebar__chevron" />
          </button>
          {mastersOpen && (
            <ul className="sidebar__sublist">
              <li className="sidebar__item">
                <Link
                  href="/dashboard/project-management/project-master"
                  className={`sidebar__sublink${path === '/dashboard/project-management/project-master' ? ' active' : ''}`}
                  onClick={onLinkClick}
                >
                  <Settings size={16} /> Project Master
                </Link>
                {path.startsWith('/dashboard/project-management/project-master') && (
                  <ul className="sidebar__sublist sidebar__sublist--nested">
                    <li>
                      <Link
                        href="/dashboard/project-management/project-master/scope"
                        className={`sidebar__sublink${path === '/dashboard/project-management/project-master/scope' ? ' active' : ''}`}
                        onClick={onLinkClick}
                      >
                        Define Scope
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="sidebar__item">
                <Link
                  href="/dashboard/lead-management/client-master"
                  className={`sidebar__sublink${path === '/dashboard/lead-management/client-master' ? ' active' : ''}`}
                  onClick={onLinkClick}
                >
                  <Users size={16} /> Client Master
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  )
}