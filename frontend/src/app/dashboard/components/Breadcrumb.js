'use client'
import Link from 'next/link'
import styles from './Breadcrumb.module.css'

export default function Breadcrumb({ steps, active }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      {steps.map((step, idx) => {
        const isActive = idx === active
        return (
          <span key={step.label} className={styles.item}>
            {isActive ? (
              <span className={styles.current}>{step.label}</span>
            ) : (
              <Link href={step.href} className={styles.link}>
                {step.label}
              </Link>
            )}
            {idx < steps.length - 1 && <span className={styles.separator}>›</span>}
          </span>
        )
      })}
    </nav>
  )
}