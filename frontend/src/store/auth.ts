import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthService, User } from '../services/auth.service'
import { supabase } from '../config/supabase'

const authService = new AuthService()

interface AuthState {
  user: User | null
  session: any | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, role: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (email: string, password: string) => {
        try {
          console.log('🚀 Store: Iniciando login')
          set({ isLoading: true })
          const { user, session } = await authService.signIn(email, password)
          console.log('✅ Store: Login bem-sucedido', user)
          set({
            user,
            session,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          console.error('❌ Store: Erro no login', error)
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        try {
          await authService.signOut()
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          })
        } catch (error) {
          console.error('Erro no logout:', error)
        }
      },

      register: async (email: string, password: string, role: string) => {
        try {
          set({ isLoading: true })
          await authService.signUp(email, password, role)
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      resetPassword: async (email: string) => {
        try {
          await authService.resetPassword(email)
        } catch (error) {
          throw error
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true })
          const user = await authService.getCurrentUser()
          if (user) {
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            })
          }
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Configurar listener para mudanças de autenticação
supabase.auth.onAuthStateChange((event) => {
  const { checkAuth } = useAuthStore.getState()
  
  if (event === 'SIGNED_IN') {
    checkAuth()
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }
})
