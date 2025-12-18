# Microsserviço de Autenticação - Implementação de Referência

## 🏗️ **Estrutura do Auth Service**

```
auth-service/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   └── tenant.model.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── jwt.service.ts
│   │   └── tenant.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── tenant.middleware.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── user.routes.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   └── errors.ts
│   └── app.ts
├── tests/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## 📝 **Implementação dos Componentes Principais**

### **1. Tenant Middleware (Multi-tenancy)**

```typescript
// src/middleware/tenant.middleware.ts
import { Request, Response, NextFunction } from 'express'
import { TenantService } from '../services/tenant.service'

export interface TenantRequest extends Request {
  tenant?: {
    id: string
    name: string
    subdomain: string
    active: boolean
  }
}

export const tenantMiddleware = async (
  req: TenantRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let tenantId: string | null = null

    // 1. Verificar header X-Tenant-ID
    tenantId = req.headers['x-tenant-id'] as string

    // 2. Extrair do subdomínio
    if (!tenantId) {
      const host = req.get('host')
      if (host) {
        const subdomain = host.split('.')[0]
        if (subdomain && subdomain !== 'www' && subdomain !== 'api') {
          const tenant = await TenantService.findBySubdomain(subdomain)
          tenantId = tenant?.id
        }
      }
    }

    // 3. Verificar se tenant existe e está ativo
    if (!tenantId) {
      return res.status(400).json({
        error: 'Tenant não identificado',
        code: 'TENANT_NOT_FOUND'
      })
    }

    const tenant = await TenantService.findById(tenantId)
    if (!tenant || !tenant.active) {
      return res.status(403).json({
        error: 'Tenant inválido ou inativo',
        code: 'TENANT_INVALID'
      })
    }

    req.tenant = tenant
    next()
  } catch (error) {
    console.error('Erro no tenant middleware:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    })
  }
}
```

### **2. Auth Controller**

```typescript
// src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { TenantRequest } from '../middleware/tenant.middleware'
import { loginValidator, registerValidator } from '../utils/validators'

export class AuthController {
  static async login(req: TenantRequest, res: Response) {
    try {
      const { error } = loginValidator.validate(req.body)
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
          code: 'VALIDATION_ERROR'
        })
      }

      const { email, password } = req.body
      const tenantId = req.tenant!.id

      const result = await AuthService.login(email, password, tenantId)

      if (!result.success) {
        return res.status(401).json({
          error: result.message,
          code: 'AUTH_FAILED'
        })
      }

      // Set secure cookie
      res.cookie('auth_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'strict'
      })

      res.json({
        success: true,
        user: result.user,
        token: result.token,
        expiresIn: result.expiresIn
      })
    } catch (error) {
      console.error('Erro no login:', error)
      res.status(500).json({
        error: 'Erro interno do servidor',
        code: 'INTERNAL_ERROR'
      })
    }
  }

  static async register(req: TenantRequest, res: Response) {
    try {
      const { error } = registerValidator.validate(req.body)
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
          code: 'VALIDATION_ERROR'
        })
      }

      const { email, password, role, personData } = req.body
      const tenantId = req.tenant!.id

      const result = await AuthService.register({
        email,
        password,
        role,
        personData,
        tenantId
      })

      if (!result.success) {
        return res.status(400).json({
          error: result.message,
          code: 'REGISTRATION_FAILED'
        })
      }

      res.status(201).json({
        success: true,
        user: result.user,
        message: 'Usuário criado com sucesso'
      })
    } catch (error) {
      console.error('Erro no registro:', error)
      res.status(500).json({
        error: 'Erro interno do servidor',
        code: 'INTERNAL_ERROR'
      })
    }
  }

  static async refreshToken(req: TenantRequest, res: Response) {
    try {
      const authHeader = req.headers.authorization
      const token = authHeader?.split(' ')[1]

      if (!token) {
        return res.status(401).json({
          error: 'Token não fornecido',
          code: 'TOKEN_MISSING'
        })
      }

      const result = await AuthService.refreshToken(token, req.tenant!.id)

      if (!result.success) {
        return res.status(401).json({
          error: result.message,
          code: 'TOKEN_INVALID'
        })
      }

      res.json({
        success: true,
        token: result.token,
        expiresIn: result.expiresIn
      })
    } catch (error) {
      console.error('Erro no refresh token:', error)
      res.status(500).json({
        error: 'Erro interno do servidor',
        code: 'INTERNAL_ERROR'
      })
    }
  }

  static async logout(req: TenantRequest, res: Response) {
    try {
      res.clearCookie('auth_token')
      res.json({
        success: true,
        message: 'Logout realizado com sucesso'
      })
    } catch (error) {
      console.error('Erro no logout:', error)
      res.status(500).json({
        error: 'Erro interno do servidor',
        code: 'INTERNAL_ERROR'
      })
    }
  }

  static async profile(req: TenantRequest, res: Response) {
    try {
      const userId = (req as any).user.id
      const tenantId = req.tenant!.id

      const user = await AuthService.getUserProfile(userId, tenantId)

      if (!user) {
        return res.status(404).json({
          error: 'Usuário não encontrado',
          code: 'USER_NOT_FOUND'
        })
      }

      res.json({
        success: true,
        user
      })
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      res.status(500).json({
        error: 'Erro interno do servidor',
        code: 'INTERNAL_ERROR'
      })
    }
  }
}
```

### **3. JWT Service**

```typescript
// src/services/jwt.service.ts
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'

export interface JWTPayload {
  userId: string
  tenantId: string
  role: string
  email: string
}

export class JWTService {
  private static readonly secret = process.env.JWT_SECRET || 'fallback-secret'
  private static readonly expiresIn = process.env.JWT_EXPIRES_IN || '7d'

  static generateToken(user: User, tenantId: string): string {
    const payload: JWTPayload = {
      userId: user.id,
      tenantId,
      role: user.role,
      email: user.email
    }

    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
      issuer: 'sistema-municipal-ensino',
      audience: tenantId
    })
  }

  static verifyToken(token: string, tenantId?: string): JWTPayload | null {
    try {
      const payload = jwt.verify(token, this.secret, {
        issuer: 'sistema-municipal-ensino',
        audience: tenantId
      }) as JWTPayload

      return payload
    } catch (error) {
      console.error('Erro ao verificar JWT:', error)
      return null
    }
  }

  static refreshToken(oldToken: string, tenantId: string): string | null {
    try {
      const payload = this.verifyToken(oldToken, tenantId)
      if (!payload) return null

      // Criar novo token com mesmo payload
      return jwt.sign(
        {
          userId: payload.userId,
          tenantId: payload.tenantId,
          role: payload.role,
          email: payload.email
        },
        this.secret,
        {
          expiresIn: this.expiresIn,
          issuer: 'sistema-municipal-ensino',
          audience: tenantId
        }
      )
    } catch (error) {
      console.error('Erro ao renovar JWT:', error)
      return null
    }
  }

  static getTokenExpiration(): number {
    // Retorna em segundos
    const duration = this.expiresIn
    if (duration.endsWith('d')) {
      return parseInt(duration) * 24 * 60 * 60
    } else if (duration.endsWith('h')) {
      return parseInt(duration) * 60 * 60
    } else if (duration.endsWith('m')) {
      return parseInt(duration) * 60
    }
    return 7 * 24 * 60 * 60 // 7 dias padrão
  }
}
```

### **4. Database Models**

```typescript
// src/models/user.model.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface User {
  id: string
  email: string
  role: 'ADMIN' | 'SECRETARY' | 'TEACHER' | 'STUDENT' | 'PARENT' | 'NUTRITIONIST'
  active: boolean
  tenantId: string
  personId?: string
  createdAt: Date
  updatedAt: Date
  person?: {
    id: string
    name: string
    cpf: string
    phone?: string
  }
}

export class UserModel {
  static async findByEmail(email: string, tenantId: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        email,
        tenantId,
        active: true
      },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            cpf: true,
            phone: true
          }
        }
      }
    })
  }

  static async findById(id: string, tenantId: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        id,
        tenantId,
        active: true
      },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            cpf: true,
            phone: true
          }
        }
      }
    })
  }

  static async create(userData: {
    email: string
    passwordHash: string
    role: string
    tenantId: string
    personId?: string
  }): Promise<User> {
    return await prisma.user.create({
      data: userData,
      include: {
        person: {
          select: {
            id: true,
            name: true,
            cpf: true,
            phone: true
          }
        }
      }
    })
  }

  static async updateLastLogin(id: string, tenantId: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
        tenantId
      },
      data: {
        lastLoginAt: new Date()
      }
    })
  }
}
```

### **5. Docker Configuration**

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  auth-service:
    build: .
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@auth-db:5432/auth_service
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=super-secret-jwt-key
    depends_on:
      - auth-db
      - redis
    networks:
      - auth-network

  auth-db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=auth_service
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - auth_db_data:/var/lib/postgresql/data
    networks:
      - auth-network

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - auth-network

volumes:
  auth_db_data:
  redis_data:

networks:
  auth-network:
```

## 🔄 **Comunicação Entre Serviços**

### **Service-to-Service Authentication**

```typescript
// src/middleware/service-auth.middleware.ts
export const serviceAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const serviceToken = req.headers['x-service-token']
  const serviceId = req.headers['x-service-id']

  if (!serviceToken || !serviceId) {
    return res.status(401).json({ error: 'Service authentication required' })
  }

  // Verificar se o serviço está autorizado
  const isValidService = ServiceRegistry.validateService(serviceId as string, serviceToken as string)
  
  if (!isValidService) {
    return res.status(403).json({ error: 'Service not authorized' })
  }

  (req as any).serviceId = serviceId
  next()
}
```

## 📊 **Métricas e Observabilidade**

```typescript
// src/middleware/metrics.middleware.ts
import prometheus from 'prom-client'

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'tenant_id', 'status_code']
})

const httpRequestsTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'tenant_id', 'status_code']
})

export const metricsMiddleware = (req: TenantRequest, res: Response, next: NextFunction) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000
    const labels = {
      method: req.method,
      route: req.route?.path || req.path,
      tenant_id: req.tenant?.id || 'unknown',
      status_code: res.statusCode.toString()
    }

    httpRequestDuration.observe(labels, duration)
    httpRequestsTotal.inc(labels)
  })

  next()
}
```

---

**Este microsserviço de autenticação serve como base para toda a arquitetura distribuída, fornecendo autenticação segura, multi-tenancy e observabilidade desde o início!** 🔐
