const API_URL = 'http://climate-management-system-final.onrender.com/api/auth';

export async function login(
  email: string,
  password: string
): Promise<boolean> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) return false

  const data = await response.json()
  localStorage.setItem('token', data.token)

  return true
}

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export function isLoggedIn(): boolean {
  return !!getToken()
}

export function logout(): void {
  localStorage.removeItem('token')
}