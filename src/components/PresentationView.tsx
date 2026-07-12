import React, { useState } from 'react';
import { 
  Award, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Calculator, 
  Play, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Layers,
  Laptop,
  Check,
  Percent,
  Clock,
  HeartHandshake,
  Car,
  BookOpen
} from 'lucide-react';

interface PresentationViewProps {
  onGoToOnboarding: () => void;
  globalSplitRate: number;
}

export default function PresentationView({ onGoToOnboarding, globalSplitRate }: PresentationViewProps) {
  // Navigation inside presentation
  const [activeSegment, setActiveSegment] = useState<'all' | 'entrepreneur' | 'associate' | 'representative'>('all');

  // Calculator states
  const [partnerLevel, setPartnerLevel] = useState<'FLANXER' | 'PRIME' | 'MASTER' | 'PREMIUM'>('FLANXER');
  const [telemedicinaSales, setTelemedicinaSales] = useState<number>(10);
  const [protecaoVeicularSales, setProtecaoVeicularSales] = useState<number>(5);
  const [energiaLimpaSales, setEnergiaLimpaSales] = useState<number>(3);
  const [soehSales, setSoehSales] = useState<number>(8);

  // Network/Team Simulator states (Block 3)
  const [teamSize, setTeamSize] = useState<number>(10);
  const [avgSalesPerMember, setAvgSalesPerMember] = useState<number>(5);

  // 1. Meus Ganhos de Produto (Direct)
  // Telemedicina: R$ 30 adesão (50% de R$ 60) + R$ 12/mês (20%)
  const revTelemedicina = telemedicinaSales * (30 + 12);
  const telemedicinaPF = telemedicinaSales * 7; // 5 PF adesão + 2 PF/mês ativo

  // Proteção Veicular: R$ 262,50 adesão (75% de R$ 350) + R$ 15/mês
  const revProtecao = protecaoVeicularSales * (262.5 + 15);
  const protecaoPF = protecaoVeicularSales * 18; // 15 PF adesão + 3 PF/mês ativo

  // Energia Limpa: R$ 30/mês recorrente (10% sobre fatura mínima de R$ 300)
  const revEnergia = energiaLimpaSales * 30;
  const energiaPF = energiaLimpaSales * 10; // 10 PF/mês ativo

  // SOEH: R$ 5,66/mês recorrente (15% sobre R$ 37,70)
  const revSoeh = soehSales * 5.66;
  const soehPF = soehSales * 3; // 3 PF/mês ativo

  const totalImmediateVal = (telemedicinaSales * 30) + (protecaoVeicularSales * 262.5);
  const totalRecurrentMonthlyVal = (telemedicinaSales * 12) + 
                                   (protecaoVeicularSales * 15) + 
                                   (energiaLimpaSales * 30) + 
                                   (soehSales * 5.66);
  const grandTotalEstimated = totalImmediateVal + totalRecurrentMonthlyVal;

  // Pontos Flanx (PF) Total
  const totalPF = telemedicinaPF + protecaoPF + energiaPF + soehPF;

  // 2. Minha Carreira Flanx Configurations
  const levelsConfig = {
    FLANXER: {
      name: "Flanxer",
      role: "Consultor / Franqueado",
      royalty: 159.90,
      leads: 10,
      targetPF: 300,
      reqsText: "Mantenha 3 indicados diretos ativos e acumule 300 PF (janela de 3 meses)",
      commText: "Tabela de produtos + 30% na 1ª mensalidade de indicados",
      overrideDesc: "—"
    },
    PRIME: {
      name: "Flanxer Prime",
      role: "Supervisor / Líder",
      royalty: 249.90,
      leads: 30, // 10 próprios + 20 p/ equipe
      targetPF: 1200,
      reqsText: "Equipe de 10 ativos (sendo 3 Prime) e acumule 1.200 PF",
      commText: "Tabela de produtos + 30% na 1ª mensalidade de indicados",
      overrideDesc: "+10% recorrente sobre vendas dos Flanxers diretos"
    },
    MASTER: {
      name: "Flanxer Master",
      role: "Gerente / Regional",
      royalty: 399.90,
      leads: 60,
      targetPF: 4000,
      reqsText: "Equipe de 40 ativos (com 2 Masters formados por você) e acumule 4.000 PF",
      commText: "Tabela de produtos + 30% na 1ª mensalidade de indicados",
      overrideDesc: "+10% diretos + 5% sobre 2º e 3º níveis da rede"
    },
    PREMIUM: {
      name: "Flanxer Premium",
      role: "Diretor / Distribuidor / Parceiro",
      royalty: 699.90, // ou R$ 4.990 vitalício único
      leads: 150, // + prioridade total
      targetPF: 4000, // Nível máximo
      reqsText: "Você já está no topo! Vantagens completas ativadas.",
      commText: "Tabela de produtos + 30% na 1ª mensalidade de indicados",
      overrideDesc: "+10% diretos + 5% indiretos + 3% sobre toda a rede de distribuição"
    }
  };

  // 3. Ganhos de Rede overrides (Weighted portfolio recurrent commission average is R$ 15.66 per client)
  const avgRecurrentCommissionPerClient = 15.66;
  const teamTotalRecurrentCommission = teamSize * avgSalesPerMember * avgRecurrentCommissionPerClient;
  
  let overrideAmount = 0;
  if (partnerLevel === 'PRIME') {
    // Prime: 10% on direct team
    overrideAmount = 0.10 * teamTotalRecurrentCommission;
  } else if (partnerLevel === 'MASTER') {
    // Master: 10% direct + 5% on 2nd/3rd level (approx 2x direct team)
    overrideAmount = (0.10 * teamTotalRecurrentCommission) + (0.05 * (teamSize * 2) * avgSalesPerMember * avgRecurrentCommissionPerClient);
  } else if (partnerLevel === 'PREMIUM') {
    // Premium: 10% direct + 5% indirect + 3% on entire network (approx 5x direct team)
    overrideAmount = (0.10 * teamTotalRecurrentCommission) + (0.05 * (teamSize * 2) * avgSalesPerMember * avgRecurrentCommissionPerClient) + (0.03 * (teamSize * 5) * avgSalesPerMember * avgRecurrentCommissionPerClient);
  }

  return (
    <div className="space-y-12 max-w-6xl mx-auto" id="pitch_deck_container">
      
      {/* HERO BANNER SECTION */}
      <section className="bg-gradient-to-br from-navy via-slate-900 to-slate-950 text-white p-8 md:p-12 rounded-3xl shadow-lg relative overflow-hidden" id="presentation_hero">
        {/* Abstract background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Glow effect */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-coral/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-coral text-white text-[10px] font-sans font-bold uppercase px-3 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-bounce text-white" />
            <span>Oportunidade de Negócio • Expansão FLANX 2026</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight leading-none uppercase text-white">
            <span className="block whitespace-nowrap">Comece seu negócio em 7 dias</span>
            <span className="text-coral bg-white/5 px-3 py-1 rounded-2xl border border-coral/20 inline-block mt-2">Com Estrutura Pronta</span>
          </h2>
          
          <p className="text-base md:text-xl font-sans text-slate-200 max-w-3xl font-medium leading-relaxed border-l-4 border-coral pl-4 bg-slate-950/20 p-4 rounded-xl">
            Comece seu negócio em 7 dias com estrutura pronta, treinamento especializado e suporte. Comece a lucrar na primeira semana.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={onGoToOnboarding}
              className="bg-coral hover:bg-white hover:text-coral text-white font-sans font-bold text-xs md:text-sm uppercase tracking-wider py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              id="hero_pitch_cta_btn"
            >
              <span>Quero Fazer Minha Candidatura</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            
            <a
              href="#interactive_calculator"
              className="bg-slate-900 border border-slate-700 hover:border-coral text-slate-300 hover:text-white font-sans text-[11px] md:text-xs uppercase px-5 py-3 rounded-full flex items-center gap-2 transition-all shadow-sm"
            >
              <Calculator className="w-4 h-4 text-coral" />
              <span>Simular Meus Ganhos</span>
            </a>
          </div>
        </div>

        {/* Floating statistics widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800">
          <div className="p-3 bg-slate-950/55 border border-slate-800/80 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase">Comissão Direta</span>
            <span className="text-xl font-bold font-mono text-coral">Até {globalSplitRate}%</span>
          </div>
          <div className="p-3 bg-slate-950/55 border border-slate-800/80 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase">Tempo de Saque</span>
            <span className="text-xl font-bold font-mono text-emerald-400">PIX Instantâneo</span>
          </div>
          <div className="p-3 bg-slate-950/55 border border-slate-800/80 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase">Taxa de Adesão</span>
            <span className="text-xl font-bold font-mono text-white">R$ 0,00</span>
          </div>
          <div className="p-3 bg-slate-950/55 border border-slate-800/80 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase">Royalty Fixo</span>
            <span className="text-xl font-bold font-mono text-blue-400">R$ 49/mês</span>
          </div>
        </div>
      </section>

      {/* SEGMENT SELECTION */}
      <div className="space-y-4 text-center">
        <span className="text-xs font-mono font-bold text-coral uppercase tracking-widest block">PERFIS DE PARCERIA</span>
        <h3 className="text-2xl md:text-3xl font-black uppercase text-slate-900">Apresentação sob medida para o seu Perfil</h3>
        <p className="text-xs text-gray-500 max-w-xl mx-auto font-medium">
          Selecione a modalidade que melhor combina com seu estilo de atuação para ver os benefícios específicos e plano de ação:
        </p>

        <div className="flex flex-wrap justify-center gap-2 pt-2" id="presentation_segments_nav">
          {[
            { id: 'all', label: 'Visão Geral do Hub' },
            { id: 'entrepreneur', label: 'Para Empreendedores Digitais' },
            { id: 'associate', label: 'Para Associados / Afiliados' },
            { id: 'representative', label: 'Para Representantes de Negócios B2B' },
          ].map((seg) => (
            <button
              key={seg.id}
              onClick={() => setActiveSegment(seg.id as any)}
              className={`py-2 px-5 text-xs font-bold uppercase border transition-all rounded-full cursor-pointer ${
                activeSegment === seg.id
                  ? 'bg-coral text-white border-transparent shadow-md'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm'
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>
      </div>

      {/* DINAMIC SEGMENT PRESENTATION BLOCK */}
      <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-3xl shadow-md" id="presentation_segment_body">
        
        {/* ALL / GENERAL OVERVIEW */}
        {activeSegment === 'all' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="p-2 bg-indigo-50 border border-indigo-200 text-indigo-800 w-fit rounded-sm font-semibold text-xs flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Nossa Missão: Democratizar o Empreendedorismo</span>
                </div>
                <h4 className="text-2xl font-black uppercase text-slate-900 leading-tight">
                  Como funciona o ecossistema FLANX Hub?
                </h4>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  Geralmente, começar um negócio próprio exige gastar dezenas de milhares de reais desenvolvendo produtos, abrindo CNPJs, contratando call centers e montando gateways de pagamento complexos. 
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Na FLANX, nós entregamos toda essa infraestrutura pronta e contratada. Você atua como o franqueado local ou online responsável pela divulgação das soluções. O cliente contrata, o dinheiro cai na conta central e é dividido no mesmo instante diretamente para a sua carteira digital.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Split imediato de 80% das vendas no pix</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Atendimento médico 24h e Energia Solar inclusos no catálogo</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Distribuição centralizada de leads de tráfego pago</span>
                  </div>
                </div>
              </div>

              {/* Graphical Card Demonstration */}
              <div className="p-6 bg-slate-900 text-white border-2 border-black relative rounded-sm">
                <div className="absolute top-2 right-2 text-[8px] font-mono text-zinc-500">
                  ESTRUTURA DE COMISSÃO
                </div>
                
                <span className="text-[10px] font-extrabold text-amber-400 block tracking-widest uppercase">
                  SIMULAÇÃO DA DIVISÃO
                </span>
                
                <div className="mt-4 space-y-4">
                  <div className="border border-slate-800 p-3 bg-slate-950">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300">Mensalidade do Cliente Final</span>
                      <span className="text-sm font-bold font-mono text-emerald-400">R$ 100,00</span>
                    </div>
                  </div>

                  {/* Flow arrow down */}
                  <div className="text-center py-1 text-amber-500 text-sm">↓ Split instantâneo de transação</div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-emerald-950 p-2.5 bg-emerald-950/20">
                      <span className="text-[8px] text-emerald-400 font-mono block">SUA CARTEIRA (80%):</span>
                      <strong className="text-sm font-mono text-emerald-300">R$ 80,00</strong>
                    </div>
                    <div className="border border-slate-800 p-2.5 bg-slate-950">
                      <span className="text-[8px] text-slate-400 font-mono block">HUB OPERACIONAL (20%):</span>
                      <strong className="text-sm font-mono text-slate-300">R$ 20,00</strong>
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-400 italic">
                    O Hub cuida do suporte médico, da certificação MEC, do faturamento automático e do suporte pós-venda. Você foca em colocar dinheiro no bolso.
                  </p>
                </div>
              </div>
            </div>

            {/* Bento highlights */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <div className="border-2 border-black p-4 bg-amber-50">
                <span className="p-2 bg-amber-400 border border-black rounded-xs text-black block w-fit mb-3">
                  <Laptop className="w-4 h-4" />
                </span>
                <strong className="text-xs uppercase block text-black">100% Home Office</strong>
                <p className="text-[11px] text-gray-600 mt-1">
                  Opere de onde você estiver, usando apenas um notebook ou celular. Sem estoques físicos.
                </p>
              </div>

              <div className="border-2 border-black p-4 bg-emerald-50">
                <span className="p-2 bg-emerald-400 border border-black rounded-xs text-black block w-fit mb-3">
                  <TrendingUp className="w-4 h-4 text-black" />
                </span>
                <strong className="text-xs uppercase block text-black">Economia Recorrente</strong>
                <p className="text-[11px] text-gray-600 mt-1">
                  Ative clientes de plano solar ou telemedicina e receba comissão todos os meses que o cliente pagar.
                </p>
              </div>

              <div className="border-2 border-black p-4 bg-slate-50">
                <span className="p-2 bg-slate-900 border border-black rounded-xs text-white block w-fit mb-3">
                  <Users className="w-4 h-4" />
                </span>
                <strong className="text-xs uppercase block text-black">Córtex de Leads</strong>
                <p className="text-[11px] text-gray-600 mt-1">
                  A administração do Hub gera leads quentes por anúncios de tráfego pago e distribui para os franqueados ativos.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ENTREPRENEURS PORTFOLIO */}
        {activeSegment === 'entrepreneur' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-l-4 border-amber-400 pl-4 space-y-1">
              <span className="text-[9px] font-mono text-amber-600 uppercase font-bold">EMPREENDEDORES DE ALTO IMPACTO</span>
              <h4 className="text-xl md:text-2xl font-black uppercase text-black">Sua própria agência multissolução, sem custos de desenvolvimento</h4>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              Para você que busca **governar o seu próprio negócios e obter liberdade financeira**, a FLANX Hub é o veículo perfeito. 
              Em vez de se afiliar a infoprodutos amadores de redes sociais que não geram retenção, você comercializa serviços que as pessoas usam todos os dias: médico disponível 24h por menos de R$3 por dia, reduções garantidas de 15% na conta de eletricidade sem obras, e diplomas validados pelo MEC em 12 meses.
            </p>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="border-2 border-black p-5 bg-zinc-50 space-y-3">
                <strong className="text-xs uppercase text-amber-600 block">Benefícios Exclusivos de Franquia:</strong>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Nenhuma taxa de adesão inicial:</strong> Você começa a faturar imediatamente sem pesadas taxas de entrada.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>MDS comportamental gratuito:</strong> Mapeamento do seu perfil para descobrir sua aptidão de liderança e vendas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Escritório Virtual Integrado:</strong> Painel completo para acompanhar vendas, clientes e links rápidos de indicação.</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-black p-5 bg-slate-900 text-white space-y-3">
                <strong className="text-xs uppercase text-amber-400 block">Investimento para Operar:</strong>
                <p className="text-[11px] text-slate-300">
                  Para manter todo o portal ativo, processamento de pagamentos, hospedagem de links e liberação de comissões instantâneas:
                </p>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-2xl font-mono font-black text-white">R$ 49,00</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-mono">/ mensal fixo</span>
                </div>
                <p className="text-[9px] text-emerald-400 uppercase font-semibold">
                  * 1 única indicação de telemedicina por mês já cobre o royalty fixo operacional!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ASSOCIATES PANEL */}
        {activeSegment === 'associate' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-l-4 border-amber-400 pl-4 space-y-1">
              <span className="text-[9px] font-mono text-amber-600 uppercase font-bold">ASSOCIADOS & INFLUENCERS</span>
              <h4 className="text-xl md:text-2xl font-black uppercase text-black">Aumente sua monetização com links de indicação de alta recorrência</h4>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              Se você já tem uma audiência digital, grupos no WhatsApp, contatos comerciais locais ou simplesmente sabe influenciar pessoas, tornar-se um **Associado FLANX** oferece uma forma rápida e profissional de conversão. 
            </p>

            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div className="border-2 border-black p-4 bg-amber-50/50 space-y-1">
                <span className="text-[10px] font-mono text-amber-600 font-extrabold uppercase">PASSO 1</span>
                <strong className="text-xs text-black block uppercase">Customize o Perfil</strong>
                <p className="text-[11px] text-gray-600">
                  Preencha o teste psicotécnico no Portal e ative sua conta. O sistema gera links dinâmicos para cada um dos produtos.
                </p>
              </div>

              <div className="border-2 border-black p-4 bg-teal-50/40 space-y-1">
                <span className="text-[10px] font-mono text-teal-600 font-extrabold uppercase">PASSO 2</span>
                <strong className="text-xs text-black block uppercase">Divulgação Orientada</strong>
                <p className="text-[11px] text-gray-600">
                  Divulgue os produtos usando nosso material de marketing de última geração nas mídias sociais e feeds do celular.
                </p>
              </div>

              <div className="border-2 border-black p-4 bg-emerald-50/50 space-y-1">
                <span className="text-[10px] font-mono text-emerald-600 font-extrabold uppercase">PASSO 3</span>
                <strong className="text-xs text-black block uppercase">Saque Liberado</strong>
                <p className="text-[11px] text-gray-600">
                  O cliente final realiza a contratação. No mesmo instante, o split financeiro deposita até 80% do valor livre na sua carteira.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-black text-white text-xs flex justify-between items-center">
              <span>Quer ver o fluxo de marketing agora?</span>
              <button
                onClick={onGoToOnboarding}
                className="bg-amber-400 text-black font-extrabold px-3 py-1 text-[10px] uppercase hover:bg-white"
              >
                Cadastrar Grátis
              </button>
            </div>
          </div>
        )}

        {/* REPRESENTATIVES PANEL */}
        {activeSegment === 'representative' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-l-4 border-amber-400 pl-4 space-y-1">
              <span className="text-[9px] font-mono text-amber-600 uppercase font-bold">REPRESENTANTES COMERCIAIS & B2B</span>
              <h4 className="text-xl md:text-2xl font-black uppercase text-black">Aporte soluções para empresas da sua cidade e receba grandes comissões</h4>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              Para quem já trabalha no mercado comercial clássico de representação ou quer focar no público de pequenos empresários e lojistas. 
              As soluções B2B da FLANX possuem argumentos imbatíveis de economia que convertem em poucas palavras.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-black p-4 space-y-2 bg-gradient-to-b from-white to-amber-50/20">
                <strong className="text-xs uppercase text-slate-800 block">⚡ Energia Solar Compartilhada</strong>
                <p className="text-[11px] text-gray-600">
                  Ofereça economia imediata na conta de energia de padarias, mercearias, academias e escritórios sem investimentos em placas. Você recebe R$ 105 por indicação aprovada na fatura.
                </p>
              </div>

              <div className="border border-black p-4 space-y-2 bg-gradient-to-b from-white to-amber-50/20">
                <strong className="text-xs uppercase text-slate-800 block">💳 Portfólio de Maquininhas Pro</strong>
                <p className="text-[11px] text-gray-600">
                  Visite estabelecimentos e troque as máquinas de cartão antigas pelas taxas super competitivas do FLANX Hub. Ganhe R$ 80 por máquina instalada, com suporte local de 24h garantido pelo Hub.
                </p>
              </div>

              <div className="border border-black p-4 space-y-2 bg-gradient-to-b from-white to-amber-50/20">
                <strong className="text-xs uppercase text-slate-800 block">🚗 Puma Proteção Veicular</strong>
                <p className="text-[11px] text-gray-600">
                  Apresente proteção veicular integral e assistência 24h sem análise de perfil ou restrição SPC/Serasa para carros, motos e utilitários. Ganhe ótimas comissões por cada indicação.
                </p>
              </div>

              <div className="border border-black p-4 space-y-2 bg-gradient-to-b from-white to-amber-50/20">
                <strong className="text-xs uppercase text-slate-800 block">🎓 Cursos EAD CICON100</strong>
                <p className="text-[11px] text-gray-600">
                  Ofereça dezenas de opções de cursos de capacitação rápida e especializações pelo portal CICON100, agregando certificação nacional. Até R$ 237,60 de comissão direta.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-xs font-semibold text-slate-800">
              💡 <strong>Dica de Estratégia de Alto Giro:</strong> Você pode usar a distribuição de LEADS Gerada pelo Tráfego Pago do Hub! A administração envia contatos quentes demonstrando interesse por maquininhas ou energia solar diretamente à sua lista de abordagens disponíveis.
            </div>
          </div>
        )}

      </div>

      {/* ESTIMATOR / INTERACTIVE SIMULATION SANDBOX */}
      <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8 relative" id="interactive_calculator">
        
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-mono font-black text-amber-600 uppercase tracking-widest block">MODELOS DE REMUNERAÇÃO</span>
          <h3 className="text-3xl font-sans font-black uppercase text-black">Estrutura de Ganhos em 3 Camadas</h3>
          <p className="text-xs text-slate-500 max-w-2xl font-medium">
            Escolha como simular seu retorno financeiro. Você pode fazer simulações de vendas individuais como parceiro ou simular o poder de expandir e capacitar sua própria equipe de consultoria local.
          </p>
        </div>

        {/* OPÇÕES DE EMPREENDEDORISMO COMPARISON MATRIX */}
        <div className="space-y-4">
          <div className="border-b-2 border-black pb-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-500 animate-pulse rounded-full"></span>
            <h4 className="text-sm font-mono font-black uppercase text-slate-800 tracking-wider">
              Opções de Empreendimento - Como e Quanto Ganhar
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'telemedicina',
                title: '1. Telemedicina Conecta',
                icon: HeartHandshake,
                desc: 'Plataforma de saúde inteligente com teleconsultas 24 horas por dia sem filas e descontos em farmácias.',
                howToEarn: 'Divulgação de assinaturas de telemedicina individual ou familiar.',
                whatYouEarn: '50% de comissão na primeira mensalidade do cliente + 20% de recorrência mensal ativa.',
                averageVal: 'R$ 60,00 /mês',
                commissionVal: 'R$ 30,00 (Adesão) + R$ 12,00/mês recorrente por cliente.',
                badge: 'Saúde 24h',
                badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300'
              },
              {
                id: 'protecao',
                title: '2. Proteção Veicular',
                icon: Car,
                desc: 'Proteção integral contra colisão, roubo, furto, incêndio e assistência 24h sem análise de perfil.',
                howToEarn: 'Indicação de proprietários de carros, motos e utilitários.',
                whatYouEarn: '75% do valor integral de adesão pago pelo cliente + comissão mensal recorrente.',
                averageVal: 'R$ 350,00 (Adesão)',
                commissionVal: 'R$ 262,50 (Adesão) + R$ 15,00/mês recorrente por veículo.',
                badge: 'Alta Conversão',
                badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300'
              },
              {
                id: 'soeh',
                title: '3. SOEH Desenvolvimento',
                icon: BookOpen,
                desc: 'Clube de desenvolvimento pessoal, autoconhecimento, inteligência emocional e soft skills.',
                howToEarn: 'Promoção de assinaturas básicas do clube através de links de afiliado.',
                whatYouEarn: '15% de comissão recorrente todos os meses enquanto a assinatura estiver ativa.',
                averageVal: 'R$ 37,70 /mês',
                commissionVal: 'R$ 5,66/mês recorrente por aluno ativo.',
                badge: 'Recorrência EAD',
                badgeBg: 'bg-purple-100 text-purple-800 border-purple-300'
              },
              {
                id: 'energia',
                title: '4. Energia Limpa',
                icon: Zap,
                desc: 'Economia imediata e garantida de até 15% na conta de luz de residências ou empresas. Sem obras ou placas.',
                howToEarn: 'Indicação simples de faturas de energia (mínimo de R$ 300,00/mês).',
                whatYouEarn: '10% de comissão recorrente mensal sobre o valor total da fatura indicada e conectada.',
                averageVal: 'R$ 300,00 (Fatura Mín.)',
                commissionVal: '10% da fatura (Mín. R$ 30,00/mês recorrente por conta).',
                badge: 'Contrato Vitalício',
                badgeBg: 'bg-amber-100 text-amber-800 border-amber-300'
              }
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="border-4 border-black p-5 flex flex-col justify-between space-y-4 bg-slate-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 uppercase border border-black ${item.badgeBg}`}>
                        {item.badge}
                      </span>
                      <Icon className="w-5 h-5 text-amber-500" />
                    </div>
                    
                    <h5 className="font-sans font-black text-sm uppercase text-slate-900 border-b-2 border-black pb-1.5">
                      {item.title}
                    </h5>

                    <div className="space-y-2 text-[11px] leading-relaxed text-slate-700">
                      <div>
                        <strong className="text-black block uppercase text-[9px] font-mono text-slate-500">O que é:</strong>
                        <p>{item.desc}</p>
                      </div>
                      <div>
                        <strong className="text-black block uppercase text-[9px] font-mono text-slate-500">Como Empreender:</strong>
                        <p className="font-semibold text-slate-900">{item.howToEarn}</p>
                      </div>
                      <div>
                        <strong className="text-black block uppercase text-[9px] font-mono text-slate-500">Como você ganha:</strong>
                        <p className="font-bold text-slate-950 bg-amber-50 p-1.5 border-l-2 border-amber-500">{item.whatYouEarn}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-black bg-white -mx-5 -mb-5 p-4 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Valor Médio Base:</span>
                      <strong className="text-slate-800 font-mono font-black">{item.averageVal}</strong>
                    </div>
                    <div className="flex justify-between text-[11px] items-baseline">
                      <span className="text-slate-900 font-black uppercase text-[9px]">Sua Comissão:</span>
                      <strong className="text-emerald-600 font-sans font-black text-right text-xs">
                        {item.commissionVal}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 DISTINCT CONNECTED BLOCKS SYSTEM */}
        <div className="space-y-12">
          
          {/* GRID: BLOCO 1 & BLOCO 2 SIDE BY SIDE FOR POWERFUL SYNERGY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* BLOCO 1: MEUS GANHOS DE PRODUTO */}
            <div className="lg:col-span-6 bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 bg-slate-900 text-amber-400 text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md">
                  <span>Bloco 1</span>
                </div>
                <h4 className="text-lg font-sans font-black uppercase text-slate-900">Meus Ganhos de Produto</h4>
                <p className="text-[11px] text-slate-500 font-sans">
                  Simule suas indicações diretas mensais de cada produto homologado.
                </p>
              </div>

              {/* Slider 1: Telemedicina */}
              <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-emerald-500" />
                    <span>Telemedicina Conecta</span>
                  </span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded-md font-black text-xs">
                    {telemedicinaSales} un
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={telemedicinaSales}
                  onChange={(e) => setTelemedicinaSales(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" 
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Comissão: R$ 30 adesão + R$ 12/mês</span>
                  <span className="text-amber-600 font-bold font-sans">+7 PF por venda</span>
                </div>
              </div>

              {/* Slider 2: Proteção Veicular */}
              <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-indigo-500" />
                    <span>Proteção Veicular</span>
                  </span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded-md font-black text-xs">
                    {protecaoVeicularSales} un
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={protecaoVeicularSales}
                  onChange={(e) => setProtecaoVeicularSales(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" 
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Comissão: R$ 262,50 adesão + R$ 15/mês</span>
                  <span className="text-amber-600 font-bold font-sans">+18 PF por venda</span>
                </div>
              </div>

              {/* Slider 3: Energia Limpa */}
              <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>Indicações de Energia Limpa</span>
                  </span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded-md font-black text-xs">
                    {energiaLimpaSales} un
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={energiaLimpaSales}
                  onChange={(e) => setEnergiaLimpaSales(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" 
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Comissão: R$ 30,00/mês recorrente</span>
                  <span className="text-amber-600 font-bold font-sans">+10 PF por indicação</span>
                </div>
              </div>

              {/* Slider 4: SOEH */}
              <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span>Programa SOEH</span>
                  </span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded-md font-black text-xs">
                    {soehSales} un
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  value={soehSales}
                  onChange={(e) => setSoehSales(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" 
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Comissão: R$ 5,66/mês recorrente</span>
                  <span className="text-amber-600 font-bold font-sans">+3 PF por assinatura</span>
                </div>
              </div>

              {/* BLOCK 1 SUMMARY BAR */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl border-2 border-black space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Total Imediato (Adesão):</span>
                  <strong className="text-sm font-mono text-emerald-400">R$ {totalImmediateVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                </div>
                <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Total Recorrente Mensal:</span>
                  <strong className="text-sm font-mono text-emerald-400">R$ {totalRecurrentMonthlyVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</strong>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs font-sans font-bold uppercase text-slate-200 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Pontuação Acumulada:</span>
                  </span>
                  <strong className="text-base font-mono bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md font-black">
                    {totalPF} PF
                  </strong>
                </div>
              </div>
            </div>

            {/* BLOCO 2: MINHA CARREIRA FLANX */}
            <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-3xl border-4 border-slate-950 space-y-6 shadow-xl">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md">
                  <span>Bloco 2</span>
                </div>
                <h4 className="text-lg font-sans font-black uppercase text-white">Minha Carreira Flanx</h4>
                <p className="text-[11px] text-slate-400 font-sans">
                  Sua pontuação define seu nível de carreira e multiplica seus benefícios.
                </p>
              </div>

              {/* LEVEL SELECTOR GRID - 4 LEVELS */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { level: 'FLANXER', label: 'Flanxer', badge: 'Consultor' },
                  { level: 'PRIME', label: 'Prime', badge: 'Líder' },
                  { level: 'MASTER', label: 'Master', badge: 'Gerente' },
                  { level: 'PREMIUM', label: 'Premium', badge: 'Diretor' }
                ].map(item => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setPartnerLevel(item.level as any)}
                    className={`p-3 border rounded-xl text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                      partnerLevel === item.level
                        ? 'bg-amber-400 border-amber-400 text-slate-950 shadow-md scale-[1.02] font-black'
                        : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider opacity-80">
                        {item.badge}
                      </span>
                      {partnerLevel === item.level && (
                        <Check className="w-3.5 h-3.5 stroke-[3] text-slate-950" />
                      )}
                    </div>
                    <span className="text-xs font-sans font-extrabold uppercase mt-1 tracking-tight">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* SPECS CARD OF SELECTED LEVEL */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Cargo Corporativo:</span>
                  <span className="text-amber-400 font-bold uppercase">{levelsConfig[partnerLevel].role}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Royalty Mensal:</span>
                  <strong className="text-slate-200">
                    {partnerLevel === 'PREMIUM' ? 'R$ 699,90/mês ou Vitalício' : `R$ ${levelsConfig[partnerLevel].royalty.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  </strong>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Leads do Hub Enviados:</span>
                  <span className="text-emerald-400 font-bold font-mono">{levelsConfig[partnerLevel].leads} /mês</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-400 shrink-0 mr-4">Bônus de Liderança (Override):</span>
                  <span className="text-right text-slate-200 font-medium font-sans text-[11px] leading-snug">
                    {levelsConfig[partnerLevel].overrideDesc}
                  </span>
                </div>
              </div>

              {/* PROGRESS BAR TO NEXT LEVEL */}
              <div className="space-y-2 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  <span>Progresso de Qualificação:</span>
                  <span className="text-amber-400 font-bold font-mono">
                    {partnerLevel === 'PREMIUM' ? 'Nível Máximo' : `${totalPF} / ${levelsConfig[partnerLevel].targetPF} PF`}
                  </span>
                </div>
                
                {/* Visual track */}
                <div className="w-full bg-slate-850 h-3 rounded-full overflow-hidden border border-slate-800 relative">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-500"
                    style={{ 
                      width: `${
                        partnerLevel === 'FLANXER' ? Math.min(100, (totalPF / 300) * 100) :
                        partnerLevel === 'PRIME' ? Math.min(100, (totalPF / 1200) * 100) :
                        partnerLevel === 'MASTER' ? Math.min(100, (totalPF / 4000) * 100) : 100
                      }%` 
                    }}
                  />
                </div>

                <p className="text-[10px] text-slate-300 leading-relaxed pt-1">
                  <strong>Requisito Faltante:</strong> {levelsConfig[partnerLevel].reqsText}
                </p>
              </div>

              {/* POINTS ACCUMULATION GUIDE BADGE */}
              <div className="p-3 bg-slate-950 rounded-xl text-[10px] text-slate-400 space-y-1.5 border border-slate-800 leading-normal">
                <span className="font-bold text-slate-200 uppercase tracking-wider block">Como acumular Pontos Flanx (PF) por indicação:</span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div>• Telemedicina: <span className="text-white font-mono">7 PF</span></div>
                  <div>• Proteção Veicular: <span className="text-white font-mono">18 PF</span></div>
                  <div>• Energia Limpa: <span className="text-white font-mono">10 PF</span></div>
                  <div>• Assinatura SOEH: <span className="text-white font-mono">3 PF</span></div>
                  <div className="col-span-2 text-amber-400 font-semibold">• Novo Flanxer ativo (1ª venda): +20 PF</div>
                </div>
              </div>

            </div>

          </div>

          {/* BLOCO 3: GANHOS DE REDE */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-black space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 bg-slate-900 text-amber-400 text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md">
                  <span>Bloco 3</span>
                </div>
                <h4 className="text-xl font-sans font-black uppercase text-slate-900">Ganhos de Rede</h4>
                <p className="text-xs text-slate-500 font-sans">
                  Simule o poder multiplicador de expandir uma equipe de parceiros "Flanxers" sob seu comando.
                </p>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-100 text-xs">
                💡 <strong>Comissionamento Saudável:</strong> Livre de riscos de pirâmide legal.
              </div>
            </div>

            {/* IF USER IS FLANXER, PROMPT THEM TO CHOOSE PRIME TO SEE OVERRIDES */}
            {partnerLevel === 'FLANXER' ? (
              <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
                <Users className="w-12 h-12 text-slate-400 mx-auto" />
                <h5 className="font-extrabold text-sm uppercase text-slate-800">Ganhos de equipe bloqueados no nível Flanxer</h5>
                <p className="text-xs text-slate-500 max-w-lg mx-auto">
                  Como <strong>Flanxer (Consultor/Franqueado)</strong>, seu foco está nas excelentes comissões diretas do Bloco 1. 
                  Para destravar ganhos de rede e overrides recorrentes sobre equipe, selecione o nível <strong>Flanxer Prime</strong> ou superior no Bloco 2.
                </p>
                <button 
                  onClick={() => setPartnerLevel('PRIME')}
                  className="bg-slate-900 text-white text-xs font-bold uppercase px-4 py-2 rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Simular como Flanxer Prime
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Sliders for Team setup */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Slider team size */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-slate-800 uppercase flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-slate-700" />
                        <span>Tamanho da sua Equipe Ativa (Flanxers Diretos)</span>
                      </span>
                      <span className="font-mono bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded-md font-black text-xs">
                        {teamSize} parceiros
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" 
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>1 parceiro</span>
                      <span>100 parceiros</span>
                    </div>
                  </div>

                  {/* Slider average sales per member */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-slate-800 uppercase flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-slate-700" />
                        <span>Clientes recorrentes ativos por membro</span>
                      </span>
                      <span className="font-mono bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded-md font-black text-xs">
                        {avgSalesPerMember} clientes
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      value={avgSalesPerMember}
                      onChange={(e) => setAvgSalesPerMember(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" 
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>1 cliente</span>
                      <span>Assumindo portfólio médio recorrente de R$ 15,66/cliente</span>
                      <span>30 clientes</span>
                    </div>
                  </div>

                  {/* Sustentabilidade help card */}
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs space-y-1.5 text-slate-800">
                    <div className="flex items-center gap-1.5 font-bold uppercase text-amber-800 text-[10px] tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>Sustentabilidade & Conformidade Legal Brasileira</span>
                    </div>
                    <p className="leading-relaxed">
                      O override incide exclusivamente sobre a comissão recorrente gerada pelas <strong>vendas reais de produto/serviço</strong> da sua equipe — nunca sobre a taxa de royalty mensal. Isso garante que todo o fluxo de caixa seja gerado de forma idônea, sem qualquer caracterização de pirâmide financeira de acordo com a legislação do Brasil.
                    </p>
                  </div>

                </div>

                {/* Network earnings card */}
                <div className="lg:col-span-5 bg-slate-950 text-white p-6 rounded-3xl border-2 border-amber-400 space-y-6">
                  <div className="space-y-1">
                    <span className="text-[8.5px] font-mono tracking-widest text-amber-400 font-black uppercase block">
                      SIMULAÇÃO DE RESIDUAL DE REDE
                    </span>
                    <h5 className="font-sans font-black text-sm uppercase text-slate-100">
                      Cálculo de Bônus de Liderança
                    </h5>
                  </div>

                  <div className="space-y-3.5 text-xs border-t border-b border-slate-800 py-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Parceiros Diretos Ativos:</span>
                      <span className="font-mono text-white font-bold">{teamSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Clientes Totais da Rede:</span>
                      <span className="font-mono text-white font-bold">{teamSize * avgSalesPerMember} un</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Faturamento da Equipe (Recorr.):</span>
                      <span className="font-mono text-slate-300">R$ {teamTotalRecurrentCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-800/60 pt-2 text-amber-400 font-bold">
                      <span>Nível Atual / Alvo:</span>
                      <span className="uppercase text-[11px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">{levelsConfig[partnerLevel].name}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Taxa de Override:</span>
                      <span className="font-semibold text-emerald-400">
                        {partnerLevel === 'PRIME' ? '+10% Direto' : partnerLevel === 'MASTER' ? '+10% Direto + 5% Indireto' : '+10% Direto + 5% Indireto + 3% Adicional'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-800 text-center space-y-1 rounded-2xl">
                    <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-wider block">seu residual de rede estimado</span>
                    <p className="text-3xl font-mono font-black text-emerald-400 tracking-tight">
                      R$ {overrideAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                    </p>
                    <span className="text-[8.5px] font-bold text-amber-400 uppercase block">
                      Rendimentos extras de liderança ativa
                    </span>
                  </div>

                  <button
                    onClick={onGoToOnboarding}
                    className="w-full py-3 bg-amber-400 hover:bg-white text-slate-950 font-sans font-black text-xs uppercase tracking-widest border-2 border-slate-950 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Montar Minha Rede Flanx</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </section>

      {/* MATRIX OF RESPONSIBILITY COMPARISON */}
      <section className="bg-slate-100 border-4 border-black p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block">MATRIZ DE TRABALHO</span>
          <h3 className="text-2xl font-black uppercase text-black">A Divisão de Responsabilidades</h3>
          <p className="text-xs text-gray-600 max-w-xl">
            A FLANX é uma verdadeira parceria. Veja o que nós entregamos contra o que fica sob sua responsabilidade:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          
          <div className="border-2 border-black p-5 bg-white space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="inline-flex items-center gap-1.5 text-xs bg-slate-900 text-[#fbbf24] px-2 py-0.5 font-bold uppercase">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping"></span>
              O que a FLANX Hub fornece e resolve para você:
            </div>
            
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-amber-100 border border-black rounded-full flex items-center justify-center text-[10px] font-black text-amber-700 shrink-0 select-none mt-0.5">1</span>
                <div>
                  <strong>Produtos de Altíssima Giro:</strong> Integração direta com operadoras de telemedicina, consórcios, distribuidoras de energia e faculdades autorizadas pelo MEC.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-amber-100 border border-black rounded-full flex items-center justify-center text-[10px] font-black text-amber-700 shrink-0 select-none mt-0.5">2</span>
                <div>
                  <strong>Motor Financeiro Automatic Split:</strong> Recebimento das parcelas via cartões e PIX com divisão e repasse instantâneo automático livre de riscos.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-amber-100 border border-black rounded-full flex items-center justify-center text-[10px] font-black text-amber-700 shrink-0 select-none mt-0.5">3</span>
                <div>
                  <strong>Material de Marketing Pronto:</strong> Campanhas prontas de criativos, criadores automáticos de posts de WhatsApp e vídeos com scripts de abordagens eficientes.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-amber-100 border border-black rounded-full flex items-center justify-center text-[10px] font-black text-amber-700 shrink-0 select-none mt-0.5">4</span>
                <div>
                  <strong>Suporte no Pós Venda Técnico:</strong> O cliente final entra em contato com o suporte central FLANX para tirar dúvidas sobre consultas e liberação do diploma escolar.
                </div>
              </li>
            </ul>
          </div>

          <div className="border-2 border-black p-5 bg-white space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="inline-flex items-center gap-1.5 text-xs bg-amber-400 text-black px-2 py-0.5 font-bold uppercase border border-black">
              O que você, Franqueado/Representante, faz:
            </div>

            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-slate-100 border border-black rounded-full flex items-center justify-center text-[10px] font-black text-slate-800 shrink-0 select-none mt-0.5">1</span>
                <div>
                  <strong>Customizar e atentar-se aos Links:</strong> Pegar o link no portal e divulgar online da maneira correta usando seus canais digitais.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-slate-100 border border-black rounded-full flex items-center justify-center text-[10px] font-black text-slate-800 shrink-0 select-none mt-0.5">2</span>
                <div>
                  <strong>Abordar Contatos e Leads de Tráfego:</strong> Atender com empatia e agilidade aos contatos interessados e leads distribuídos pelo painel operacional do Hub.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-slate-100 border border-black rounded-full flex items-center justify-center text-[10px] font-black text-slate-800 shrink-0 select-none mt-0.5">3</span>
                <div>
                  <strong>Efetuar Fechamentos Básicos:</strong> Explicar os benefícios e guiar o cliente a preencher o formulário simples de contração usando o link.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-slate-100 border border-black rounded-full flex items-center justify-center text-[10px] font-black text-slate-800 shrink-0 select-none mt-0.5">4</span>
                <div>
                  <strong>Aproveitar e Sacar seus Ganhos:</strong> Acompanhar suas vendas ativas e requisitar o envio dos seus PIX de comissão diretamente do seu celular.
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION (CTA) CARD */}
      <section className="bg-slate-900 text-white p-8 md:p-12 text-center border-4 border-black space-y-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="final_presentation_cta">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-amber-400 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest">
            VAGAS REGIONAIS LIMITADAS PARA 2026
          </p>
          <h3 className="text-2xl md:text-4xl font-black uppercase text-white">
            Pronto para Governar sua Renda?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-lg mx-auto">
            Não perca tempo tentando de forma amadora. Junte-se a Cidade Consultorias, Mariana Sales, Bruno Carvalho e centenas de outros parceiros lucrando com comissão alta e recorrência líquida na maior microfranquia do Brasil.
          </p>

          <div className="pt-4">
            <button
              onClick={onGoToOnboarding}
              className="bg-amber-400 hover:bg-white text-black font-sans font-black text-xs md:text-sm uppercase py-3.5 px-8 border-2 border-black tracking-wider transition-all inline-flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
              <span>Fazer Candidatura Agora</span>
              <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
