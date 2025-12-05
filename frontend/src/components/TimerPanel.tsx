import { useState } from 'react'
import { Timer } from '../App'
import { api } from '../services/api'
import './TimerPanel.css'

interface TimerPanelProps {
  timers: Timer[]
  onCreateTimer: (timer: Partial<Timer>) => Promise<void>
  onRefresh: () => void
}

export function TimerPanel({ timers, onCreateTimer, onRefresh }: TimerPanelProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    duration: 25,
    type: 'POMODORO'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onCreateTimer(formData)
    setFormData({ title: '', duration: 25, type: 'POMODORO' })
    setShowForm(false)
  }

  const handleStart = async (id: string) => {
    await api.startTimer(id)
    onRefresh()
  }

  const handleStop = async (id: string) => {
    await api.stopTimer(id)
    onRefresh()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this timer?')) {
      await api.deleteTimer(id)
      onRefresh()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer-panel">
      <div className="timer-header">
        <h2>Time Tracking</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Timer'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="timer-form">
          <input
            type="text"
            placeholder="Timer title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <div className="form-row">
            <input
              type="number"
              placeholder="Duration (minutes)"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 25 })}
              required
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="POMODORO">Pomodoro</option>
              <option value="CUSTOM">Custom</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Create Timer</button>
        </form>
      )}

      <div className="timers-grid">
        {timers.map(timer => (
          <div key={timer.id} className={`timer-card ${timer.status.toLowerCase()}`}>
            <div className="timer-header-card">
              <h3>{timer.title}</h3>
              <button onClick={() => handleDelete(timer.id)} className="btn-delete">×</button>
            </div>
            <div className="timer-display">
              <div className="timer-time">
                {formatTime(timer.elapsed)} / {timer.duration}:00
              </div>
              <div className="timer-progress">
                <div
                  className="timer-progress-bar"
                  style={{ width: `${Math.min((timer.elapsed / (timer.duration * 60)) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div className="timer-actions">
              {timer.status === 'RUNNING' ? (
                <button onClick={() => handleStop(timer.id)} className="btn-stop">
                  ⏸ Stop
                </button>
              ) : (
                <button onClick={() => handleStart(timer.id)} className="btn-start">
                  ▶ Start
                </button>
              )}
            </div>
            <div className="timer-meta">
              <span className={`status-badge status-${timer.status.toLowerCase()}`}>
                {timer.status}
              </span>
              <span className="type-badge">{timer.type}</span>
            </div>
          </div>
        ))}
        {timers.length === 0 && (
          <p className="empty-state">No timers yet. Create your first timer!</p>
        )}
      </div>
    </div>
  )
}

