import React, { useState } from 'react';
import { ConsultantState, SimulatedSale, LeadInfo, ConsultantLevel } from '../types';
import { HUB_PRODUCTS, MATRIX_ITEMS } from '../data';
import { 
  Users, 
  DollarSign, 
  Settings2, 
  UserCheck, 
  UserX, 
  Award, 
  TrendingUp, 
  PlusCircle, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Search, 
  ShieldAlert, 
  ArrowRightLeft, 
  Notebook as Register, 
  Building2,
  Workflow
} from 'lucide-react';

interface AdminControlViewProps {
  franchisees: ConsultantState[];
  setFranchisees: React.Dispatch<React.SetStateAction<ConsultantState[]>>;
  candidates: any[];
  setCandidates: React.Dispatch<React.SetStateAction<any[]>>;
  leads: LeadInfo[];
  setLeads: React.Dispatch<React.SetStateAction<LeadInfo[]>>;
  salesList: SimulatedSale[];
  globalSplitRate: number;
  setGlobalSplitRate: (rate: number) => void;
  royaltyFee: number;
  setRoyaltyFee: (fee: number) => void;
  onImpersonate: (id: string) => void;
  activeFranchiseeId: string;
}

export default function AdminControlView({
  franchisees,
  setFranchisees,
  candidates,
  setCandidates,
  leads,
  setLeads,
  salesList,
  globalSplitRate,
  setGlobalSplitRate,
  royaltyFee,
  setRoyaltyFee,
  onImpersonate,
  activeFranchiseeId
}: AdminControlViewProps) {
  // Tabs within admin panel
  // 'franchisees' | 'candidates' | 'leads' | 'cash_projections' | 'architecture'
  const [adminTab, setAdminTab] = useState<'franchisees' | 'candidates' | 'leads' | 'cash_projections'>('franchisees');

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Add new manual lead form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadInterest, setLeadInterest] = useState('telemedicina');
  const [leadSource, setLeadSource] = useState('Anúncio Instagram');

  // Add balance slider/adjust states
  const [showTopUpForId, setShowTopUpForId] = useState<string | null>(null);
  const [topUpAmount, setTopUpAmount] = useState<number>(100);

  // Search or filter franchisee lists
  const filteredFranchisees = franchisees.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // APPROVED CANDIDATE HANDLER
  const handleApproveCandidate = (candId: string) => {
    const candidate = candidates.find(c => c.id === candId);
    if (!candidate) return;

    // Remove from candidates
    setCandidates(prev => prev.filter(c => c.id !== candId));

    // Convert to franchisee
    const newFranchisee: ConsultantState = {
      id: `fran_${Date.now()}`,
      name: candidate.name,
      whatsapp: candidate.whatsapp,
      email: candidate.email,
      level: 'Junior',
      balance: 150.00, // starting onboarding simulated bonus to engage
      points: 10,
      salesCount: 0,
      assessmentResult: null,
      completedTrainings: [],
      isRegistered: true,
      status: 'active'
    };

    setFranchisees(prev => [...prev, newFranchisee]);
    alert(`Parabéns! O consultor ${candidate.name} foi aprovado com sucesso! Um bônus de ativação de R$ 150,00 foi creditado em seu novo escritório.`);
  };

  const handleRejectCandidate = (candId: string) => {
    if (window.confirm('Deseja realmente arquivar esta candidatura?')) {
      setCandidates(prev => prev.filter(c => c.id !== candId));
    }
  };

  // DISTRIBUTE LEADS HANDLER
  const handleDistributeLead = (leadId: string, franchiseeId: string) => {
    if (!franchiseeId) return;
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          assignedTo: franchiseeId,
          status: 'novo'
        };
      }
      return lead;
    }));
    
    const targetFran = franchisees.find(f => f.id === franchiseeId);
    alert(`Lead encaminhado com sucesso para o WhatsApp de ${targetFran?.name}!`);
  };

  // ADD NEW CUSTOM SIMULATED LEAD
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      alert('Favor preencher Nome e Telefone para simular o lead.');
      return;
    }

    const matchedProd = HUB_PRODUCTS.find(p => p.id === leadInterest);
    const newLead: LeadInfo = {
      id: `lead_${Date.now()}`,
      name: leadName,
      whatsapp: leadPhone,
      interest: matchedProd?.name || 'Telemedicina Conecta',
      source: leadSource,
      date: 'Agora mesmo',
      assignedTo: null,
      status: 'novo'
    };

    setLeads(prev => [newLead, ...prev]);
    setLeadName('');
    setLeadPhone('');
    alert(`Lead "${leadName}" injetado na central de tráfego pago da FLANX!`);
  };

  // FRANCHISEE STATUS TOOGLE (Suspender / Ativar)
  const handleToggleFranchiseeStatus = (franId: string) => {
    setFranchisees(prev => prev.map(f => {
      if (f.id === franId) {
        return {
          ...f,
          status: f.status === 'active' ? 'suspended' : 'active'
        };
      }
      return f;
    }));
  };

  // FRANCHISEE LEVEL MANUAL PROMOTE
  const handlePromoteLevel = (franId: string, currentLevel: ConsultantLevel) => {
    const nextLevelMap: Record<ConsultantLevel, ConsultantLevel> = {
      'Junior': 'Supervisor',
      'Supervisor': 'Gerente',
      'Gerente': 'Junior'
    };
    
    setFranchisees(prev => prev.map(f => {
      if (f.id === franId) {
        return {
          ...f,
          level: nextLevelMap[currentLevel]
        };
      }
      return f;
    }));
  };

  // TOP UP SIMULATED BALANCE
  const handleTopUpBalance = (franId: string) => {
    setFranchisees(prev => prev.map(f => {
      if (f.id === franId) {
        return {
          ...f,
          balance: f.balance + topUpAmount
        };
      }
      return f;
    }));
    setShowTopUpForId(null);
    alert(`Simulação de pagamento efetuada: R$ ${topUpAmount.toLocaleString('pt-BR')} creditados.`);
  };

  // CALCULATE CONSOLIDATED NUMBERS
  const totalVolumeSales = salesList.reduce((acc, sale) => acc + sale.price, 0);
  const totalPayoutToFranchisees = salesList.reduce((acc, sale) => acc + sale.commissionPaid, 0);
  const totalRetentionCommissions = salesList.reduce((acc, sale) => acc + sale.hubSplit, 0);
  
  const totalRoyaltiesRevenue = franchisees.length * royaltyFee;
  const totalSystemRevenue = totalRetentionCommissions + totalRoyaltiesRevenue;
  
  // Marketing Cooperado Fund (assumed 30% of standard retention goes to traffic)
  const marketingFund = totalRetentionCommissions * 0.35 + 100; // includes starting base 
  const netFranchisorEarnings = totalSystemRevenue - marketingFund;

  return (
    <div className="space-y-8 animate-fade-in" id="admin_control_panel">
      {/* BRAND & SECTIONS NAV */}
      <div className="bg-slate-900 border-4 border-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(251,191,36,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-amber-400 text-black px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest border border-black inline-block">
              ÁRIA ADMINISTRATIVA (BACK END)
            </span>
            <div className="flex items-center gap-3">
              <div className="bg-amber-400 text-black p-2 border border-black shrink-0">
                <Settings2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h2 className="text-3xl font-sans font-black tracking-tight uppercase">
                Painel do Franqueador <span className="text-amber-400 italic font-mono">FLANX</span>
              </h2>
            </div>
            <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed font-semibold">
              Aqui você, gestor proprietário da microfranquia FLANX, assume o controle global. Gerencie regras de taxas, filtre e aprove inscrições do funil de recrutamento, projete faturamentos corporativos e direcione de forma inteligente os leads coletados para os franqueados locais.
            </p>
          </div>
          
          <div className="bg-slate-950 border-2 border-amber-400 p-4 text-center shrink-0">
            <span className="text-[10px] font-mono text-amber-400 block uppercase font-bold">FRANQUEADOS ATIVOS</span>
            <p className="text-3xl font-mono font-black text-white">{franchisees.length} unidades</p>
            <span className="text-[9px] text-slate-400 block uppercase mt-1 font-semibold">Apoiando o Brasil</span>
          </div>
        </div>
      </div>

      {/* SYSTEM-WIDE CONSOLIDATED METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="admin_consolidated_stats">
        
        {/* Total volume routed */}
        <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-gray-400 block uppercase font-black tracking-wider">Volume de Vendas Geral</span>
            <span className="text-xl font-mono font-black text-black block">
              R$ {totalVolumeSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-gray-600 block uppercase font-black">
              ★ {salesList.length} transações integradas
            </span>
          </div>
          <div className="p-2.5 bg-black text-amber-400 border border-black shrink-0">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Paid to franchisees */}
        <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-gray-400 block uppercase font-black tracking-wider">Comissões de Franqueados</span>
            <span className="text-xl font-mono font-black text-emerald-650 block">
              R$ {totalPayoutToFranchisees.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-emerald-700 block uppercase font-bold">
              ● Split Automático ({globalSplitRate}%)
            </span>
          </div>
          <div className="p-2.5 bg-emerald-500 text-white border-2 border-black shrink-0">
            <DollarSign className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Platforms royalties */}
        <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-gray-400 block uppercase font-black tracking-wider">Royalties e Mensalidades</span>
            <span className="text-xl font-mono font-black text-slate-900 block">
              R$ {totalRoyaltiesRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-gray-500 block uppercase font-black">
              ✓ R$ {royaltyFee}/mês por franquia
            </span>
          </div>
          <div className="p-2.5 bg-black text-white border border-black shrink-0">
            <Building2 className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Net franchisor profit */}
        <div className="bg-amber-400 border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-slate-900 block uppercase font-black tracking-wider">Margem Líquida Flanx</span>
            <span className="text-xl font-mono font-black text-black block">
              R$ {netFranchisorEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[9px] text-slate-800 block uppercase font-bold leading-normal">
              Fundo Tráfego: R$ {marketingFund.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="p-2.5 bg-black text-amber-400 border border-black shrink-0">
            <Zap className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* CORE ADMIN NAVIGATION BAR - Neo-Brutalist Tabs with zero-blur flat shadows */}
      <div className="flex flex-wrap gap-2.5 bg-slate-100 border-2 border-black p-2.5" id="admin_sub_tabs">
        {[
          { id: 'franchisees', label: 'Gerenciador de Franqueados', icon: Users, color: 'hover:bg-amber-50' },
          { id: 'candidates', label: `Novas Candidaturas (${candidates.length})`, icon: Register, color: 'hover:bg-amber-50' },
          { id: 'leads', label: `Distribuição de Leads (${leads.filter(l => !l.assignedTo).length} livres)`, icon: Send, color: 'hover:bg-amber-50' },
          { id: 'cash_projections', label: 'Simulador do Fluxo Corporativo', icon: ArrowRightLeft, color: 'hover:bg-amber-50' }
        ].map(tab => {
          const IconComponent = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`py-2 px-3.5 font-sans font-black text-xs uppercase tracking-tight transition-all flex items-center gap-2 border-2 border-black ${
                isActive
                  ? 'bg-amber-400 text-black shadow-none translate-x-[1px] translate-y-[1px]'
                  : `bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${tab.color}`
              }`}
            >
              <IconComponent className="w-4 h-4 shrink-0 stroke-[2.5]" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* TAB CONTENT A: FRANCHISEE MANAGER LIST */}
      {adminTab === 'franchisees' && (
        <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
            <div>
              <h3 className="font-sans font-black text-[#000000] text-lg uppercase">
                Base Operacional de Franqueados
              </h3>
              <p className="text-xs text-gray-500 font-sans font-bold">
                Monitore o lucro de cada unidade, mude cargos estáticos, suspenda e "impersone" para acessar a visão individual do vendedor.
              </p>
            </div>
            
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 border-2 border-black text-xs w-64 focus:outline-none focus:bg-amber-50 font-sans font-bold"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-black">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-black text-[10px] font-mono font-black text-black uppercase tracking-wider text-left">
                  <th className="p-3">Unidade / Franqueado</th>
                  <th className="p-3">Contatos / Email</th>
                  <th className="p-3 text-center">Nível / Pontos</th>
                  <th className="p-3 text-right">Saldo Carteira</th>
                  <th className="p-3 text-center">Vendas Totais</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-right">Mapeamento MDS</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y border-black font-sans text-xs">
                {filteredFranchisees.map(fran => {
                  const isCurrentActive = fran.id === activeFranchiseeId;
                  return (
                    <tr 
                      key={fran.id} 
                      className={`hover:bg-amber-50/40 transition-colors ${
                        isCurrentActive ? 'bg-amber-100/55 font-semibold' : ''
                      }`}
                    >
                      <td className="p-3">
                        <div className="font-sans font-black text-black flex items-center gap-1.5 uppercase">
                          {fran.name}
                          {isCurrentActive && (
                            <span className="text-[8px] bg-black text-amber-400 px-1 py-0.2 border border-black font-mono font-black rounded-xs">
                              SESSÃO
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-450 block font-mono font-bold">ID: {fran.id}</span>
                      </td>
                      <td className="p-3">
                        <p className="text-black font-bold font-sans">{fran.whatsapp}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{fran.email}</p>
                      </td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => handlePromoteLevel(fran.id, fran.level)}
                          className="bg-black text-amber-400 text-[10px] font-mono font-black px-2 py-1 uppercase border border-black hover:bg-amber-400 hover:text-black transition-all"
                          title="Clique para alternar o nível do consultor"
                        >
                          {fran.level}
                        </button>
                        <span className="text-[9px] font-semibold text-gray-500 block mt-1">★ {fran.points} pts</span>
                      </td>
                      <td className="p-3 text-right">
                        <p className="font-mono font-black text-black">
                          R$ {fran.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <button
                          onClick={() => setShowTopUpForId(fran.id)}
                          className="text-[9px] text-[#4f46e5] hover:underline font-black uppercase mt-0.5"
                        >
                          💸 Pagar / Ajustar Saldo
                        </button>
                        {showTopUpForId === fran.id && (
                          <div className="mt-2 bg-slate-50 border border-black p-2 text-left absolute z-20 space-y-1.5 shadow-md">
                            <span className="text-[8px] block font-mono">VALOR SIMULADO (R$):</span>
                            <input 
                              type="number" 
                              value={topUpAmount} 
                              onChange={(e) => setTopUpAmount(Math.max(1, parseInt(e.target.value) || 0))}
                              className="border border-black px-1.5 py-0.5 text-xs font-mono w-24"
                            />
                            <div className="flex gap-1.5">
                              <button 
                                onClick={() => handleTopUpBalance(fran.id)}
                                className="bg-black text-white text-[9px] font-black px-1.5 py-1"
                              >
                                CONFIRMAR
                              </button>
                              <button 
                                onClick={() => setShowTopUpForId(null)}
                                className="text-[9px] font-bold text-gray-500 px-1 hover:underline"
                              >
                                Sair
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-black text-sm">
                        {fran.salesCount}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleToggleFranchiseeStatus(fran.id)}
                          className={`px-1.5 py-0.5 text-[9px] font-mono font-black border uppercase tracking-wider ${
                            fran.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                              : 'bg-rose-100 text-rose-800 border-rose-400'
                          }`}
                        >
                          {fran.status === 'active' ? 'Ativo' : 'Suspenso'}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <span className="text-[10px] bg-slate-100 border border-black text-slate-900 font-sans font-black px-2 py-1 uppercase rounded-xs">
                          {fran.assessmentResult || 'Sem Teste'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => onImpersonate(fran.id)}
                          className="px-2.5 py-1 bg-amber-400 hover:bg-black hover:text-amber-400 border-2 border-black text-xs font-black uppercase transition-all shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                        >
                          💻 Logar como ele
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT B: RECRUITMENT PROCESSING FUNNEL */}
      {adminTab === 'candidates' && (
        <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div>
            <h3 className="font-sans font-black text-black text-lg uppercase flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-500 shrink-0" />
              Candidaturas Recebidas do Funil Público
            </h3>
            <p className="text-xs text-gray-500 font-sans font-bold">
              Cada pessoa que preenche a página de recrutamento externa é enviada para esta lista abaixo em tempo real. Avalie as informações e clique em Aprovar para ingressar o candidato no ERP do franqueador.
            </p>
          </div>

          {candidates.length === 0 ? (
            <div className="bg-slate-50 border-2 border-dashed border-gray-300 p-8 text-center" id="empty_candidates_callout">
              <p className="text-gray-500 font-sans font-bold text-xs uppercase tracking-wider">
                Não há candidaturas pendentes de validação no momento.
              </p>
              <p className="text-[11px] text-gray-400 font-sans font-normal mt-1">
                Dica: Vá até a "Página de Recrutamento" na barra de navegação principal, envie uma simulação de dados e volte aqui para verificar a inserção!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidates.map(cand => (
                <div key={cand.id} className="border-4 border-black bg-white p-4 flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
                  <div className="border-b border-gray-100 pb-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono bg-amber-400 text-black px-1.5 py-0.5 border border-black font-black uppercase">
                        PENDENTE • {cand.verticalInterest.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-gray-450 font-mono font-bold">{cand.date}</span>
                    </div>
                    <h4 className="text-base font-sans font-black text-black mt-2 uppercase">{cand.name}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 font-medium font-sans">
                    <div>
                      <span className="text-[9px] font-mono text-gray-400 uppercase font-black block">WHATSAPP</span>
                      <strong className="text-black font-bold">{cand.whatsapp}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-gray-400 uppercase font-black block">E-MAIL PRINCIPAL</span>
                      <strong className="text-black font-bold truncate block">{cand.email}</strong>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-2.5 border border-amber-300 rounded-sm">
                    <p className="text-[10px] text-gray-750 font-semibold font-sans leading-relaxed">
                      💡 Concordou com os termos contratuais de splits automatizados e divisão radial da Matriz de Responsabilidade FLANX.
                    </p>
                  </div>

                  <div className="flex gap-2.5 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleApproveCandidate(cand.id)}
                      className="flex-1 py-1.5 bg-black hover:bg-emerald-500 hover:text-white text-amber-400 text-xs font-black uppercase border-2 border-black transition-all flex items-center justify-center gap-1.5"
                    >
                      <UserCheck className="w-4 h-4 stroke-[2.5]" />
                      Aprovar Cadastro
                    </button>
                    <button
                      onClick={() => handleRejectCandidate(cand.id)}
                      className="px-3 py-1.5 bg-white hover:bg-rose-500 hover:text-white border-2 border-slate-300 text-slate-800 text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5"
                    >
                      <UserX className="w-4 h-4 stroke-[2.5]" />
                      Recusar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT C: TRAFFIC DEPT & LEAD INJECTOR/FORWARDER */}
      {adminTab === 'leads' && (
        <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-8">
          
          {/* Top Form to Inject Custom Leads */}
          <div className="border-2 border-black p-4 bg-slate-50">
            <h4 className="font-sans font-black text-sm uppercase text-black border-b border-black pb-2 mb-4 flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-amber-500 stroke-[2.5]" />
              Injetor Tático de Leads de Tráfego Pago
            </h4>

            <form onSubmit={handleCreateLead} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-gray-400 block uppercase">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Pedro Henrique"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full bg-white border border-black py-1 px-3 text-xs text-black font-semibold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-gray-400 block uppercase">Celular WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: (21) 98888-5555"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full bg-white border border-black py-1 px-3 text-xs text-black font-semibold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-gray-400 block uppercase">Solução de Maior Interesse</label>
                <select
                  value={leadInterest}
                  onChange={(e) => setLeadInterest(e.target.value)}
                  className="w-full bg-white border border-black py-1 px-3 text-xs text-black font-black uppercase focus:outline-none"
                >
                  {HUB_PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="py-1.5 bg-black text-amber-400 text-xs border border-black font-black uppercase hover:bg-amber-400 hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Injetar Novo Lead
              </button>
            </form>
          </div>

          {/* Active Leads Feed */}
          <div>
            <div className="flex items-center justify-between border-b border-black pb-2 mb-4">
              <h4 className="font-sans font-black text-black text-sm uppercase">Lista Tática de Leads Distribuíveis</h4>
              <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 tracking-wider font-bold">
                {leads.length} LEADS EM FLUXO SIMULADO
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leads.map(lead => {
                const isAssigned = lead.assignedTo !== null;
                const assignedFran = isAssigned ? franchisees.find(f => f.id === lead.assignedTo) : null;

                return (
                  <div key={lead.id} className="border-2 border-black p-4 bg-white flex flex-col justify-between space-y-4 hover:bg-slate-50 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono bg-rose-100 border border-rose-300 text-rose-800 px-1.5 py-0.5 uppercase tracking-tight font-bold">
                          Interesse: {lead.interest}
                        </span>
                        <h5 className="font-sans font-black text-sm text-black uppercase mt-1.5">{lead.name}</h5>
                        <p className="text-[10px] text-gray-500 font-mono font-semibold">Origem: {lead.source} • WhatsApp: {lead.whatsapp}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-gray-450 block font-mono font-medium">{lead.date}</span>
                        {isAssigned ? (
                          <span className="text-[10px] text-emerald-600 font-black uppercase inline-block border border-emerald-400 bg-emerald-50 px-2 py-0.5 mt-1">
                            ✓ Encaminhado para {assignedFran?.name}
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-600 font-black uppercase inline-block border border-amber-300 bg-amber-50 px-2 py-0.5 mt-1 animate-pulse">
                            ● Aguardando Distribuição
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-dashed border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="text-[10px] text-slate-500 font-medium font-sans">
                        {isAssigned ? 'Lead operacionalizado pelo whatsapp do franqueado.' : 'Distancie de vendas empurradas: encaminhe para um consultor local agora:'}
                      </div>

                      <div className="flex gap-1.5 justify-end w-full sm:w-auto">
                        <select
                          id={`select_distribute_${lead.id}`}
                          defaultValue=""
                          disabled={isAssigned}
                          onChange={(e) => handleDistributeLead(lead.id, e.target.value)}
                          className="bg-white border border-black text-[10px] py-1 px-2 font-sans font-black uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <option value="" disabled>Selecionar Franqueado...</option>
                          {franchisees.map(f => (
                            <option key={f.id} value={f.id}>
                              {f.name} ({f.level})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT D: CORPORATE CASH FLOW & ROYALTY PROJECTIONS */}
      {adminTab === 'cash_projections' && (
        <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-8">
          
          <div className="border-b-2 border-black pb-4">
            <h3 className="font-sans font-black text-black text-lg uppercase flex items-center gap-2">
              <Workflow className="w-5 h-5 text-amber-500" />
              Simulador de Splits Operacionais & Previsões Corporativas
            </h3>
            <p className="text-xs text-slate-500 font-sans font-bold">
              Como proprietário do ecossistema FLANX, simule faturamentos com base no ajuste global da taxa de royalties mensais e do split comissionado de atração.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls Sliders */}
            <div className="lg:col-span-5 bg-slate-50 border-2 border-black p-4 space-y-6">
              <h4 className="text-xs font-mono font-black uppercase text-black border-b border-black pb-2">Variáveis Administrativas</h4>
              
              {/* Split rate slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans font-black">
                  <label className="uppercase text-gray-500 text-[10px] font-mono">1. Split Repassado ao Franqueado</label>
                  <span className="text-black bg-white border border-black px-1 text-[11px]">{globalSplitRate}% / venda</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={globalSplitRate}
                  onChange={(e) => setGlobalSplitRate(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 border border-black appearance-none cursor-pointer accent-black"
                />
                <span className="text-[9px] font-sans font-medium text-gray-400 block uppercase">
                  O valor padrão recomendado pela Matriz FLANX é 80% de comissão ao vendedor de atração regional.
                </span>
              </div>

              {/* Royalty fee slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans font-black">
                  <label className="uppercase text-gray-500 text-[10px] font-mono">2. Taxa de Software / Royalties Mensais</label>
                  <span className="text-black bg-white border border-black px-1 text-[11px]">R$ {royaltyFee} /mês</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="199"
                  step="5"
                  value={royaltyFee}
                  onChange={(e) => setRoyaltyFee(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 border border-black appearance-none cursor-pointer accent-black"
                />
                <span className="text-[9px] font-sans font-medium text-gray-400 block uppercase">
                  Contribuição básica por unidade do franqueado ativo para custeamento de infraestrutura tática externa.
                </span>
              </div>

              {/* Stacked visualization ratio */}
              <div className="border-t border-black pt-4">
                <span className="text-[10px] block font-mono text-gray-400 uppercase font-black">Ratio de Divisão das Vendas</span>
                <div className="grid grid-cols-2 text-[10px] font-mono font-bold mt-1 text-gray-700">
                  <span>Franqueado: {globalSplitRate}%</span>
                  <span className="text-right">FLANX (Franqueador): {100 - globalSplitRate}%</span>
                </div>
                <div className="w-full h-6 border border-black mt-2 flex overflow-hidden">
                  <div className="bg-emerald-500 h-full text-white flex items-center justify-center font-mono font-black text-[9px] text-center" style={{ width: `${globalSplitRate}%` }}>
                    REPASSE
                  </div>
                  <div className="bg-black h-full text-white flex items-center justify-center font-mono font-extrabold text-[9px] text-center" style={{ width: `${100 - globalSplitRate}%` }}>
                    FLANX
                  </div>
                </div>
              </div>
            </div>

            {/* Right breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xs font-mono font-black uppercase text-black border-b border-black pb-2">Destinação Corporativa Proporcional ({salesList.length} vendas cadastradas)</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Total volume routed */}
                <div className="bg-white border-2 border-black p-4">
                  <span className="text-[10px] text-gray-450 block font-mono font-black uppercase text-slate-500">Volume Total Simulador</span>
                  <p className="text-xl font-mono font-black text-black mt-1">
                    R$ {totalVolumeSales.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed font-semibold">
                    Volume monetário bruto transacionado pelas vendas de todas as franqueadoras.
                  </p>
                </div>

                {/* Retained share */}
                <div className="bg-white border-2 border-black p-4">
                  <span className="text-[10px] text-gray-450 block font-mono font-black uppercase text-slate-500">Média de Licenciamento</span>
                  <p className="text-xl font-mono font-black text-black mt-1">
                    R$ {totalRetentionCommissions.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed font-semibold">
                     {100 - globalSplitRate}% de retenção livre corporativa para sustentação de servidores e suporte técnico.
                  </p>
                </div>

                {/* Recurring royalties */}
                <div className="bg-white border-2 border-black p-4">
                  <span className="text-[10px] text-gray-450 block font-mono font-black uppercase text-slate-500">Fundo Mensal de Licenciamento ({franchisees.length} f)</span>
                  <p className="text-xl font-mono font-black text-[#5010e5] mt-1">
                    R$ {totalRoyaltiesRevenue.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed font-semibold">
                    Royalties sobre uso do CRM, de marca, servidores e suporte centralizado de pós-vendas no mês.
                  </p>
                </div>

                {/* Cooperative marketing fund */}
                <div className="bg-white border-2 border-black p-4">
                  <span className="text-[10px] text-gray-450 block font-mono font-black uppercase text-slate-500">Investimento Estimado de Tráfego</span>
                  <p className="text-xl font-mono font-black text-amber-600 mt-1">
                    R$ {marketingFund.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed font-semibold">
                    Dinheiro destinado a tráfego pago para atração de leads repassados para os afiliados.
                  </p>
                </div>
              </div>

              <div className="bg-amber-400 border-2 border-black p-4 flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <span className="text-[9px] font-mono text-black uppercase font-black">Faturamento Líquido Estimado FLANX</span>
                  <p className="text-2xl font-mono font-black text-black mt-1">
                    R$ {netFranchisorEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="p-3 bg-black text-white text-xs font-mono font-black uppercase">
                  MARGEM DA MARCA
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
