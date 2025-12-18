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

      // Determinar role baseado no email (temporário)
      let role = 'STUDENT';
      if (email === 'admin@escola.com') {
        role = 'ADMIN';
      } else if (email.includes('secretary')) {
        role = 'SECRETARY';
      } else if (email.includes('teacher')) {
        role = 'TEACHER';
      }

      // Criar objeto de usuário simplificado
      const userData = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || 'Usuário',
        role: role,
        active: true
      };

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
        options: {
          data: {
            name: name
          }
        }
      });

      if (error) {
        return res.status(400).json({
          success: false,
          error: { message: error.message }
        });
      }

      // Criar objeto de usuário simplificado
      const userData = {
        id: data.user?.id,
        email,
        name,
        role,
        active: true
      };

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

      // Determinar role baseado no email (temporário)
      let role = 'STUDENT';
      if (user.email === 'admin@escola.com') {
        role = 'ADMIN';
      } else if (user.email?.includes('secretary')) {
        role = 'SECRETARY';
      } else if (user.email?.includes('teacher')) {
        role = 'TEACHER';
      }

      const userData = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || 'Usuário',
        role: role,
        active: true
      };

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

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        return res.status(400).json({
          success: false,
          error: { message: error.message }
        });
      }

      res.json({
        success: true,
        message: 'Email de recuperação enviado'
      });

    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Erro interno do servidor' }
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, password } = req.body;

      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        return res.status(400).json({
          success: false,
          error: { message: error.message }
        });
      }

      res.json({
        success: true,
        message: 'Senha alterada com sucesso'
      });

    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Erro interno do servidor' }
      });
    }
  }
}

export const authController = new AuthController();
