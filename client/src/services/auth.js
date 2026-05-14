import { users } from '../data/users';

export const authService = {
  login: async (email, password) => {
    await new Promise((r) => setTimeout(r, 600));
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    const { password: _, ...safeUser } = user;
    const token = btoa(JSON.stringify({ id: user.id, role: user.role, exp: Date.now() + 86400000 }));
    localStorage.setItem('ss_token', token);
    localStorage.setItem('ss_user', JSON.stringify(safeUser));
    return safeUser;
  },

  logout: () => {
    localStorage.removeItem('ss_token');
    localStorage.removeItem('ss_user');
  },

  getUser: () => {
    try {
      const raw = localStorage.getItem('ss_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  getToken: () => localStorage.getItem('ss_token'),

  isAuthenticated: () => {
    const token = localStorage.getItem('ss_token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  },
};
