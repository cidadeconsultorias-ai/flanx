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
        <span className="bg-amber-400 text-black border-2 border-black font-mono text-xs uppercase font-black tracking-widest px-3 py-1.5 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          ✨ Vagas de Micro-Parceria Abertas • 100% Home-Office
        </span>
        
        <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-black leading-tight uppercase">
          Abra seu Próprio Negócio <br />
          com o Catálogo de Soluções do <span className="bg-amber-400 border-2 border-black px-3 py-1 text-black font-black pb-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">HUB</span>
        </h1>
        
        <p className="text-base text-gray-700 font-sans font-semibold leading-relaxed max-w-3xl mx-auto">
          Você não precisa produzir softwares, negociar suporte de Telemedicina ou lidar com burocracias. Nós fornecemos a infraestrutura, canais digitais e produtos validados. Você conecta clientes locais e fatura com até <strong className="font-extrabold text-black">80% de comissão rápida</strong> com split imediato!
        </p>
      </div>

      {/* WHY JOIN - CORE VALUE PROPOSITIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="recruitment_features">
        <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="p-3 border-2 border-black bg-rose-200 text-black w-fit">
            <Laptop className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h3 className="font-sans font-black text-black uppercase tracking-tight text-sm">Estrutura Pronta de Captação</h3>
          <p className="text-xs text-gray-650 font-sans font-semibold leading-relaxed">
            Seus links já vêm homologados com o seu nome. Páginas de vendas de alta conversão, copys rápidas de WhatsApp e acompanhamento consultivo tático de leads.
          </p>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="p-3 border-2 border-black bg-emerald-200 text-black w-fit">
            <Zap className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h3 className="font-sans font-black text-black uppercase tracking-tight text-sm">Split Financeiro Imediato</h3>
          <p className="text-xs text-gray-650 font-sans font-semibold leading-relaxed">
            Nada de esperar semanas! O sistema arrecada no PIX ou Cartão, repassa sua fatia imediatamente ao saldo da sua carteira e você transfere direto para sua conta.
          </p>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="p-3 border-2 border-black bg-indigo-200 text-black w-fit">
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h3 className="font-sans font-black text-black uppercase tracking-tight text-sm">Garantia Comercial do HUB</h3>
          <p className="text-xs text-gray-650 font-sans font-semibold leading-relaxed">
            Contratos médicos oficiais da Telemedicina, certificação validada pelo MEC nas formações civis e as menores taxas regionais nas maquininhas.
          </p>
        </div>
      </div>

      {/* THREE PILLARS EXPLANATION */}
      <div className="bg-black text-white border-4 border-black p-6 md:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" id="three_pillars_section">
        <div className="max-w-xl">
          <span className="text-[10px] font-mono text-[#fbbf24] uppercase font-black tracking-widest block">
            PORTFOLIO VERSÁTIL
          </span>
          <h3 className="text-2xl font-sans font-black mt-2 uppercase">As Três Verticais que Você Comercializa</h3>
          <p className="text-xs text-slate-300 mt-1 font-semibold">
            Nossos microempreendedores possuem soluções adaptáveis para vender para qualquer pessoa ou comércio local:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="recruitment_verticals_pitch">
          <div className="border-l-4 border-rose-400 pl-4 space-y-1">
            <h4 className="font-sans font-black text-xs uppercase text-rose-300">Care (Proteção & Saúde)</h4>
            <p className="text-[11px] text-slate-350 leading-relaxed font-semibold">
              Consiga clientes rápidos com <strong className="font-semibold text-white">Telemedicina 24h por R$ 79/mês</strong>, plano funerário com abrangência nacional e economia de energia solar.
            </p>
          </div>

          <div className="border-l-4 border-violet-400 pl-4 space-y-1">
            <h4 className="font-sans font-black text-xs uppercase text-slate-100">Education (Mentoria & MEC)</h4>
            <p className="text-[11px] text-slate-350 leading-relaxed font-semibold">
              Cursos Livres anuais, Formações Técnicas MEC express em 12 meses e matrículas de Graduação com bolsas. Comissões de até R$ 1.440.
            </p>
          </div>

          <div className="border-l-4 border-amber-400 pl-4 space-y-1">
            <h4 className="font-sans font-black text-xs uppercase text-amber-300">Business (PMEs & Liderança)</h4>
            <p className="text-[11px] text-slate-350 leading-relaxed font-semibold">
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
            <h3 className="text-2xl font-sans font-black text-black tracking-tight uppercase">
              Sua Trilha de Evolução do Júnior ao Master
            </h3>
            
            <p className="text-xs text-gray-500 leading-relaxed font-sans font-bold">
              Nosso ecossistema preza pela meritocracia real. Sem comissões multinível, focando em satisfazer necessidades autênticas dos clientes locais:
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="flex-none w-7 h-7 border-2 border-black bg-white text-black flex items-center justify-center font-mono font-black text-xs">
                  1
                </div>
                <div>
                  <h4 className="font-sans font-black text-xs text-black uppercase">Júnior - Diagnóstico de Perfil</h4>
                  <p className="text-[11px] text-gray-600 font-sans font-semibold mt-0.5 leading-relaxed">
                    Você realiza o credenciamento comportamental na Academia, conclui os 3 módulos práticos de treinamento inicial e acessa o Portal de comissões imediato.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-none w-7 h-7 border-2 border-black bg-[#fbbf24] text-black flex items-center justify-center font-mono font-black text-xs">
                  2
                </div>
                <div>
                  <h4 className="font-sans font-black text-xs text-black uppercase">Premium - Leads de WhatsApp</h4>
                  <p className="text-[11px] text-gray-600 font-sans font-semibold mt-0.5 leading-relaxed">
                    Alcançando 8 vendas bem-sucedidas no simulador, o HUB investe o fundo de tráfego diretamente no seu WhatsApp comercial encaminhando leads regionais prontos.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-none w-7 h-7 border-2 border-black bg-black text-white flex items-center justify-center font-mono font-black text-xs">
                  3
                </div>
                <div>
                  <h4 className="font-sans font-black text-xs text-black uppercase">Master - Liderança & Suporte</h4>
                  <p className="text-[11px] text-gray-600 font-sans font-semibold mt-0.5 leading-relaxed">
                    Ao consolidar sua maturidade comercial, você apoia novos afiliados locais na capacitação, lidera canais regionais e recebe prêmios aditivos de coordenação.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50/50 border-2 border-black p-4 flex items-center gap-3.5 mt-4">
            <div className="p-2 bg-black text-white border-2 border-black w-fit">
              <Handshake className="w-5 h-5 stroke-[2.5]" />
            </div>
            <p className="text-[10px] text-gray-750 font-sans font-semibold leading-relaxed">
              <strong className="font-black text-black">Comprometimento Mútuo:</strong> Disponibilizamos as ferramentas e contratos. Você entra com as abordagens locais. Parceria ganha-ganha.
            </p>
          </div>
        </div>

        {/* REGISTRATION FORM CARD */}
        <div className="lg:col-span-6 bg-white border-4 border-black p-6 lg:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between" id="application_register_box">
          <div className="space-y-4">
            <div className="border-b-2 border-black pb-3">
              <span className="text-[9px] font-mono tracking-widest bg-amber-400 text-black px-2 py-0.5 font-black uppercase border border-black inline-block">
                FORMULÁRIO DE SELEÇÃO
              </span>
              <h3 className="font-sans font-black text-black text-base mt-2 uppercase">
                Quero me Candidatar como Consultor do HUB
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" id="recruitment_form">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase font-black">Seu Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Oliveira"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="partner_signup_name"
                  className="w-full bg-slate-50 border-2 border-black px-3 py-2 text-xs text-black font-sans font-semibold focus:outline-none focus:bg-white focus:ring-0"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-500 uppercase font-black">Celular WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: (11) 98888-7777"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    id="partner_signup_whatsapp"
                    className="w-full bg-slate-50 border-2 border-black px-3 py-2 text-xs text-black font-sans font-semibold focus:outline-none focus:bg-white focus:ring-0"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-500 uppercase font-black">E-mail Principal</label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: carlos@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="partner_signup_email"
                    className="w-full bg-slate-50 border-2 border-black px-3 py-2 text-xs text-black font-sans font-semibold focus:outline-none focus:bg-white focus:ring-0"
                  />
                </div>
              </div>

              {/* Behavioral interest check box */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase font-black">Setor de Maior Interesse de Vendas</label>
                <select id="signup_vertical_interest" className="w-full bg-slate-50 border-2 border-black py-1.5 px-3 text-xs text-black font-sans font-black focus:outline-none focus:bg-white">
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
                  className="mt-1 border-2 border-black w-4 h-4 accent-black cursor-pointer"
                />
                <label htmlFor="check_terms" className="text-[10px] text-gray-500 font-sans font-semibold leading-normal cursor-pointer">
                  Declaro que as informações acima são reais. Concordo em ingressar sob as regras da Matriz de Responsabilidade do HUB com splits automáticos securitizados.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!termsAccepted || submitted}
                  id="btn_submit_recruitment"
                  className="w-full py-2.5 px-4 bg-black border-2 border-black hover:bg-amber-400 hover:text-black text-white disabled:opacity-50 text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
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

          <div className="mt-6 border-t-2 border-black pt-3 text-center">
            <span className="text-[9px] font-mono text-emerald-700 block uppercase font-black">
              ✓ INFRAESTRUTURA DE SUPORTE 100% OPERANTE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
