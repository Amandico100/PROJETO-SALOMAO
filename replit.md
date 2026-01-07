# Salomão Quiz Engine v2

## Overview

A white-label enterprise platform for running high-conversion quizzes, inspired by Zing Coach, Mimika, and Typeform. The application dynamically renders quiz flows based on JSON configuration, featuring animated transitions, lead capture, and a premium visual design system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript in strict mode
- **Build Tool**: Vite with custom build script for client and server bundling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand with localStorage persistence middleware for quiz progress
- **Styling**: TailwindCSS with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for screen transitions and micro-interactions
- **Icons**: Lucide React

### Quiz Engine Design
The quiz engine uses a configuration-driven approach where screens are defined in JSON format and rendered dynamically:

- **Screen Types**: Welcome, Multi-Select, Image Select, Info Interstitial, Loading Calculated, Email Capture, VSL Sales
- **Type System**: Discriminated unions in TypeScript for type-safe screen rendering
- **State Flow**: Zustand store manages current screen, answers history, navigation, and email capture
- **Transitions**: AnimatePresence wraps screen components for smooth slide animations

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod with drizzle-zod integration
- **Storage**: Abstracted storage interface with in-memory implementation (easily swappable to database)

### Data Flow
1. Quiz configuration loaded from `example-quiz.ts` into Zustand store
2. QuizRenderer component reads current screen and renders appropriate screen component
3. User answers stored in Zustand with localStorage persistence
4. Email capture screen submits lead data to `/api/leads` endpoint
5. Leads stored with quiz ID, email, and all collected answers

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations and schema push (`npm run db:push`)

### Frontend Libraries
- **@tanstack/react-query**: Server state management for API calls
- **Radix UI Primitives**: Accessible component foundations (dialog, popover, select, etc.)
- **react-day-picker**: Calendar component
- **embla-carousel-react**: Carousel functionality
- **vaul**: Drawer component
- **react-resizable-panels**: Resizable panel layouts
- **input-otp**: OTP input component
- **recharts**: Charting library
- **react-hook-form**: Form handling with `@hookform/resolvers` for Zod validation

### Build & Development
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development
- **Replit plugins**: Runtime error overlay, cartographer, dev banner (development only)

### Styling
- **tailwind-merge + clsx**: Utility class composition
- **class-variance-authority**: Component variant management
- **Google Fonts**: Outfit (headings) + Inter (body) as per design guidelines