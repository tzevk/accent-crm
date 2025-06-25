// src/app/dashboard/page.js
export default function DashboardPage() {
    const stats = [
      { label: 'Total Clients',   value: 0 },
      { label: 'Open Leads',      value: 0 },
    ];
  
    return (
      <>
        <p style={{ marginBottom: '24px', fontSize: '1.125rem', color: '#555' }}>
          Welcome back, <strong style={{ color: '#64126d' }}>User</strong>!
        </p>
  
        <div className="card-grid">
          {stats.map(({ label, value }) => (
            <div key={label} className="card">
              <div className="label">{label}</div>
              <div className="value">{value}</div>
            </div>
          ))}
        </div>
      </>
    );
  }