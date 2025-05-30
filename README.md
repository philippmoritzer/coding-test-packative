### Note

The version after the coding test can be found in the branch after-interview.
Main is now the branch for the version with changes made to refactor and better the
software but also to learn react.

## Coding Test Packative

- This project consists of a **backend** built with NestJS and a **frontend** built with Next.js/React.

- Redux is just for experimenting purposes

## Prerequisites

- Node.js version **22** is required.
- Ensure `NODE_OPTIONS` is unset for the frontend to run:
  ```bash
  $ unset NODE_OPTIONS
  ```

## Running the project

For local development, rename ./frontend/.env.tpl to .env

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

Rename ./frontend/.env.tpl to .env and run:

```bash
    $ docker compose build && docker compose up
```
