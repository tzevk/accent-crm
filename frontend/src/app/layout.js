// src/app/layout.js
import '../styles/globals.css';

export const metadata = {
  title: 'ACCENT TECHNO SOLUTIONS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}