import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = {
  // Tasks
  async getTasks() {
    const response = await apiClient.get('/tasks')
    return response.data
  },

  async getTask(id: number) {
    const response = await apiClient.get(`/tasks/${id}`)
    return response.data
  },

  async createTask(task: any) {
    const response = await apiClient.post('/tasks', task)
    return response.data
  },

  async updateTask(id: number, task: any) {
    const response = await apiClient.put(`/tasks/${id}`, task)
    return response.data
  },

  async deleteTask(id: number) {
    await apiClient.delete(`/tasks/${id}`)
  },

  // Goals
  async getGoals() {
    const response = await apiClient.get('/goals')
    return response.data
  },

  async getGoal(id: string) {
    const response = await apiClient.get(`/goals/${id}`)
    return response.data
  },

  async createGoal(goal: any) {
    const response = await apiClient.post('/goals', goal)
    return response.data
  },

  async updateGoal(id: string, goal: any) {
    const response = await apiClient.put(`/goals/${id}`, goal)
    return response.data
  },

  async deleteGoal(id: string) {
    await apiClient.delete(`/goals/${id}`)
  },

  async getRandomQuote() {
    const response = await apiClient.get('/goals/quote')
    return response.data
  },

  // Timers
  async getTimers() {
    const response = await apiClient.get('/timers')
    return response.data
  },

  async getTimer(id: string) {
    const response = await apiClient.get(`/timers/${id}`)
    return response.data
  },

  async createTimer(timer: any) {
    const response = await apiClient.post('/timers', timer)
    return response.data
  },

  async updateTimer(id: string, timer: any) {
    const response = await apiClient.put(`/timers/${id}`, timer)
    return response.data
  },

  async deleteTimer(id: string) {
    await apiClient.delete(`/timers/${id}`)
  },

  async startTimer(id: string) {
    const response = await apiClient.post(`/timers/${id}/start`)
    return response.data
  },

  async stopTimer(id: string) {
    const response = await apiClient.post(`/timers/${id}/stop`)
    return response.data
  }
}

