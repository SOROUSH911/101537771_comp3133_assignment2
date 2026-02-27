# 101537771_comp3133_assignment2

**Student:** Soroush Salari
**Student ID:** 101537771
**Course:** COMP3133 - Full Stack Development II
**Institution:** George Brown College

## Overview

Angular frontend application for the Employee Management System. This project connects to the GraphQL backend (Assignment 1) and provides a complete CRUD interface for managing employees.

## Features

- User Authentication (Login / Signup / Logout)
- Employee List with search by department or designation
- Add Employee with profile photo upload
- View Employee details
- Update Employee information
- Delete Employee with confirmation
- Responsive Material Design UI
- Route guards for protected pages
- Form validation with error messages

## Tech Stack

- Angular 21
- Angular Material 21
- Apollo Angular 13 (GraphQL Client)
- TypeScript
- SCSS
- Vitest (Unit Testing)

## Prerequisites

- Node.js 22+
- npm 10+
- Backend server running at `http://localhost:4000/graphql`

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Project Structure

```
src/app/
├── components/
│   ├── auth/          (login, signup)
│   ├── employees/     (list, add, view, update)
│   └── layout/        (navbar)
├── graphql/           (operations, provider)
├── guards/            (auth, no-auth)
├── models/            (user, employee interfaces)
├── pipes/             (salary, truncate)
└── services/          (auth, employee)
```
