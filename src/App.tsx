import React, { useState, useEffect } from 'react';
import { ConsultantState, SimulatedSale, LeadInfo } from './types';
import EcosystemView from './components/EcosystemView';
import PortalView from './components/PortalView';
import HierarchyView from './components/HierarchyView';
import RecruitmentView from './components/RecruitmentView';
import AdminControlView from './components/AdminControlView';
import PresentationView from './components/PresentationView';
import { 
  Building2, 
  Smartphone, 
  BookOpen, 
  User, 
  RefreshCw, 
  CheckCircle2, 
  LayoutDashboard, 
  DollarSign, 
  Zap,
  HelpCircle,
  FileText,
  UserPlus,
  ShieldCheck,
  ChevronRight,
  ClipboardList,
  Award
} from 'lucide-react';

export default function App() {
  // Global States Managed by the Franchisor (Back office)
  const [globalSplitRate, setGlobalSplitRate] = useState<number>(80); // 80% default to franchisee
  const [royaltyFee, setRoyaltyFee] = useState<number>(49); // R$ 49 default monthly fee per franchise

  // Franchisees List Database (Front-office users)
  const [franchisees, setFranchisees] = useState<ConsultantState[]>([
    {
      id: 'fran_cidade',
      name: 'Cidade Consultorias',
      whatsapp: '(11) 99876-5432',
      email: 'cidade.consultorias@gmail.com',
      level: 'Junior',
      balance: 118.50, // Starts with simulated balance to demonstrate the wallet
      points: 8,
      salesCount: 2,
      assessmentResult: 'Estrategista Planejador 🎯',
      completedTrainings: ['integration'],
      isRegistered: true,
      status: 'active'
    },
    {
      id: 'fran_mariana',
      name: 'Mariana Sales',
      whatsapp: '(21) 98765-4321',
      email: 'mariana.sales@flanx.com.br',
      level: 'Premium',
      balance: 540.00,
      points: 24,
      salesCount: 8,
      assessmentResult: 'Executor Comercial 🔥',
      completedTrainings: ['integration', 'solar'],
      isRegistered: true,
      status: 'active'
    },
    {
      id: 'fran_bruno',
      name: 'Bruno Carvalho',
      whatsapp: '(81) 99123-4567',
      email: 'bruno.carvalho@email.com',
      level: 'Master',
      balance: 1450.00,
      points: 58,
      salesCount: 22,
      assessmentResult: 'Conector Comunicador 💬',
      completedTrainings: ['integration', 'solar', 'pricing'],
      isRegistered: true,
      status: 'active'
    }
  ]);

  // Selected Active Franchisee Id for impersonating/running the front-end
  const [activeFranchiseeId, setActiveFranchiseeId] = useState<string>('fran_cidade');

  // Candidate applications funnel (from the Recruitment view)
  const [candidates, setCandidates] = useState<any[]>([
    {
      id: 'cand_jonas',
      name: 'Jonas Malta',
      whatsapp: '(19) 98888-4444',
      email: 'jonas.malta@gmail.com',
      verticalInterest: 'Care',
      date: 'Hoje, 14:15',
      status: 'pending'
    },
    {
      id: 'cand_priscila',
      name: 'Priscila Reis',
      whatsapp: '(31) 97777-5555',
      email: 'priscila.reis@outlook.com',
      verticalInterest: 'Business',
      date: 'Ontem',
      status: 'pending'
    }
  ]);

  // Traffic department pay-per-click leads to distribute
  const [leads, setLeads] = useState<LeadInfo[]>([
    {
      id: 'lead_1',
      name: 'Roberta Camargo',
      whatsapp: '(11) 97120-1122',
      interest: 'Telemedicina Conecta 24h',
      source: 'Anúncio Facebook',
      date: 'Hoje',
      assignedTo: 'fran_cidade', // pre-assigned to the initial dealer
      status: 'novo'
    },
    {
      id: 'lead_2',
      name: 'Oficina Mecânica do Alemão',
      whatsapp: '(11) 96111-8888',
      interest: 'Portfólio de Maquininhas Pro',
      source: 'Google Maps Local',
      date: 'Ontem',
      assignedTo: null, // Unassigned, franchisor needs to dispatch!
      status: 'novo'
    },
    {
      id: 'lead_3',
      name: 'Clínica Sorriso Dental',
      whatsapp: '(21) 98111-2222',
      interest: 'Córtex de Vendas Mentoria',
      source: 'Tráfego Pago Instagram',
      date: 'Há 2 dias',
      assignedTo: 'fran_mariana',
      status: 'abordado'
    },
    {
      id: 'lead_4',
      name: 'Academia Corpo Vivo',
      whatsapp: '(81) 99555-4433',
      interest: 'Energia Solar Compartilhada',
      source: 'Indicação Direta',
      date: 'Hoje',
      assignedTo: null, // Unassigned, ready to dispatch!
      status: 'novo'
    }
  ]);

  // Global sales ledger across the entire franchise model
  const [salesList, setSalesList] = useState<SimulatedSale[]>([
    {
      id: 'mock_1',
      date: '10:45',
      productName: 'Telemedicina Conecta 24h',
      vertical: 'Care',
      price: 79.00,
      commissionPaid: 63.20, // calculated from 80% split
      hubSplit: 15.80,
      buyerName: 'Marcos de Souza',
      franchiseeId: 'fran_cidade',
      franchiseeName: 'Cidade Consultorias'
    },
    {
      id: 'mock_2',
      date: 'Ontem',
      productName: 'Teste de Perfil Comportamental MDS / HMI',
      vertical: 'Business',
      price: 150.00,
      commissionPaid: 120.00,
      hubSplit: 30.00,
      buyerName: 'Ana Cláudia Vieira',
      franchiseeId: 'fran_cidade',
      franchiseeName: 'Cidade Consultorias'
    },
    {
      id: 'mock_3',
      date: 'Ontem',
      productName: 'Energia Solar Compartilhada',
      vertical: 'Care',
      price: 150.00,
      commissionPaid: 120.00,
      hubSplit: 30.00,
      buyerName: 'Roberto Alencar',
      franchiseeId: 'fran_mariana',
      franchiseeName: 'Mariana Sales'
    }
  ]);

  // Master views configuration
  // 'franchisor' (Control) | 'franchisee' (Execution) | 'public_onboarding' (Onboarding page) | 'business_presentation' (Pitch Deck)
  const [appRole, setAppRole] = useState<'franchisor' | 'franchisee' | 'public_onboarding' | 'business_presentation'>('business_presentation');

  // Sub tab inside the Franchisee view
  // 'virtual_office' | 'academy' | 'ecosystem_info'
  const [franchiseeSubTab, setFranchiseeSubTab] = useState<string>('virtual_office');
  
  // Saque PIX state feedback
  const [withdrawalState, setWithdrawalState] = useState<'idle' | 'processing' | 'success'>('idle');

  // Find the exact active franchisee object
  const activeFranchisee = franchisees.find(f => f.id === activeFranchiseeId) || franchisees[0];

  useEffect(() => {
    document.title = "FLANX • Estrutura pronta para empreender";
  }, []);

  // Handle registration from public recruitment page
  const handlePublicRegistration = (name: string, whatsapp: string, email: string) => {
    // Instead of immediately auto registering, we submit them to the candidates pool
    // so the admin can log in and approve them inside the BACK END. This is amazing as it connects both views!
    const newCandidate = {
      id: `cand_${Date.now()}`,
      name,
      whatsapp,
      email,
      verticalInterest: 'Geral / Múltiplo',
      date: 'Agora mesmo',
      status: 'pending'
    };

    setCandidates(prev => [...prev, newCandidate]);
    
    // Switch role to franchisor and go to candidates tab immediately for immediate game feedback!
    alert(`Candidatura de "${name}" enviada com sucesso! Redirecionando você para a ÁREA DE CONTROLE DO FRANQUEADOR (Administração) para aprovar este cadastro e liberar seu acesso.`);
    setAppRole('franchisor');
  };

  const handleWithdrawalRequest = () => {
    if (activeFranchisee.balance <= 0) {
      alert('Seu saldo de carteira está zerado de comissões.');
      return;
    }
    
    setWithdrawalState('processing');
    setTimeout(() => {
      setWithdrawalState('success');
      setTimeout(() => {
        // Reduct specific franchisee balance
        setFranchisees(prev => prev.map(f => {
          if (f.id === activeFranchiseeId) {
            return {
              ...f,
              balance: 0
            };
          }
          return f;
        }));
        setWithdrawalState('idle');
      }, 1500);
    }, 1800);
  };

  const handleResetEntireSimulation = () => {
    if (window.confirm('Deseja resetar todas as alterações administratvas e retornar aos dados padrões originais do ERP?')) {
      setGlobalSplitRate(80);
      setRoyaltyFee(49);
      setFranchisees([
        {
          id: 'fran_cidade',
          name: 'Cidade Consultorias',
          whatsapp: '(11) 99876-5432',
          email: 'cidade.consultorias@gmail.com',
          level: 'Junior',
          balance: 118.50,
          points: 8,
          salesCount: 2,
          assessmentResult: 'Estrategista Planejador 🎯',
          completedTrainings: ['integration'],
          isRegistered: true,
          status: 'active'
        },
        {
          id: 'fran_mariana',
          name: 'Mariana Sales',
          whatsapp: '(21) 98765-4321',
          email: 'mariana.sales@flanx.com.br',
          level: 'Premium',
          balance: 540.00,
          points: 24,
          salesCount: 8,
          assessmentResult: 'Executor Comercial 🔥',
          completedTrainings: ['integration', 'solar'],
          isRegistered: true,
          status: 'active'
        }
      ]);
      setCandidates([
        {
          id: 'cand_jonas',
          name: 'Jonas Malta',
          whatsapp: '(19) 98888-4444',
          email: 'jonas.malta@gmail.com',
          verticalInterest: 'Care',
          date: 'Hoje, 14:15',
          status: 'pending'
        }
      ]);
      setLeads([
        {
          id: 'lead_1',
          name: 'Roberta Camargo',
          whatsapp: '(11) 97120-1122',
          interest: 'Telemedicina Conecta 24h',
          source: 'Anúncio Facebook',
          date: 'Hoje',
          assignedTo: 'fran_cidade',
          status: 'novo'
        }
      ]);
      setSalesList([
        {
          id: 'mock_1',
          date: '10:45',
          productName: 'Telemedicina Conecta 24h',
          vertical: 'Care',
          price: 79.00,
          commissionPaid: 63.20,
          hubSplit: 15.80,
          buyerName: 'Marcos de Souza',
          franchiseeId: 'fran_cidade',
          franchiseeName: 'Cidade Consultorias'
        }
      ]);
      setActiveFranchiseeId('fran_cidade');
      setAppRole('franchisee');
      setFranchiseeSubTab('virtual_office');
    }
  };

  const handleImpersonateFranchisee = (id: string) => {
    setActiveFranchiseeId(id);
    setAppRole('franchisee');
    setFranchiseeSubTab('virtual_office');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1e293b] font-sans flex flex-col justify-between selection:bg-amber-100" id="main_viewport">
      
      {/* GLOBAL CO-BRANDED MAIN HEADER */}
      <header className="bg-slate-900 text-white p-5 border-b-4 border-black font-sans" id="main_header_element">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <img 
                src="/src/components/Gemini_Generated_Image_co8l7hco8l7hco8l.png" 
                alt="FLANX" 
                className="h-10 w-10 object-contain border-2 border-amber-400 bg-slate-950 p-1 rounded-sm"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-extrabold block">
                  CÓRTEX OPERACIONAL RADIAL
                </span>
                <h1 className="text-3xl md:text-4xl font-sans font-black tracking-tight leading-none uppercase">
                  FLANX <span className="text-amber-400">Hub</span>
                </h1>
              </div>
            </div>
            <p className="text-xs font-sans text-slate-300 font-bold mt-1 max-w-xl leading-normal">
              A estrutura e franquia de produtos digitais mais completa do Brasil pronta para você empreender de casa.
            </p>
          </div>

          {/* SATELLITE ACTION: ACTIVE franchisee status widget representation */}
          {appRole === 'franchisee' && activeFranchisee && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-slate-950 border-2 border-amber-400 p-3 rounded-md w-full lg:w-auto" id="profile_session_widget">
              
              <div className="text-left py-0.5 sm:pr-4 sm:border-r border-slate-800">
                <span className="text-[8px] font-mono text-amber-400 uppercase font-black block">Franqueado Conectado:</span>
                <span className="text-sm font-black text-white uppercase block mt-0.5 tracking-tight font-sans">
                  {activeFranchisee.name}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[8px] font-mono bg-amber-400 text-black px-1 py-0.2 uppercase border border-black font-black">
                    {activeFranchisee.level}
                  </span>
                  {activeFranchisee.status !== 'active' && (
                    <span className="text-[8px] font-mono bg-rose-500 text-white px-1 py-0.2 uppercase border border-black font-black">
                      SUSPENSO ADM
                    </span>
                  )}
                </div>
              </div>

              {/* simulated instant balance pull to withdraw */}
              <div className="flex justify-between sm:justify-start items-center gap-4 pt-2 sm:pt-0">
                <div>
                  <span className="text-[8px] font-mono text-slate-400 uppercase font-extrabold block">Seu Saldo Livre:</span>
                  <p className="text-sm font-mono font-black text-emerald-400">
                    R$ {activeFranchisee.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <button
                  onClick={handleWithdrawalRequest}
                  disabled={activeFranchisee.balance <= 0 || withdrawalState !== 'idle' || activeFranchisee.status !== 'active'}
                  className={`py-1.5 px-3 rounded-none text-[10px] font-mono tracking-wider font-extrabold uppercase transition-all border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                    withdrawalState === 'processing'
                      ? 'bg-amber-400 text-slate-950 cursor-wait'
                      : withdrawalState === 'success'
                        ? 'bg-emerald-500 text-white border-black'
                        : activeFranchisee.balance > 0 && activeFranchisee.status === 'active'
                          ? 'bg-amber-500 text-black hover:bg-white'
                          : 'bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed opacity-30 shadow-none'
                  }`}
                >
                  {withdrawalState === 'processing' && 'Fazendo Pix...'}
                  {withdrawalState === 'success' && '✓ PIX ENVIADO!'}
                  {withdrawalState === 'idle' && 'Transferir Pix'}
                </button>
              </div>
            </div>
          )}

          {/* Adm mode badge view */}
          {appRole === 'franchisor' && (
            <div className="border border-dashed border-amber-400 bg-slate-950/70 p-3 flex items-center gap-2 max-w-xs font-mono">
              <span className="w-2.5 h-2.5 bg-amber-400 animate-pulse border border-black rounded-full block"></span>
              <div className="text-[10px]">
                <strong className="text-amber-400 font-black">MODO GESTOR ATIVO</strong>
                <p className="text-slate-400 text-[8px] uppercase mt-0.5">Visão do Proprietário da Franquia</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* CORE GLOBAL TOP-LEVEL ROLE NAVIGATION BAR */}
      <nav className="bg-slate-100 border-b-4 border-black p-3.5" id="global_nav_menu">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-sans">
          
          {/* Main Role / Panel Toggles */}
          <div className="flex flex-wrap gap-2.5" id="macro_roles_toggles">
            
            {/* Franqueador Control Pane Selector */}
            <button
              onClick={() => setAppRole('franchisor')}
              className={`py-2 px-3.5 font-sans font-black text-xs uppercase transition-all border-2 border-black flex items-center gap-2 ${
                appRole === 'franchisor'
                  ? 'bg-amber-400 text-black shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-white text-black hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <Building2 className="w-4 h-4 text-black stroke-[2.5]" />
              <span>🎛️ Área do Franqueador (Administrativo / Back end)</span>
            </button>

            {/* franchisee Office Selector */}
            <button
              onClick={() => setAppRole('franchisee')}
              className={`py-2 px-3.5 font-sans font-black text-xs uppercase transition-all border-2 border-black flex items-center gap-2 ${
                appRole === 'franchisee'
                  ? 'bg-amber-400 text-black shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-white text-black hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <Smartphone className="w-4 h-4 text-black stroke-[2.5]" />
              <span>👥 Área do Franqueado (Vendas / Front end)</span>
            </button>

            {/* Public landing Page Recruter Toggle */}
            <button
              onClick={() => setAppRole('public_onboarding')}
              className={`py-2 px-3.5 font-sans font-black text-xs uppercase transition-all border-2 border-black flex items-center gap-2 ${
                appRole === 'public_onboarding'
                  ? 'bg-amber-400 text-black shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-white text-black hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <UserPlus className="w-4 h-4 text-black stroke-[2.5]" />
              <span>✨ Página Pública de Recrutamento</span>
            </button>

            {/* Business Presentation Pitch Deck */}
            <button
              onClick={() => setAppRole('business_presentation')}
              className={`py-2 px-3.5 font-sans font-black text-xs uppercase transition-all border-2 border-black flex items-center gap-2 ${
                appRole === 'business_presentation'
                  ? 'bg-amber-400 text-black shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-white text-black hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <Award className="w-4 h-4 text-black stroke-[2.5]" />
              <span>📊 Apresentação de Negócios / Pitch</span>
            </button>
          </div>

          {/* SIMULATION RESET UTILITY */}
          <div className="flex items-center gap-2 justify-end shrink-0">
            <button
              onClick={handleResetEntireSimulation}
              className="text-[10px] font-mono font-black uppercase text-black border-2 border-black px-3 py-1.5 bg-yellow-400 hover:bg-black hover:text-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1.5"
              title="Voltar dados simulados ao padrão"
            >
              <RefreshCw className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              Resetar Tudo
            </button>
          </div>
        </div>
      </nav>

      {/* CORE SUB NAVIGATION BAR (Only for the Active Franchisee View) */}
      {appRole === 'franchisee' && (
        <div className="bg-slate-200 border-b-4 border-black px-4 py-2 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
          <div className="flex flex-wrap gap-2 max-w-7xl mx-auto w-full">
            <span className="text-[10px] font-mono font-black text-slate-500 uppercase flex items-center mr-2">
              Menu do Franqueado:
            </span>
            
            {[
              { id: 'virtual_office', label: 'Escritório & Vendas (Front-end)', icon: Smartphone },
              { id: 'academy', label: 'Academia & Perfil Comportamental MDS', icon: BookOpen },
              { id: 'ecosystem_info', label: 'Diagrama Técnico FLANX', icon: ClipboardList }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = franchiseeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFranchiseeSubTab(tab.id)}
                  className={`py-1.5 px-3 font-sans font-black text-[11px] uppercase tracking-wide border border-black flex items-center gap-1.5 transition-all ${
                    isActive 
                      ? 'bg-slate-900 text-[#fbbf24] shadow-none'
                      : 'bg-white text-black hover:bg-slate-50 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
          
          {/* Quick Impersonation selection helper direct from secondary bar */}
          <div className="flex items-center gap-1.5 bg-white border border-black px-2 py-1 max-w-sm shrink-0 uppercase mx-auto md:mx-0">
            <span className="text-[8px] font-mono text-gray-400 font-black block">Trocar Unidade:</span>
            <select
              id="global_select_impersonator"
              value={activeFranchiseeId}
              onChange={(e) => handleImpersonateFranchisee(e.target.value)}
              className="bg-white text-[10px] font-sans font-black uppercase text-black focus:outline-none"
            >
              {franchisees.map(f => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.level})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* COMPONENT BODY */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full" id="workspace_content_area">
        <div className="animate-fade-in">
          
          {/* ROLE 1: FRANQUEADOR (Controle Administrativo / Back End) */}
          {appRole === 'franchisor' && (
            <AdminControlView 
              franchisees={franchisees}
              setFranchisees={setFranchisees}
              candidates={candidates}
              setCandidates={setCandidates}
              leads={leads}
              setLeads={setLeads}
              salesList={salesList}
              globalSplitRate={globalSplitRate}
              setGlobalSplitRate={setGlobalSplitRate}
              royaltyFee={royaltyFee}
              setRoyaltyFee={setRoyaltyFee}
              onImpersonate={handleImpersonateFranchisee}
              activeFranchiseeId={activeFranchiseeId}
            />
          )}

          {/* ROLE 2: FRANQUEADO (Vendas / Front End / Active franchisee workspace) */}
          {appRole === 'franchisee' && (
            <div>
              {activeFranchisee.status !== 'active' ? (
                <div className="bg-white border-4 border-black p-8 text-center max-w-md mx-auto space-y-4 my-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]" id="suspended_notice">
                  <div className="p-3 bg-rose-100 text-rose-800 border-2 border-black w-fit mx-auto">
                    <Building2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="font-sans font-black text-black uppercase text-lg">Unidade Suspensa temporariamente</h3>
                  <p className="text-xs text-gray-600 font-semibold font-sans leading-relaxed">
                    A administração central da FLANX suspendeu temporariamente o seu acesso operacional. Por favor, regularize suas taxas ou pendências contratuais.
                  </p>
                  <p className="text-[10px] text-[#4f46e5] font-mono font-bold">
                    Dica: Visite a "Área do Franqueador (Controle Geral)" e mude o status deste parceiro de volta para ativo para testar normal!
                  </p>
                </div>
              ) : (
                <>
                  {franchiseeSubTab === 'virtual_office' && (
                    <PortalView 
                      consultant={activeFranchisee}
                      setConsultant={(updatedStateFn) => {
                        // Keep our franchisee list in sync with updates from portal simulator!
                        setFranchisees(prev => prev.map(f => {
                          if (f.id === activeFranchiseeId) {
                            // If caller is setting state via callback function
                            if (typeof updatedStateFn === 'function') {
                              return (updatedStateFn as any)(f);
                            }
                            return updatedStateFn as any;
                          }
                          return f;
                        }));
                      }}
                      salesList={salesList}
                      setSalesList={setSalesList}
                      leads={leads}
                      setLeads={setLeads}
                      globalSplitRate={globalSplitRate}
                    />
                  )}

                  {franchiseeSubTab === 'academy' && (
                    <HierarchyView 
                      consultant={activeFranchisee}
                      setConsultant={(updatedStateFn) => {
                        setFranchisees(prev => prev.map(f => {
                          if (f.id === activeFranchiseeId) {
                            if (typeof updatedStateFn === 'function') {
                              return (updatedStateFn as any)(f);
                            }
                            return updatedStateFn as any;
                          }
                          return f;
                        }));
                      }}
                    />
                  )}

                  {franchiseeSubTab === 'ecosystem_info' && (
                    <EcosystemView />
                  )}
                </>
              )}
            </div>
          )}

          {/* ROLE 4: BUSINESS PRESENTATION PITCH DECK */}
          {appRole === 'business_presentation' && (
            <PresentationView 
              onGoToOnboarding={() => setAppRole('public_onboarding')}
              globalSplitRate={globalSplitRate}
            />
          )}

          {/* ROLE 3: PUBLIC RECRUITMENT PAGE */}
          {appRole === 'public_onboarding' && (
            <div className="space-y-6">
              <div className="bg-amber-100 border-2 border-black p-4 text-xs font-sans text-slate-800 flex items-start gap-2.5 max-w-4xl mx-auto font-semibold">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 stroke-[2.5]" />
                <div>
                  💡 <strong>Simulação de Funil de Recrutamento Ativa:</strong> Qualquer candidato preenchendo o formulário abaixo é injetado diretamente na lista de <strong>Novas Candidaturas</strong> do Franqueador. Você pode ir no Painel Administrativo, aprovar instantaneamente e ver o novo parceiro ser incorporado na listagem nacional de franqueados com bônus salarial!
                </div>
              </div>

              <RecruitmentView 
                onRegisterSubmit={handlePublicRegistration}
              />
            </div>
          )}

        </div>
      </main>

      {/* BRAND COMPLIANT MAIN PLATFORM FOOTER */}
      <footer className="bg-black text-white border-t-4 border-black py-8 text-center text-xs font-sans mt-12" id="main_footer_element">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="font-extrabold text-sm uppercase tracking-wider text-amber-500 flex items-center justify-center gap-2">
            <img 
              src="/src/components/Gemini_Generated_Image_co8l7hco8l7hco8l.png" 
              alt="FLANX" 
              className="h-6 w-6 object-contain border border-black rounded-xs bg-slate-900"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            FLANX • ESTRUTURA PRONTA PARA VOCÊ EMPREENDER
          </p>
          <p className="max-w-2xl mx-auto text-[10px] leading-relaxed text-zinc-400 font-mono">
            Este software de modelagem operacional projeta as margens líquidas, simula a divisão de split de comissionamento de afunilamento de transações no pix e cartões, e avalia competências com o teste de perfil psicotécnico MDS. Sistema radial simulado para estruturação e expansão de microfranquias digitais.
          </p>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold pt-2">
            © 2026 FLANX • SISTEMA DIGITAL REGULAMENTADO E INTEGRADO
          </div>
        </div>
      </footer>
    </div>
  );
}
