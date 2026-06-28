import api from './client'

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
}

export const dashboardApi = {
  get: () => api.get('/dashboard'),
}

export const projectsApi = {
  list: () => api.get('/projects'),
  get: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
}

export const notificationsApi = {
  list: () => api.get('/notifications'),
  markRead: (id) => api.put(`/notifications/${id}`),
}

export const messagesApi = {
  send: (data) => api.post('/messages', data),
  getRoom: (roomId) => api.get(`/messages/${roomId}`),
}

export const usersApi = {
  list: (params) => api.get('/users', { params }),
  profile: () => api.get('/users/profile'),
  update: (data) => api.put('/users/profile', data),
  get: (id) => api.get(`/users/${id}`),
}

export const activitiesApi = {
  list: () => api.get('/activities'),
}

export const paymentsApi = {
  wallet: () => api.get('/payments/wallet'),
  transactions: () => api.get('/payments/transactions'),
}

export const startupsApi = {
  list: () => api.get('/startups'),
  get: (id) => api.get(`/startups/${id}`),
}

export const teamsApi = {
  list: () => api.get('/teams'),
  join: (teamId, role) => api.post(`/teams/join/${teamId}`, { role }),
}

export const filesApi = {
  list: (params) => api.get('/files', { params }),
}

export const meetingsApi = {
  list: () => api.get('/meeting'),
  get: (roomId) => api.get(`/meeting/${roomId}`),
}

export const recommendationsApi = {
  get: (projectId) => api.get(`/recommendations/${projectId}`),
}

export const aiApi = {
  projectAnalysis: (data) => api.post('/ai/project-analyzer', data),
  roadmap: (data) => api.post('/ai/roadmap', data),
}
