import { Product, ResponsibilityItem } from './types';

export const HUB_PRODUCTS: Product[] = [
  // VERTICAL CARE
  {
    id: 'telemedicina',
    name: 'Telemedicina',
    vertical: 'Care',
    price: 80,
    commissionRate: 0.50, // 50% on first payment
    hubSplitRate: 0.50,
    description: 'Acesso imediato a consultas médicas online 24h por dia, clínico geral e mais de 15 especialidades médicas sem carência.',
    recurrent: true,
    marketingHook: 'Fale com um médico por videochamada em menos de 10 minutos. Sem filas, sem carência e de qualquer lugar!',
    features: [
      'Atendimento médico geral 24 horas por dia',
      'Receitas de medicamentos, exames e atestados digitais na hora',
      'Mais de 15 especialidades agendadas por teleconsulta',
      'Descontos exclusivos em farmácias credenciadas em todo o país'
    ],
    suggestedSteps: [
      'Envie o link de indicação para famílias e profissionais autônomos.',
      'Ofereça a facilidade de evitar as filas de madrugada no pronto-socorro.',
      'Use o roteiro persuasivo focado em economia e proteção imediata.'
    ],
    targetAudience: 'Famílias sem plano de saúde, profissionais autônomos e quem busca agilidade no atendimento.',
    detailsUrl: '/care/telemedicina'
  },
  {
    id: 'protecao-veicular',
    name: 'Proteção Veicular',
    vertical: 'Care',
    price: 120,
    commissionRate: 0.75, // 75% on adhesion
    hubSplitRate: 0.25,
    description: 'Proteção automotiva robusta contra roubo, furto, colisão, terceiros e assistência 24h completa nacional.',
    recurrent: true,
    marketingHook: 'Proteja seu carro ou moto sem análise de perfil ou Serasa, com mensalidades que cabem perfeitamente no seu bolso.',
    features: [
      'Sem consulta ao SPC/Serasa ou restrição de idade do condutor',
      'Assistência 24h nacional (reboque, pane, chaveiro e táxi)',
      'Cobertura contra colisão, capotamento, incêndio, roubo e furto',
      'Fundo cooperado para indenização ágil de terceiros'
    ],
    suggestedSteps: [
      'Aborde proprietários de veículos sem cobertura ou que reclamam do seguro tradicional.',
      'Destaque la facilidade de aprovação imediata sem burocracia.',
      'Ofereça cotações rápidas e agende o vistoriador digital.'
    ],
    targetAudience: 'Motoristas de aplicativos, taxistas, motociclistas e proprietários buscando custo-benefício.',
    detailsUrl: '/care/protecao-veicular'
  },
  {
    id: 'energia-limpa',
    name: 'Energia Limpa - desconto na conta',
    vertical: 'Care',
    price: 150,
    commissionRate: 0.10, // flat simulated commission percentage
    hubSplitRate: 0.90,
    description: 'Injeção de créditos de energia solar na rede para garantir redução direta de até 15% na conta de eletricidade mensal sem investimentos.',
    recurrent: true,
    marketingHook: 'Reduza o custo da sua conta de luz todos os meses sem instalar placas solares e de graça!',
    features: [
      'Desconto real garantido de 10% a 15% na fatura mensal',
      'Adesão 100% digital e sem custos de instalação ou obras',
      'Redução automática de emissão de CO2 da sua residência',
      'Sem fidelidade contratual ou alteração na rede física'
    ],
    suggestedSteps: [
      'Solicite a conta de luz do cliente para calcular o desconto exato.',
      'Apresente a economia de forma anualizada (ex: economize R$ 400 por ano).',
      'Explique que é garantido por lei e regulado pela ANEEL.'
    ],
    targetAudience: 'Residências e comércios locais com fatura de luz acima de R$ 150 mensais.',
    detailsUrl: '/care/energia-limpa'
  },
  {
    id: 'soeh',
    name: 'SOEH - Desenvolvimento Pessoal',
    vertical: 'Education',
    price: 50,
    commissionRate: 0.30, // 30% affiliate
    hubSplitRate: 0.70,
    description: 'Programa continuado de desenvolvimento pessoal, inteligência emocional e maestria profissional por assinatura.',
    recurrent: true,
    marketingHook: 'Desperte o seu máximo potencial comportamental e financeiro com a mentoria contínua do SOEH.',
    features: [
      'Aulas semanais ao vivo com mentores de alta performance',
      'Ferramentas práticas de produtividade, liderança e inteligência emocional',
      'Acesso à comunidade fechada de alunos afiliados para networking',
      'Testes periódicos de perfil e trilha de hábitos saudáveis'
    ],
    suggestedSteps: [
      'Promova o SOEH para pessoas buscando crescimento profissional e recolocação.',
      'Destaque que o modelo por assinatura de afiliado permite criar renda recorrente.',
      'Compartilhe as aulas abertas ou depoimentos de transformação.'
    ],
    targetAudience: 'Estudantes, profissionais em transição de carreira e qualquer pessoa comprometida com evolução contínua.',
    detailsUrl: '/education/soeh'
  },
  {
    id: 'em-breve',
    name: 'Em breve - novas oportunidades',
    vertical: 'Business',
    price: 0,
    commissionRate: 0,
    hubSplitRate: 0,
    description: 'Catálogo de soluções de alta margem em homologação comercial para ampliar o faturamento dos consultores.',
    recurrent: false,
    marketingHook: 'Mais soluções e novos splits de recorrência sendo negociados pela mesa de contratos da FLANX.',
    features: [
      'Novas parcerias comerciais estratégicas no radar',
      'Processo simplificado de afiliação automática',
      'Mantendo o mesmo modelo radial de splits integrados',
      'Evolução contínua da sua franquia regional'
    ],
    suggestedSteps: [
      'Foque na consolidação da Telemedicina, Proteção Veicular, Energia Limpa e SOEH.',
      'Acompanhe o canal de anúncios para liberação de novos produtos.',
      'Aprimore seu perfil comportamental para estar pronto no lançamento.'
    ],
    targetAudience: 'Empreendedores e consultores interessados em diversificação de portfólio de alta margem.',
    detailsUrl: '/business/em-breve'
  }
];

export const MATRIX_ITEMS: ResponsibilityItem[] = [
  {
    id: 'resp-comercial',
    category: 'Comercial',
    role: 'Relacionamento com Operadoras',
    hubDelivers: 'Contratos jurídicos e comerciais de alta reputação assinados com grandes operadoras de saúde, de telecom, energia limpa e faculdades nacionais para garantir o melhor preço.',
    consultantDoes: 'Aproxima-se do cliente local ou online, identifica com empatia quais problemas ele enfrenta e apresenta o portfólio de soluções adequadas no dia a dia.'
  },
  {
    id: 'resp-marketing',
    category: 'Marketing',
    role: 'Páginas & Identidade',
    hubDelivers: 'Fornece landing pages prontas e validadas de prospecção, artes prontas para redes sociais, criativos de anúncios de tráfego, além de roteiros estruturados de conversão.',
    consultantDoes: 'Promove os links em suas redes sociais ecológicas, mantém atração ativa, alimenta seus canais de comunicação com histórias reais e aborda novos leads quentes.'
  },
  {
    id: 'resp-cobranca',
    category: 'Cobrança',
    role: 'Gestão Financeira & Split',
    hubDelivers: 'Motor financeiro automatizado integrado que recebe a mensalidade ou parcela do cliente final, retém a margem do HUB e realiza o repasse imediato (split de comissão) para o consultor.',
    consultantDoes: 'Monitora os clientes ativos e inadimplentes, gerencia o relatório de comissões passadas e futuras e requisita o saque seguro das suas comissões confirmadas no painel.'
  },
  {
    id: 'resp-sucesso',
    category: 'Sucesso',
    role: 'Entrega e ativação',
    hubDelivers: 'Ativação do serviço do cliente de forma digital (envio de carteirinha de telemedicina, liberação do EAD, emissor de contratos) e suporte administrativo pós-venda técnico.',
    consultantDoes: 'Realiza o acolhimento pós-venda primário, pergunta proativamente se o cliente conseguiu usar o serviço técnico e trabalha para a retenção do cliente a longo prazo.'
  }
];

export const PROFILE_QUESTIONS = [
  {
    id: 'q1',
    question: 'Qual é o seu principal objetivo ao ingressar no HUB?',
    options: [
      { key: 'A', text: 'Conquistar total liberdade de tempo trabalhando no meu próprio ritmo.', profile: 'Planejador' },
      { key: 'B', text: 'Construir uma carteira de renda recorrente sólida e de alta produtividade financeira.', profile: 'Executor' },
      { key: 'C', text: 'Aprender a influenciar, conectar e treinar equipes de novos parceiros.', profile: 'Comunicador' },
      { key: 'D', text: 'Estudar minuciosamente os produtos para prestar consultorias de alta precisão técnica.', profile: 'Analista' }
    ]
  },
  {
    id: 'q2',
    question: 'Como você costuma se organizar para realizar suas tarefas diárias de prospecção?',
    options: [
      { key: 'A', text: 'Prefiro um cronograma pré-estabelecido onde sigo um funil sistemático e testado.', profile: 'Planejador' },
      { key: 'B', text: 'Foco no volume: quanto mais pessoas eu abordar no "corpo a corpo" hoje, mais vendas fecho.', profile: 'Executor' },
      { key: 'C', text: 'Adoro criar relacionamentos dinâmicos via stories e áudios longos contando histórias reais.', profile: 'Comunicador' },
      { key: 'D', text: 'Analiso detalhadamente os dados e fatias demográficas de clientes para bolar copys cirúrgicas.', profile: 'Analista' }
    ]
  },
  {
    id: 'q3',
    question: 'Ao se deparar com uma objeção dura de um cliente (ex: "está muito caro"), qual sua reação padrão?',
    options: [
      { key: 'A', text: 'Compreendo a situação dele com empatia, mantendo o diálogo aberto sem forçar.', profile: 'Planejador' },
      { key: 'B', text: 'Uso gatilhos mentais fortes de escassez e reverto imediatamente demonstrando o custo-benefício.', profile: 'Executor' },
      { key: 'C', text: 'Uso o senso de humor ou conto o caso de um outro cliente que superou exatamente essa dúvida.', profile: 'Comunicador' },
      { key: 'D', text: 'Apresento uma planilha ou comparação matemática listando detalhadamente cada centavo economizado.', profile: 'Analista' }
    ]
  },
  {
    id: 'q4',
    question: 'Qual o formato de treinamento ou mentoria que faz você absorver melhor o conhecimento?',
    options: [
      { key: 'A', text: 'Materiais com passo a passo claro, roteiros de apoio e cronograma de estudos gradativo.', profile: 'Planejador' },
      { key: 'B', text: 'Desafios práticos diários focados em métricas onde posso ver meu progresso em tempo real.', profile: 'Executor' },
      { key: 'C', text: 'Mentorias ao vivo em grupo onde podemos debater, interagir e trocar experiências juntos.', profile: 'Comunicador' },
      { key: 'D', text: 'Videoaulas profundas que explicam a fundo os termos, contratos, leis e fundamentos técnicos.', profile: 'Analista' }
    ]
  },
  {
    id: 'q5',
    question: 'Se você se tornar um afiliado oficial hoje, como pretende começar a conquistar clientes amanhã?',
    options: [
      { key: 'A', text: 'Mapeando meus contatos próximos e vizinhos para montar uma abordagem coordenada.', profile: 'Planejador' },
      { key: 'B', text: 'Entrando em contato imediato via WhatsApp com comércios locais mostrando economia tangível.', profile: 'Executor' },
      { key: 'C', text: 'Gravando uma sequência criativa de vídeos no Instagram compartilhando meu link de afiliado.', profile: 'Comunicador' },
      { key: 'D', text: 'Estudando minuciosamente o manual de cada vertical antes de dar qualquer primeiro passo.', profile: 'Analista' }
    ]
  }
];
