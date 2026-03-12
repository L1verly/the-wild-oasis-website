# The Wild Oasis Customer Website

## About this project

- "The Wild Oasis" - small boutique hotel with 8 wooden cabins
- Users are potential guests and actual guests
- Application helps guests to learn about this hotel, showcasing it's cabins
- Application is used for booking cabins

## Feature categories

1. About
2. Reservations
3. Cabins
4. Profile
5. Authentication

## Pages

| Page name        | Route path                 |
| ---------------- | -------------------------- |
| Homepage         | /                          |
| About page       | /about                     |
| Cabin overview   | /cabins                    |
| Cabin detail     | /cabins/:cabinId           |
| Login            | /login                     |
| Reservation list | /account/reservations      |
| Edit reservation | /account/reservations/edit |
| Update profile   | /account/profile           |

## Tech Stack

| Purpose             | Technology      |
| ------------------- | --------------- |
| Framework           | Next.js         |
| Styling             | Tailwindcss     |
| UI state management | Context API     |
| Form management     | React Hook Form |
| Remote API          | Supabase        |
| Date manipulation   | date-fns        |

## Data tables

1. Bookings (Reservations, Profile features)
2. Cabins (Cabins feature)
3. Guests (Reservations, Profile feature)
4. Settings (App settings feature)
5. Users (Authentication, Profile features)
