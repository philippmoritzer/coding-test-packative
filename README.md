## Info

This project consists of a **backend** built with NestJS and a **frontend** built with Next.js.

### Backend

- Refactored backend code to better conform to clean architecture, changed naming.
- Switched database technology to SQLite with TypeORM.
- Added authorization and authentication guards.
- Added more input validation.
- Added some error handling.
- Added Swagger docs
- Added e2e tests.
- Added missing functions to like posts.

### Frontend

- Built a Next.js frontend with a login page and authentication.
- Added a blog page to display posts.
- Implemented functionality to create and like posts.
- Enhanced UI using Tailwind CSS.
- Code refactoring
- Added small component test

# Coding Test Packative

This project consists of a **backend** built with NestJS and a **frontend** built with Next.js.

## Prerequisites

- Node.js version **22** is required.
- Ensure `NODE_OPTIONS` is unset for the frontend to run:
  ```bash
  $ unset NODE_OPTIONS
  ```

## Running the project

```bash
#Backend
cd ./backend
npm start

#Frontend
cd ./frontend
npm run dev
```

## Authentication & Authorization

Two user accounts are hardcoded for testing:

| Username | Password | Permissions           |
| -------- | -------- | --------------------- |
| admin    | admin    | Can create blog posts |
| john     | doe      | Read-only access      |

## Running with docker

Might need to change requests paths to docker internal DNS

```bash
    $ docker compose build && docker compose up
```
