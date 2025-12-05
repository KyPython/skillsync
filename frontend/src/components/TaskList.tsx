import { useState } from 'react'
import { Task } from '../App'
import { api } from '../services/api'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
  onCreateTask: (task: Partial<Task>) => Promise<void>
  onRefresh: () => void
}

export function TaskList({ tasks, onCreateTask, onRefresh }: TaskListProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'NOT_STARTED' as const,
    priority: 'MEDIUM' as const,
    dueDate: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onCreateTask({
      ...formData,
      dueDate: formData.dueDate || undefined
    })
    setFormData({ title: '', description: '', status: 'NOT_STARTED', priority: 'MEDIUM', dueDate: '' })
    setShowForm(false)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete this task?')) {
      await api.deleteTask(id)
      onRefresh()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '#4caf50'
      case 'IN_PROGRESS': return '#2196f3'
      default: return '#ff9800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return '#f44336'
      case 'MEDIUM': return '#ff9800'
      default: return '#4caf50'
    }
  }

  return (
    <div className="task-list">
      <div className="task-header">
        <h2>Tasks</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            placeholder="Task title"
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
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option value="NOT_STARTED">Not Started</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
            >
              <option value="LOW">Low Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="HIGH">High Priority</option>
            </select>
          </div>
          <input
            type="datetime-local"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
          <button type="submit" className="btn-primary">Create Task</button>
        </form>
      )}

      <div className="tasks-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-header-card">
              <h3>{task.title}</h3>
              <button onClick={() => handleDelete(task.id)} className="btn-delete">×</button>
            </div>
            {task.description && <p className="task-description">{task.description}</p>}
            <div className="task-badges">
              <span className="badge" style={{ backgroundColor: getStatusColor(task.status) }}>
                {task.status.replace('_', ' ')}
              </span>
              <span className="badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                {task.priority}
              </span>
            </div>
            {task.dueDate && (
              <small className="task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</small>
            )}
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="empty-state">No tasks yet. Create your first task!</p>
        )}
      </div>
    </div>
  )
}

