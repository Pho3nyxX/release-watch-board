# Release Watch Board

Release Watch Board is a web-based movie and TV release tracking application that helps users monitor upcoming releases, view release statuses, and keep track of watched movies and episodes.

## Features

- Track movie releases
- Track TV series and episode releases
- Mark movies and episodes as watched or unwatched
- Search releases by title
- Filter by:
  - Movies
  - Series
  - Watched
  - Unwatched
  - Released
  - Releasing soon
  - Upcoming
- Sort releases by:
  - Earliest release
  - Latest release
  - Alphabetical order

## Tech Stack

- React
- Node.js
- Express
- node-cron
- PostgreSQL
- Playwright
- Node.js built-in test runner
- Playwright
- Supertest

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm
- PostgreSQL
- Git

**1. Clone the repository:**
```bash
git clone https://github.com/<your-username>/release-watch-board.git
```
**2. Navigate into the project folder:**
```bash
cd release-watch-board
```
**3. Create the PostgreSQL database:**   
```bash
createdb release_watch_board
```
**4. Configure the Backend:**   
Create a ```.env``` file inside the ```backend``` directory:
```bash
backend/.env
```
Add your PostgreSQL connection string:
```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/release_watch_board
PORT=3000
```
**5. Install backend dependencies:**   
```bash
cd backend
npm install
```
**5. Initialize the Database:**   
From the ```backend``` directory, run:
```bash
psql "$DATABASE_URL" -f src/db/schema.sql
```
**6. Start the Backend:**   
```bash
npm start
```
**7. Start the Frontend:**   
From another terminal:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the server
```bash
npm run dev
```

## Running Tests

### Backend Tests
From the backend directory:
```bash
npm test
```

### e2e Tests
**Note** The backend must be running before starting the E2E tests.
```bash
cd frontend
npm run test:e2e
```