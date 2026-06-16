import { Product, ResponsibilityItem } from './types';

export const HUB_PRODUCTS: Product[] = [
  // VERTICAL CARE
  {
    id: 'telemedicina',
    name: 'Telemedicina Conecta 24h',
    vertical: 'Care',
    price: 79,
    commissionRate: 0.75, // R$ 59,25 to seller, rest to Hub
    hubSplitRate: 0.25,
    description: 'Acesso imediato a consultas médicas online 24h por dia, clínico geral e mais de 15 especialidades sem sair de casa.',
    recurrent: true,
    marketingHook: 'Médico na tela do celular em até 10 minutos por menos de R$ 3 por dia. Proteja sua família sem filas de hospital!',
    features: [
      'Atendimento 24 horas no clínico geral',
      'Receita médica, atestados e exames digitais diretos no app',
      'Descontos de até 60% em farmácias parceiras',
      'Adicione até 3 dependentes'
    ],
    suggestedSteps: [
      'Gere seu link de afiliado personalizado abaixo.',
      'Divulgue em grupos locais e de família no WhatsApp.',
      'Apresente a dor de quem gasta horas no trânsito e na fila do hospital da sua região.'
    ],
    targetAudience: 'Famílias autônomas, microempreendedores e quem não tem plano de saúde corporativo.',
    detailsUrl: '/care/telemedicina'
  },
  {
    id: 'plano-funerario',
    name: 'Assistência Familiar & Amparo',
    vertical: 'Care',
    price: 49,
    commissionRate: 0.80, // R$ 39,20 to seller
    hubSplitRate: 0.20,
    description: 'Plano de assistência funerária completo com abrangência nacional, traslado e suporte completo nos momentos mais difíceis.',
    recurrent: true,
    marketingHook: 'Garantia de tranquilidade e amparo para quem você ama nos momentos cruciais. Sem burocracia ou taxas surpresa.',
    features: [
      'Cobertura nacional simplificada',
      'Despesas com capela, flores e sepultamento inclusas',
      'Opção com cremação inclusa',
      'Suporte psicológico pós-luto'
    ],
    suggestedSteps: [
      'Destaque que a burocracia do luto é pesada e custa caro.',
      'Ofereça como proteção para os pais ou avós.',
      'Envie o vídeo institucional que detalha o carinho e cuidado do processo.'
    ],
    targetAudience: 'Pessoas maduras que querem poupar a família de custos e preocupações inesperadas.',
    detailsUrl: '/care/plano-funerario'
  },
  {
    id: 'energia-limpa',
    name: 'Energia Solar Compartilhada',
    vertical: 'Care',
    price: 150, // simulated average savings/recurrent referral value
    commissionRate: 0.70, // R$ 105 to seller
    hubSplitRate: 0.30,
    description: 'Assinatura de energia limpa que reduz a conta de luz residencial ou comercial em até 15% todos os meses, sem instalar placas de energia.',
    recurrent: true,
    marketingHook: 'Reduza sua conta de eletricidade imediatamente sem investir R$ 1 em placas solares. Sustentabilidade e economia real!',
    features: [
      'Desconto garantido de 10% a 15% todo mês',
      'Contratação 100% digital e gratuita',
      'Disponível para residências e pequenos comércios',
      'Sem fidelidade ou alteração física na casa'
    ],
    suggestedSteps: [
      'Peça a foto da última conta de energia do seu potencial cliente.',
      'Use a calculadora embutida para demonstrar a economia anual líquida.',
      'Siga o roteiro focado em "parar de desperdiçar dinheiro para a concessionária".'
    ],
    targetAudience: 'Qualquer pessoa ou comércio com conta de luz acima de R$ 150/mês que quer pagar menos.',
    detailsUrl: '/care/energia-limpa'
  },
  {
    id: 'puma-protecao-veicular',
    name: 'Puma Proteção Veicular',
    vertical: 'Care',
    price: 120, // average monthly protection fee / recurrent referral commission
    commissionRate: 0.75, // 75% to salesperson (R$ 90,00)
    hubSplitRate: 0.25,
    description: 'Proteção veicular integral e assistência 24 horas para carros, motos e utilitários, com ampla cobertura nacional contra furto, roubo, colisão e terceiros.',
    recurrent: true,
    marketingHook: 'Proteja seu patrimônio sem análise de perfil de condutor e sem consulta SPC/Serasa. Mensalidade que cabe no bolso na Puma!',
    features: [
      'Sem consulta ao SPC/Serasa ou restrição de perfil',
      'Assistência 24h completa (reboque, pane elétrica, chaveiro, taxi)',
      'Cobertura integral contra roubo, furto, incêndio e colisão',
      'Atendimento em todo o território nacional'
    ],
    suggestedSteps: [
      'Aborde taxistas, motoristas de aplicativo ou proprietários com carros/motos sem proteção.',
      'Apresente o preço acessível comparado aos seguros tradicionais.',
      'Gere cotações rápidas usando seus links de consultor diretamente pelo WhatsApp.'
    ],
    targetAudience: 'Proprietários de carros, motos e frotas que querem segurança robusta sem os preços elevados de seguros padrão.',
    detailsUrl: '/care/puma-protecao'
  },

  // VERTICAL EDUCATION
  {
    id: 'cursos-livres',
    name: 'Mega Acesso: Cursos Profissionalizantes',
    vertical: 'Education',
    price: 199,
    commissionRate: 0.80, // R$ 159,20 to seller
    hubSplitRate: 0.20,
    description: 'Pacote anual com acesso ilimitado a mais de 250 cursos com certificações reconhecidas nas áreas de marketing, tecnologia, negócios e beleza.',
    recurrent: false,
    marketingHook: 'Abra as portas do mercado de trabalho. Invista na sua qualificação com mais de 200 cursos por uma parcela única!',
    features: [
      'Certificados válidos inclusos em todos os cursos',
      'Suporte direto com tutores especialistas',
      'Aulas práticas em vídeo pelo smartphone',
      'Área de vagas parceiras exclusivas para alunos'
    ],
    suggestedSteps: [
      'Compartilhe nos stories do Instagram com foco em "vagas de emprego".',
      'Ofereça a jovens procurando o primeiro emprego ou transição de carreira.',
      'Discorra sobre a importância de ter um currículo forte em momentos competitivos.'
    ],
    targetAudience: 'Jovens aspirantes, estudantes universitários e trabalhadores informais buscando colocação.',
    detailsUrl: '/education/cursos-livres'
  },
  {
    id: 'cicon100-ead',
    name: 'CICON100 Cursos EAD',
    vertical: 'Education',
    price: 297, // pricing for comprehensive EAD access / specific certifications
    commissionRate: 0.80, // R$ 237,60 to salesperson
    hubSplitRate: 0.20,
    description: 'Plataforma completa de cursos Livres, Preparatórios de Concurso e Especializações do CICON100. Mais de 300 cursos online com certificados válidos.',
    recurrent: false,
    marketingHook: 'Qualificação profissional imediata e horas complementares acadêmicas. Estude na CICON100 por preços de alta acessibilidade!',
    features: [
      'Acesso a mais de 300 cursos de capacitação e aperfeiçoamento',
      'Certificados válidos nacionalmente emitidos com agilidade',
      'Aulas práticas dinâmicas EAD gravadas disponíveis no celular',
      'Suporte estudantil e de tutoria pelo portal'
    ],
    suggestedSteps: [
      'Foque em concurseiros e profissionais que precisam comprovar títulos ou horas complementares acadêmicas.',
      'Divulgue os links oficiais www.cicon100.com.br integrados à sua ID nas mídias sociais.',
      'Apresente como a qualificação rápida e de baixo custo pode acelerar contratações imediatas.'
    ],
    targetAudience: 'Estudantes, universitários com necessidade de horas, concorrentes de concursos públicos e trabalhadores buscando promoção rápida.',
    detailsUrl: 'https://www.cicon100.com.br'
  },
  {
    id: 'formacao-tecnica',
    name: 'Formação Técnica Conecta',
    vertical: 'Education',
    price: 890,
    commissionRate: 0.75, // R$ 667,50 to seller
    hubSplitRate: 0.25,
    description: 'Cursos técnicos rápidos oficiais homologados pelo MEC (Administração, Logística, TI ou Saúde bucal) com duração de 12 meses.',
    recurrent: false,
    marketingHook: 'Diploma técnico de alta demanda pelo MEC em apenas 1 ano. O caminho mais rápido para aprovação em concursos e salários melhores!',
    features: [
      'Diploma com registro no SISTEC/MEC',
      'Metodologia híbrida flexível',
      'Opção de parcelamento facilitado no boleto',
      'Estágio garantido em empresas parcerias'
    ],
    suggestedSteps: [
      'Identifique pessoas que trabalham como auxiliares ou assistentes na sua cidade.',
      'Mostre os editais de concursos públicos que exigem formação técnica.',
      'Utilize o agendamento de chamada consultiva com nosso consultor sênior.'
    ],
    targetAudience: 'Profissionais que buscam promoção rápida ou aprovação em vagas técnicas especializadas.',
    detailsUrl: '/education/formacao-tecnica'
  },
  {
    id: 'graduacao-ead',
    name: 'Graduação & Pós-Graduação EAD',
    vertical: 'Education',
    price: 1800, // average tuition enrollment value
    commissionRate: 0.80, // R$ 1440 to seller
    hubSplitRate: 0.20,
    description: 'Ampla grade de cursos superiores e MBAs 100% online, certificados de peso acadêmico e condições de financiamento exclusivas.',
    recurrent: false,
    marketingHook: 'Faça sua faculdade ou pós-graduação no seu tempo, com mensalidades que cabem no bolso e diploma igual ao presencial.',
    features: [
      'Nota máxima no MEC',
      'Mais de 45 opções de cursos de graduação e MBA',
      'Professores mestres e doutores',
      'Material didático digital gratuito'
    ],
    suggestedSteps: [
      'Importante: Use a folha de benefícios exclusivos do HUB (bolsas de até 50%).',
      'Foque em profissionais formados que precisam de um MBA/pós para subir de cargo.',
      'Ofereça o consultor educacional do HUB para ligar e fechar a matrícula para você.'
    ],
    targetAudience: 'Adultos que trabalham e precisam conciliar trabalho com estudos superiores.',
    detailsUrl: '/education/graduacao-ead'
  },

  // VERTICAL BUSINESS
  {
    id: 'perfil-hmi',
    name: 'Teste de Perfil Comportamental MDS / HMI',
    vertical: 'Business',
    price: 150,
    commissionRate: 0.75, // R$ 112,50 to seller
    hubSplitRate: 0.25,
    description: 'Mapeamento psicológico completo de perfil comportamental focado em liderança, inteligência emocional e direcionamento de carreiras.',
    recurrent: false,
    marketingHook: 'Descubra suas reais forças, bloqueios inconscientes e áreas de alta performance com o mapeamento comportamental definitivo.',
    features: [
      'Relatório analítico personalizado de mais de 20 páginas',
      'Identificação de estilo de comunicação e liderança',
      'Feedback gravado explicativo do laudo',
      'Foco em desenvolvimento pessoal ou recrutamento'
    ],
    suggestedSteps: [
      'Destaque que este teste é usado por grandes empresas para contratação.',
      'Aborde empreendedores locais que querem entender melhor seus sócios ou equipe.',
      'Compartilhe sua própria experiência após fazer o teste comportamental do HUB.'
    ],
    targetAudience: 'Empreendedores, líderes, candidatos a vagas executivas e profissionais de RH.',
    detailsUrl: '/business/perfil-hmi'
  },
  {
    id: 'maquininha-conecta',
    name: 'Portfólio de Maquininhas Pro',
    vertical: 'Business',
    price: 100, // flat fee commission value per machine ordered
    commissionRate: 0.80, // R$ 80 to seller
    hubSplitRate: 0.20,
    description: 'Credenciamento de maquininha de cartão de crédito para estabelecimentos comerciais com taxas super competitivas e repasse rápido.',
    recurrent: false,
    marketingHook: 'As menores taxas do mercado de cartões para o seu negócio. Troque de máquina e aumente sua margem líquida imediatamente!',
    features: [
      'Taxa zero no PIX e cartão no primeiro mês',
      'Recebimento em 1 dia útil garantido',
      'Bobina de impressão inclusa gratuitamente',
      'Suporte técnico físico em até 24h na região'
    ],
    suggestedSteps: [
      'Visite pequenos comércios (padarias, salões, lojas) do seu bairro de forma amigável.',
      'Ofereça uma comparação direta do extrato de taxas atual deles.',
      'Envie o link para eles adquirirem a máquina sem compromisso.'
    ],
    targetAudience: 'Comerciantes, feirantes, prestadores de serviços e autônomos locais.',
    detailsUrl: '/business/maquininha-conecta'
  },
  {
    id: 'pacote-vendas-acelerado',
    name: 'Córtex de Vendas Mentoria',
    vertical: 'Business',
    price: 500,
    commissionRate: 0.70, // R$ 350 to seller
    hubSplitRate: 0.30,
    description: 'Imersão de mentorias semanais focadas em prospecção ativa, fechamento de alto valor e metodologias modernas de vendas.',
    recurrent: false,
    marketingHook: 'Dobre seus fechamentos de vendas em 30 dias com o acompanhamento tático individualizado dos Master Trainers do HUB.',
    features: [
      '4 encontros ao vivo em grupo reduzido ou individual',
      'Scripts validados para cold WhatsApp e telefone',
      'Correção de funil de vendas passo a passo',
      'Acesso de 1 ano aos playbooks do HUB'
    ],
    suggestedSteps: [
      'Ofereça para consultores de outros ramos que estão estagnados.',
      'Foque no retorno do investimento: "1 fechamento extra paga a mentoria inteira".',
      'Use o depoimento de quem alcançou R$ 10k/mês após a imersão.'
    ],
    targetAudience: 'Vendedores, corretores, consultores autônomos e empresários com dificuldade de vender.',
    detailsUrl: '/business/pacote-vendas-acelerado'
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
