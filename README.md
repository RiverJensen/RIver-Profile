# River Profile

A personal portfolio website featuring a coin flip game with score tracking, built with React, Express, and PostgreSQL.

## Features

- Personal portfolio showcasing projects and information
- Interactive coin flip game with high score tracking
- User scoreboard with rankings
- Modern React frontend with Vite
- Express.js backend API
- PostgreSQL database with Sequelize ORM

## Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Sequelize ORM
- **Styling**: CSS, Bootstrap

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Quick Start

**First time setup (run these commands ONE AT A TIME):**

```bash
npm install
```

```bash
cp .env.example .env
```
*(Then edit `.env` file with your settings)*

```bash
npm run seed
```

**Then start everything with one command:**

```bash
npm start
```

This will launch both the backend server and frontend development server simultaneously.

Then open `http://localhost:5173` (or the port Vite shows) in your browser.

---

**After initial setup, just run:**
```bash
npm start
```
This runs both backend and frontend servers at once.

> **Note:** Don't copy-paste multiple commands at once! Run each command separately. The `#` comments in code blocks are for documentation only - don't include them when running commands.

## Setup Instructions (Detailed)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RiverProfile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This installs all required packages listed in `package.json`.

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update the following:
   - `DATABASE_URL`: Your PostgreSQL connection string (default: `postgresql:///riverproject_db`)
   - `SESSION_SECRET`: A secure random string for session encryption
   - `PORT`: Server port (default: 1088)

4. **Create and seed the database**
   ```bash
   npm run seed
   ```
   This will:
   - Drop and recreate the database
   - Run migrations
   - Seed initial data

5. **Start the application**
   ```bash
   npm start
   ```
   This will start both the backend server (port 1088) and the frontend dev server (port 5173).

## Available Scripts

- `npm start` - Start both backend and frontend servers concurrently
- `npm run server` - Start Express server only (backend)
- `npm run dev` - Start Vite development server only (frontend)
- `npm run seed` - Drop, create, and seed the database
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Checking for Package Updates

### Check which packages are outdated:
```bash
npm outdated
```
This shows packages that have newer versions available.

### Check for security vulnerabilities:
```bash
npm audit
```

### Fix security vulnerabilities (recommended first step):
```bash
npm audit fix
```
This automatically fixes vulnerabilities that don't require breaking changes.

### If vulnerabilities remain after `npm audit fix`:
```bash
npm audit fix --force
```
⚠️ **Warning:** This may update packages to versions with breaking changes. Test your app thoroughly after running this.

### Update all packages to latest versions (use with caution):
```bash
npm update
```

### Update a specific package:
```bash
npm install package-name@latest
```

### Check package versions:
```bash
npm list
# or for a specific package:
npm list package-name
```

**When to update:**
- Run `npm outdated` monthly to check for updates
- Run `npm audit` regularly to check for security issues
- Update packages when:
  - Security vulnerabilities are found (start with `npm audit fix`)
  - You need new features from newer versions
  - Dependencies are significantly outdated
- **Test thoroughly** after updating packages, especially major version updates

**After `npm install`, if you see vulnerabilities:**
1. First try: `npm audit fix` (safe, non-breaking fixes)
2. If issues remain: `npm audit` to see details
3. If needed: `npm audit fix --force` (may have breaking changes - test after!)
4. For development projects, vulnerabilities in dev dependencies are usually less critical

## Project Structure

```
RiverProfile/
├── database/          # Database models, queries, and migrations
├── server/            # Express server and API routes
├── src/               # React frontend
│   ├── components/    # React components
│   ├── css/          # Stylesheets
│   └── assets/       # Images and static files
└── public/           # Public static files
```

## API Endpoints

- `POST /addUser` - Add a new user with username and score
- `GET /getUserInfo` - Get all users sorted by score

## Environment Variables

See `.env.example` for required environment variables.

## Development Notes

- The database uses Sequelize ORM for PostgreSQL
- Session management is handled by express-session
- Frontend and backend run on separate ports during development:
  - Backend: `http://localhost:1088` (or your PORT env variable)
  - Frontend: `http://localhost:5173` (Vite default)
- Vite Express integrates both for seamless development
- Use `npm start` to run both simultaneously (via concurrently)

## Troubleshooting

### "Cannot find module" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database connection errors
- Make sure PostgreSQL is running
- Check your `DATABASE_URL` in `.env`
- Verify the database exists: `psql -l`

### Port already in use
- Change the `PORT` in your `.env` file
- Or kill the process using the port

### Packages seem outdated
- Run `npm outdated` to check
- Run `npm update` to update (test after updating!)

## License

MIT
