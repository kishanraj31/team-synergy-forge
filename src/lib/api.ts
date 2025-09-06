const API_BASE_URL = 'http://localhost:3002';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: {
    email: string;
    password: string;
  }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Project endpoints
  async createProject(projectData: {
    name: string;
    description?: string;
  }) {
    return this.request('/api/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async getProjects() {
    return this.request('/api/projects');
  }

  async getProject(id: string) {
    return this.request(`/api/projects/${id}`);
  }

  async addProjectMember(projectId: string, email: string) {
    return this.request(`/api/projects/${projectId}/members`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async deleteProject(projectId: string) {
    return this.request(`/api/projects/${projectId}`, {
      method: 'DELETE',
    });
  }

  // Task endpoints
  async createTask(projectId: string, taskData: {
    title: string;
    description?: string;
    assignee?: string;
    dueDate?: string;
  }) {
    return this.request(`/api/tasks/projects/${projectId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async getProjectTasks(projectId: string) {
    return this.request(`/api/tasks/projects/${projectId}/tasks`);
  }

  async getProjectWithTasks(projectId: string) {
    return this.request(`/api/projects/${projectId}`);
  }

  async getMyTasks() {
    return this.request('/api/tasks/my-tasks');
  }

  async updateTask(taskId: string, taskData: {
    title?: string;
    description?: string;
    assignee?: string;
    dueDate?: string;
    status?: string;
  }) {
    return this.request(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(taskId: string) {
    return this.request(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  // Comment endpoints
  async createComment(projectId: string, commentData: {
    content: string;
    parentComment?: string;
  }) {
    return this.request(`/api/comments/projects/${projectId}/messages`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  async getProjectComments(projectId: string) {
    return this.request(`/api/comments/projects/${projectId}/messages`);
  }

  async getRecentComments(limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/api/comments/recent${params}`);
  }

  async updateComment(commentId: string, content: string) {
    return this.request(`/api/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deleteComment(commentId: string) {
    return this.request(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
export default apiService;
