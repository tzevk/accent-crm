# Authentication Flow

1. **Login**

   - User sends POST `/api/auth/login` with email and password.
   - If valid, server sets a `jwt` cookie (HTTP-only) and returns user info.

2. **JWT Handling**

   - JWT is stored in a secure, HTTP-only cookie.
   - All protected routes check for the `jwt` cookie.
   - If the token is valid, user info is attached to `req.user`.

3. **Protected Routes**

   - Use `protect` middleware to require authentication.
   - Use `restrictTo("admin")` to require admin role.

4. **Logout**

   - (If implemented) Clear the `jwt` cookie on logout.

5. **Error Cases**
   - Invalid credentials: 401 Unauthorized.
   - Missing/invalid token: 401 Unauthorized.
   - Insufficient role: 403 Forbidden.
