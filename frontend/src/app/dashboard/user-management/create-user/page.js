'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react'
import Breadcrumb from '@/app/dashboard/components/Breadcrumb'
import styles from './CreateUser.module.css'

const steps = [
  { label: 'Account Info',     href: '/dashboard/user-management/create-user' },
  { label: 'Personal Details', href: '/dashboard/user-management/personal-details' },
  { label: 'Qualifications',   href: '/dashboard/user-management/qualifications' },
  { label: 'Documents',        href: '/dashboard/user-management/documents' },
]

export default function CreateUserPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'employee',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showPwd, setShowPwd] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // overall validity: no errors and required fields filled
    const noErr = !errors.username && !errors.email && !errors.password
    const filled = form.username && form.email && form.password
    setIsValid(noErr && filled)
  }, [errors, form])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, value)
  }

  const validateField = (name, value) => {
    let msg = ''
    if (['username','email','password'].includes(name) && !value) {
      msg = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    }
    if (name === 'email' && value) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(value)) msg = 'Invalid email'
    }
    setErrors(prev => ({ ...prev, [name]: msg }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    // ... submit logic ...
  }

  return (
    <div className={styles.container}>
      <Breadcrumb steps={steps} active={0} />

      <div className={styles.progress}>
        <div className={styles.progress__fill} />
      </div>

      <div className={styles.formWrapper}>
      <h2 className={styles.title}>Account Information</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Username */}
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <div className={styles.inputWrapper}>
            <User size={18} className={styles.inputIcon} />
            <input
              id="username"
              name="username"
              type="text"
              className={`${styles.input} ${touched.username 
                ? (errors.username ? styles.invalid : styles.valid) 
                : ''}`}
              value={form.username}
              onChange={handleChange}
              placeholder="janedoe"
            />
          </div>
          {errors.username && <div className={styles.error}>{errors.username}</div>}
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <div className={styles.inputWrapper}>
            <Mail size={18} className={styles.inputIcon} />
            <input
              id="email"
              name="email"
              type="email"
              className={`${styles.input} ${touched.email 
                ? (errors.email ? styles.invalid : styles.valid) 
                : ''}`}
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
            />
          </div>
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </div>

        {/* Password */}
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <div className={styles.inputWrapper}>
            <Lock size={18} className={styles.inputIcon} />
            <input
              id="password"
              name="password"
              type={showPwd ? 'text' : 'password'}
              className={`${styles.input} ${touched.password 
                ? (errors.password ? styles.invalid : styles.valid) 
                : ''}`}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setShowPwd(v => !v)}
              aria-label="Toggle password visibility"
            >
              {showPwd ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>
          {errors.password && <div className={styles.error}>{errors.password}</div>}
        </div>

        {/* Phone */}
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>Phone (optional)</label>
          <div className={styles.inputWrapper}>
            <Phone size={18} className={styles.inputIcon} />
            <input
              id="phone"
              name="phone"
              type="tel"
              className={styles.input}
              value={form.phone}
              onChange={handleChange}
              placeholder="+91-9876543210"
            />
          </div>
        </div>

        {/* Role */}
        <div className={styles.formGroup}>
          <label htmlFor="role" className={styles.label}>Role</label>
          <select
            id="role"
            name="role"
            className={styles.select}
            value={form.role}
            onChange={handleChange}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={!isValid || submitting}
        >
          {submitting ? 'Saving…' : 'Save & Continue'}
        </button>
      </form>
      </div>
    </div>
  )
}