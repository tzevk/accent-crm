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

### Personal Details

#### POST /api/admin/users/:id/personal-detail

- **Auth:** Requires admin role
- **Request Body:**
  ```json
  {
    "full_name": "John Doe",
    "father_name": "Richard Doe",
    "gender": "male",
    "date_of_birth": "1990-01-01",
    "marital_status": "single",
    "address_line1": "123 Main St",
    "address_line2": "",
    "city": "Metropolis",
    "state": "State",
    "pincode": "123456",
    "country": "India",
    "emergency_contact_name": "Jane Doe",
    "emergency_contact_number": "9876543210"
  }
  ```
- **Response:**
  - 201: `{ message, details }`
  - 400: `{ error }`

#### GET /api/admin/users/:id/personal-detail

- **Auth:** Requires admin role
- **Response:** `{ message, details }` or 404 if not found

---

### Qualification Details

#### POST /api/admin/users/:id/qualification-detail

- **Auth:** Requires admin role
- **Request Body:**
  ```json
  {
    "degree_level": "Bachelor",
    "degree_name": "BSc Computer Science",
    "institution_name": "ABC University",
    "specialization": "Computer Science",
    "start_year": 2018,
    "end_year": 2022,
    "grade": "A",
    "document_url": "https://example.com/degree.pdf"
  }
  ```
- **Response:**
  - 201: `{ message, details }`
  - 400: `{ error }`

#### GET /api/admin/users/:id/qualification-detail

- **Auth:** Requires admin role
- **Response:** Array of qualification objects

---

### Documents

#### POST /api/admin/users/:id/documents

- **Auth:** Requires manager or admin role
- **Request Body:**
  ```json
  {
    "document_type": "Aadhar",
    "document_name": "Aadhar Card",
    "document_url": "https://example.com/aadhar.pdf"
  }
  ```
- **Response:**
  - 201: `{ message, document }`
  - 400: `{ error }`

#### GET /api/admin/users/:id/documents

- **Auth:** Requires admin or manager role
- **Response:** Array of document objects

---

## Error Format

All errors are returned as JSON with a `message` or `error` field.
