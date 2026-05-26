import React, { useState } from 'react';
import { HUB_PRODUCTS, MATRIX_ITEMS } from '../data';
import { Network, ArrowRightLeft, ShieldCheck, HelpCircle, Laptop, ArrowRight, CheckCircle2, DollarSign, BookOpen, HeartPulse, Building, ChevronRight, MessageSquareCode } from 'lucide-react';
import { ResponsibilityItem } from '../types';

interface EcosystemViewProps {
  onNextTab?: () => void;
}

export default function EcosystemView({ onNextTab }: EcosystemViewProps) {
  const [activeNode, setActiveNode] = useState<string>('hub');
  const [matrixFilter, setMatrixFilter] = useState<string>('todos');
  const [comprendidoItems, setComprendidoItems] = useState<Record<string, boolean>>({});

  const nodeDetails: Record<string, { title: string; subtitle: string; description: string; flowInfo: string; badge: string; colorClass: string }> = {
    hub: {
      title: '[SUA MARCA] Business Hub',
      subtitle: 'A Inteligência, Garantia Jurídica e Tecnologia Centralizada',
      description: 'O cérebro do ecossistema. Fornece contratos juridicamente robustos prontos com operadoras de saúde, provedoras de energia e universidades. Gerencia as páginas digitais, a divisão direta de comissão por vendas (split), infraestrutura de TI e suporte pós-venda especializado.',
      flowInfo: 'Fluxo: Envia materiais, páginas de vendas validadas e infra de cobrança. Recebe parcelas do cliente B2B/B2C e transfere de imediato de 70% a 80% ao consultor.',
      badge: 'CENTRAL DE OPERAÇÃO',
      colorClass: 'bg-slate-900 border-slate-700 text-slate-100'
    },
    marketing: {
      title: 'Marketing & IA Integrada',
      subtitle: 'Artes de Prospecção e Criação de Script Rápido',
      description: 'Suporte de atração de visualização e captação de clientes. Oferece copys sob medida para WhatsApp e redes sociais, banners prontos e disparadores de conversão.',
      flowInfo: 'Fluxo: Gera novas copys e criativos otimizados. Alimenta os canais de divulgação do Microempreendedor.',
      badge: 'SUPORTE CRIATIVO',
      colorClass: 'bg-sky-550/10 border-sky-500/30 text-sky-400'
    },
    leads: {
      title: 'Célula de Gestão de Leads',
      subtitle: 'Distribuição Inteligente de Contatos (Tráfego Pago)',
      description: 'Estruturação de captação centralizada de tráfego pago via anúncios em mídias. Financiada pelo fundo cooperado. Redistribui leads qualificados do WhatsApp direto para os consultores Premium e Master ativos.',
      flowInfo: 'Fluxo: Centraliza investimentos de marketing, atrai clientes locais e encaminha contatos selecionados direto ao WhatsApp dos produtores.',
      badge: 'ALTA PERFORMANCE',
      colorClass: 'bg-indigo-550/15 border-indigo-500/30 text-indigo-400'
    },
    academia: {
      title: 'Academia do Hub',
      subtitle: 'Portal de Formação Básica e Especializações',
      description: 'Área tática com testes comportamentais e trilha rápida de integração. Ensina técnicas de abordagem local, combate a objeções e regras operacionais para formar profissionais capacitados.',
      flowInfo: 'Fluxo: Capacita o Consultor Júnior de forma gratuita. Oferece novas certificações para liberar novos produtos lucrativos.',
      badge: 'CRESCIMENTO',
      colorClass: 'bg-emerald-550/10 border-emerald-500/30 text-emerald-400'
    },
    portal: {
      title: 'Portal do Microempreendedor',
      subtitle: 'Painel de Vendas Único',
      description: 'A ferramenta central do vendedor do dia a dia. Permite selecionar qual solução do catálogo vender, gerar links de checkout, simular ganhos, copiar materiais de marketing prontos e solicitar saques automáticos.',
      flowInfo: 'Fluxo: Entrada pelo consultor para prospecção ativa. Emite links integrados de vendas para envio ao cliente final.',
      badge: 'INTERFACE DO PRODUTOR',
      colorClass: 'bg-amber-550/10 border-amber-500/30 text-amber-400'
    },
    care: {
      title: 'Vertical Care (Cuidado e Bem-Estar)',
      subtitle: 'Soluções Essenciais de Saúde e Proteção',
      description: 'Inclui Telemedicina Imediata 24h, Assistência Funerária Nacional e Energia Solar Compartilhada sem obras. São produtos de altíssima recorrência de pagamento e alta aceitação.',
      flowInfo: 'Comissões de até 80% sobre mensalidades, gerando previsibilidade de ganhos rápidos com o apoio do comercial.',
      badge: 'PRODUTO FAMILIAR',
      colorClass: 'text-rose-500 border-rose-500/20 bg-rose-500/5'
    },
    education: {
      title: 'Vertical Education (Conhecimento)',
      subtitle: 'Cursos Certificados e Graduações Oficiais',
      description: 'Portfólio com cursos técnicos profissionalizantes homologados pelo MEC em 12 meses, Cursos Livres e Bolsas de Graduação e Pós-Graduação com descontos especiais.',
      flowInfo: 'Vendas consultivas de valor elevado, garantindo comissões que chegam a R$ 1.440 por matrícula realizada.',
      badge: 'PRODUTO ACADÊMICO',
      colorClass: 'text-violet-500 border-violet-500/20 bg-violet-500/5'
    },
    business: {
      title: 'Vertical Business (Negócios Locais)',
      subtitle: 'Fortalecimento e Margem para PMEs',
      description: 'Testes comportamentais empresariais (Perfil HMI / MDS), credenciamento de taxas com faturamento de Maquininhas Pro e mentorias de aceleração comercial desenvolvidas.',
      flowInfo: 'Vendas para donos de negócios e profissionais autônomos. Alavanca a receita regional com excelentes splits.',
      badge: 'PRODUTO B2B',
      colorClass: 'text-amber-550 border-amber-500/20 bg-amber-550/5'
    },
    cliente: {
      title: 'Cliente Final (Consumidor)',
      subtitle: 'A Pessoa ou Empresa Beneficiada',
      description: 'O destino de toda a operação. Recebe serviços premium contratados de operadoras renomadas, economiza energia e obtém diplomas reconhecidos, com satisfação monitorada pelo suporte.',
      flowInfo: 'Fluxo: Efetua pagamentos integrados no boleto, pix ou cartão. Recebe suporte de ativação em até 24h.',
      badge: 'DESTINO FINAL',
      colorClass: 'bg-teal-550/10 border-teal-500/30 text-teal-400'
    }
  };

  const filteredMatrix = MATRIX_ITEMS.filter(
    item => matrixFilter === 'todos' || item.category === matrixFilter
  );

  const toggleComprendido = (id: string) => {
    setComprendidoItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalMatrixItemsCount = MATRIX_ITEMS.length;
  const itemsComprendidosCount = Object.values(comprendidoItems).filter(Boolean).length;
  const understandingPercentage = Math.round((itemsComprendidosCount / totalMatrixItemsCount) * 100);

  return (
    <div className="space-y-12 animate-fade-in" id="ecosystem_root">
      {/* SECTION HEADER */}
      <div className="border-b-4 border-black pb-5">
        <span className="bg-amber-400 text-black font-sans text-xs uppercase font-black tracking-widest px-3 py-1.5 border-2 border-black inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Arquitetura e Fluxo de Prospecção
        </span>
        <h2 className="text-3xl font-sans font-black text-black tracking-tight mt-4 uppercase flex items-center gap-3">
          <Network className="w-7 h-7 text-black stroke-[2.5]" />
          Visualização do Ecossistema Comercial (Modelo Radial)
        </h2>
        <p className="text-gray-650 font-sans mt-2 text-sm max-w-4xl font-semibold">
          Sua marca opera em um modelo radial altamente escalável. Você fica no centro do ecossistema provendo a inteligência geral, suporte técnico e canais digitais, habilitando microempreendedores parceiros a buscarem clientes locais de forma ativa e transparente.
        </p>
      </div>

      {/* INTERACTIVE DIAGRAM GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="interactive_diagram_and_details">
        {/* GRAPH BOARD */}
        <div className="lg:col-span-7 bg-slate-50 border-4 border-black p-6 relative flex flex-col justify-between overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] font-mono tracking-widest text-black uppercase bg-amber-400 px-2 py-1 border-2 border-black font-black">
              Mapeamento de Fluxos Interativos
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-[10px] font-mono font-bold text-gray-500 uppercase">
            <span className="w-2.5 h-2.5 bg-red-500 border border-black animate-ping"></span>
            Clique em cada bloco
          </div>

          {/* SIMULATED DIAGRAM WRAPPER */}
          <div className="flex flex-col items-center justify-center my-8 md:my-12 space-y-6 relative" id="ecosystem_diagram_box">
            {/* Level 1: Brand Hub */}
            <button
              onClick={() => setActiveNode('hub')}
              id="node_btn_hub"
              className={`w-full max-w-md py-4 px-6 border-4 border-black text-center transition-all duration-300 transform ${
                activeNode === 'hub'
                  ? 'bg-black text-white hover:bg-black shadow-none font-black translate-y-0.5'
                  : 'bg-white text-black hover:border-black hover:bg-orange-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold'
              }`}
            >
              <span className="text-[9px] font-mono tracking-wider block opacity-80 uppercase">
                [CENTRO DA INTEGRAÇÃO]
              </span>
              <p className="font-sans font-black text-base uppercase">BUSINESS HUB CENTRAL</p>
              <p className="text-xs font-sans font-semibold opacity-90 mt-0.5">
                Gestão Jurídica, Contratos, Tecnologia e Infra de Repasse
              </p>
            </button>

            {/* Vertical arrows down */}
            <div className="w-1 h-3 bg-black relative">
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-r-2 border-b-2 border-black transform rotate-45"></div>
            </div>

            {/* Level 2: Intermediary Hub Columns */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full" id="ecosystem_intermediary_row">
              <button
                type="button"
                onClick={() => setActiveNode('marketing')}
                id="node_btn_marketing"
                className={`py-3 px-2 border-2 border-black text-center transition-all text-xs rounded-none ${
                  activeNode === 'marketing'
                    ? 'bg-sky-400 text-black font-black shadow-none translate-y-0.5'
                    : 'bg-white text-black hover:border-black hover:bg-orange-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold'
                }`}
              >
                <div className="p-1 rounded-none border border-black bg-white text-black w-fit mx-auto mb-1.5">
                  <Laptop className="w-4 h-4" />
                </div>
                <p className="font-sans font-black text-[10px] md:text-xs">MARKETING & IA</p>
                <p className="text-[9px] font-semibold opacity-75 mt-0.5 hidden md:block">Páginas & Criativos</p>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('leads')}
                id="node_btn_leads"
                className={`py-3 px-2 border-2 border-black text-center transition-all text-xs rounded-none ${
                  activeNode === 'leads'
                    ? 'bg-indigo-400 text-black font-black shadow-none translate-y-0.5'
                    : 'bg-white text-black hover:border-black hover:bg-orange-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold'
                }`}
              >
                <div className="p-1 rounded-none border border-black bg-white text-black w-fit mx-auto mb-1.5">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <p className="font-sans font-black text-[10px] md:text-xs">GESTÃO DE LEADS</p>
                <p className="text-[9px] font-semibold opacity-75 mt-0.5 hidden md:block">Distribuição WhatsApp</p>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('academia')}
                id="node_btn_academia"
                className={`py-3 px-2 border-2 border-black text-center transition-all text-xs rounded-none ${
                  activeNode === 'academia'
                    ? 'bg-emerald-400 text-black font-black shadow-none translate-y-0.5'
                    : 'bg-white text-black hover:border-black hover:bg-orange-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold'
                }`}
              >
                <div className="p-1 rounded-none border border-black bg-white text-black w-fit mx-auto mb-1.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <p className="font-sans font-black text-[10px] md:text-xs">ACADEMIA DO HUB</p>
                <p className="text-[9px] font-semibold opacity-75 mt-0.5 hidden md:block">Treinamentos & Perfil</p>
              </button>
            </div>

            {/* Vertical arrows down */}
            <div className="w-1 h-3 bg-black relative">
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-r-2 border-b-2 border-black transform rotate-45"></div>
            </div>

            {/* Level 3: Portal do Microempreendedor */}
            <button
              onClick={() => setActiveNode('portal')}
              id="node_btn_portal"
              className={`w-full max-w-sm py-3 px-5 border-4 border-black text-center transition-all transform rounded-none ${
                activeNode === 'portal'
                  ? 'bg-amber-400 text-black font-black shadow-none translate-y-0.5'
                  : 'bg-white text-black hover:border-black hover:bg-orange-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black uppercase'
              }`}
            >
              <p className="text-[9px] font-mono tracking-wider opacity-85">PAINEL DO VENDEDOR</p>
              <p className="font-sans text-sm font-black uppercase">Portal do Microempreendedor</p>
              <p className="text-[10px] font-sans mt-0.5 font-bold">
                Ponto de apoio unificado para links de vendas, copys e comissões
              </p>
            </button>

            {/* Splitting system row downward */}
            <div className="w-4/5 flex justify-between px-10 relative">
              <div className="w-[2px] h-4 bg-black"></div>
              <div className="w-[2px] h-4 bg-black"></div>
              <div className="w-[2px] h-4 bg-black"></div>
              {/* Horizontal connector line */}
              <div className="absolute top-0 left-10 right-10 h-[2px] bg-black"></div>
            </div>

            {/* Level 4: Verticals */}
            <div className="grid grid-cols-3 gap-3 w-full" id="ecosystem_verticals_row">
              <button
                type="button"
                onClick={() => setActiveNode('care')}
                id="node_btn_care"
                className={`py-3.5 px-1 md:px-2 border-2 border-black text-center transition-all rounded-none ${
                  activeNode === 'care'
                    ? 'bg-rose-400 text-black font-black shadow-none translate-y-0.5'
                    : 'bg-white text-black hover:border-black hover:bg-orange-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold'
                }`}
              >
                <div className="p-1 rounded-none border border-black bg-white text-rose-500 w-fit mx-auto mb-2">
                  <HeartPulse className="w-4 h-4 stroke-[2.5]" />
                </div>
                <p className="font-sans text-[10px] md:text-[11px] font-black uppercase">VERTICAL CARE</p>
                <span className="text-[8px] font-mono block text-gray-500 mt-1 uppercase">Telemedicina, Solar</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('education')}
                id="node_btn_education"
                className={`py-3.5 px-1 md:px-2 border-2 border-black text-center transition-all rounded-none ${
                  activeNode === 'education'
                    ? 'bg-violet-400 text-black font-black shadow-none translate-y-0.5'
                    : 'bg-white text-black hover:border-black hover:bg-orange-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold'
                }`}
              >
                <div className="p-1 rounded-none border border-black bg-white text-violet-500 w-fit mx-auto mb-2">
                  <BookOpen className="w-4 h-4 stroke-[2.5]" />
                </div>
                <p className="font-sans text-[10px] md:text-[11px] font-black uppercase">EDUCATION</p>
                <span className="text-[8px] font-mono block text-gray-500 mt-1 uppercase">Cursos, Graduação</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('business')}
                id="node_btn_business"
                className={`py-3.5 px-1 md:px-2 border-2 border-black text-center transition-all rounded-none ${
                  activeNode === 'business'
                    ? 'bg-amber-400 text-black font-black shadow-none translate-y-0.5'
                    : 'bg-white text-black hover:border-black hover:bg-orange-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold'
                }`}
              >
                <div className="p-1 rounded-none border border-black bg-white text-amber-500 w-fit mx-auto mb-2">
                  <Building className="w-4 h-4 stroke-[2.5]" />
                </div>
                <p className="font-sans text-[10px] md:text-[11px] font-black uppercase">VERTICAL BUSINESS</p>
                <span className="text-[8px] font-mono block text-gray-500 mt-1 uppercase">Taxas, Perfil HMI</span>
              </button>
            </div>

            {/* Vertical arrows merging to client */}
            <div className="w-4/5 flex justify-between px-10 relative">
              <div className="w-[2px] h-4 bg-black"></div>
              <div className="w-[2px] h-4 bg-black"></div>
              <div className="w-[2px] h-4 bg-black"></div>
              {/* Horizontal connector line */}
              <div className="absolute bottom-0 left-10 right-10 h-[2px] bg-black"></div>
            </div>

            <div className="w-1 h-3 bg-black relative">
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-r-2 border-b-2 border-black transform rotate-45"></div>
            </div>

            {/* Cliente Final */}
            <button
              onClick={() => setActiveNode('cliente')}
              id="node_btn_cliente"
              className={`w-full max-w-xs py-2.5 px-4 border-2 border-black text-center transition-all rounded-none ${
                activeNode === 'cliente'
                  ? 'bg-teal-400 text-black font-black shadow-none translate-y-0.5'
                  : 'bg-white text-black hover:border-black hover:bg-orange-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold'
              }`}
            >
              <p className="text-[8px] font-mono uppercase tracking-wide">Ponto de Venda Resolvido</p>
              <p className="font-black text-xs font-sans uppercase flex items-center justify-center gap-1">
                [ CLIENTE FINAL B2C / B2B ]
              </p>
            </button>
          </div>

          <div className="bg-white border-2 border-black p-3.5 text-[11px] text-black font-sans font-semibold flex items-center gap-2 mt-4">
            <span className="p-1 mx-0 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">Fluxo Financeiro:</span>
            O dinheiro flui pelo Gateway com split integrado imediato.
          </div>
        </div>

        {/* DETALHES DO ELEMENTO ATIVO DO DIAGRAMA */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6" id="diagram_active_details_card">
          <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex-1 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="text-[10px] font-mono tracking-widest bg-amber-400 border-2 border-black px-2.5 py-1 text-black font-black uppercase">
                  {nodeDetails[activeNode].badge}
                </span>
              </div>

              <h3 className="font-sans text-xl font-black text-black tracking-tight uppercase">
                {nodeDetails[activeNode].title}
              </h3>
              <p className="text-sm font-semibold text-gray-700 mt-1 border-b-2 border-dashed border-gray-200 pb-3">
                {nodeDetails[activeNode].subtitle}
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-[10px] font-mono font-black text-gray-450 uppercase tracking-wider">
                    Como funciona no Ecossistema:
                  </h4>
                  <p id="active_node_desc" className="text-sm text-gray-750 mt-1 leading-relaxed font-semibold">
                    {nodeDetails[activeNode].description}
                  </p>
                </div>

                <div className="p-4 bg-orange-50/50 border-2 border-black text-xs text-black mt-2">
                  <h4 className="font-black text-[10px] text-black font-mono tracking-wider uppercase mb-1 flex items-center gap-1">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                    Fluxo de Trabalho & Economia:
                  </h4>
                  <p id="active_node_flow" className="leading-relaxed font-semibold">
                    {nodeDetails[activeNode].flowInfo}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t-2 border-dashed border-gray-205 pt-4 flex items-center justify-between">
              <div className="flex gap-1.5" id="diagram_node_small_nav">
                {Object.keys(nodeDetails).slice(0, 5).map((nodeKey) => (
                  <button
                    key={nodeKey}
                    onClick={() => setActiveNode(nodeKey)}
                    className={`w-3 h-3 border-2 border-black transition-all ${
                      activeNode === nodeKey ? 'bg-black scale-125' : 'bg-white hover:bg-gray-200'
                    }`}
                    title={nodeDetails[nodeKey].title}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  const keys = Object.keys(nodeDetails);
                  const nextIdx = (keys.indexOf(activeNode) + 1) % keys.length;
                  setActiveNode(keys[nextIdx]);
                }}
                className="text-xs text-black hover:underline font-black uppercase flex items-center gap-1.5 transition-all"
              >
                Próximo Bloco
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          <div className="bg-black text-white border-4 border-black p-6 flex flex-col justify-between h-[190px] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <div>
              <p className="text-[9px] font-mono tracking-widest text-[#fbbf24] uppercase font-black">
                PROCESSO INTEGRADO DE COMISSÃO
              </p>
              <h4 className="text-base font-sans font-black mt-1 uppercase">Portal do Microempreendedor</h4>
              <p className="text-xs text-slate-300 mt-1.5 font-semibold">
                O consultor recebe links validados do seu HUB e escolhe o que vender no dia diretamente de seu painel integrado.
              </p>
            </div>
            {onNextTab && (
              <button
                onClick={onNextTab}
                className="mt-4 w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-black border-2 border-black font-black uppercase text-xs transition-all flex items-center justify-center gap-1 text-center"
              >
                Acessar o Portal de Vendas
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MATRIX OF RESPONSIBILITIES */}
      <div className="bg-white border-4 border-black p-6 lg:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" id="matrix_responsabilidades_box">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b-2 border-black gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest bg-emerald-400 text-black font-black px-3 py-1.5 border-2 border-black inline-block uppercase">
              Matriz de Responsabilidade
            </span>
            <h3 className="text-2xl font-sans font-black text-black mt-3 block uppercase">
              Quem faz o quê? (Definição de Fronteiras)
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xl font-semibold">
              Delimite as fronteiras operacionais para escalar livremente sem se sobrecarregar.
            </p>
          </div>

          {/* Gamified progress indicator */}
          <div className="bg-white border-2 border-black p-3.5 flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-left font-sans">
              <span className="text-[9px] font-mono text-gray-400 block uppercase font-black">Progresso das Diretrizes</span>
              <span className="text-sm font-sans font-black text-black">{itemsComprendidosCount} de {totalMatrixItemsCount} Lidas</span>
            </div>
            <div className="w-24 bg-gray-200 h-3 border border-black overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${understandingPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-6" id="matrix_filters">
          {['todos', 'Comercial', 'Marketing', 'Cobrança', 'Sucesso'].map((cat) => (
            <button
              key={cat}
              onClick={() => setMatrixFilter(cat)}
              className={`px-3.5 py-2 border-2 border-black text-xs font-sans font-black uppercase tracking-tight transition-all ${
                matrixFilter === cat
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-orange-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              {cat === 'todos' ? 'Ver Todos' : cat}
            </button>
          ))}
        </div>

        {/* Tabular Responsibility Content */}
        <div className="mt-6 border-4 border-black overflow-hidden" id="matrix_table">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-black text-white font-mono text-[10px] font-black px-4 py-3 hidden md:grid">
            <div className="col-span-2">CATEGORIA</div>
            <div className="col-span-2">FUNÇÃO</div>
            <div className="col-span-4 border-l border-gray-700 pl-3">O QUE O HUB (VOCÊ) ENTREGA</div>
            <div className="col-span-4 border-l border-gray-700 pl-3">O QUE O EMPREENDEDOR FAZ</div>
          </div>

          <div className="divide-y-2 divide-black" id="matrix_row_list">
            {filteredMatrix.map((item) => {
              const isComprehended = !!comprendidoItems[item.id];
              const categoryColors: Record<string, string> = {
                Comercial: 'bg-sky-200 text-black border-black',
                Marketing: 'bg-pink-200 text-black border-black',
                Cobrança: 'bg-emerald-200 text-black border-black',
                Sucesso: 'bg-indigo-200 text-black border-black'
              };

              return (
                <div
                  key={item.id}
                  onClick={() => toggleComprendido(item.id)}
                  className={`grid grid-cols-1 md:grid-cols-12 p-4 md:p-5 items-stretch transition-colors hover:bg-orange-50/40 cursor-pointer ${
                    isComprehended ? 'bg-[#f0fdf4]' : ''
                  }`}
                >
                  <div className="col-span-2 flex flex-row md:flex-col justify-between md:justify-center items-start gap-2 mb-3 md:mb-0">
                    <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-1 border-2 ${categoryColors[item.category]}`}>
                      {item.category}
                    </span>
                    <button
                      type="button"
                      className="md:hidden text-xs flex items-center gap-1.5 font-bold text-black"
                    >
                      <CheckCircle2 className={`w-4 h-4 ${isComprehended ? 'text-emerald-600' : 'text-gray-300'}`} />
                      Lido
                    </button>
                  </div>

                  <div className="col-span-2 flex items-center mb-2 md:mb-0">
                    <h4 className="text-sm font-sans font-black text-black uppercase">{item.role}</h4>
                  </div>

                  <div className="col-span-4 md:border-l-2 md:border-black md:pl-4 py-1 flex flex-col justify-center">
                    <span className="text-[10px] font-mono text-gray-450 uppercase md:hidden block font-black mb-1">
                      O HUB Entrega:
                    </span>
                    <p className="text-xs text-black leading-relaxed font-sans font-semibold">{item.hubDelivers}</p>
                  </div>

                  <div className="col-span-4 mt-3 md:mt-0 md:border-l-2 md:border-black md:pl-4 py-1 flex flex-col justify-center font-semibold">
                    <span className="text-[10px] font-mono text-gray-450 uppercase md:hidden block font-black mb-1">
                      O Empreendedor Faz:
                    </span>
                    <p className="text-xs text-gray-750 leading-relaxed font-sans">{item.consultantDoes}</p>
                  </div>

                  {/* Desktop check box */}
                  <div className="hidden md:flex col-span-12 items-center justify-end border-t-2 border-dashed border-gray-200 mt-3 pt-3 gap-2 font-mono">
                    <span className="text-[10px] font-mono font-bold text-gray-500">
                      {isComprehended ? 'ENTENDIDO E VALIDADO!' : 'CLIQUE PARA CONFIRMAR DIRETRIZ'}
                    </span>
                    <div className="p-0.5">
                      <CheckCircle2 className={`w-5 h-5 transition-all ${isComprehended ? 'text-emerald-500 scale-110' : 'text-gray-300 hover:text-black'}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-[10px] font-mono text-slate-400 tracking-wide">
            Dica: Definir com clareza essas regras impede disputas de Split financeiro e gargalos na operação de suporte.
          </p>
        </div>
      </div>
    </div>
  );
}
