'use client'

import { useState } from 'react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './AssignRolesTable.module.css'

// Mock data – replace with fetch from your API
const initialUsers = [
  { id: 1, username: 'user1',   fullName: 'user',    roles: ['employee'] },
  { id: 2, username: 'user2', fullName: 'user', roles: ['manager']  },
  { id: 3, username: 'user2',  fullName: 'user',    roles: ['admin']    },
]

const availableRoles = ['admin', 'manager', 'employee']

const steps = [
  { label: 'Create User',  href: '/dashboard/user-management/create-user' },
  { label: 'Assign Roles', href: '/dashboard/user-management/create-user/assign-roles' },
]

export default function AssignRolesTablePage() {
  const [users, setUsers] = useState(initialUsers)
  const [selectedIds, setSelectedIds] = useState([])

  const toggleSelect = id => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const changeRole = (id, newRole) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, roles: [newRole] } : u
      )
    )
  }

  const handleSave = async () => {
    // send selected and roles updates to your API
    const payload = users.filter(u => selectedIds.includes(u.id))
    console.log('Saving roles for', payload)
    // await fetch('/api/users/assign-roles-batch', ...)
    alert('Roles updated!')
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerArea}>
        <Breadcrumb steps={steps} active={1} />
        <h2 className={styles.title}>Assign Roles</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className="select">✓</th>
              <th>User</th>
              <th>Current Role</th>
              <th>Assign Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="select">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(u.id)}
                    onChange={() => toggleSelect(u.id)}
                  />
                </td>
                <td>
                  <div><strong>{u.username}</strong></div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    {u.fullName}
                  </div>
                </td>
                <td>{u.roles.join(', ')}</td>
                <td>
                  <select
                    className={styles.selectRole}
                    value={u.roles[0]}
                    onChange={e => changeRole(u.id, e.target.value)}
                  >
                    {availableRoles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className={styles.button}
        disabled={selectedIds.length === 0}
        onClick={handleSave}
      >
        Save Selected
      </button>
    </div>
  )
}