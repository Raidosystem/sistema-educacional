import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Usar Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return res.status(401).json({
          success: false,
          error: { message: 'Credenciais inválidas' }
        });
      }

      const { user, session } = data;

      // Buscar dados do usuário na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError) {
        return res.status(500).json({
          success: false,
          error: { message: 'Erro ao buscar dados do usuário' }
        });
      }

      res.json({
        success: true,
        data: {
          user: userData,
          session: session,
          token: session?.access_token
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Erro interno do servidor' }
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, name, role = 'STUDENT' } = req.body;

      // Criar usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return res.status(400).json({
          success: false,
          error: { message: error.message }
        });
      }

      // Criar registro na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user?.id,
            email,
            name,
            role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (userError) {
        return res.status(500).json({
          success: false,
          error: { message: 'Erro ao criar usuário' }
        });
      }

      res.status(201).json({
        success: true,
        data: {
          user: userData,
          session: data.session
        }
      });

    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Erro interno do servidor' }
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return res.status(500).json({
          success: false,
          error: { message: 'Erro ao fazer logout' }
        });
      }

      res.json({
        success: true,
        message: 'Logout realizado com sucesso'
      });

    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Erro interno do servidor' }
      });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({
          success: false,
          error: { message: 'Token não fornecido' }
        });
      }

      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({
          success: false,
          error: { message: 'Token inválido' }
        });
      }

      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      res.json({
        success: true,
        data: { user: userData }
      });

    } catch (error) {
      console.error('Me error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Erro interno do servidor' }
      });
    }
  }
}

export const authController = new AuthController();
