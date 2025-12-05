# SkillSync Frontend

React + TypeScript frontend for the SkillSync productivity dashboard.

## Tech Stack

- **React 18**
- **TypeScript**
- **Vite** (build tool)
- **Axios** (HTTP client)

## Features

- Dashboard with statistics
- Task management (CRUD)
- Goal tracking with progress bars
- Timer/Pomodoro functionality
- Motivational quotes
- Responsive design

## Running the Frontend

### Prerequisites
- Node.js 18+
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## Environment Variables

Create a `.env` file:
```
VITE_API_URL=http://localhost:3000/api
```

## Project Structure

```
src/
  ├── components/      # React components
  │   ├── TaskList.tsx
  │   ├── GoalList.tsx
  │   ├── TimerPanel.tsx
  │   └── DashboardStats.tsx
  ├── services/       # API service layer
  │   └── api.ts
  ├── App.tsx         # Main app component
  ├── main.tsx        # Entry point
  └── index.css       # Global styles
```

