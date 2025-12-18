// Script para criar usuário administrativo automaticamente
// Execute com: node create-admin.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUser() {
  try {
    console.log('🔧 Criando usuário administrativo...')
    
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'admin@escola.com',
      password: 'admin123',
    })

    if (authError && !authError.message.includes('already registered')) {
      console.error('❌ Erro ao criar autenticação:', authError.message)
      return
    }

    console.log('✅ Usuário de autenticação criado/já existe')

    // 2. Inserir/atualizar dados na tabela users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert([
        {
          id: authData.user?.id,
          email: 'admin@escola.com',
          name: 'Administrador do Sistema',
          role: 'ADMIN',
          active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()

    if (userError) {
      console.error('❌ Erro ao criar dados do usuário:', userError.message)
      return
    }

    console.log('✅ Usuário administrativo criado com sucesso!')
    console.log('📧 Email: admin@escola.com')
    console.log('🔑 Senha: admin123')
    console.log('👤 Role: ADMIN')
    console.log('')
    console.log('🚀 Agora você pode fazer login no sistema!')

  } catch (error) {
    console.error('❌ Erro geral:', error.message)
  }
}

createAdminUser()
