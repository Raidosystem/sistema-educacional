// 🧪 TESTE DE CONECTIVIDADE SUPABASE
// Cole este código no console do navegador (F12) para testar a conexão

// 1. Teste básico de conexão
console.log('🔧 Testando conectividade Supabase...')

// Importar cliente Supabase (se ainda não estiver disponível)
const supabaseUrl = 'https://bljbeonwfasdttivdtpf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsamJlb253ZmFzZHR0aXZkdHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNDAwMjMsImV4cCI6MjA3MDcxNjAyM30.Z0RexBTLhbIkmu3-DS6l6xr2nxzSaOQJfX3lrqqmNpE'

console.log('📡 URL:', supabaseUrl)
console.log('🔑 Key:', supabaseKey.substring(0, 20) + '...')

// 2. Teste de autenticação
async function testAuth() {
  try {
    console.log('🔐 Testando autenticação...')
    
    // Usar fetch direto para testar
    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        email: 'admin@escola.com',
        password: '123456'
      })
    })
    
    const result = await response.json()
    console.log('🔐 Resposta da autenticação:', result)
    
    if (result.access_token) {
      console.log('✅ Autenticação funcionou!')
      return result.access_token
    } else {
      console.log('❌ Erro na autenticação:', result.error || result)
      return null
    }
    
  } catch (error) {
    console.error('❌ Erro no teste de auth:', error)
    return null
  }
}

// 3. Teste de consulta na tabela users
async function testUsersTable(token) {
  try {
    console.log('👥 Testando consulta na tabela users...')
    
    const response = await fetch(`${supabaseUrl}/rest/v1/users?email=eq.admin@escola.com`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${token || supabaseKey}`,
        'Content-Type': 'application/json'
      }
    })
    
    const result = await response.json()
    console.log('👥 Usuários encontrados:', result)
    
    if (Array.isArray(result) && result.length > 0) {
      console.log('✅ Usuário encontrado na tabela users!')
    } else {
      console.log('❌ Usuário NÃO encontrado na tabela users')
    }
    
  } catch (error) {
    console.error('❌ Erro no teste de users:', error)
  }
}

// 4. Teste de consulta na tabela people
async function testPeopleTable() {
  try {
    console.log('👤 Testando consulta na tabela people...')
    
    const response = await fetch(`${supabaseUrl}/rest/v1/people?email=eq.admin@escola.com`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    })
    
    const result = await response.json()
    console.log('👤 Pessoas encontradas:', result)
    
    if (Array.isArray(result) && result.length > 0) {
      console.log('✅ Pessoa encontrada na tabela people!')
    } else {
      console.log('❌ Pessoa NÃO encontrada na tabela people')
    }
    
  } catch (error) {
    console.error('❌ Erro no teste de people:', error)
  }
}

// 5. Executar todos os testes
async function runAllTests() {
  console.log('🚀 Iniciando testes completos...')
  console.log('='*50)
  
  const token = await testAuth()
  await testUsersTable(token)
  await testPeopleTable()
  
  console.log('='*50)
  console.log('🏁 Testes concluídos!')
}

// Executar os testes
runAllTests()
