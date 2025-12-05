import { useState, useEffect } from 'react'
import './App.css'
import { TaskList } from './components/TaskList'
import { GoalList } from './components/GoalList'
import { TimerPanel } from './components/TimerPanel'
import { DashboardStats } from './components/DashboardStats'
import { api } from './services/api'

export interface Task {
  id: number
  title: string
  description?: string
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  dueDate?: string
  assigneeId?: number
  createdAt: string
  updatedAt: string
}

export interface Goal {
  id: string
  title: string
  description?: string
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED' | 'CANCELLED'
  progress: number
  targetDate?: string
  category?: string
  userId?: number
  createdAt: string
  updatedAt: string
}

export interface Timer {
  id: string
  title: string
  duration: number
  elapsed: number
  status: 'IDLE' | 'RUNNING' | 'PAUSED' | 'STOPPED'
  type: string
  userId?: number
  startedAt?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [timers, setTimers] = useState<Timer[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'tasks' | 'goals' | 'timers'>('tasks')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [tasksData, goalsData, timersData] = await Promise.all([
        api.getTasks(),
        api.getGoals(),
        api.getTimers()
      ])
      setTasks(tasksData)
      setGoals(goalsData)
      setTimers(timersData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTaskCreate = async (task: Partial<Task>) => {
    try {
      const newTask = await api.createTask(task as any)
      setTasks([...tasks, newTask])
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleGoalCreate = async (goal: Partial<Goal>) => {
    try {
      const newGoal = await api.createGoal(goal as any)
      setGoals([...goals, newGoal])
    } catch (error) {
      console.error('Error creating goal:', error)
    }
  }

  const handleTimerCreate = async (timer: Partial<Timer>) => {
    try {
      const newTimer = await api.createTimer(timer as any)
      setTimers([...timers, newTimer])
    } catch (error) {
      console.error('Error creating timer:', error)
    }
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading SkillSync Dashboard...</div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 SkillSync</h1>
        <p>Your Personal Productivity Dashboard</p>
      </header>

      <DashboardStats tasks={tasks} goals={goals} timers={timers} />

      <div className="tabs">
        <button
          className={activeTab === 'tasks' ? 'active' : ''}
          onClick={() => setActiveTab('tasks')}
        >
          📋 Tasks
        </button>
        <button
          className={activeTab === 'goals' ? 'active' : ''}
          onClick={() => setActiveTab('goals')}
        >
          🎯 Goals
        </button>
        <button
          className={activeTab === 'timers' ? 'active' : ''}
          onClick={() => setActiveTab('timers')}
        >
          ⏱️ Timers
        </button>
      </div>

      <main className="main-content">
        {activeTab === 'tasks' && (
          <TaskList tasks={tasks} onCreateTask={handleTaskCreate} onRefresh={loadData} />
        )}
        {activeTab === 'goals' && (
          <GoalList goals={goals} onCreateGoal={handleGoalCreate} onRefresh={loadData} />
        )}
        {activeTab === 'timers' && (
          <TimerPanel timers={timers} onCreateTimer={handleTimerCreate} onRefresh={loadData} />
        )}
      </main>
    </div>
  )
}

export default App

