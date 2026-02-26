-- Truncate all domain tables in reverse dependency order
TRUNCATE TABLE
  "BorrowRecord",
  "EventRegistration",
  "GameRegistration",
  "MemberApplication",
  "GameSession",
  "Reservation",
  "Event",
  "Game",
  "Table",
  "Session",
  "Account",
  "VerificationToken",
  "User"
RESTART IDENTITY CASCADE;