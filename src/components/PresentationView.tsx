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
  const [partnerLevel, setPartnerLevel] = useState<'JUNIOR' | 'SUPERVISOR' | 'GERENTE'>('SUPERVISOR');
  const [telemedicinaSales, setTelemedicinaSales] = useState<number>(10);
  const [protecaoVeicularSales, setProtecaoVeicularSales] = useState<number>(5);
  const [energiaLimpaSales, setEnergiaLimpaSales] = useState<number>(3);
  const [soehSales, setSoehSales] = useState<number>(8);
  const [emBreveSales, setEmBreveSales] = useState<number>(2);

  // Network Simulator states
  const [simulatorTab, setSimulatorTab] = useState<'individual' | 'network'>('individual');
  const [networkStarter, setNetworkStarter] = useState<number>(30);
  const [networkGrowth, setNetworkGrowth] = useState<number>(50);
  const [networkMaster, setNetworkMaster] = useState<number>(20);
  const [averageSalesPerPartner, setAverageSalesPerPartner] = useState<number>(3);

  // Dynamic commission calculations based on level and product
  const getCommissionInfo = (prod: string, level: 'JUNIOR' | 'SUPERVISOR' | 'GERENTE') => {
    if (prod === 'telemedicina') {
      if (level === 'JUNIOR') return { immediate: 40, recurrent: 16, label: "50% 1ª Mensalidade (R$ 40) + 20% Recorrente (R$ 16)" };
      if (level === 'SUPERVISOR') return { immediate: 40, recurrent: 24, label: "50% 1ª Mensalidade (R$ 40) + 20% Recorrente + 10% Recorrente Equipe (R$ 24)" };
      return { immediate: 40, recurrent: 25.2, label: "Ganhos anteriores + 5% bônus de gerência de equipe (R$ 25.20)" };
    }
    if (prod === 'protecao-veicular') {
      if (level === 'JUNIOR') return { immediate: 90, recurrent: 15, label: "75% Adesão (R$ 90) + R$ 15 Recorrente" };
      if (level === 'SUPERVISOR') return { immediate: 90, recurrent: 25, label: "75% Adesão (R$ 90) + R$ 15 Recorrente + R$ 10 Equipe" };
      return { immediate: 90, recurrent: 30.75, label: "Ganhos anteriores + 5% bônus de gerência (R$ 30.75)" };
    }
    if (prod === 'energia-limpa') {
      if (level === 'JUNIOR') return { immediate: 0, recurrent: 15, label: "Comissão mensal recorrente de R$ 15,00" };
      if (level === 'SUPERVISOR') return { immediate: 0, recurrent: 25, label: "Recorrente R$ 15 + R$ 10 Equipe (R$ 25,00)" };
      return { immediate: 0, recurrent: 30, label: "Ganhos anteriores + R$ 5 bônus de gerência (R$ 30,00)" };
    }
    if (prod === 'soeh') {
      if (level === 'JUNIOR') return { immediate: 0, recurrent: 15, label: "30% de afiliação recorrente mensal (R$ 15,00)" };
      if (level === 'SUPERVISOR') return { immediate: 0, recurrent: 20, label: "Recorrente R$ 15 + R$ 5 Equipe (R$ 20,00)" };
      return { immediate: 0, recurrent: 25, label: "Ganhos anteriores + R$ 5 bônus de gerência (R$ 25,00)" };
    }
    return { immediate: 0, recurrent: 50, label: "Estime comissões futuras de lançamentos" };
  };

  const commTelemedicina = getCommissionInfo('telemedicina', partnerLevel);
  const commProtecao = getCommissionInfo('protecao-veicular', partnerLevel);
  const commEnergia = getCommissionInfo('energia-limpa', partnerLevel);
  const commSoeh = getCommissionInfo('soeh', partnerLevel);
  const commEmBreve = getCommissionInfo('em-breve', partnerLevel);

  const revTelemedicina = telemedicinaSales * (commTelemedicina.immediate + commTelemedicina.recurrent);
  const revProtecao = protecaoVeicularSales * (commProtecao.immediate + commProtecao.recurrent);
  const revEnergia = energiaLimpaSales * (commEnergia.immediate + commEnergia.recurrent);
  const revSoeh = soehSales * (commSoeh.immediate + commSoeh.recurrent);
  const revEmBreve = emBreveSales * (commEmBreve.immediate + commEmBreve.recurrent);

  const totalImmediateVal = (telemedicinaSales * commTelemedicina.immediate) + (protecaoVeicularSales * commProtecao.immediate);
  const totalRecurrentMouthlyVal = (telemedicinaSales * commTelemedicina.recurrent) + 
                                   (protecaoVeicularSales * commProtecao.recurrent) + 
                                   (energiaLimpaSales * commEnergia.recurrent) + 
                                   (soehSales * commSoeh.recurrent) +
                                   (emBreveSales * commEmBreve.recurrent);
  const grandTotalEstimated = totalImmediateVal + totalRecurrentMouthlyVal;

  // Network simulation math
  const subBaseStarter = 0;
  const subBaseGrowth = networkGrowth * 197;
  const subBaseMaster = networkMaster * 497;
  const totalSubBase = subBaseStarter + subBaseGrowth + subBaseMaster;

  // Let's assume average product value of R$ 150 for network sales
  const avgProductPriceForResidual = 150;
  const residualStarter = networkStarter * averageSalesPerPartner * avgProductPriceForResidual * 0.35;
  const residualGrowth = networkGrowth * averageSalesPerPartner * avgProductPriceForResidual * 0.25;
  const residualMaster = networkMaster * averageSalesPerPartner * avgProductPriceForResidual * 0.20;
  const totalResidual = residualStarter + residualGrowth + residualMaster;

  const totalNetworkRevenue = totalSubBase + totalResidual;

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

        {/* Tab selection */}
        <div className="flex flex-col sm:flex-row border-2 border-black" id="simulator_tab_nav">
          <button
            onClick={() => setSimulatorTab('individual')}
            className={`flex-1 py-3 text-xs font-sans font-black uppercase transition-all flex items-center justify-center gap-2 ${
              simulatorTab === 'individual'
                ? 'bg-amber-400 text-black border-b-2 border-b-black md:border-b-0'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Users className="w-4 h-4 text-slate-900" />
            <span>📊 Simulação Individual (Meus Ganhos)</span>
          </button>
          <button
            onClick={() => setSimulatorTab('network')}
            className={`flex-1 py-3 text-xs font-sans font-black uppercase border-t-2 border-black sm:border-t-0 sm:border-l-2 transition-all flex items-center justify-center gap-2 ${
              simulatorTab === 'network'
                ? 'bg-amber-400 text-black border-b-2 border-b-black md:border-b-0'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-slate-900" />
            <span>🕸️ Simular Minha Rede de Empreendedores (Sua Expansão)</span>
          </button>
        </div>

        {simulatorTab === 'individual' ? (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6 border-b lg:border-b-0 lg:border-r border-black pb-6 lg:pb-0 lg:pr-8">
              
              {/* Level selector */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase text-slate-800 block">Escolha seu Nível de Atuação para Simular:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { level: 'JUNIOR', rate: 'Comissão Direta', desc: 'Produtor Júnior', color: 'border-slate-400' },
                    { level: 'SUPERVISOR', rate: '+10% de Equipe', desc: 'Liderança Ativa', color: 'border-amber-400' },
                    { level: 'GERENTE', rate: '+5% de Supervisão', desc: 'Direção Geral', color: 'border-cyan-400' }
                  ].map(item => (
                    <button
                      key={item.level}
                      type="button"
                      onClick={() => setPartnerLevel(item.level as any)}
                      className={`p-3 border-2 border-black text-left flex flex-col justify-between transition-all ${
                        partnerLevel === item.level
                          ? 'bg-amber-400 text-black font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                          : 'bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-xs font-black font-sans uppercase">
                          {item.level === 'JUNIOR' ? 'Júnior' : item.level === 'SUPERVISOR' ? 'Supervisor' : 'Gerente'}
                        </span>
                        {partnerLevel === item.level && <Check className="w-3.5 h-3.5 stroke-[3] text-black" />}
                      </div>
                      <div className="flex flex-col mt-4 w-full">
                        <span className="text-sm font-sans font-extrabold text-slate-900">{item.desc}</span>
                        <span className="text-[10px] font-mono font-bold text-slate-600 uppercase mt-0.5">{item.rate}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic level info card */}
              <div className="border-2 border-black p-4 bg-slate-50 space-y-2">
                <strong className="text-xs text-slate-900 uppercase block">
                  Regras de Ganho para o nível {partnerLevel === 'JUNIOR' ? 'Júnior' : partnerLevel === 'SUPERVISOR' ? 'Supervisor' : 'Gerente'}:
                </strong>
                {partnerLevel === 'JUNIOR' && (
                  <ul className="text-[11px] text-gray-700 space-y-1.5 font-mono list-disc pl-4">
                    <li><strong className="text-black">Função de Entrega Direta:</strong> Focado em atendimento individual e vendas de alta conversão</li>
                    <li><strong className="text-black">Telemedicina:</strong> 50% de comissão na primeira mensalidade + 20% recorrente todos os meses</li>
                    <li><strong className="text-black">Proteção Veicular:</strong> 75% do valor de adesão do cliente + Recorrência mensal definida por veículo</li>
                    <li><strong className="text-black">Energia Limpa:</strong> Ganho recorrente mensal de R$ 15,00 por cliente economizando</li>
                    <li><strong className="text-black">Programa SOEH:</strong> 30% de afiliação recorrente sobre assinaturas de desenvolvimento pessoal</li>
                  </ul>
                )}
                {partnerLevel === 'SUPERVISOR' && (
                  <ul className="text-[11px] text-gray-700 space-y-1.5 font-mono list-disc pl-4">
                    <li><strong className="text-black">Ganhos Acumulados:</strong> Recebe todos os ganhos de Produtor Júnior nas vendas diretas</li>
                    <li><strong className="text-black">Remuneração de Liderança:</strong> +10% de comissão recorrente sobre a equipe supervisionada</li>
                    <li><strong className="text-black">Energia Limpa & SOEH:</strong> Recorrência extra por acompanhamento e mentoria de novos consultores</li>
                    <li><strong className="text-black">Aceleração:</strong> Perfeito para quem quer construir rede e multiplicar vendas sem depender apenas do esforço próprio</li>
                  </ul>
                )}
                {partnerLevel === 'GERENTE' && (
                  <ul className="text-[11px] text-gray-700 space-y-1.5 font-mono list-disc pl-4">
                    <li><strong className="text-black">Elite da Microfranquia:</strong> Todos os ganhos de Júnior + Supervisor</li>
                    <li><strong className="text-black">Bônus de Gerência Superior:</strong> +5% sobre o faturamento de todos os Supervisores da sua estrutura</li>
                    <li><strong className="text-black">Participação de Resultados:</strong> Acesso prioritário a rodadas de leads de tráfego pago da matriz</li>
                    <li><strong className="text-black">Dashboard Executivo:</strong> Visão completa de crescimento de filiais e controle de repasse automático</li>
                  </ul>
                )}
              </div>

              {/* Slider 1: Telemedicina Sales */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase">1. Telemedicina Conecta (Assinaturas/mês)</span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2 py-0.5 rounded-sm font-black">
                    {telemedicinaSales} un
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={telemedicinaSales}
                  onChange={(e) => setTelemedicinaSales(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>0 vendas</span>
                  <span>Mensalidade: R$ 80,00 | Comissão Ativa: {commTelemedicina.label}</span>
                  <span>50 vendas</span>
                </div>
              </div>

              {/* Slider 2: Proteção Veicular */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase">2. Proteção Veicular (Adesões/mês)</span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2 py-0.5 rounded-sm font-black">
                    {protecaoVeicularSales} un
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={protecaoVeicularSales}
                  onChange={(e) => setProtecaoVeicularSales(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>0 adesões</span>
                  <span>Mensalidade Base: R$ 120,00 | Comissão Ativa: {commProtecao.label}</span>
                  <span>30 adesões</span>
                </div>
              </div>

              {/* Slider 3: Energia Limpa */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase">3. Energia Limpa - Desconto na Conta (Contratos/mês)</span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2 py-0.5 rounded-sm font-black">
                    {energiaLimpaSales} un
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={energiaLimpaSales}
                  onChange={(e) => setEnergiaLimpaSales(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>0 indicações</span>
                  <span>Desconto na conta | Comissão recorrente mensal: {commEnergia.label}</span>
                  <span>20 indicações</span>
                </div>
              </div>

              {/* Slider 4: SOEH - Desenvolvimento Pessoal */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase">4. SOEH - Desenvolvimento Pessoal (Assinaturas/mês)</span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2 py-0.5 rounded-sm font-black">
                    {soehSales} un
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  value={soehSales}
                  onChange={(e) => setSoehSales(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>0 assinaturas</span>
                  <span>Mensalidade: R$ 50,00 | Comissão recorrente: {commSoeh.label}</span>
                  <span>40 assinaturas</span>
                </div>
              </div>

              {/* Slider 5: Em breve - Novas Oportunidades */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase">5. Em Breve - Novas Oportunidades (Projeção/mês)</span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2 py-0.5 rounded-sm font-black">
                    {emBreveSales} un
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  value={emBreveSales}
                  onChange={(e) => setEmBreveSales(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>0 projeções</span>
                  <span>Novos produtos homologados | Comissão estimada: {commEmBreve.label}</span>
                  <span>15 projeções</span>
                </div>
              </div>

            </div>

            {/* Calculations Result Block */}
            <div className="lg:col-span-5 bg-slate-950 text-white p-6 border-2 border-amber-400 rounded-sm space-y-6">
              <span className="text-[8px] font-mono tracking-widest text-[#fbbf24] font-black uppercase block">
                ESTIMATIVA OPERACIONAL INDIVIDUAL
              </span>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Telemedicina Conecta:</span>
                  <span className="font-mono text-white font-bold">
                    R$ {revTelemedicina.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Proteção Veicular:</span>
                  <span className="font-mono text-white font-bold">
                    R$ {revProtecao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Energia Limpa:</span>
                  <span className="font-mono text-white font-bold">
                    R$ {revEnergia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Programa SOEH:</span>
                  <span className="font-mono text-white font-bold">
                    R$ {revSoeh.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Novas Oportunidades:</span>
                  <span className="font-mono text-white font-bold">
                    R$ {revEmBreve.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 text-center space-y-1">
                <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-wider block">ganho total simulado</span>
                <p className="text-3xl font-mono font-black text-emerald-400 tracking-tight">
                  R$ {grandTotalEstimated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <span className="text-[8.5px] font-bold text-amber-400 uppercase block">
                  Sendo R$ {totalRecurrentMouthlyVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} /mês de recorrência líquida
                </span>
                <span className="text-[8.5px] text-slate-400 uppercase block">
                  E R$ {totalImmediateVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} pagos de adesão imediata
                </span>
              </div>

              <div className="space-y-2 text-[10px] text-slate-400 leading-relaxed bg-[#0b0f19] p-3 border border-slate-900 rounded-sm">
                <div className="flex justify-between text-white font-extrabold uppercase border-b border-slate-800 pb-1 mb-1">
                  <span>Plano de Carreira:</span>
                  <span>{partnerLevel === 'JUNIOR' ? 'Júnior' : partnerLevel === 'SUPERVISOR' ? 'Supervisor' : 'Gerente'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Atuação Recomendada:</span>
                  <span className="text-amber-400 font-bold font-mono">
                    {partnerLevel === 'JUNIOR' ? 'Foco em Vendas' : partnerLevel === 'SUPERVISOR' ? 'Líder de Equipe' : 'Gerente Regional'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Setup da Microfranquia:</span>
                  <span className="text-emerald-400 font-bold uppercase font-mono">100% Gratuito</span>
                </div>
                <div className="flex justify-between">
                  <span>Repasse de Comissão:</span>
                  <span className="text-white font-mono">Direto via PIX</span>
                </div>
              </div>

              <button
                onClick={onGoToOnboarding}
                className="w-full py-3 bg-amber-400 hover:bg-white text-black font-sans font-black text-xs uppercase tracking-widest border border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center justify-center gap-2"
              >
                <span>Garantir Minha Vaga como {partnerLevel === 'JUNIOR' ? 'Júnior' : partnerLevel === 'SUPERVISOR' ? 'Supervisor' : 'Gerente'}</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Network Builder Controls */}
            <div className="lg:col-span-7 space-y-6 border-b lg:border-b-0 lg:border-r border-black pb-6 lg:pb-0 lg:pr-8">
              
              <div className="border border-black p-4 bg-amber-50/50 space-y-2 rounded-xs">
                <strong className="text-xs uppercase text-slate-950 block">🚀 Vantagens do Plano de Rede Multi-Camadas:</strong>
                <ul className="text-[11.5px] text-zinc-700 space-y-1.5 list-disc pl-4 font-sans font-medium">
                  <li><strong>Início Grátis (Baixa Barreira):</strong> Seus consultores começam sem risco no plano Starter, gerando cadastros e vendo ROI imediato nos primeiros 30 dias.</li>
                  <li><strong>Upgrade Natural:</strong> Conforme realizam vendas e desejam resgatar 75% ou 80% do valor de comissão, efetuam o upgrade para Growth ou Master.</li>
                  <li><strong>Receita Recorrente Previsível:</strong> Você recebe 100% do valor de todas as mensalidades (R$ 197/mês de Growth e R$ 497/mês de Master) dos consultores da sua rede.</li>
                  <li><strong>Ganhos Multiplicados:</strong> Você recebe um bônus de 20% a 35% sobre as vendas geradas por todos os consultores da rede com split automatizado!</li>
                </ul>
              </div>

              {/* Slider Starter Network */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase">Consultores no Plano STARTER (Ativos)</span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2 py-0.5 rounded-sm font-black">
                    {networkStarter} parceiros
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={networkStarter}
                  onChange={(e) => setNetworkStarter(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>0 parceiros</span>
                  <span>Você ganha 35% de comissão residual sobre suas vendas</span>
                  <span>100 parceiros</span>
                </div>
              </div>

              {/* Slider Growth Network */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase">Consultores no Plano GROWTH (R$ 197/mês)</span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2 py-0.5 rounded-sm font-black">
                    {networkGrowth} parceiros
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={networkGrowth}
                  onChange={(e) => setNetworkGrowth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>0 parceiros</span>
                  <span>Mensalidade: R$ 197,00 | Você retém 25% comissão s/ vendas</span>
                  <span>100 parceiros</span>
                </div>
              </div>

              {/* Slider Master Network */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase">Consultores no Plano MASTER (R$ 497/mês)</span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2 py-0.5 rounded-sm font-black">
                    {networkMaster} parceiros
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={networkMaster}
                  onChange={(e) => setNetworkMaster(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>0 parceiros</span>
                  <span>Mensalidade: R$ 497,00 | Você retém 20% comissão s/ vendas</span>
                  <span>100 parceiros</span>
                </div>
              </div>

              {/* Slider Average Sales per partner */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800 uppercase">Média de Vendas Mensais por Consultor</span>
                  <span className="font-mono bg-slate-900 text-amber-400 px-2 py-0.5 rounded-sm font-black">
                    {averageSalesPerPartner} vendas/parceiro
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={averageSalesPerPartner}
                  onChange={(e) => setAverageSalesPerPartner(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                  <span>Sem vendas</span>
                  <span>Estimado em taxa de comissão média de R$ 150/pedido</span>
                  <span>20 vendas/mês</span>
                </div>
              </div>

            </div>

            {/* Calculations Result Block for Network */}
            <div className="lg:col-span-5 bg-slate-950 text-white p-6 border-2 border-amber-400 rounded-sm space-y-6">
              <span className="text-[8px] font-mono tracking-widest text-[#fbbf24] font-black uppercase block">
                EXTRATO DO DIRETOR DE EXPANSÃO
              </span>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Assinaturas Growth ({networkGrowth} un):</span>
                  <span className="font-mono text-white">
                    R$ {subBaseGrowth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Assinaturas Master ({networkMaster} un):</span>
                  <span className="font-mono text-white">
                    R$ {subBaseMaster.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-amber-500 pb-2 text-amber-400 font-bold">
                  <span>Receita Recorrente Base (Menbr.):</span>
                  <span className="font-mono">
                    R$ {totalSubBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                  </span>
                </div>

                <div className="pt-2 text-[9px] text-slate-400 uppercase tracking-widest block font-bold">
                  Residual sobre Vendas da Rede:
                </div>

                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Residual Starter ({networkStarter} un • 35%):</span>
                  <span className="font-mono text-white">
                    R$ {residualStarter.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Residual Growth ({networkGrowth} un • 25%):</span>
                  <span className="font-mono text-white">
                    R$ {residualGrowth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Residual Master ({networkMaster} un • 20%):</span>
                  <span className="font-mono text-white">
                    R$ {residualMaster.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2 font-bold text-slate-100">
                  <span>Total Residual de Vendas:</span>
                  <span className="font-mono">
                    R$ {totalResidual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 text-center space-y-1">
                <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-wider block">faturamento mensal de rede estimado</span>
                <p className="text-3xl font-mono font-black text-emerald-400 tracking-tight">
                  R$ {totalNetworkRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <span className="text-[8.5px] font-bold text-amber-400 uppercase block">
                  Incluindo R$ {totalSubBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} garantidos apenas em assinaturas base!
                </span>
              </div>

              <div className="space-y-1 text-[9px] text-slate-400 leading-relaxed bg-[#0b0f19] p-3 border border-slate-900 rounded-sm">
                <p className="text-amber-400 font-bold uppercase mb-1">Cenário de Sucesso Demonstrado:</p>
                <p>Se você tiver <strong className="text-white">100 empreendedores ativos</strong> (30 no Starter, 50 no Growth e 20 no Master), você acumula de cara <strong className="text-emerald-400">R$ 19.790,00 fixos/mês</strong> só em assinaturas do sistema! Com uma média tímida de {averageSalesPerPartner} vendas por mês de cada um, seu ganho salta para <strong className="text-white">R$ {totalNetworkRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</strong>.</p>
              </div>

              <button
                onClick={onGoToOnboarding}
                className="w-full py-4 bg-emerald-400 hover:bg-white text-black font-sans font-black text-xs uppercase tracking-widest border border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center justify-center gap-2"
              >
                <span>Inscrever-se para Criar Minha Rede</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

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
