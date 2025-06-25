// src/app/dashboard/components/Header.js
'use client'
export default function Header({ onMenuToggle }) {
  return (
    <header className="header">
      <div className="header__left">
        <button
          className="header__hamburger"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >☰</button>

      </div>
      <div className="header__center">
        <input
          type="search"
          placeholder="Search clients, leads..."
          className="header__search"
        />
      </div>
      <div className="header__actions">
        <div className="header__avatar-wrapper">
          <div className="header__avatar" />
        </div>
      </div>
    </header>
  )
}