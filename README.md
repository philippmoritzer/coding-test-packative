### Note

The version after the coding test can be found in the branch after-interview.
Main is now the branch for the version with changes made to refactor and better the
software but also to learn react.

# Coding Test Packative

A full-stack monorepo featuring a **backend** built with [NestJS](https://nestjs.com/) and a **frontend** built with [Next.js](https://nextjs.org/) (React).  
This project demonstrates modern web application architecture, authentication/authorization, and scalable code organization.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Local Development](#local-development)
  - [Running with Docker](#running-with-docker)
- [Authentication & Authorization](#authentication--authorization)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Resources](#resources)
- [License](#license)

---

## Features

- **Backend**: RESTful API with NestJS, SQLite (in-memory), TypeORM, and Swagger docs.
- **Frontend**: Next.js (App Router), Redux Toolkit, i18n, Tailwind CSS, Playwright E2E, and Jest unit tests.
- **Authentication**: Simple header-based, with hardcoded users for demo/testing.
- **Authorization**: Permission-based, enforced via custom NestJS guards and decorators.
- **Blog**: Create, view, like, and paginate blog posts.
- **Dockerized**: Easy local or CI/CD deployment.
- **CI/CD**: GitHub Actions workflow for linting, testing, building, and deployment.

---

## Architecture

```
.
├── backend/   # NestJS API (blog, auth, permissions)
├── frontend/  # Next.js app (Redux, i18n, blog UI)
├── docker-compose.yml
└── README.md
```

- **Backend**: [NestJS](https://nestjs.com/) with modular structure, DTO validation, and in-memory SQLite for demo.
- **Frontend**: [Next.js](https://nextjs.org/) with Redux Toolkit, i18next, and Tailwind CSS for styling.

---

## Prerequisites

- **Node.js** version **22** is required.
- Docker (optional, for containerized setup).
- (Frontend only) Ensure `NODE_OPTIONS` is unset:
  ```bash
  unset NODE_OPTIONS
  ```

---

## Getting Started

### Local Development

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd coding-test-packative
   ```

2. **Prepare environment variables:**

   - Copy the frontend template and adjust as needed:
     ```bash
     cp frontend/.env.tpl frontend/.env
     ```

3. **Install dependencies:**

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. **Start the backend:**

   ```bash
   cd backend
   npm start
   # API available at http://localhost:3001
   ```

5. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   # App available at http://localhost:3000
   ```

---

### Running with Docker

1. **Copy environment file:**

   ```bash
   cp frontend/.env.tpl frontend/.env
   ```

2. **Build and start all services:**
   ```bash
   docker compose build && docker compose up
   ```

- Backend: [http://localhost:3001](http://localhost:3001)
- Frontend: [http://localhost:3000](http://localhost:3000)

---

## Authentication & Authorization

Two user accounts are hardcoded for testing:

| Username | Password | Permissions           |
| -------- | -------- | --------------------- |
| admin    | admin    | Can create blog posts |
| john     | doe      | Read-only access      |

- **Authentication**: Pass credentials via login form; session is stored in Redux and persisted.
- **Authorization**: Backend checks permissions via a custom header format (`Authorization: userId:...;permissions:...`).

---

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── blog/           # Blog module (controller, service, repo, DTOs)
│   │   └── shared/         # Auth/permission guards, decorators
│   ├── test/               # E2E and helper tests
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js app directory (pages, layouts, blog)
│   │   ├── shared/         # Redux provider, layout, auth HOC
│   │   └── store/          # Redux slices
│   ├── public/locales/     # i18n translations
│   └── ...
└── docker-compose.yml
```

---

## Scripts

### Backend

- `npm start` - Start NestJS server
- `npm run build` - Build backend
- `npm run test:unit` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

### Frontend

- `npm run dev` - Start Next.js in dev mode
- `npm run build` - Build frontend
- `npm run start` - Start production server
- `npm run test:unit` - Run Jest unit tests
- `npm run test:e2e` - Run Playwright E2E tests

---

## Testing

- **Backend**: Uses Jest for unit and e2e tests ([test/blog.e2e-spec.ts](backend/test/blog.e2e-spec.ts)).
- **Frontend**: Uses Jest for unit tests and Playwright for E2E ([test/e2e-tests/blog.e2e-spec.ts](frontend/test/e2e-tests/blog.e2e-spec.ts)).

To run all tests locally:

```bash
# Backend
cd backend
npm run test:unit
npm run test:e2e

# Frontend
cd ../frontend
npm run test:unit
npm run test:e2e
```

---

## Environment Variables

See [frontend/.env.tpl](frontend/.env.tpl) for required variables:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001/blog"
E2E_USERNAME=admin
E2E_PASSWORD=admin
E2E_BASE_URL=http://localhost:3000
```

---

## API Documentation

- **Swagger UI** is available at [http://localhost:3001/api](http://localhost:3001/api) when the backend is running.
- All endpoints are documented with request/response schemas and error codes.

---

## Deployment

- **Docker Compose** is provided for local or production-like deployment.
- For production, ensure environment variables and secrets are managed securely.

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Playwright](https://playwright.dev/)
- [Jest](https://jestjs.io/)
- [Swagger](https://swagger.io/tools/swagger-ui/)

---

## License

This project is for demonstration and coding test purposes.  
See individual package.json files for license details.

---
