# ~日本~ Learn: Japanese Vocabulary Learning Application

An interactive and intuitive application to help users expand their Japanese vocabulary and improve communication skills. Designed for both users and admins, this app features secure authentication, seamless navigation, and engaging learning experiences.

## Features

### User Features

- **Navbar and Footer:** Easy navigation with a responsive layout.
- **Lessons Page:** Access to protected lessons categorized by topics.
- **Vocabulary Learning:**
  - Displays individual vocabulary words with information.
  - Pronunciation playback on click.
  - Pagination for smooth navigation.
  - Completion with an interactive confetti animation.
- **Tutorial Page:** Embedded YouTube videos for supplementary learning.
- **Authentication:** Secure login and registration with validations.

### Admin Features

- **Dashboard:** Centralized control panel for managing the system.
- **Lesson Management:**
  - Create, view, edit, and delete lessons.
  - Track vocabulary count for each lesson.
- **Vocabulary Management:**
  - Add, view, edit, and delete vocabulary.
  - Filter vocabularies by lesson number.
- **User Management:**
  - View all users with their roles.

### Authentication & Authorization

- Custom authentication system.
- Role-based access control with protected routes.
  - Redirect normal users to the lessons page upon login.
  - Redirect admins to the dashboard upon login.

### Learning System

- Engaging vocabulary learning experience with audio playback.
- Interactive celebration upon lesson completion.

## Tech Stack

### Frontend

- **React**: UI Development
- **TypeScript**: Strong typing for better code quality
- **React Router**: Client-side routing
- **Tailwind CSS**: Styling
- **React-Confetti**: Animation for completion events

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Backend framework
- **TypeScript**: Strong typing for better maintainability

### Database

- **MongoDB**: Data storage
- **Mongoose**: ODM for MongoDB

## Installation and Setup

### Prerequisites

- Node.js and npm installed.
- MongoDB instance running.
