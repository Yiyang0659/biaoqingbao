import { useState, useEffect } from 'react'
import type { User, AuthState } from '../types/auth'

// 模拟认证hook，后续会替换为真实API调用
export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟检查本地存储中的用户信息
    const storedUser = localStorage.getItem('meme_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse user data:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))

      // 模拟用户数据
      const mockUser: User = {
        id: '1',
        username: email.split('@')[0],
        email
      }

      setUser(mockUser)
      localStorage.setItem('meme_user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (username: string, email: string, _password: string) => {
    setIsLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))

      // 模拟用户数据
      const mockUser: User = {
        id: '1',
        username,
        email
      }

      setUser(mockUser)
      localStorage.setItem('meme_user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('meme_user')
  }

  return {
    user,
    isLoading,
    login,
    register,
    logout
  }
}