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
- `role` (Enum: admin, manager, employee)
- `status` (Enum: active, manager, employee, Default: active)
- `last_login` (DateTime, Optional)
- `createdAt` (DateTime, Default: now())

## Relations

- `User` has one `PersonalDetail`
- `User` has many `Qualification`, `SalaryMaster`, `Document`, `ProjectAssignment`

## Enums

### Role

- admin
- manager
- employee

### Status

- active
- manager
- employee

### Gender, MaritalStatus, DegreeLevel, DocumentType

- (List enum values as in your schema)

---

## Notes

- All relations use `user_id` as the foreign key.
- Unique constraints on `username`, `email`, and `phone`.
- See `prisma/schema.prisma` for full details.
