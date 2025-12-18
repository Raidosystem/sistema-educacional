import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.user.deleteMany()
  await prisma.person.deleteMany()

  // Criar pessoas
  const adminPerson = await prisma.person.create({
    data: {
      cpf: '000.000.000-00',
      name: 'Administrador do Sistema',
      birthDate: new Date('1980-01-01'),
      gender: 'MALE',
      phone: '(11) 99999-9999',
      email: 'admin@escola.com',
    }
  })

  const teacherPerson = await prisma.person.create({
    data: {
      cpf: '111.111.111-11',
      name: 'Professor Silva',
      birthDate: new Date('1985-05-15'),
      gender: 'MALE',
      phone: '(11) 98888-8888',
      email: 'professor@escola.com',
    }
  })

  const parentPerson = await prisma.person.create({
    data: {
      cpf: '222.222.222-22',
      name: 'João dos Santos',
      birthDate: new Date('1975-03-20'),
      gender: 'MALE',
      phone: '(11) 97777-7777',
      email: 'pai@escola.com',
    }
  })

  const studentPerson = await prisma.person.create({
    data: {
      cpf: '333.333.333-33',
      name: 'Maria Santos',
      birthDate: new Date('2010-08-10'),
      gender: 'FEMALE',
      phone: '',
      email: '',
    }
  })

  const nutritionistPerson = await prisma.person.create({
    data: {
      cpf: '444.444.444-44',
      name: 'Dra. Ana Nutricionista',
      birthDate: new Date('1978-12-05'),
      gender: 'FEMALE',
      phone: '(11) 96666-6666',
      email: 'nutricionista@escola.com',
    }
  })

  // Criar usuários
  const hashedPassword = await bcrypt.hash('123456', 12)

  await prisma.user.create({
    data: {
      email: 'admin@escola.com',
      password: hashedPassword,
      role: 'ADMIN',
      personId: adminPerson.id,
    }
  })

  await prisma.user.create({
    data: {
      email: 'professor@escola.com',
      password: hashedPassword,
      role: 'TEACHER',
      personId: teacherPerson.id,
    }
  })

  await prisma.user.create({
    data: {
      email: 'pai@escola.com',
      password: hashedPassword,
      role: 'PARENT',
      personId: parentPerson.id,
    }
  })

  await prisma.user.create({
    data: {
      email: 'aluno@escola.com',
      password: hashedPassword,
      role: 'STUDENT',
      personId: studentPerson.id,
    }
  })

  await prisma.user.create({
    data: {
      email: 'nutricionista@escola.com',
      password: hashedPassword,
      role: 'NUTRITIONIST',
      personId: nutritionistPerson.id,
    }
  })

  // Criar perfis específicos
  await prisma.teacher.create({
    data: {
      registration: 'PROF001',
      specialization: 'Matemática e Física',
      personId: teacherPerson.id,
    }
  })

  await prisma.parent.create({
    data: {
      personId: parentPerson.id,
    }
  })

  await prisma.student.create({
    data: {
      registration: 'EST001',
      personId: studentPerson.id,
    }
  })

  await prisma.nutritionist.create({
    data: {
      crn: 'CRN-SP-12345',
      personId: nutritionistPerson.id,
    }
  })

  // Criar escola
  const school = await prisma.school.create({
    data: {
      code: 'ESC001',
      name: 'Escola Municipal Exemplo',
      address: 'Rua das Flores, 123 - Centro',
      phone: '(11) 3333-3333',
      email: 'contato@escola.com',
      director: 'Diretora Maria',
    }
  })

  // Criar matérias
  const subjects = await Promise.all([
    prisma.subject.create({
      data: {
        name: 'Matemática',
        code: 'MAT',
        workload: 240,
      }
    }),
    prisma.subject.create({
      data: {
        name: 'Português',
        code: 'POR',
        workload: 240,
      }
    }),
    prisma.subject.create({
      data: {
        name: 'História',
        code: 'HIS',
        workload: 120,
      }
    }),
    prisma.subject.create({
      data: {
        name: 'Geografia',
        code: 'GEO',
        workload: 120,
      }
    }),
  ])

  // Criar turma
  const classRoom = await prisma.class.create({
    data: {
      name: '5º Ano A',
      year: 2024,
      level: 'FUNDAMENTAL_I',
      period: 'MORNING',
      capacity: 30,
      schoolId: school.id,
      teacherId: teacherPerson.id,
    }
  })

  // Vincular matérias à turma
  await Promise.all(
    subjects.map(subject =>
      prisma.classSubject.create({
        data: {
          classId: classRoom.id,
          subjectId: subject.id,
        }
      })
    )
  )

  // Criar matrícula
  await prisma.enrollment.create({
    data: {
      year: 2024,
      studentId: studentPerson.id,
      classId: classRoom.id,
      schoolId: school.id,
    }
  })

  console.log('✅ Seed concluído com sucesso!')
  console.log('📊 Dados criados:')
  console.log('   • 5 usuários (admin, professor, pai, aluno, nutricionista)')
  console.log('   • 1 escola')
  console.log('   • 4 matérias')
  console.log('   • 1 turma')
  console.log('   • 1 matrícula')
  console.log('')
  console.log('🔑 Credenciais de acesso:')
  console.log('   • Admin: admin@escola.com / 123456')
  console.log('   • Professor: professor@escola.com / 123456')
  console.log('   • Pai: pai@escola.com / 123456')
  console.log('   • Aluno: aluno@escola.com / 123456')
  console.log('   • Nutricionista: nutricionista@escola.com / 123456')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
