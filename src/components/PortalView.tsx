import React, { useState } from 'react';
import { HUB_PRODUCTS } from '../data';
import { Product, ConsultantState, SimulatedSale, LeadInfo, ConsultantLevel } from '../types';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ChevronRight, 
  User, 
  Share2, 
  Smartphone, 
  DollarSign, 
  ArrowRight, 
  Zap, 
  Target, 
  TrendingUp, 
  CheckCircle,
  MessageSquareCode,
  AlertCircle
} from 'lucide-react';

interface PortalViewProps {
  consultant: ConsultantState;
  setConsultant: React.Dispatch<React.SetStateAction<ConsultantState>>;
  salesList: SimulatedSale[];
  setSalesList: React.Dispatch<React.SetStateAction<SimulatedSale[]>>;
  leads: LeadInfo[];
  setLeads: React.Dispatch<React.SetStateAction<LeadInfo[]>>;
  globalSplitRate: number;
}

export default function PortalView({ 
  consultant, 
  setConsultant, 
  salesList, 
  setSalesList,
  leads,
  setLeads,
  globalSplitRate
}: PortalViewProps) {
  const [selectedVertical, setSelectedVertical] = useState<string>('todos');
  const [activeProduct, setActiveProduct] = useState<Product>(HUB_PRODUCTS[0]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCopy, setCopiedCopy] = useState(false);
  
  // Script adjust states
  const [selectedTone, setSelectedTone] = useState<string>('persuasivo');
  const [customKeyword, setCustomKeyword] = useState<string>('');
  
  // Checkout simulation states
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('pix');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Active leads filter for this specific franchisee
  const filteredLeads = leads.filter(l => l.assignedTo === consultant.id);

  // Filter products based on vertical selection
  const filteredProducts = HUB_PRODUCTS.filter(
    p => selectedVertical === 'todos' || p.vertical === selectedVertical
  );

  // Generate personalized affiliate link
  const cleanConsultantId = consultant.name ? encodeURIComponent(consultant.name.toLowerCase().replace(/\s+/g, '-')) : 'consultor-flanx';
  const customAffiliateLink = `https://flanx.app.br/af/${cleanConsultantId}?prod=${activeProduct.id}`;

  // Custom text rewrites based on Tone and Custom Keywords
  const generateCopyScript = () => {
    const keywordText = customKeyword ? ` Olha que demais: focando bastante em ${customKeyword}!` : '';
    
    switch (activeProduct.id) {
      case 'telemedicina':
        if (selectedTone === 'empatico') {
          return `Olá! Sabia que a saúde de quem amamos não pode esperar em filas ou trânsito? Com a Telemedicina FLANX Care, você tem médico de plantão 24h na tela do seu celular por menos de R$ 3 por dia. Ideal para cuidar dos pais ou crianças com carinho, agilidade e receitas na hora digital.${keywordText} Clique no link oficial para agendar o primeiro teste grátis: ${customAffiliateLink}`;
        } else if (selectedTone === 'tecnico') {
          return `Inovação na Saúde Coletiva: O serviço de Telemedicina 24h reduz em até 85% as idas desnecessárias a prontos-socorros presenciais. Inclui clínico geral e mais de 15 especialidades médicas homologadas. Atendimento digital seguro, emissão de exames e receitas válidos em farmácias nacionais. Mensalidade fixa de R$ 79/mês para até 3 dependentes.${keywordText} Veja as estatísticas e credenciamento oficial: ${customAffiliateLink}`;
        } else if (selectedTone === 'direto') {
          return `Médico online 24h por dia no celular. Sem plano caro, sem carência e sem fila de hospital por R$ 79/mês. Receitas digitais entregues na hora. Garanta a proteção da sua família hoje.${keywordText} Contrate em 2 minutos aqui: ${customAffiliateLink}`;
        } else {
          return `💥 Já pensou em ter mais de 15 especialidades médicas no seu bolso 24h por dia, sem precisar pagar R$ 400 em um plano tradicional? Médico de plantão em até 10 minutos, receitas de remédios e exames aceitos em farmácias, tudo no app! Por apenas R$ 79/mês para toda sua família!${keywordText} Não brinque com a sua saúde, assegure seu acesso no link promocional abaixo: ${customAffiliateLink}`;
        }

      case 'energia-limpa':
        if (selectedTone === 'empatico') {
          return `Oi! Espero que esteja bem. Queria te dar uma dica maravilhosa para o orçamento da casa: você sabia que dá para usar energia limpa, ajudar o meio ambiente e de quebra economizar até 15% na conta de luz todos os meses, sem gastar nada de instalação ou obras? Super simples e sustentável.${keywordText} Dá uma olhadinha em como ativar gratuitamente no site oficial: ${customAffiliateLink}`;
        } else if (selectedTone === 'tecnico') {
          return `Otimização Financeira & Sustentabilidade Comercial: Assinatura de Energia Solar Compartilhada. Sem taxas de instalação, sem manutenção técnica e zero investimento em telhado ou placas solares de silício. Desconto direto assegurado nas faturas residenciais e empresariais de até 15% mensais sobre a energia consumida.${keywordText} Realize a simulação de faturamento e comprove a viabilidade jurídica da regulação da ANNEL: ${customAffiliateLink}`;
        } else if (selectedTone === 'direto') {
          return `Pague menos na conta de luz todo mês com energia 100% solar compartilhada. Instalação grátis, sem equipamentos extras e taxa zero de fidelidade. Comece a economizar até 15% agora nas contas acima de R$ 150.${keywordText} Ative grátis em minutos: ${customAffiliateLink}`;
        } else {
          return `🔥 PARE de queimar dinheiro todo mês pagando tarifa cheia para a concessionária de energia! Economize até 15% na sua conta de luz residencial ou comercial sem instalar uma única placa solar e sem gastar nem R$ 1,00 para aderir. É 100% digital e legalizado!${keywordText} Envie uma foto da sua última conta e veja sua redução garantida no link: ${customAffiliateLink}`;
        }

      case 'cursos-livres':
        return `📚 Mega Oportunidade Acadêmica! Garanta acesso ilimitado a mais de 250 cursos com certificados válidos reconhecidos pelo MEC e em todo o mercado nacional de trabalho por uma parcela única anual de R$ 199. Perfeito para o primeiro emprego ou transição rápida de carreira!${keywordText} Matricule-se com cupom de desconto exclusivo aqui: ${customAffiliateLink}`;

      case 'formacao-tecnica':
        return `⚙️ Curso de Formação Técnica Oficial em 12 meses de alta demanda nacional homologado com registro MEC! Administração, Logística, Enfermagem e TI com parcelas super facilitadas e vagas garantidas na sua região. Mude sua história corporativa.${keywordText} Fale com o orientador educacional de nossa marca agora: ${customAffiliateLink}`;

      case 'graduacao-ead':
        return `🎓 Diploma Superior Reconhecido com Nota Máxima no MEC no conforto de sua casa! Faça sua Faculdade ou MBA 150% online com bolsas exclusivas de até 50% de desconto patrocinadas por nós.${keywordText} Consulte o portfólio completo de carreiras: ${customAffiliateLink}`;

      case 'perfil-hmi':
        return `🧠 Já se perguntou quais competências inconscientes controlam suas decisões de carreira ou negócios? O mapeamento comportamental MDS/HMI de mais de 25 páginas revela seus talentos ocultos, nível de liderança, estilo de negociação e pontos cegos em minutos.${keywordText} Faça seu teste oficial aqui: ${customAffiliateLink}`;

      case 'maquininha-conecta':
        return `💳 Comerciantes e Autônomos: Taxas abusivas nas vendas de cartões corroem suas margens mensais líquidas! Conheça as Maquininhas Pro com taxa zero no PIX/Boleto, recebimento express em 1 dia útil e bobina gratuita para ampliar seu faturamento local.${keywordText} Adquira a sua sem custos de aluguel: ${customAffiliateLink}`;
        
      default:
        return `🚀 Excelente oportunidade de negócio! Indico vivamente a solução "${activeProduct.name}". Tecnologia de ponta, suporte integral e extrema facilidade na contratação. Saiba todos os detalhes e diferenciais acessando o endereço exclusivo de vendas: ${customAffiliateLink}`;
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(customAffiliateLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCopy = () => {
    navigator.clipboard.writeText(generateCopyScript());
    setCopiedCopy(true);
    setTimeout(() => setCopiedCopy(false), 2000);
  };

  // Helper to calculate exact commission based on level and product requested by the user
  const calculateSimulationCommission = (product: Product, level: ConsultantLevel) => {
    let commissionPaid = 0;
    let details = '';

    if (product.id === 'telemedicina') {
      if (level === 'Junior') {
        const immediate = 80 * 0.50; // 50%
        const recurrent = 80 * 0.20; // 20%
        commissionPaid = immediate + recurrent; // R$ 56.00
        details = "Júnior: 50% adesão (R$ 40,00) + 20% recorrente (R$ 16,00)";
      } else if (level === 'Supervisor') {
        const immediate = 80 * 0.50; // 50%
        const recurrent = 80 * 0.20; // 20%
        const teamRecurrent = 80 * 0.10; // 10%
        commissionPaid = immediate + recurrent + teamRecurrent; // R$ 64.00
        details = "Supervisor: Ganhos Júnior + 10% recorrente equipe (R$ 8,00)";
      } else { // Gerente
        const immediate = 80 * 0.50;
        const recurrent = 80 * 0.20;
        const teamRecurrent = 80 * 0.10;
        const supervisorBonus = (immediate + recurrent + teamRecurrent) * 0.05; // 5%
        commissionPaid = immediate + recurrent + teamRecurrent + supervisorBonus; // R$ 67.20
        details = "Gerente: Ganhos anteriores + 5% sobre ganhos supervisores (R$ 3,20)";
      }
    } else if (product.id === 'protecao-veicular') {
      if (level === 'Junior') {
        const immediate = 120 * 0.75; // 75%
        const recurrent = 15; // R$ 15,00
        commissionPaid = immediate + recurrent; // R$ 105.00
        details = "Júnior: 75% adesão (R$ 90,00) + recorrente (R$ 15,00)";
      } else if (level === 'Supervisor') {
        const immediate = 120 * 0.75;
        const recurrent = 15;
        const teamRecurrent = 10;
        commissionPaid = immediate + recurrent + teamRecurrent; // R$ 115.00
        details = "Supervisor: Ganhos Júnior + recorrente equipe (R$ 10,00)";
      } else { // Gerente
        const immediate = 120 * 0.75;
        const recurrent = 15;
        const teamRecurrent = 10;
        const supervisorBonus = (immediate + recurrent + teamRecurrent) * 0.05;
        commissionPaid = immediate + recurrent + teamRecurrent + supervisorBonus; // R$ 120.75
        details = "Gerente: Ganhos anteriores + 5% sobre ganhos supervisores (R$ 5,75)";
      }
    } else if (product.id === 'energia-limpa') {
      if (level === 'Junior') {
        commissionPaid = 15; // R$ 15,00 commission on bill savings
        details = "Júnior: Comissão mensal fixa por indicação ativa (R$ 15,00)";
      } else if (level === 'Supervisor') {
        commissionPaid = 25; // R$ 15 + R$ 10 team
        details = "Supervisor: Ganhos Júnior + bônus de equipe (R$ 10,00)";
      } else { // Gerente
        commissionPaid = 30; // R$ 25 + R$ 5 bonus
        details = "Gerente: Ganhos anteriores + bônus de gestão (R$ 5,00)";
      }
    } else if (product.id === 'soeh') {
      if (level === 'Junior') {
        commissionPaid = 15; // 30% of R$ 50
        details = "Júnior: 30% de comissão por afiliação ativa (R$ 15,00)";
      } else if (level === 'Supervisor') {
        commissionPaid = 20; // R$ 15 + R$ 5 team
        details = "Supervisor: Ganhos Júnior + bônus de equipe (R$ 5,00)";
      } else { // Gerente
        commissionPaid = 25; // R$ 20 + R$ 5 management
        details = "Gerente: Ganhos anteriores + bônus de gestão (R$ 5,00)";
      }
    } else {
      // Em breve
      commissionPaid = 0;
      details = "Em breve: Mais comissões em breve";
    }

    const price = product.price || 0;
    const hubSplit = price > commissionPaid ? price - commissionPaid : 0;

    return { commissionPaid, hubSplit, details };
  };

  // Run checkout simulation
  const handleSimulateSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Por favor, preencha o nome e celular do cliente na simulação.');
      return;
    }

    setIsSimulating(true);
    setSuccessMessage(null);

    setTimeout(() => {
      const { commissionPaid: commEarned, hubSplit: hubSplitAmount, details } = calculateSimulationCommission(activeProduct, consultant.level);

      // Add simulated sale to global list
      const newSale: SimulatedSale = {
        id: `sale_${Date.now()}`,
        date: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        productName: activeProduct.name,
        vertical: activeProduct.vertical,
        price: activeProduct.price,
        commissionPaid: commEarned,
        hubSplit: hubSplitAmount,
        buyerName: customerName,
        franchiseeId: consultant.id,
        franchiseeName: consultant.name
      };

      setSalesList(prev => [newSale, ...prev]);

      // Update consultant's wallet parameters
      setConsultant(prev => ({
        ...prev,
        balance: prev.balance + commEarned,
        points: prev.points + 2,
        salesCount: prev.salesCount + 1,
        level: prev.salesCount + 1 >= 8 ? 'Supervisor' : prev.level
      }));

      setIsSimulating(false);
      setSuccessMessage(`PIX recebido e processado! R$ ${commEarned.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} foram creditados na sua carteira. (${details})`);
      
      // Clear forms
      setCustomerName('');
      setCustomerPhone('');
    }, 1200);
  };

  // Convert a lead directly to a customer (autocomplete checkout!)
  const handleConvertLead = (lead: LeadInfo) => {
    setCustomerName(lead.name);
    setCustomerPhone(lead.whatsapp);
    
    // Find matching solution
    const matched = HUB_PRODUCTS.find(p => p.name === lead.interest || lead.interest.includes(p.name)) || HUB_PRODUCTS[0];
    setActiveProduct(matched);

    // Set lead status to contacted and converted
    setLeads(prev => prev.map(l => {
      if (l.id === lead.id) {
        return { ...l, status: 'convertido' };
      }
      return l;
    }));

    // Scroll to simulator form
    const formEl = document.getElementById('checkout_simulation_box');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateLeadStatus = (leadId: string, status: 'abordado' | 'perdido') => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return { ...l, status };
      }
      return l;
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in" id="portal_view_root">
      
      {/* HEADER SECTION */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-black pb-6">
        <div>
          <span className="bg-amber-400 text-black font-mono text-[10px] uppercase font-black tracking-widest px-3 py-1 border-2 border-black inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold">
            👤 ESCRITÓRIO VIRTUAL DO FRANQUEADO
          </span>
          <div className="flex items-center gap-2.5 mt-3">
            <img 
              src="/src/components/Gemini_Generated_Image_co8l7hco8l7hco8l.png" 
              alt="FLANX" 
              className="h-10 w-10 object-contain border border-black rounded-xs bg-slate-900"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // fall back gracefully if file is offline
                e.currentTarget.style.display = 'none';
              }}
            />
            <h2 className="text-3xl md:text-4.5xl font-sans font-black tracking-tighter leading-none uppercase text-black">
              Painel de Parceria <span className="text-amber-500 italic font-mono font-black">FLANX</span>
            </h2>
          </div>
          <p className="text-gray-700 font-sans mt-3 text-xs max-w-2xl leading-relaxed font-semibold">
            Olá, <strong>{consultant.name}</strong>! Esta é a sua central de atuação. Promova seu portfólio digital, utilize nossos roteiros de persuasão reescritos para atrair contatos, receba leads qualificados gerados pela administração e realize vendas simuladas para faturar com comissões de <strong className="text-black font-extrabold">{globalSplitRate}% instantâneas</strong>.
          </p>
        </div>
        
        <div className="flex gap-2.5 shrink-0 bg-slate-100 p-2 border-2 border-black">
          <span className="text-[10px] font-mono font-black text-gray-500 uppercase">SPLIT CONFIGURADO EM:</span>
          <span className="text-xs bg-emerald-500 text-white font-mono font-black px-2 py-0.5 border border-black">
            {globalSplitRate}% SEU
          </span>
        </div>
      </div>

      {/* COMPONENT METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="portal_metrics_row">
        {/* Wallet Balance */}
        <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-gray-400 block uppercase font-black tracking-wider">Seu Saldo Disponível</span>
            <span className="text-2xl font-mono font-black text-black block">
              R$ {consultant.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[9px] text-emerald-600 font-extrabold block uppercase tracking-tight">
              ● Liberado para Transferência PIX
            </span>
          </div>
          <div className="p-2.5 bg-black text-amber-400 border border-black shrink-0">
            <DollarSign className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Nivel de Vendedor */}
        <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-gray-400 block uppercase font-black tracking-wider">Seu Grau de Carreira</span>
            <div>
              <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-1 inline-block border-2 border-black bg-slate-900 text-amber-400`}>
                {consultant.level}
              </span>
            </div>
            <span className="text-[9px] text-gray-500 block uppercase font-bold tracking-tight pt-1">
              {consultant.level === 'Junior' ? 'Ganhe pontos na academia' : consultant.level === 'Supervisor' ? 'Franqueado Lider Supervisor' : 'Franqueado Lider Gerente'}
            </span>
          </div>
          <div className="p-2.5 bg-black text-amber-400 border border-black shrink-0">
            <Zap className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Sales Done */}
        <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-gray-400 block uppercase font-black tracking-wider">Histórico de Atração</span>
            <span className="text-base font-sans font-black text-black block mb-0.5">
              {consultant.salesCount} Vendas Consolidadas
            </span>
            <span className="text-[9px] text-[#4f46e5] block font-extrabold uppercase tracking-tight">
              ★ {consultant.points} Pontos Acumulados
            </span>
          </div>
          <div className="p-2.5 bg-black text-white border border-black shrink-0">
            <Target className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Behavioral Profile */}
        <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-gray-400 block uppercase font-black tracking-wider">Sua Assinatura Comportamental</span>
            <span className="text-xs font-black uppercase text-black block tracking-tight truncate py-0.5">
              {consultant.assessmentResult || '⚠️ Teste de Perfil Pendente'}
            </span>
            <span className="text-[9px] text-gray-500 block uppercase font-bold tracking-tight">
              {consultant.assessmentResult ? 'Mapeado com Sucesso' : 'Desbloqueie no painel Academia'}
            </span>
          </div>
          <div className="p-2.5 bg-slate-900 text-amber-400 border border-black shrink-0">
            <User className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* LEADS FORWARDED INBOX (FLANX EXCLUSIVE) */}
      <div className="bg-slate-900 text-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-3 gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-amber-400 border border-black text-black rounded-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-black text-white uppercase text-sm tracking-tight">
                📥 Leads de Tráfego Recebidos da Administração
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                Clientes em sua região atraídos pelo fundo de marketing que foram designados ao seu whatsapp:
              </p>
            </div>
          </div>
          <span className="text-[9px] font-mono bg-amber-400 text-black px-2.5 py-0.5 border border-black uppercase font-black shrink-0">
            {filteredLeads.length} leads atribuídos
          </span>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400 font-mono font-bold uppercase rounded-sm bg-slate-950/45 border border-slate-800" id="empty_leads_franchisee">
            Sem leads adicionais no momento. Aguarde o encaminhamento do franqueador adm!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLeads.map(lead => (
              <div key={lead.id} className="bg-slate-950 border-2 border-slate-800 p-4 relative flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono bg-amber-400 text-black font-black px-1.5 py-0.2 uppercase border border-black rounded-xs">
                      Interesse: {lead.interest}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">{lead.date}</span>
                  </div>
                  <h4 className="text-sm font-sans font-black text-white mt-2 uppercase">{lead.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold font-mono">Contato: {lead.whatsapp} • Origem: {lead.source}</p>
                </div>

                <div className="bg-slate-900/60 p-2.5 border border-slate-800 text-[10px] text-slate-300 font-medium">
                  Status: <strong className="uppercase font-mono text-amber-400 text-[9px]">[{lead.status}]</strong>
                  <p className="mt-1">Dica: Gere o roteiro persuasivo do produto "{lead.interest}" abaixo e faça a prospecção.</p>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-900">
                  <button
                    onClick={() => {
                      // Simulate WhatsApp script generation helper
                      setCustomKeyword(lead.name);
                      setSelectedTone('persuasivo');
                      
                      // Find solution
                      const prod = HUB_PRODUCTS.find(p => p.name === lead.interest || lead.interest.includes(p.name)) || HUB_PRODUCTS[0];
                      setActiveProduct(prod);

                      handleUpdateLeadStatus(lead.id, 'abordado');
                      alert(`Roteiro para ${lead.name} carregado no Copiador de Scripts abaixo!`);
                    }}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-[10px] font-black uppercase border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    🚀 Gerar Script
                  </button>

                  <button
                    onClick={() => handleConvertLead(lead)}
                    disabled={lead.status === 'convertido'}
                    className={`flex-1 py-1.5 text-[10px] font-black uppercase border flex items-center justify-center gap-1.5 transition-all ${
                      lead.status === 'convertido'
                        ? 'bg-emerald-900 border-emerald-700 text-emerald-400 cursor-not-allowed'
                        : 'bg-emerald-500 hover:bg-emerald-400 border-emerald-600 text-black'
                    }`}
                  >
                    ✓ Ganhei Venda
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CORE WORKSPACE PORTAL MODULES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="portal_workspace_modules">
        
        {/* LEFT COLUMN: SOLUTIONS SELECTOR & LINKS */}
        <div className="lg:col-span-6 space-y-6" id="product_picker_column">
          <div className="flex items-center justify-between border-b border-black pb-1">
            <h3 className="font-sans font-black text-base text-black uppercase tracking-tight">
              1. Selecione a solução para vender no dia:
            </h3>
            <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 border border-black font-extrabold font-mono uppercase">
              {filteredProducts.length} disponíveis
            </span>
          </div>

          {/* Vertical filter triggers */}
          <div className="flex flex-wrap gap-2" id="filter_vertical_tags">
            {[
              { id: 'todos', label: 'Todos os Itens' },
              { id: 'Care', label: 'FLANX Care (Saúde)' },
              { id: 'Education', label: 'FLANX Education (MEC)' },
              { id: 'Business', label: 'FLANX Business (Empresas)' }
            ].map(v => (
              <button
                key={v.id}
                onClick={() => setSelectedVertical(v.id)}
                className={`py-1.5 px-3 text-[10px] font-sans font-black uppercase tracking-tight transition-all border-2 border-black ${
                  selectedVertical === v.id
                    ? 'bg-amber-400 text-black shadow-none'
                    : 'bg-white text-black hover:bg-slate-50 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Grid list of solution cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="solutions_cards_grid">
            {filteredProducts.map(p => {
              const isActive = activeProduct.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveProduct(p);
                    setSuccessMessage(null);
                  }}
                  className={`p-4 border-4 text-left flex flex-col justify-between transition-all rounded-none min-h-[140px] ${
                    isActive
                      ? 'bg-slate-900 border-black text-white shadow-none translate-y-0.5'
                      : 'bg-white border-black text-black hover:bg-amber-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[8px] font-mono font-black border uppercase px-1.5 py-0.2 ${
                        p.vertical === 'Care' 
                          ? 'bg-rose-100 text-rose-800 border-rose-400' 
                          : p.vertical === 'Education' 
                            ? 'bg-violet-100 text-violet-800 border-violet-400' 
                            : 'bg-amber-100 text-amber-800 border-amber-400'
                      }`}>
                        {p.vertical}
                      </span>
                    </div>
                    <h4 className="font-sans font-black text-xs uppercase tracking-tight line-clamp-2">{p.name}</h4>
                  </div>
                  <div className="pt-2 border-t border-dashed border-gray-200 mt-2 flex justify-between items-end">
                    <div>
                      <span className="text-[8px] font-mono block uppercase opacity-60">Valor Solução:</span>
                      <strong className="text-xs font-mono">R$ {p.price.toLocaleString('pt-BR')}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] font-mono block uppercase text-emerald-500 font-extrabold">Seu Ganho aprox:</span>
                      <strong className="text-xs font-mono text-emerald-500 font-black">
                        R$ {(p.price * (globalSplitRate/100)).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}
                      </strong>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL COPIER & SIMULATED CHECKOUT */}
        <div className="lg:col-span-6 space-y-6" id="portal_action_column">
          
          {/* LINK GENERATOR & SCRIPT COPY */}
          <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4" id="linker_script_hub">
            <div className="border-b border-black pb-2 flex justify-between items-center">
              <h3 className="font-sans font-black text-black text-sm uppercase flex items-center gap-1.5">
                <MessageSquareCode className="w-4 h-4 text-amber-500" />
                Material e Copiador de Script
              </h3>
              <span className="text-[9px] font-mono uppercase bg-black text-white px-2 py-0.5">Gerador de Roteiro</span>
            </div>

            <div className="bg-slate-50 border border-black p-3 space-y-2">
              <span className="text-[8px] font-mono text-gray-400 uppercase font-black block">SEU ENDEREÇO INDIVIDUAL DETALHADO</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={customAffiliateLink}
                  className="bg-white border text-[11px] px-2 py-1.5 font-mono w-full focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="p-1 px-3 bg-slate-900 text-amber-400 border border-black hover:bg-amber-400 hover:text-black hover:scale-[1.01] transition-all text-xs font-black uppercase"
                >
                  {copiedLink ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Tone filter triggers */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-gray-400 uppercase font-black block">Tonalidade Persuasiva</span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'persuasivo', label: 'Persuasivo' },
                  { id: 'empatico', label: 'Empático' },
                  { id: 'tecnico', label: 'Técnico' },
                  { id: 'direto', label: 'Direto' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTone(t.id)}
                    className={`py-1 text-[9px] font-sans font-black uppercase transition-all border ${
                      selectedTone === t.id
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword injector input */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-400 uppercase font-black block">Ajuste: Injetar Nome/Palavra no Script</span>
              <input
                type="text"
                placeholder="Ex: Nome do cliente, cupom, desconto local"
                value={customKeyword}
                onChange={(e) => setCustomKeyword(e.target.value)}
                className="w-full bg-white border border-black py-1 px-2.5 text-xs text-black font-semibold focus:outline-none"
              />
            </div>

            {/* Final script generated visualization text area */}
            <div className="space-y-2 pt-2">
              <span className="text-[9px] font-mono text-gray-400 uppercase font-black block">Apresentação para Enviar no WhatsApp</span>
              <div className="bg-amber-50/50 border border-amber-300 p-3 text-xs text-slate-800 text-justify leading-relaxed font-sans font-semibold">
                {generateCopyScript()}
              </div>
              <button
                onClick={handleCopyCopy}
                className="w-full py-1.5 bg-black hover:bg-amber-400 hover:text-black text-white text-xs font-black uppercase border border-black transition-all flex items-center justify-center gap-2"
              >
                {copiedCopy ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-amber-500" />}
                {copiedCopy ? 'COPIADO COM SUCESSO!' : 'COPIAR SCRIPT COMPLETO'}
              </button>
            </div>
          </div>

          {/* SIMULATE SALES CHECKOUT ENGINE */}
          <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4" id="checkout_simulation_box">
            <div className="border-b border-black pb-2 flex justify-between items-center">
              <h3 className="font-sans font-black text-black text-sm uppercase flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-500 stroke-[2.5]" />
                Simulador de Checkout e Split Direto
              </h3>
              <span className="text-[9px] font-mono bg-amber-400 text-black px-2 py-0.5 border border-black font-black uppercase">
                Faturamento Direto
              </span>
            </div>

            <p className="text-[11px] text-gray-650 leading-relaxed font-semibold">
              Efetue uma transação simulada como se o cliente estivesse realizando a compra. Veja o motor arrecadar no pix/cartão, reter o saldo para a FLANX administrativamente e liberar seu repasse de <strong>{globalSplitRate}% de imediato</strong>.
            </p>

            <form onSubmit={handleSimulateSale} className="space-y-3 font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-gray-400 block uppercase font-bold">Nome do Comprador</span>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João das Dores"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-black py-1.5 px-3 text-xs text-black font-semibold focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-gray-400 block uppercase font-bold">Telefone Celular</span>
                  <input
                    type="text"
                    required
                    placeholder="Ex: (21) 97777-6666"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white border border-black py-1.5 px-3 text-xs text-black font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[8px] font-mono text-gray-400 block uppercase font-bold">Solução Sendo Vendida</span>
                <div className="bg-slate-50 border border-black p-2 text-xs font-sans font-bold flex justify-between items-center">
                  <span className="uppercase text-slate-800">
                    [{activeProduct.vertical}] {activeProduct.name}
                  </span>
                  <strong className="font-mono text-black">R$ {activeProduct.price.toLocaleString('pt-BR')}</strong>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSimulating}
                className={`w-full py-2.5 font-sans font-black uppercase text-xs border-2 border-black transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                  isSimulating
                    ? 'bg-amber-400 text-black cursor-wait'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                }`}
              >
                {isSimulating ? '🚀 PROCESSANDO SPLIT DA TRANSAÇÃO...' : '💸 SIMULAR PAGAMENTO DE CLIENTE (PIX)'}
              </button>
            </form>

            {successMessage && (
              <div id="sim_split_success_banner_flanx" className="bg-emerald-100 border-2 border-black p-4 text-xs text-black space-y-1 animate-fade-in font-semibold">
                <p className="flex items-center gap-1.5 font-bold uppercase text-emerald-800">
                  <CheckCircle className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                  {successMessage}
                </p>
                <p className="text-[10px] text-slate-600 font-normal pl-5 mt-1 leading-normal">
                  Faturamento de <strong>R$ {activeProduct.price.toLocaleString('pt-BR')}</strong> fracionado com sucesso: <strong className="font-black text-black">R$ {(activeProduct.price * (globalSplitRate/100)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> enviado à sua carteira; <strong className="font-black text-black">R$ {(activeProduct.price * (1 - globalSplitRate/100)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> enviado à conta da FLANX.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DYNAMIC LIST OF SPLITS AND TRANSACTIONS */}
      <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] font-sans" id="splits_history_box">
        <h3 className="font-sans font-black text-black text-sm border-b-2 border-black pb-3 uppercase tracking-tight flex items-center justify-between">
          <span>Histórico do Livro de Splits (Vendas Rápidas)</span>
          <span className="text-[10px] bg-slate-100 border border-black text-slate-700 font-mono font-bold px-2 py-0.5">
            Monitor do Afiliado Ator
          </span>
        </h3>

        {salesList.filter(s => s.franchiseeId === consultant.id).length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-400 font-mono font-bold uppercase" id="no_recent_sales_af">
            Nenhuma comissão simulada por você ainda. Use a caixa de faturamento acima!
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs text-black border-collapse font-semibold font-sans">
              <thead>
                <tr className="border-b-2 border-black font-mono text-[9px] text-gray-400 uppercase tracking-widest text-left">
                  <th className="py-2.5 text-black">Horário</th>
                  <th className="py-2.5 text-black">Cliente Atendido</th>
                  <th className="py-2.5 text-black">Solução Contratada</th>
                  <th className="py-2.5 text-black">Preço Bruto</th>
                  <th className="py-2.5 text-right text-emerald-600 font-black">Seu Ganho (Split)</th>
                  <th className="py-2.5 text-right text-black font-bold">Taxa Administrativa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesList.filter(s => s.franchiseeId === consultant.id).map(sale => (
                  <tr key={sale.id} className="hover:bg-amber-50/30 transition-all font-semibold">
                    <td className="py-3 font-mono text-gray-500 font-bold">{sale.date}</td>
                    <td className="py-3 font-sans font-black uppercase text-black">{sale.buyerName}</td>
                    <td className="py-3 font-sans">
                      <span className="inline-block w-2 h-2 rounded-none border border-black bg-slate-900 mr-1.5" />
                      {sale.productName}
                    </td>
                    <td className="py-3 font-mono">R$ {sale.price.toLocaleString('pt-BR')}</td>
                    <td className="py-3 text-right font-mono text-emerald-600 font-black">
                      + R$ {sale.commissionPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 text-right font-mono text-slate-650">
                      R$ {sale.hubSplit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
