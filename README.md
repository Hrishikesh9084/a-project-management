# Trello Clone - Next.js + Express

This is a full-stack project management tool similar to Trello, built with Next.js for the frontend and Express.js for the backend.

## Features

- Kanban-style board with lists and cards
- Drag-and-drop functionality for cards within and between lists
- Clean, responsive UI built with Tailwind CSS
- RESTful API backend to manage board state

## Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS, react-beautiful-dnd
- **Backend**: Node.js, Express.js
- **Monorepo Management**: npm workspaces, concurrently

## Prerequisites

- Node.js (v18 or later recommended)
- npm

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd trello-clone-nextjs-express
    ```

2.  **Install dependencies for all workspaces:**

    This command will install dependencies for the root, `client`, and `server` packages.

    ```bash
    npm install
    ```

3.  **Run the development servers:**

    This will start both the backend Express server (on `http://localhost:3001`) and the frontend Next.js server (on `http://localhost:3000`) concurrently.

    ```bash
    npm run dev
    ```

4.  **Open the application:**

    Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
.
├── client/         # Next.js frontend
├── server/         # Express.js backend
├── .gitignore
├── package.json
└── README.md
```

## Available Scripts

- `npm install`: Installs all dependencies in all workspaces.
- `npm run dev`: Starts both frontend and backend development servers.
- `npm run build`: Builds the Next.js application for production.
- `npm run start`: Starts the production servers for both frontend and backend.

## API Endpoints

The backend server exposes the following endpoints under the `/api` prefix:

- `GET /api/health`: Health check endpoint.
- `GET /api/board`: Fetches the entire board data (lists and cards).
- `POST /api/cards`: Adds a new card to a list.
- `PUT /api/cards/move`: Updates card positions after a drag-and-drop action.
