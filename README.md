# 🏰 Hramelot - Tabletop Gaming Club Portal

Hramelot is a digital clubhouse for tabletop gaming. It manages physical space (table reservations) and community
content (game sessions, lore, and member resources).

## 🔑 User Roles & Permissions

The system uses a 5-tier role hierarchy synchronized with **Discord roles**:

| Role       | Access Level        | Key Capabilities                                            |
| :--------- | :------------------ | :---------------------------------------------------------- |
| **PUBLIC** | `/`                 | View events, lore, games, and join info.                    |
| **USER**   | `/members`          | Signed in. Register for public events/sessions.             |
| **MEMBER** | `/members`          | **Paid.** Book tables, borrow games, access resources.      |
| **MASTER** | `/members/organize` | **GMs.** Create sessions, manage players, priority booking. |
| **ADMIN**  | `/admin`            | Full control over users, content, and system settings.      |

## 🗺️ Route Structure

### 🌐 Public (`/`)

_SEO-optimized, publicly accessible_

```
/                                 # Homepage
/about                           # About Hramelot club
/location                        # Where we are, contact info
/calendar                        # Public event calendar (read-only)
/events                          # Upcoming public events
  /events/[id]                   # Event details (can register if USER+)
/games                           # Games we play/own (showcase)
/lore                            # Club history & stories
/guide                           # Beginner's guide
/join                            # How to become a MEMBER (membership info)
/faq                             # Frequently asked questions
/gallery                         # Photos from events
```

### 👤 Member Area (`/members`)

_Replaces the traditional "Dashboard" to focus on community identity._

**USER Pages** (Signed in via Discord)

```
/members                         # USER+ landing page
/members/profile                 # Personal profile
/members/events                  # Browse & register for events
  /members/events/[id]/register  # Register for public event
/members/sessions                # Browse open game sessions
  /members/sessions/[id]/join    # Request to join a session
/members/feed                    # Community activity feed (read-only)
/members/library                 # Browse game library
```

**MEMBER Pages** (Paid membership)
_Inherits USER pages, plus:_

```
/members/reservations            # Book tables ⭐ PRIMARY
  /members/reservations/new      # Create table booking
  /members/reservations/calendar # Full calendar (book any open slot)
  /members/reservations/mine     # My bookings
  /members/reservations/[id]     # View/edit own booking

/members/directory               # Full member directory
  /members/directory/[username]  # Member profile page

/members/library/borrow          # Request to borrow games
/members/resources               # Member-only resources
  /members/resources/sheets      # Character sheets
  /members/resources/rules       # House rules
  /members/resources/guides      # Advanced guides

/members/inventory               # Club equipment available
  /members/inventory/reserve     # Reserve dice/miniatures

/members/polls                   # Vote on club decisions
  /members/polls/[id]            # Active poll

/members/perks                   # Member benefits & discounts
```

**MASTER Pages** (Game Masters / Organizers)
_Runs 2+ sessions/month - elevated privileges. Inherits MEMBER pages, plus:_

```
/members/organize                # Master control center
/members/organize/sessions       # My organized sessions
  /members/organize/sessions/new # Create new session/campaign
  /members/organize/sessions/[id] # Manage session
    - View registered players (full details)
    - Email/message players
    - Session notes/prep area
    - Attendance tracking

/members/reservations/priority   # Priority booking (see available slots first)

/members/organize/campaigns      # Manage ongoing campaigns
  /members/organize/campaigns/new
  /members/organize/campaigns/[id]
    - Campaign dashboard
    - Player roster with contact info
    - Session history
    - Campaign notes (private)

/members/organize/players        # View player details for YOUR sessions
  - Contact information
  - RSVP history
  - Preferences/notes
  - Dietary restrictions (for snacks)

/members/organize/stats          # Your hosting statistics
  - Sessions run
  - Player satisfaction
  - Attendance rates
```

### 👑 Admin (`/admin`)

_Full club control. Inherits all previous pages, plus:_

```
/admin                           # Admin control panel
/admin/members                   # Member management
  /admin/members/[id]            # Edit user details
  /admin/members/roles           # Assign/change roles
  /admin/members/approvals       # Approve new MEMBER applications

/admin/content                   # Content management
  /admin/content/pages           # Edit public pages (About, Guide, etc.)
  /admin/content/lore            # Manage lore entries
  /admin/content/announcements   # Create club announcements

/admin/tables                    # Manage tables
  /admin/tables/new              # Add new table
  /admin/tables/[id]/edit        # Edit/remove table

/admin/reservations              # Override all reservations
  /admin/reservations/manage     # View/edit/cancel any booking
  /admin/reservations/conflicts  # Resolve booking conflicts

/admin/events                    # Manage all events
  /admin/events/[id]             # Edit any event (override)

/admin/library                   # Manage game library
  /admin/library/add             # Add new games
  /admin/library/inventory       # Track condition/location

/admin/inventory                 # Manage club equipment
  /admin/inventory/add           # Add equipment
  /admin/inventory/maintenance   # Track maintenance

/admin/polls                     # Create & manage polls
  /admin/polls/new               # Create new poll
  /admin/polls/results           # View results

/admin/settings                  # Club settings
  /admin/settings/general        # General config
  /admin/settings/discord        # Discord integration
  /admin/settings/payments       # Membership payment config
  /admin/settings/notifications  # Email/notification templates

/admin/analytics                 # Club analytics
  - Member growth
  - Table utilization
  - Popular games
  - Revenue tracking (memberships)
  - Attendance trends

/admin/moderation                # Community moderation
  /admin/moderation/reports      # Handle reports
  /admin/moderation/feed         # Moderate community posts
```

## 🎨 Visual Role Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│ PUBLIC (/)                                                   │
│ ├─ Home, About, Location, Calendar, Events, Games, Lore    │
│ └─ Join, FAQ, Gallery, Guide                               │
└─────────────────────────────────────────────────────────────┘
                           ↓ Sign in with Discord
┌─────────────────────────────────────────────────────────────┐
│ USER (/members)                                              │
│ ├─ Profile, Events (register), Sessions (join)             │
│ └─ Feed (read), Library (browse)                           │
└─────────────────────────────────────────────────────────────┘
                           ↓ Pay membership
┌─────────────────────────────────────────────────────────────┐
│ MEMBER (/members)                                            │
│ ├─ + Reservations (book tables) ⭐                          │
│ ├─ + Directory, Resources, Inventory                       │
│ └─ + Polls, Perks, Borrow games                            │
└─────────────────────────────────────────────────────────────┘
                           ↓ Run 2+ sessions/month
┌─────────────────────────────────────────────────────────────┐
│ MASTER (/members/organize)                                   │
│ ├─ + Priority booking                                       │
│ ├─ + Create sessions/campaigns                             │
│ ├─ + View player details (own sessions)                    │
│ └─ + Campaign management, GM tools                         │
└─────────────────────────────────────────────────────────────┘
                           ↓ Assigned by admin
┌─────────────────────────────────────────────────────────────┐
│ ADMIN (/admin)                                               │
│ ├─ + Member/role management                                 │
│ ├─ + Content & settings management                          │
│ ├─ + Override any action                                    │
│ └─ + Analytics & moderation                                 │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Key Design Decisions

### 1. `/members` vs `/dashboard`

We chose `/members` as the root for authenticated users because Hramelot is a social club, not a utility. This aligns
with our SEO strategy and reinforces the sense of belonging for our players.

### 2. Reservation vs. Game Session

To maintain flexibility, we distinguish between physical space and game content:

- **Reservation:** A logistical entity. A Member books a specific **Table** for a time block.
- **GameSession:** A content layer. Attached to a Reservation if the game is public, allowing others to see system
  details and register.

### 3. Discord-First Authentication

Roles are managed via Discord. When a user signs in, the system syncs their Discord Guild roles to their local
`UserRole` to determine permissions instantly.

## 💾 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Auth:** Auth.js (NextAuth) with Discord Provider
- **Database:** PostgreSQL via Prisma ORM
- **UI:** Tailwind CSS, Radix UI, Lucide React

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** (or pnpm/yarn)
- A **Supabase** project with a PostgreSQL database
- A **Discord OAuth application** (for Auth.js authentication)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root. Required variables:

```env
# Supabase — use the direct connection string (port 5432), not the pooler
DATABASE_URL="postgresql://..."

# Auth.js
AUTH_SECRET="your-secret"

# Discord OAuth (from Discord Developer Portal)
AUTH_DISCORD_ID="your-discord-client-id"
AUTH_DISCORD_SECRET="your-discord-client-secret"
```

> ⚠️ Use the **direct connection** URL from Supabase (port `5432`) for schema operations. The pooler (port `6543`) can
> be used at runtime but will cause issues with `prisma db push`.

### 3. Set up the database

Push the Prisma schema to your Supabase database and seed it with test data:

```bash
npm run db:push   # applies schema
npm run db:seed   # seeds tables, users, sessions, events, games
```

Or do both at once with a full reset:

```bash
npm run db:reset  # wipe → push schema → seed
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🗄️ Database Scripts

| Command            | Description                                                 |
| :----------------- | :---------------------------------------------------------- |
| `npm run db:seed`  | Populate the DB with test data                              |
| `npm run db:push`  | Apply `schema.prisma` changes to the DB                     |
| `npm run db:wipe`  | Delete all data (keeps schema)                              |
| `npm run db:reset` | Wipe → push schema → seed _(most common during WIP)_        |
| `npm run db:fresh` | Nuclear reset via `prisma migrate reset --force`, then seed |
