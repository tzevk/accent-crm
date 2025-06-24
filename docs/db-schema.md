## Connecting to DB

1. You should have already installed prisma, etc
2. Do 'npx prisma generate client' to instantiate prisma client
3. Rest should work

# Database Schema (Prisma)

## User

- `user_id` (PK, Int, Auto-increment)
- `username` (String, Unique)
- `password` (String)
- `email` (String, Unique)
- `phone` (String, Unique, Optional)
- `role` (Enum: Role)
- `status` (Enum: Status, Default: active)
- `last_login` (DateTime, Optional)
- `createdAt` (DateTime, Default: now())
- Relations:
  - `personal_details` (1:1 PersonalDetail)
  - `qualifications` (1:N Qualification)
  - `salary_master` (1:N SalaryMaster)
  - `documents` (1:N Document)
  - `project_assignments` (1:N ProjectAssignment)

## PersonalDetail

- `personal_id` (PK, Int, Auto-increment)
- `user_id` (Int, Unique, FK to User)
- `full_name` (String)
- `father_name` (String, Optional)
- `gender` (Enum: Gender, Optional)
- `date_of_birth` (DateTime, Optional)
- `marital_status` (Enum: MaritalStatus, Optional)
- `address_line1` (String, Optional)
- `address_line2` (String, Optional)
- `city` (String, Optional)
- `state` (String, Optional)
- `pincode` (String, Optional)
- `country` (String, Default: "India")
- `emergency_contact_name` (String, Optional)
- `emergency_contact_number` (String, Optional)

## Qualification

- `qualification_id` (PK, Int, Auto-increment)
- `user_id` (Int, FK to User)
- `degree_level` (Enum: DegreeLevel)
- `degree_name` (String, Optional)
- `institution_name` (String, Optional)
- `specialization` (String, Optional)
- `start_year` (Int, Optional)
- `end_year` (Int, Optional)
- `grade` (String, Optional)
- `document_url` (String, Optional)

## SalaryMaster

- `salary_id` (PK, Int, Auto-increment)
- `user_id` (Int, FK to User)
- `basic_pay` (Decimal(10,2))
- `hra` (Decimal(10,2), Optional)
- `bonus` (Decimal(10,2), Optional)
- `incentives` (Decimal(10,2), Optional)
- `deductions` (Decimal(10,2), Optional)
- `gross_salary` (Decimal(10,2), Optional)
- `net_salary` (Decimal(10,2), Optional)
- `currency` (String, Default: "INR")
- `effective_from` (DateTime, Optional)
- `remarks` (String, Optional)

## Document

- `document_id` (PK, Int, Auto-increment)
- `user_id` (Int, FK to User)
- `document_type` (Enum: DocumentType)
- `document_name` (String, Optional)
- `document_url` (String)
- `verified` (Boolean, Default: false)
- `uploaded_at` (DateTime, Default: now())

## ProjectAssignment

- `assignment_id` (PK, Int, Auto-increment)
- `user_id` (Int, FK to User)
- `project_id` (Int)
- `assigned_role` (String, Optional)
- `start_date` (DateTime, Optional)
- `end_date` (DateTime, Optional)
- `allocation_percent` (Decimal(5,2), Optional)

# Enums

## Role

- admin
- manager
- employee

## Status

- active
- manager
- employee

## Gender

- male
- female
- other

## MaritalStatus

- single
- married
- divorced
- widowed

## DegreeLevel

- Diploma
- Bachelor
- Master
- PhD
- Other

## DocumentType

- Resume
- Aadhar
- PAN
- Degree
- Other

---

## Notes

- All relations use `user_id` as the foreign key.
- Unique constraints on `username`, `email`, and `phone`.
- See `prisma/schema.prisma` for full details.
