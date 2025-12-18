import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    personId?: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: 'Access denied. No token provided.' }
      });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid token' }
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
      email: user.email || '',
      role: role,
      active: true
    };

    if (!userData.active) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid token or user inactive.' }
      });
    }

    req.user = userData;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: { message: 'Invalid token.' }
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { message: 'Authentication required.' }
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { message: 'Access denied. Insufficient permissions.' }
      });
    }

    next();
  };
};
