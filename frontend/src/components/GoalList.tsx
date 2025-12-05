import { useState, useEffect } from 'react'
import { Goal } from '../App'
import { api } from '../services/api'
import './GoalList.css'

interface GoalListProps {
  goals: Goal[]
  onCreateGoal: (goal: Partial<Goal>) => Promise<void>
  onRefresh: () => void
}

export function GoalList({ goals, onCreateGoal, onRefresh }: GoalListProps) {
  const [showForm, setShowForm] = useState(false)
  const [quote, setQuote] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'ACTIVE' as const,
    progress: 0,
    category: '',
    targetDate: ''
  })

  useEffect(() => {
    loadQuote()
  }, [])

  const loadQuote = async () => {
    try {
      const q = await api.getRandomQuote()
      setQuote(q)
    } catch (error) {
      console.error('Error loading quote:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onCreateGoal({
      ...formData,
      targetDate: formData.targetDate || undefined,
      progress: parseInt(formData.progress.toString())
    })
    setFormData({ title: '', description: '', status: 'ACTIVE', progress: 0, category: '', targetDate: '' })
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this goal?')) {
      await api.deleteGoal(id)
      onRefresh()
    }
  }

  return (
    <div className="goal-list">
      <div className="goal-header">
        <h2>Learning Goals</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Goal'}
        </button>
      </div>

      {quote && (
        <div className="quote-card">
          <p className="quote-text">"{quote.text}"</p>
          {quote.author && <p className="quote-author">— {quote.author}</p>}
          <button onClick={loadQuote} className="btn-quote">New Quote</button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="goal-form">
          <input
            type="text"
            placeholder="Goal title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div className="form-row">
            <input
              type="number"
              placeholder="Progress (0-100)"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>
          <input
            type="date"
            value={formData.targetDate}
            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
          />
          <button type="submit" className="btn-primary">Create Goal</button>
        </form>
      )}

      <div className="goals-grid">
        {goals.map(goal => (
          <div key={goal.id} className="goal-card">
            <div className="goal-header-card">
              <h3>{goal.title}</h3>
              <button onClick={() => handleDelete(goal.id!)} className="btn-delete">×</button>
            </div>
            {goal.description && <p className="goal-description">{goal.description}</p>}
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${goal.progress}%` }}>
                {goal.progress}%
              </div>
            </div>
            <div className="goal-meta">
              <span className={`status-badge status-${goal.status.toLowerCase()}`}>
                {goal.status}
              </span>
              {goal.category && <span className="category-badge">{goal.category}</span>}
            </div>
            {goal.targetDate && (
              <small className="goal-target">Target: {new Date(goal.targetDate).toLocaleDateString()}</small>
            )}
          </div>
        ))}
        {goals.length === 0 && (
          <p className="empty-state">No goals yet. Set your first learning goal!</p>
        )}
      </div>
    </div>
  )
}

