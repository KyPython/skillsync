import { Task, Goal, Timer } from '../App'

interface DashboardStatsProps {
  tasks: Task[]
  goals: Goal[]
  timers: Timer[]
}

export function DashboardStats({ tasks, goals, timers }: DashboardStatsProps) {
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length
  const activeGoals = goals.filter(g => g.status === 'ACTIVE').length
  const runningTimers = timers.filter(t => t.status === 'RUNNING').length
  const totalProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
    : 0

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>{tasks.length}</h3>
        <p>Total Tasks</p>
        <small>{completedTasks} completed</small>
      </div>
      <div className="stat-card">
        <h3>{goals.length}</h3>
        <p>Learning Goals</p>
        <small>{activeGoals} active</small>
      </div>
      <div className="stat-card">
        <h3>{runningTimers}</h3>
        <p>Active Timers</p>
        <small>{timers.length} total</small>
      </div>
      <div className="stat-card">
        <h3>{totalProgress}%</h3>
        <p>Overall Progress</p>
        <small>Across all goals</small>
      </div>
    </div>
  )
}

