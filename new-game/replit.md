# Overview

This is an Arabic word-typing speed game built with React and Express. Players compete in real-time to type displayed words as quickly as possible, earning points for correct answers. The application features multiple game modes, team functionality, chat system, and comprehensive statistics tracking. It's designed as a multiplayer web-based game with full RTL (right-to-left) language support for Arabic.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom game-themed colors (neon blues, cyans) and Arabic font support
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Real-time Communication**: WebSocket connection for game events and chat

## Backend Architecture
- **Runtime**: Node.js with Express server
- **WebSocket**: Native WebSocket implementation for real-time gameplay
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints for game data with WebSocket for real-time features

## Game Engine
- **Game Modes**: 
  - Normal: Type words as displayed
  - Missing: Fill in missing letters
  - Reversed: Type reversed words correctly
- **Scoring System**: 10 points per correct answer, 200 points to win
- **Team System**: Players can create and join teams for collaborative play
- **Voting System**: Democratic game mode changes requiring minimum vote threshold

## Database Schema
- **Players**: User profiles with names, colors, and online status
- **Player Stats**: Individual performance metrics (wins, points, timing data)
- **Teams**: Team management with points aggregation
- **Team Members**: Many-to-many relationship between players and teams
- **Game History**: Historical game data for analytics
- **Game Mode Votes**: Voting system for mode changes

## Real-time Features
- **Live Leaderboards**: Real-time player ranking updates
- **Chat System**: Instant messaging with special word highlighting and effects
- **Game State Synchronization**: Word changes, player actions, and scoring updates
- **Connection Management**: Automatic reconnection and player status tracking

## Internationalization
- **RTL Support**: Full right-to-left layout for Arabic language
- **Arabic Typography**: Custom font loading (Tajawal) optimized for Arabic text
- **Cultural Customization**: Special name colors and effects for specific Arabic names

## Performance Optimizations
- **WebSocket Efficiency**: Minimal message overhead for real-time updates
- **Database Connection Pooling**: Neon serverless PostgreSQL with connection pooling
- **Client-side Caching**: TanStack Query for intelligent data caching
- **Component Lazy Loading**: React component code-splitting where beneficial

# External Dependencies

## Database
- **Neon PostgreSQL**: Serverless PostgreSQL database with WebSocket constructor configuration
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect for database operations
- **Connection Pooling**: Built-in connection pooling via @neondatabase/serverless

## UI Framework
- **Radix UI**: Comprehensive set of accessible UI primitives for React
- **Tailwind CSS**: Utility-first CSS framework with custom game theme configuration
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **TypeScript**: Full type safety across frontend, backend, and shared schemas
- **Vite**: Fast build tool with HMR and React plugin
- **ESBuild**: Fast bundling for production builds
- **Replit Integration**: Development environment integration with runtime error overlay

## Fonts and Assets
- **Google Fonts**: Tajawal Arabic font family with multiple weights
- **Custom Color Palette**: Game-specific neon color scheme with CSS variables

## Real-time Communication
- **Native WebSocket**: Browser WebSocket API for client connections
- **WS Library**: Node.js WebSocket library for server-side WebSocket handling

## Validation and Schemas
- **Zod**: Runtime type validation with Drizzle integration
- **Shared Schema**: Type-safe data models shared between client and server