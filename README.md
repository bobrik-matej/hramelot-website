This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🏰 Project Overview

Hramelot is a digital clubhouse for tabletop gaming. It manages physical space (table reservations) and community content (game sessions, lore, and member resources).

## 🔑 User Roles & Permissions

The system uses a 5-tier role hierarchy synchronized with **Discord roles**:

| Role | Access Level | Key Capabilities |
| :--- | :--- | :--- |
| **PUBLIC** | `/` | View events, lore, games, and join info. |
| **USER** | `/members` | Signed in. Register for public events/sessions. |
| **MEMBER** | `/members` | **Paid.** Book tables, borrow games, access resources. |
| **MASTER** | `/members/organize` | **GMs.** Create sessions, manage players, priority booking. |
| **ADMIN** | `/admin` | Full control over users, content, and system settings. |

## 🗺️ Route Structure

### 🌐 Public (`/`)
*   `/events`, `/calendar` - Find games to join.
*   `/lore`, `/guide`, `/gallery` - Discover the club's history and community.
*   `/join` - Information on becoming a paid member.

### 👤 Member Area (`/members`)
*Replaces the traditional "Dashboard" to focus on community identity.*
*   `/profile` - Personal RPG character and contact info.
*   `/reservations` - (MEMBER+) Table booking system.
*   `/organize` - (MASTER+) Campaign and session management.

### 👑 Admin (`/admin`)
*   Member approvals, content management, and club analytics.

## 🛠️ Key Design Decisions

### 1. `/members` vs `/dashboard`
We chose `/members` as the root for authenticated users because Hramelot is a social club, not a utility. This aligns with our SEO strategy and reinforces the sense of belonging for our players.

### 2. Reservation vs. Game Session
To maintain flexibility, we distinguish between physical space and game content:
- **Reservation:** A logistical entity. A Member books a specific **Table** for a time block.
- **GameSession:** A content layer. Attached to a Reservation if the game is public, allowing others to see system details and register.

### 3. Discord-First Authentication
Roles are managed via Discord. When a user signs in, the system syncs their Discord Guild roles to their local `UserRole` to determine permissions instantly.

## 💾 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Auth:** Auth.js (NextAuth) with Discord Provider
- **Database:** PostgreSQL via Prisma ORM
- **UI:** Tailwind CSS, Radix UI, Lucide React