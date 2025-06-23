# API Specification

## Auth Routes

### POST /api/auth/login

- **Description:** Login a user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - 200: `{ message, user: { id, username, email } }`
  - 400: `{ error }`
  - 401: `{ message: "Invalid email or password" }`

---

## Admin Routes

### GET /api/admin/users

- **Auth:** Requires authentication (any logged-in user)
- **Response:** Array of user objects

### POST /api/admin/users

- **Auth:** Requires authentication
- **Request Body:**
  ```json
  {
    "username": "jdoe",
    "email": "jdoe@example.com",
    "password": "password123",
    "role": "employee",
    "phone": "1234567890"
  }
  ```
- **Response:**
  - 201: `{ user }`
  - 400: `{ error }`
  - 409: `{ message: "User already exists" }`

### GET /api/admin/users/test

- **Auth:** Requires admin role
- **Response:** `{ message: "You are an admin!" }`
- **Errors:** 403 if not admin

---

## Error Format

All errors are returned as JSON with a `message` or `error` field.
