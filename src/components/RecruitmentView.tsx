import React, { useState } from 'react';
import { ConsultantState } from '../types';
import { Sparkles, Trophy, Handshake, Zap, ShieldCheck, CheckCircle2, ArrowRight, UserPlus, Laptop, HelpCircle } from 'lucide-react';

interface RecruitmentViewProps {
  onRegisterSubmit: (name: string, whatsapp: string, email: string) => void;
}

export default function RecruitmentView({ onRegisterSubmit }: RecruitmentViewProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp || !email) {
      alert('Por favor, preencha todos os dados de candidatura.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onRegisterSubmit(name, whatsapp, email);
    }, 800);
  };

  return (
    <div className="space-y-16 animate-fade-in max-w-7xl mx-auto py-4" id="recruitment_root">
      
      {/* HERO SECTION / VALUE PROP */}
      <div className="text-center space-y-6 max-w-4xl mx-auto py-6" id="recruitment_hero">
        <span className="bg-coral text-white font-sans text-xs uppercase font-bold tracking-wider px-4 py-2 inline-block rounded-full shadow-sm">
          ✨ Vagas de Micro-Parceria Abertas • 100% Home-Office
        </span>
        
        <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-slate-900 leading-tight uppercase">
          <span className="block whitespace-nowrap">Comece Seu Negócio <span className="bg-coral text-white px-4 py-1.5 font-bold pb-2 inline-block rounded-2xl shadow-sm">Em 7 Dias</span></span>
          <span className="block mt-2">Com Estrutura Pronta do HUB</span>
        </h1>
        
        <div className="bg-white border border-slate-100 p-6 rounded-2xl text-left max-w-3xl mx-auto shadow-md">
          <p className="text-base text-slate-700 font-sans font-medium leading-relaxed text-center">
            Comece seu negócio em 7 dias com estrutura pronta, treinamento especializado e suporte. Comece a lucrar na primeira semana.
          </p>
        </div>
      </div>

      {/* WHY JOIN - CORE VALUE PROPOSITIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="recruitment_features">
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all space-y-4">
          <div className="p-3 bg-rose-50 text-coral w-fit rounded-xl">
            <Laptop className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h3 className="font-sans font-bold text-slate-800 uppercase tracking-tight text-sm">Estrutura Pronta de Captação</h3>
          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            Seus links já vêm homologados com o seu nome. Páginas de vendas de alta conversão, copys rápidas de WhatsApp e acompanhamento consultivo tático de leads.
          </p>
        </div>

        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all space-y-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 w-fit rounded-xl">
            <Zap className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h3 className="font-sans font-bold text-slate-800 uppercase tracking-tight text-sm">Split Financeiro Imediato</h3>
          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            Nada de esperar semanas! O sistema arrecada no PIX ou Cartão, repassa sua fatia imediatamente ao saldo da sua carteira e você transfere direto para sua conta.
          </p>
        </div>

        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all space-y-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 w-fit rounded-xl">
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h3 className="font-sans font-bold text-slate-800 uppercase tracking-tight text-sm">Garantia Comercial do HUB</h3>
          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            Contratos médicos oficiais da Telemedicina, certificação validada pelo MEC nas formações civis e as menores taxas regionais nas maquininhas.
          </p>
        </div>
      </div>

      {/* THREE PILLARS EXPLANATION */}
      <div className="bg-navy text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-md relative overflow-hidden" id="three_pillars_section">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-coral/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="max-w-xl relative z-10">
          <span className="text-[10px] font-mono text-coral uppercase font-bold tracking-widest block">
            PORTFOLIO VERSÁTIL
          </span>
          <h3 className="text-2xl font-sans font-black mt-2 uppercase">As Três Verticais que Você Comercializa</h3>
          <p className="text-xs text-slate-200 mt-1 font-medium">
            Nossos microempreendedores possuem soluções adaptáveis para vender para qualquer pessoa ou comércio local:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10" id="recruitment_verticals_pitch">
          <div className="border-l-4 border-rose-400 pl-4 space-y-1">
            <h4 className="font-sans font-bold text-xs uppercase text-rose-300">Care (Proteção & Saúde)</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              Consiga clientes rápidos com <strong className="font-semibold text-white">Telemedicina 24h por R$ 79/mês</strong>, plano funerário com abrangência nacional e economia de energia solar.
            </p>
          </div>

          <div className="border-l-4 border-violet-400 pl-4 space-y-1">
            <h4 className="font-sans font-bold text-xs uppercase text-slate-100">Education (Mentoria & MEC)</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              Cursos Livres anuais, Formações Técnicas MEC express em 12 meses e matrículas de Graduação com bolsas. Comissões de até R$ 1.440.
            </p>
          </div>

          <div className="border-l-4 border-coral pl-4 space-y-1">
            <h4 className="font-sans font-bold text-xs uppercase text-coral">Business (PMEs & Liderança)</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              Venda testes de inteligência comportamental empresarial HMI / MDS, pacotes de mentoria e maquininhas Pro com grandes descontos de taxas.
            </p>
          </div>
        </div>
      </div>

      {/* RECRUITMENT SPLIT ROW: SUBMISSION FORM & PLAN DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4" id="application_section">
        
        {/* CAREER TIMEFRAME DESCRIPTION */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between" id="career_steps_pitch">
          <div className="space-y-4">
            <h3 className="text-2xl font-sans font-black text-slate-900 tracking-tight uppercase">
              Sua Trilha de Evolução do Júnior ao Master
            </h3>
            
            <p className="text-xs text-slate-500 leading-relaxed font-sans font-semibold">
              Nosso ecossistema preza pela meritocracia real. Sem comissões multinível, focando em satisfazer necessidades autênticas dos clientes locais:
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="flex-none w-7 h-7 bg-slate-100 text-slate-800 flex items-center justify-center font-mono font-bold text-xs rounded-full">
                  1
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-slate-900 uppercase">1️⃣ STARTER - Início Rápido (Grátis)</h4>
                  <p className="text-[11px] text-slate-600 font-sans font-medium mt-0.5 leading-relaxed">
                    Comece sem taxas e faça sua prova de conceito rápida por 30 dias. Acesso ao treinamento básico com split de 65% das comissões direto na sua carteira digital.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-none w-7 h-7 bg-coral/20 text-coral flex items-center justify-center font-mono font-bold text-xs rounded-full">
                  2
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-slate-900 uppercase">2️⃣ GROWTH - Alavancagem Comercial (R$ 197/mês)</h4>
                  <p className="text-[11px] text-slate-600 font-sans font-medium mt-0.5 leading-relaxed">
                    Treinamentos de elite avançados, ferramentas completas de CRM para controle de clientes e suporte personalizado 1-on-1 mensal com comissão expandida para 75%.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-none w-7 h-7 bg-navy text-white flex items-center justify-center font-mono font-bold text-xs rounded-full">
                  3
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-slate-900 uppercase">3️⃣ MASTER - Gestão de Elite (R$ 497/mês)</h4>
                  <p className="text-[11px] text-slate-600 font-sans font-medium mt-0.5 leading-relaxed">
                    Tudo de Growth mais suporte ilimitado prioritário, produtos exclusivos de altíssima conversão, certificação oficial inovadora e distribuição automática de leads gerados pelo Hub. Comissão de 80%!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50/50 border border-orange-100 p-4 flex items-center gap-3.5 mt-4 rounded-xl">
            <div className="p-2 bg-navy text-white rounded-lg">
              <Handshake className="w-5 h-5 stroke-[2.5]" />
            </div>
            <p className="text-[10px] text-slate-600 font-sans font-medium leading-relaxed">
              <strong className="font-bold text-slate-800">Comprometimento Mútuo:</strong> Disponibilizamos as ferramentas e contratos. Você entra com as abordagens locais. Parceria ganha-ganha.
            </p>
          </div>
        </div>

        {/* REGISTRATION FORM CARD */}
        <div className="lg:col-span-6 bg-white border border-slate-100 p-6 lg:p-8 rounded-3xl shadow-md flex flex-col justify-between" id="application_register_box">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[9px] font-mono tracking-wider bg-coral text-white px-2.5 py-1 font-bold uppercase rounded-full shadow-xs">
                FORMULÁRIO DE SELEÇÃO
              </span>
              <h3 className="font-sans font-black text-slate-900 text-base mt-2 uppercase">
                Quero me Candidatar como Consultor do HUB
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" id="recruitment_form">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Seu Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Oliveira"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="partner_signup_name"
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-800 font-sans font-semibold rounded-xl focus:outline-none focus:bg-white focus:border-coral focus:ring-1 focus:ring-coral/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Celular WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: (11) 98888-7777"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    id="partner_signup_whatsapp"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-800 font-sans font-semibold rounded-xl focus:outline-none focus:bg-white focus:border-coral focus:ring-1 focus:ring-coral/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">E-mail Principal</label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: carlos@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="partner_signup_email"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-800 font-sans font-semibold rounded-xl focus:outline-none focus:bg-white focus:border-coral focus:ring-1 focus:ring-coral/20"
                  />
                </div>
              </div>

              {/* Behavioral interest check box */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Setor de Maior Interesse de Vendas</label>
                <select id="signup_vertical_interest" className="w-full bg-slate-50 border border-slate-200 py-1.5 px-3 text-xs text-slate-700 font-sans font-bold rounded-xl focus:outline-none focus:bg-white focus:border-coral cursor-pointer">
                  <option value="care">Care (Telemedicina & Energia Solar)</option>
                  <option value="education">Education (Cursos MEC & Técnicos)</option>
                  <option value="business">Business (Perfil Empreendedor & Máquinas)</option>
                  <option value="all">Serei generalista de todas as soluções</option>
                </select>
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="check_terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 border border-slate-200 w-4 h-4 accent-coral rounded cursor-pointer"
                />
                <label htmlFor="check_terms" className="text-[10px] text-slate-400 font-sans font-semibold leading-normal cursor-pointer selection:bg-transparent">
                  Declaro que as informações acima são reais. Concordo em ingressar sob as regras da Matriz de Responsabilidade do HUB com splits automáticos securitizados.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!termsAccepted || submitted}
                  id="btn_submit_recruitment"
                  className="w-full py-2.5 px-4 bg-coral hover:bg-navy text-white disabled:opacity-50 text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 rounded-full shadow-sm hover:shadow-md cursor-pointer"
                >
                  {submitted ? (
                    <>
                      Criando Escritório Virtual do Consultor...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 stroke-[2.5]" />
                      Enviar Candidatura & Ativar Escritório Virtual
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-3 text-center">
            <span className="text-[9px] font-mono text-emerald-600 block uppercase font-bold">
              ✓ INFRAESTRUTURA DE SUPORTE 100% OPERANTE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
