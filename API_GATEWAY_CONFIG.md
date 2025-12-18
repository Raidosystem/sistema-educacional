# API Gateway - Kong Configuration

## 🚪 **Configuração do Kong API Gateway**

### **Estrutura de Roteamento**

```yaml
# kong.yml - Configuração declarativa
_format_version: "3.0"
_transform: true

services:
  # Auth Service
  - name: auth-service
    url: http://auth-service:3000
    protocol: http
    host: auth-service
    port: 3000
    path: /
    
  # Academic Service
  - name: academic-service
    url: http://academic-service:3000
    protocol: http
    host: academic-service
    port: 3000
    path: /

  # Queue Service
  - name: queue-service
    url: http://queue-service:3000
    protocol: http
    host: queue-service
    port: 3000
    path: /

  # Portal Service
  - name: portal-service
    url: http://portal-service:3000
    protocol: http
    host: portal-service
    port: 3000
    path: /

  # Meal Service
  - name: meal-service
    url: http://meal-service:3000
    protocol: http
    host: meal-service
    port: 3000
    path: /

routes:
  # Auth Routes
  - name: auth-login
    service: auth-service
    paths:
      - /api/auth/login
    methods:
      - POST

  - name: auth-register
    service: auth-service
    paths:
      - /api/auth/register
    methods:
      - POST

  - name: auth-profile
    service: auth-service
    paths:
      - /api/auth/profile
    methods:
      - GET

  - name: auth-refresh
    service: auth-service
    paths:
      - /api/auth/refresh
    methods:
      - POST

  # Academic Routes
  - name: students-api
    service: academic-service
    paths:
      - /api/students
    methods:
      - GET
      - POST
      - PUT
      - DELETE

  - name: teachers-api
    service: academic-service
    paths:
      - /api/teachers
    methods:
      - GET
      - POST
      - PUT
      - DELETE

  - name: classes-api
    service: academic-service
    paths:
      - /api/classes
    methods:
      - GET
      - POST
      - PUT
      - DELETE

  # Queue Routes
  - name: queue-api
    service: queue-service
    paths:
      - /api/queue
    methods:
      - GET
      - POST
      - PUT
      - DELETE

  # Portal Routes
  - name: portal-parent
    service: portal-service
    paths:
      - /api/portal/parent
    methods:
      - GET

  - name: portal-teacher
    service: portal-service
    paths:
      - /api/portal/teacher
    methods:
      - GET

  - name: portal-student
    service: portal-service
    paths:
      - /api/portal/student
    methods:
      - GET

  # Meal Routes
  - name: menu-api
    service: meal-service
    paths:
      - /api/menu
    methods:
      - GET
      - POST
      - PUT
      - DELETE

plugins:
  # CORS Global
  - name: cors
    config:
      origins:
        - "https://*.municipio.com.br"
        - "http://localhost:3000"
        - "http://localhost:5173"
      methods:
        - GET
        - POST
        - PUT
        - DELETE
        - OPTIONS
      headers:
        - Accept
        - Accept-Version
        - Content-Length
        - Content-MD5
        - Content-Type
        - Date
        - X-Auth-Token
        - X-Tenant-ID
      exposed_headers:
        - X-Auth-Token
      credentials: true
      max_age: 3600

  # Rate Limiting Global
  - name: rate-limiting
    config:
      minute: 100
      hour: 1000
      day: 10000
      policy: local
      fault_tolerant: true
      hide_client_headers: false

  # Request Size Limiting
  - name: request-size-limiting
    config:
      allowed_payload_size: 10

  # Authentication para rotas protegidas
  - name: jwt
    route: auth-profile
    config:
      secret_is_base64: false
      key_claim_name: iss
      claims_to_verify:
        - exp
        - iat

  - name: jwt
    route: students-api
    config:
      secret_is_base64: false
      key_claim_name: iss
      claims_to_verify:
        - exp
        - iat

  - name: jwt
    route: teachers-api
    config:
      secret_is_base64: false
      key_claim_name: iss
      claims_to_verify:
        - exp
        - iat

  - name: jwt
    route: classes-api
    config:
      secret_is_base64: false
      key_claim_name: iss
      claims_to_verify:
        - exp
        - iat

  - name: jwt
    route: queue-api
    config:
      secret_is_base64: false
      key_claim_name: iss
      claims_to_verify:
        - exp
        - iat

  - name: jwt
    route: portal-parent
    config:
      secret_is_base64: false
      key_claim_name: iss
      claims_to_verify:
        - exp
        - iat

  - name: jwt
    route: portal-teacher
    config:
      secret_is_base64: false
      key_claim_name: iss
      claims_to_verify:
        - exp
        - iat

  - name: jwt
    route: portal-student
    config:
      secret_is_base64: false
      key_claim_name: iss
      claims_to_verify:
        - exp
        - iat

  - name: jwt
    route: menu-api
    config:
      secret_is_base64: false
      key_claim_name: iss
      claims_to_verify:
        - exp
        - iat

consumers:
  - username: sistema-educacao
    jwt_secrets:
      - key: sistema-municipal-ensino
        secret: super-secret-jwt-key
```

### **Docker Compose para API Gateway**

```yaml
# docker-compose.gateway.yml
version: '3.8'

services:
  kong:
    image: kong:3.4-alpine
    environment:
      - KONG_DATABASE=off
      - KONG_DECLARATIVE_CONFIG=/kong/declarative/kong.yml
      - KONG_PROXY_ACCESS_LOG=/dev/stdout
      - KONG_ADMIN_ACCESS_LOG=/dev/stdout
      - KONG_PROXY_ERROR_LOG=/dev/stderr
      - KONG_ADMIN_ERROR_LOG=/dev/stderr
      - KONG_ADMIN_LISTEN=0.0.0.0:8001
      - KONG_ADMIN_GUI_URL=http://localhost:8002
      - KONG_ADMIN_GUI_LISTEN=0.0.0.0:8002
    ports:
      - "8000:8000"   # Proxy HTTP
      - "8443:8443"   # Proxy HTTPS
      - "8001:8001"   # Admin API HTTP
      - "8002:8002"   # Admin GUI
    volumes:
      - ./kong.yml:/kong/declarative/kong.yml:ro
    networks:
      - gateway-network
    healthcheck:
      test: ["CMD", "kong", "health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Prometheus para métricas
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
    networks:
      - gateway-network

  # Grafana para dashboards
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - gateway-network

networks:
  gateway-network:
    external: true

volumes:
  grafana_data:
```

### **Configuração de Prometheus**

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

scrape_configs:
  - job_name: 'kong'
    static_configs:
      - targets: ['kong:8001']
    metrics_path: '/metrics'

  - job_name: 'auth-service'
    static_configs:
      - targets: ['auth-service:3000']
    metrics_path: '/metrics'

  - job_name: 'academic-service'
    static_configs:
      - targets: ['academic-service:3000']
    metrics_path: '/metrics'

  - job_name: 'queue-service'
    static_configs:
      - targets: ['queue-service:3000']
    metrics_path: '/metrics'

  - job_name: 'portal-service'
    static_configs:
      - targets: ['portal-service:3000']
    metrics_path: '/metrics'

  - job_name: 'meal-service'
    static_configs:
      - targets: ['meal-service:3000']
    metrics_path: '/metrics'
```

### **Plugin Customizado para Multi-tenancy**

```lua
-- kong/plugins/tenant-header/handler.lua
local TenantHeaderHandler = {}

TenantHeaderHandler.PRIORITY = 1000
TenantHeaderHandler.VERSION = "1.0.0"

function TenantHeaderHandler:access(conf)
  local tenant_id = kong.request.get_header("x-tenant-id")
  local host = kong.request.get_host()
  
  -- Se não tem header, extrair do subdomínio
  if not tenant_id then
    local subdomain = string.match(host, "([^%.]+)")
    if subdomain and subdomain ~= "www" and subdomain ~= "api" then
      tenant_id = subdomain
    end
  end
  
  -- Se ainda não tem tenant, rejeitar
  if not tenant_id then
    return kong.response.exit(400, {
      message = "Tenant ID is required",
      code = "TENANT_MISSING"
    })
  end
  
  -- Adicionar header para os serviços
  kong.service.request.set_header("x-tenant-id", tenant_id)
  
  -- Log para auditoria
  kong.log.info("Request for tenant: " .. tenant_id)
end

return TenantHeaderHandler
```

### **Configuração de Load Balancing**

```yaml
# kong-lb.yml - Configuração com load balancing
upstreams:
  - name: auth-service-upstream
    algorithm: round-robin
    healthchecks:
      active:
        http_path: "/health"
        healthy:
          interval: 30
          successes: 2
        unhealthy:
          interval: 10
          http_failures: 3
          tcp_failures: 3
          timeouts: 3
      passive:
        healthy:
          successes: 2
        unhealthy:
          http_failures: 3
          tcp_failures: 3
          timeouts: 3

targets:
  - target: auth-service-1:3000
    upstream: auth-service-upstream
    weight: 100
  - target: auth-service-2:3000
    upstream: auth-service-upstream
    weight: 100
  - target: auth-service-3:3000
    upstream: auth-service-upstream
    weight: 100

services:
  - name: auth-service
    host: auth-service-upstream
    protocol: http
    port: 80
    path: /
```

### **Scripts de Deploy**

```bash
#!/bin/bash
# deploy-gateway.sh

echo "🚀 Deploying API Gateway..."

# 1. Criar rede do Docker
docker network create gateway-network 2>/dev/null || true

# 2. Deploy Kong
docker-compose -f docker-compose.gateway.yml up -d

# 3. Aguardar Kong estar pronto
echo "⏳ Waiting for Kong to be ready..."
until curl -f http://localhost:8001/status 2>/dev/null; do
  sleep 2
done

# 4. Configurar Kong
echo "⚙️ Configuring Kong..."
curl -X POST http://localhost:8001/config \
  -F config=@kong.yml

# 5. Verificar configuração
echo "✅ Kong configuration applied!"
curl -s http://localhost:8001/services | jq '.data[] | .name'

echo "🎉 API Gateway deployed successfully!"
echo "📊 Admin GUI: http://localhost:8002"
echo "🔍 Prometheus: http://localhost:9090"
echo "📈 Grafana: http://localhost:3001 (admin/admin123)"
```

### **Health Checks e Monitoring**

```typescript
// kong-health-check.ts
import axios from 'axios'

interface ServiceHealth {
  name: string
  status: 'healthy' | 'unhealthy'
  responseTime: number
  lastCheck: Date
}

export class HealthMonitor {
  private services = [
    'auth-service',
    'academic-service',
    'queue-service',
    'portal-service',
    'meal-service'
  ]

  async checkAllServices(): Promise<ServiceHealth[]> {
    const results = await Promise.allSettled(
      this.services.map(service => this.checkService(service))
    )

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value
      } else {
        return {
          name: this.services[index],
          status: 'unhealthy' as const,
          responseTime: -1,
          lastCheck: new Date()
        }
      }
    })
  }

  private async checkService(serviceName: string): Promise<ServiceHealth> {
    const start = Date.now()
    
    try {
      await axios.get(`http://${serviceName}:3000/health`, {
        timeout: 5000
      })
      
      return {
        name: serviceName,
        status: 'healthy',
        responseTime: Date.now() - start,
        lastCheck: new Date()
      }
    } catch (error) {
      return {
        name: serviceName,
        status: 'unhealthy',
        responseTime: Date.now() - start,
        lastCheck: new Date()
      }
    }
  }
}

// Executar health check a cada 30 segundos
setInterval(async () => {
  const monitor = new HealthMonitor()
  const health = await monitor.checkAllServices()
  
  console.log('🏥 Health Check Results:')
  health.forEach(service => {
    const status = service.status === 'healthy' ? '✅' : '❌'
    console.log(`${status} ${service.name}: ${service.responseTime}ms`)
  })
}, 30000)
```

---

**Este API Gateway Kong fornece roteamento centralizado, autenticação, rate limiting, observabilidade e alta disponibilidade para toda a arquitetura de microsserviços!** 🚪🔒
