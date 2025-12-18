import { supabase } from '../config/supabase'

export interface User {
  id: string
  email: string
  role: 'ADMIN' | 'SECRETARY' | 'TEACHER' | 'STUDENT' | 'PARENT' | 'NUTRITIONIST'
  person?: {
    id: string
    name: string
    cpf: string
  }
}

export class AuthService {
  async signIn(email: string, password: string) {
    try {
      console.log('🔐 Tentando login com:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('❌ Erro na autenticação:', error)
        throw error
      }

      console.log('✅ Autenticação Supabase sucesso:', data.user.id)

      // Buscar dados adicionais do usuário na tabela personalizada
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select(`
          *,
          person:people(*)
        `)
        .eq('id', data.user.id)
        .single()

      if (userError) {
        console.error('❌ Erro ao buscar dados do usuário:', userError)
        throw userError
      }

      console.log('✅ Dados do usuário encontrados:', userData)

      return {
        user: {
          id: data.user.id,
          email: data.user.email!,
          role: userData.role,
          person: userData.person
        } as User,
        session: data.session
      }
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  async signUp(email: string, password: string, role: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      // Criar registro na tabela personalizada de usuários
      if (data.user) {
        const { error: userError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              role: role,
            }
          ])

        if (userError) throw userError
      }

      return data
    } catch (error) {
      console.error('Erro no registro:', error)
      throw error
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Erro no logout:', error)
      throw error
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return null

      // Buscar dados adicionais do usuário
      const { data: userData, error } = await supabase
        .from('users')
        .select(`
          *,
          person:people(*)
        `)
        .eq('id', user.id)
        .single()

      if (error) throw error

      return {
        id: user.id,
        email: user.email!,
        role: userData.role,
        person: userData.person
      } as User
    } catch (error) {
      console.error('Erro ao buscar usuário atual:', error)
      return null
    }
  }

  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
    } catch (error) {
      console.error('Erro ao resetar senha:', error)
      throw error
    }
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
