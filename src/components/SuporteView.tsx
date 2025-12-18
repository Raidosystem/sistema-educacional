import { Book, ChatCircleDots, FileText, VideoCamera, Envelope, Phone, Question } from '@phosphor-icons/react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Badge } from './ui/badge'
import { useState } from 'react'

export default function SuporteView() {
  const [searchTerm, setSearchTerm] = useState('')

  const faqItems = [
    {
      categoria: 'Acesso e Login',
      perguntas: [
        {
          pergunta: 'Como faço para acessar o sistema?',
          resposta: 'Acesse o sistema através do navegador usando suas credenciais fornecidas pela secretaria de educação. Em caso de primeiro acesso, use a senha provisória enviada por e-mail e altere-a no primeiro login.'
        },
        {
          pergunta: 'Esqueci minha senha, o que fazer?',
          resposta: 'Clique em "Esqueci minha senha" na tela de login e siga as instruções. Um link de redefinição será enviado para seu e-mail cadastrado.'
        },
        {
          pergunta: 'Como altero minha senha?',
          resposta: 'Acesse seu perfil no canto superior direito, clique em "Configurações" e depois em "Alterar Senha".'
        }
      ]
    },
    {
      categoria: 'Avaliações e Notas',
      perguntas: [
        {
          pergunta: 'Como visualizo as notas dos alunos?',
          resposta: 'Acesse o menu "Avaliações" e selecione a turma desejada. As notas serão exibidas por disciplina e período avaliativo.'
        },
        {
          pergunta: 'Como faço para lançar notas?',
          resposta: 'Professores podem lançar notas através do menu "Avaliações" > "Lançamento de Notas". Selecione a turma, disciplina e avaliação correspondente.'
        },
        {
          pergunta: 'O que é TRI e como funciona?',
          resposta: 'TRI (Teoria de Resposta ao Item) é um modelo estatístico que avalia a proficiência dos alunos considerando a dificuldade das questões. O sistema calcula automaticamente a proficiência TRI nas avaliações cadastradas.'
        }
      ]
    },
    {
      categoria: 'Materiais e Biblioteca',
      perguntas: [
        {
          pergunta: 'Como faço download dos materiais didáticos?',
          resposta: 'Acesse o menu "Biblioteca" ou "Materiais", localize o conteúdo desejado e clique no botão "Download". Os arquivos estarão disponíveis em formato PDF.'
        },
        {
          pergunta: 'Os materiais estão alinhados com a BNCC?',
          resposta: 'Sim, todos os materiais do sistema seguem as diretrizes da Base Nacional Comum Curricular (BNCC) e indicam as habilidades trabalhadas.'
        },
        {
          pergunta: 'Com que frequência novos materiais são adicionados?',
          resposta: 'Novos materiais são adicionados bimestralmente, seguindo o calendário escolar e planejamento pedagógico da rede.'
        }
      ]
    },
    {
      categoria: 'Portal da Família',
      perguntas: [
        {
          pergunta: 'Como os pais acessam o portal?',
          resposta: 'Os responsáveis recebem credenciais de acesso por e-mail ou pela secretaria da escola. O acesso é feito pelo mesmo endereço do sistema, usando o perfil de "Responsável".'
        },
        {
          pergunta: 'As notificações chegam em tempo real?',
          resposta: 'Sim, quando um professor lança uma nota ou registra uma falta, o sistema envia notificação imediata para os responsáveis cadastrados.'
        },
        {
          pergunta: 'Posso acompanhar mais de um filho?',
          resposta: 'Sim, o sistema permite que um responsável acompanhe múltiplos estudantes através do mesmo login, alternando entre eles facilmente.'
        }
      ]
    },
    {
      categoria: 'Relatórios',
      perguntas: [
        {
          pergunta: 'Quais tipos de relatórios estão disponíveis?',
          resposta: 'O sistema oferece relatórios de rede, escola, turma e individuais, incluindo análises de proficiência TRI, frequência, desempenho por disciplina e comparativos.'
        },
        {
          pergunta: 'Posso exportar os relatórios?',
          resposta: 'Sim, todos os relatórios podem ser exportados em PDF, Excel (.xlsx) ou CSV para análise externa.'
        },
        {
          pergunta: 'Com que frequência os dados são atualizados?',
          resposta: 'Os dados são atualizados em tempo real conforme lançamentos de notas, frequências e outras informações pelos professores e coordenadores.'
        }
      ]
    }
  ]

  const tutoriais = [
    {
      titulo: 'Primeiros Passos no Sistema',
      descricao: 'Aprenda a navegar pelas principais funcionalidades',
      duracao: '5 min',
      tipo: 'video',
      icon: VideoCamera
    },
    {
      titulo: 'Como Lançar Notas e Frequências',
      descricao: 'Guia completo para professores',
      duracao: '8 min',
      tipo: 'video',
      icon: VideoCamera
    },
    {
      titulo: 'Gerando Relatórios Gerenciais',
      descricao: 'Para coordenadores e diretores',
      duracao: '10 min',
      tipo: 'video',
      icon: VideoCamera
    },
    {
      titulo: 'Usando o Banco de Questões',
      descricao: 'Criação de avaliações personalizadas',
      duracao: '12 min',
      tipo: 'video',
      icon: VideoCamera
    },
    {
      titulo: 'Manual do Professor',
      descricao: 'Documentação completa em PDF',
      duracao: '45 páginas',
      tipo: 'documento',
      icon: FileText
    },
    {
      titulo: 'Manual do Coordenador',
      descricao: 'Guia de gestão pedagógica',
      duracao: '60 páginas',
      tipo: 'documento',
      icon: FileText
    },
    {
      titulo: 'Guia para Responsáveis',
      descricao: 'Como acompanhar seu filho',
      duracao: '15 páginas',
      tipo: 'documento',
      icon: FileText
    }
  ]

  const canaisAtendimento = [
    {
      titulo: 'E-mail',
      descricao: 'suporte@educacao.guaira.sp.gov.br',
      icon: Envelope,
      horario: 'Resposta em até 24h úteis'
    },
    {
      titulo: 'Telefone',
      descricao: '(17) 3331-9200',
      icon: Phone,
      horario: 'Segunda a Sexta, 8h às 17h'
    },
    {
      titulo: 'WhatsApp',
      descricao: '(17) 99999-9999',
      icon: ChatCircleDots,
      horario: 'Segunda a Sexta, 8h às 17h'
    },
    {
      titulo: 'Presencial',
      descricao: 'Secretaria Municipal de Educação',
      icon: Book,
      horario: 'Segunda a Sexta, 8h às 17h'
    }
  ]

  const perguntasFiltradas = faqItems.map(categoria => ({
    ...categoria,
    perguntas: categoria.perguntas.filter(p => 
      p.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.resposta.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(categoria => categoria.perguntas.length > 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Space_Grotesk']">Central de Ajuda</h1>
        <p className="text-gray-600">
          Tutoriais, perguntas frequentes e canais de atendimento
        </p>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          <TabsTrigger value="tutoriais">Tutoriais</TabsTrigger>
          <TabsTrigger value="contato">Contato</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Question size={24} className="text-primary" weight="bold" />
              <h2 className="text-xl font-semibold">Perguntas Frequentes</h2>
            </div>

            <div className="mb-6">
              <Input
                placeholder="Buscar dúvida..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="space-y-6">
              {perguntasFiltradas.map((categoria, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold mb-3 text-primary">{categoria.categoria}</h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {categoria.perguntas.map((item, qIdx) => (
                      <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          {item.pergunta}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {item.resposta}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
              
              {perguntasFiltradas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma pergunta encontrada com "{searchTerm}"
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tutoriais" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {tutoriais.map((tutorial, idx) => {
              const Icon = tutorial.icon
              return (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon size={28} className="text-primary" weight="bold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{tutorial.titulo}</h3>
                        <Badge variant="outline">{tutorial.duracao}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{tutorial.descricao}</p>
                      <Button size="sm" variant="outline">
                        {tutorial.tipo === 'video' ? 'Assistir' : 'Download'}
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="contato" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Canais de Atendimento</h2>
                <div className="space-y-4">
                  {canaisAtendimento.map((canal, idx) => {
                    const Icon = canal.icon
                    return (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon size={24} className="text-primary" weight="bold" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{canal.titulo}</h3>
                          <p className="text-sm text-gray-600">{canal.descricao}</p>
                          <p className="text-xs text-gray-500 mt-1">{canal.horario}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Enviar Mensagem</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome</label>
                    <Input placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail</label>
                    <Input type="email" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Assunto</label>
                    <Input placeholder="Sobre o que você precisa de ajuda?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mensagem</label>
                    <Textarea 
                      placeholder="Descreva sua dúvida ou problema..." 
                      rows={6}
                    />
                  </div>
                  <Button className="w-full">Enviar Mensagem</Button>
                </form>
              </Card>

              <Card className="p-6 mt-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold mb-2 text-blue-900">💡 Dica</h3>
                <p className="text-sm text-blue-800">
                  Antes de entrar em contato, verifique se sua dúvida não está nas Perguntas Frequentes. 
                  Isso pode poupar seu tempo!
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
