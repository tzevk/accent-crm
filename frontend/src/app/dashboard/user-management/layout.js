// src/app/dashboard/user-management/layout.js
export const metadata = {
    title: 'User Management',
  }
  
  export default function UserManagementLayout({ children }) {
    return (
      <div>
        {/* You could add breadcrumbs here */}
        {children}
      </div>
    )
  }