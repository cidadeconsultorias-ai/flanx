import React, { useState } from 'react';
import { PROFILE_QUESTIONS } from '../data';
import { ConsultantState } from '../types';
import { Award, CheckCircle, Flame, Star, Compass, HelpCircle, Trophy, BookOpen, AlertCircle, ChevronRight, Lock, KeyRound, Check } from 'lucide-react';

interface HierarchyViewProps {
  consultant: ConsultantState;
  setConsultant: React.Dispatch<React.SetStateAction<ConsultantState>>;
}

export default function HierarchyView({ consultant, setConsultant }: HierarchyViewProps) {
  // Assessment Test States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [testCompleted, setTestCompleted] = useState<boolean>(!!consultant.assessmentResult);

  // Academy Module States
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [lessonFeedback, setLessonFeedback] = useState<string | null>(null);

  const handleSelectOption = (qId: string, profile: string) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: profile
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < PROFILE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Process test results
      const profileCounts: Record<string, number> = {
        Executor: 0,
        Comunicador: 0,
        Analista: 0,
        Planejador: 0
      };

      Object.values(answers).forEach(profile => {
        const pStr = profile as string;
        profileCounts[pStr] = (profileCounts[pStr] || 0) + 1;
      });

      // Find the winning profile
      let bestProfile = 'Executor Comunicador';
      let maxCount = 0;

      Object.entries(profileCounts).forEach(([profile, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestProfile = profile;
        }
      });

      // Compound profiles based on dominant and secondary
      if (bestProfile === 'Executor') bestProfile = 'Executor Comercial 🔥';
      if (bestProfile === 'Comunicador') bestProfile = 'Conector Comunicador 💬';
      if (bestProfile === 'Analista') bestProfile = 'Consultor Analítico 📊';
      if (bestProfile === 'Planejador') bestProfile = 'Estrategista Planejador 🎯';

      setConsultant(prev => ({
        ...prev,
        assessmentResult: bestProfile,
        points: prev.points + 10 // Gain 10 points for completing assessment
      }));

      setTestCompleted(true);
    }
  };

  const handleResetTest = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTestCompleted(false);
    setConsultant(prev => ({
      ...prev,
      assessmentResult: null
    }));
  };

  // Academy Mini Trainings
  const lessons = [
    {
      id: 'integration',
      title: 'Trilha de Integração Básica: O Modelo Radial',
      time: '6 minutos',
      pointsReward: 5,
      content: 'Bem-vindo ao HUB! Como consultor Júnior, você foca em produtos de alta penetração e recorrência (Telemedicina, Cursos EAD e Energia Solar Compartilhada). Lembre-se: sua responsabilidade principal é prospectar o cliente e apresentar a dor regional. A cobrança, split e a emissão burocrática dos diplomas e ativações de saúde são todas de responsabilidade do HUB central para que você foque exclusivamente em vendas de alto impacto.',
      question: 'Qual é o papel principal do microempreendedor no modelo radial do HUB?',
      options: [
        { key: 'A', text: 'Gerenciar os contratos do MEC e emitir as apólices médicas.', correct: false },
        { key: 'B', text: 'Conectar com novos clientes locais e efetuar a captação por links.', correct: true },
        { key: 'C', text: 'Financiar os custos de tecnologia e servidores do HUB central.', correct: false }
      ]
    },
    {
      id: 'solar',
      title: 'Táticas de Prospecção para Energia Solar Compartilhada',
      time: '8 minutos',
      pointsReward: 8,
      content: 'A assinatura de energia solar é de fácil venda porque o cliente NÃO investe R$ 1 real. Ele apenas direciona uma fração do consumo para usinas solares parceiras do HUB e economiza mensalmente entre 10% e 15% na conta de luz. Para fechar, sempre peça uma foto legível da conta atual de luz e faça o cálculo do valor anual de economia bruta para ele.',
      question: 'O cliente precisa pagar alguma taxa de instalação ou equipamentos para aderir à Energia Solar?',
      options: [
        { key: 'A', text: 'Sim, o aluguel mensal dos painéis solares no quintal.', correct: false },
        { key: 'B', text: 'Não, a adesão é 100% digital e gratuita, apenas gerando desconto real.', correct: true },
        { key: 'C', text: 'Apenas a taxa do transformador na rede da rua.', correct: false }
      ]
    },
    {
      id: 'pricing',
      title: 'Combate de Objeções: "A Telemedicina funciona à noite?"',
      time: '5 minutos',
      pointsReward: 5,
      content: 'A principal dor sanada pela Telemedicina Conecta é a fila hospitalar de madrugada em finais de semana. Nosso clínico geral atende na tela do celular de forma instantânea em até 10 minutos, 24 horas por dia. O médico emite receitas de medicamentos aceitas na hora em qualquer farmácia do país e solicita exames regulados sem limite de consultas.',
      question: 'O atendimento de Clínico Geral na Telemedicina possui limites de ligação ou horário?',
      options: [
        { key: 'A', text: 'Sim, apenas nos dias úteis e com taxa extra.', correct: false },
        { key: 'B', text: 'Não, ele é ilimitado e funciona de forma ininterrupta 24 horas por dia.', correct: true },
        { key: 'C', text: 'É limitado a 2 chamadas mensais por usuário titular.', correct: false }
      ]
    }
  ];

  const handleAnswerQuiz = (lesson: any) => {
    if (quizAnswer === 'B') { // and B is true in our mock list
      setLessonFeedback('Resposta correta! Treinamento validado.');
      
      if (!consultant.completedTrainings.includes(lesson.id)) {
        setConsultant(prev => ({
          ...prev,
          completedTrainings: [...prev.completedTrainings, lesson.id],
          points: prev.points + lesson.pointsReward
        }));
      }
    } else {
      setLessonFeedback('Preste atenção e tente novamente! Dica: O papel principal é focado em vendas e de forma digital e gratuita.');
    }
  };

  return (
    <div className="space-y-10 animate-fade-in" id="hierarchy_root">
      {/* SECTION HEADER */}
      <div className="border-b-4 border-black pb-5">
        <span className="bg-amber-400 text-black font-sans text-xs uppercase font-black tracking-widest px-3 py-1.5 border-2 border-black inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Carreira, Meritocracia & IA
        </span>
        <h2 className="text-3xl font-sans font-black text-black tracking-tight mt-4 uppercase flex items-center gap-3">
          <Trophy className="w-7 h-7 text-black stroke-[2.5]" />
          Hierarquia de Crescimento Baseada em Desempenho
        </h2>
        <p className="text-gray-650 font-sans mt-2 text-sm max-w-4xl font-semibold">
          Alta performance comprovada de forma transparente. Sem esquemas e sem multinível. Sua escalada do nível Júnior ao Master é conquistada estritamente por meio de metas cumpridas, treinamentos concluídos e qualificações de perfil HMI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="hierarchy_panels_wrapper">
        {/* CARREER PLAN STATS GRID - LEFT CONTAINER */}
        <div className="lg:col-span-4 bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6" id="career_tiers_list">
          <h3 className="font-sans font-black text-black text-base border-b-2 border-black pb-3 uppercase tracking-tight">
            Plano de Carreira do HUB
          </h3>

          {/* LEVEL 1 CARD */}
          <div className={`p-4 border-2 border-black transition-all rounded-none ${
            consultant.level === 'Junior' 
              ? 'bg-[#fef08a] border-4 shadow-none translate-y-0.5 font-bold' 
              : 'bg-white opacity-90'
          }`} id="career_card_junior">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono tracking-wider font-black bg-white px-2 py-0.5 border border-black text-black">
                NÍVEL 1 (INICIANTE)
              </span>
              {consultant.level === 'Junior' && (
                <span className="text-[10px] font-sans text-black font-black flex items-center gap-1 uppercase">
                  ● Nível Atual
                </span>
              )}
            </div>
            <h4 className="font-sans font-black text-black mt-3 text-sm uppercase">Consultor Júnior</h4>
            <p className="text-xs text-gray-700 font-semibold mt-1">
              Foco inicial em vendas simplificadas e menor complexidade: Telemedicina individual, Cursos Livres e Energia Solar.
            </p>

            <ul className="text-[10px] font-sans text-gray-800 font-bold mt-3 space-y-1 list-disc list-inside">
              <li>Como Entra: Teste comportamental concluído</li>
              <li>Material: Recebe páginas prontas e criativos</li>
            </ul>
          </div>

          {/* LEVEL 2 CARD */}
          <div className={`p-4 border-2 border-black transition-all rounded-none ${
            consultant.level === 'Premium' 
              ? 'bg-amber-400 border-4 shadow-none translate-y-0.5 font-bold' 
              : 'bg-white'
          }`} id="career_card_premium">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono tracking-wider font-black bg-white px-2 py-0.5 border border-black text-black">
                NÍVEL 2 (PRODUTOR)
              </span>
              {consultant.level === 'Premium' && (
                <span className="text-[10px] font-sans text-emerald-700 font-black flex items-center gap-1 uppercase">
                  ● Ativo
                </span>
              )}
            </div>
            <h4 className="font-sans font-black text-black mt-3 text-sm uppercase">Consultor Premium</h4>
            <p className="text-xs text-gray-750 font-semibold mt-1">
              Libera soluções de alta margem: Formação Técnica MEC, Pós-Graduação EAD e pacotes de Telemedicina corporativos.
            </p>

            <ul className="text-[10px] font-sans text-gray-800 font-bold mt-3 space-y-1 list-disc list-inside">
              <li>Como Avança: 8 vendas simuladas no Portal</li>
              <li>Aceleração: Leads centralizados enviados ao WhatsApp</li>
            </ul>
          </div>

          {/* LEVEL 3 CARD */}
          <div className={`p-4 border-2 border-black transition-all rounded-none ${
            consultant.level === 'Master' 
              ? 'bg-orange-500 border-4 text-white shadow-none translate-y-0.5' 
              : 'bg-white'
          }`} id="career_card_master">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono tracking-wider font-black bg-white text-black px-2 py-0.5 border border-black">
                NÍVEL 3 (ELITE)
              </span>
              {consultant.level === 'Master' && (
                <span className="text-[10px] font-sans text-white font-black flex items-center gap-1 uppercase">
                  ● Nível Máximo
                </span>
              )}
            </div>
            <h4 className={`font-sans font-black mt-3 text-sm uppercase ${consultant.level === 'Master' ? 'text-white' : 'text-black'}`}>Parceiro Master</h4>
            <p className={`text-xs mt-1 font-semibold ${consultant.level === 'Master' ? 'text-white' : 'text-gray-750'}`}>
              Liberado para diagnosticar perfis locais, oferecer mentorias corporativas individuais e comissões por afiliação simples.
            </p>

            <ul className={`text-[10px] font-sans mt-3 space-y-1 list-disc list-inside font-bold ${consultant.level === 'Master' ? 'text-white' : 'text-gray-800'}`}>
              <li>Como Avança: Liderança e consistência de vendas regionais</li>
              <li>Comissões aditivas de suporte integrado ao HUB</li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: ASSESSMENT & ACADEMY MODULES */}
        <div className="lg:col-span-8 space-y-8" id="assessment_and_academy_containers">
          {/* INTERACTIVE BEHAVIORAL PROFILE ASSESSMENT */}
          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-5" id="behavioral_assessment_test_wrapper">
            <div className="flex items-center justify-between border-b-2 border-black pb-3.5">
              <div>
                <span className="text-[10px] font-mono tracking-wider bg-pink-300 text-black px-2 py-1 border border-black font-black uppercase">
                  Diagnóstico HMI / MDS
                </span>
                <h3 className="font-sans font-black text-black text-base mt-2 uppercase">
                  Mapeamento de Perfil Comportamental
                </h3>
              </div>
              
              <span className="text-xs text-black font-mono font-black uppercase">
                {testCompleted ? '✓ Concluído' : `Questão ${currentQuestionIndex + 1} de ${PROFILE_QUESTIONS.length}`}
              </span>
            </div>

            {!testCompleted ? (
              <div id="test_active_state" className="space-y-4">
                <p className="text-[10px] text-gray-500 font-mono font-black uppercase tracking-wider leading-relaxed">
                  Responda com clareza para avaliarmos o seu padrão de conversão preferencial:
                </p>

                <div className="bg-slate-55 border-2 border-black p-4 font-sans font-black text-black text-sm uppercase">
                  {PROFILE_QUESTIONS[currentQuestionIndex].question}
                </div>

                <div className="space-y-2.5" id="profile_test_option_list">
                  {PROFILE_QUESTIONS[currentQuestionIndex].options.map((opt) => {
                    const isSelected = answers[PROFILE_QUESTIONS[currentQuestionIndex].id] === opt.profile;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption(PROFILE_QUESTIONS[currentQuestionIndex].id, opt.profile)}
                        id={`opt_btn_${opt.key}`}
                        className={`w-full p-4 border-2 border-black text-left text-xs transition-all flex items-center justify-between rounded-none ${
                          isSelected
                            ? 'bg-black border-black text-white font-black'
                            : 'bg-white border-gray-250 hover:border-black hover:bg-orange-50 font-bold'
                        }`}
                      >
                        <span className="font-sans leading-relaxed text-xs uppercase">{opt.key}. {opt.text}</span>
                        <div className={`w-3.5 h-3.5 border flex items-center justify-center ${isSelected ? 'border-white bg-black' : 'border-black'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 bg-white"></div>}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    onClick={handleNextQuestion}
                    disabled={!answers[PROFILE_QUESTIONS[currentQuestionIndex].id]}
                    id="btn_next_quest_test"
                    className="py-2.5 px-5 bg-black hover:border-black hover:bg-orange-500 hover:text-white border-2 border-black disabled:opacity-50 text-white font-black uppercase text-xs transition-all flex items-center gap-1.5"
                  >
                    {currentQuestionIndex === PROFILE_QUESTIONS.length - 1 ? 'Finalizar e Ver Perfil' : 'Próxima Pergunta'}
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ) : (
              <div id="test_completed_state" className="space-y-4 text-center py-6 bg-orange-50 border-2 border-black px-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-3 bg-white border-2 border-black text-black w-fit mx-auto">
                  <Award className="w-8 h-8 stroke-[2]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-500 uppercase font-black tracking-widest">
                    Laudo Diagnosticado HMI:
                  </span>
                  <h4 id="profile_assessment_full_res" className="text-2xl font-sans font-black text-black uppercase">
                    {consultant.assessmentResult}
                  </h4>
                </div>

                <p className="text-xs text-black font-semibold font-sans leading-relaxed max-w-xl mx-auto">
                  Excelente! Você qualificou seu padrão comportamental. Seu cadastro foi arquivado no painel de vendas regionais do Conecta Business HUB. Essa capacitação libera seu credenciamento para captação de clientes.
                </p>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetTest}
                    id="btn_retry_test"
                    className="py-2 px-4 border-2 border-black hover:bg-black hover:text-white text-black font-black uppercase text-[10px] transition-all"
                  >
                    Resetar Diagnóstico
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ACADÈMIA DO HUB: TRAINING TASKS */}
          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4 animate-fade-in" id="hub_academy_wrapper">
            <div className="border-b-2 border-black pb-4">
              <span className="text-[10px] font-mono tracking-wider font-black bg-emerald-400 text-black px-3 py-1.5 border-2 border-black inline-block uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Capacitação Especializada
              </span>
              <h3 className="font-sans font-black text-black text-base mt-3 uppercase">
                Academia do HUB (Treinamentos Operacionais)
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">
                Efetue os testes rápidos de competência teórica para liberar mais pontuação de liderança e subir na carreira.
              </p>
            </div>

            {/* List of training modules */}
            <div className="divide-y-2 divide-black space-y-4" id="academy_lessons_list">
              {lessons.map((lesson) => {
                const isCompleted = consultant.completedTrainings.includes(lesson.id);
                const isOpened = activeLessonId === lesson.id;

                return (
                  <div key={lesson.id} className="pt-4 first:pt-0 space-y-3">
                    <div
                      onClick={() => {
                        setActiveLessonId(isOpened ? null : lesson.id);
                        setQuizAnswer('');
                        setLessonFeedback(null);
                      }}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 border-2 border-black ${isCompleted ? 'bg-[#86efac] text-black' : 'bg-slate-100 text-black'}`}>
                          <BookOpen className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div className="text-left font-sans">
                          <h4 className="text-sm font-black text-black uppercase group-hover:underline">
                            {lesson.title}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-mono font-bold">
                            DURAÇÃO: {lesson.time} | RECOMPENSA: +{lesson.pointsReward} PONTOS HMI
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <span className="text-[10px] font-mono text-emerald-700 bg-white border border-black px-1.5 font-bold uppercase">
                            ✓ Concluido
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 text-black stroke-[2.5] transition-transform ${isOpened ? 'rotate-90' : ''}`} />
                      </div>
                    </div>

                    {/* Lesson Content Expanded */}
                    {isOpened && (
                      <div className="p-4 bg-orange-50 border-2 border-black space-y-4 animate-fade-in text-xs text-black leading-relaxed font-sans font-semibold">
                        <p className="border-l-4 border-solid border-black pl-3 italic text-gray-700">
                          {lesson.content}
                        </p>

                        <div className="space-y-2 border-t-2 border-dashed border-gray-300 pt-3">
                          <h5 className="font-black text-black flex items-center gap-1.5 mb-2 font-sans text-xs uppercase">
                            <AlertCircle className="w-4 h-4 text-orange-500 stroke-[2.5]" />
                            Teste de Aprendizado Rápido:
                          </h5>
                          <p className="font-bold text-gray-900 mb-2">{lesson.question}</p>

                          <div className="space-y-1.5">
                            {lesson.options.map((opt) => (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => setQuizAnswer(opt.key)}
                                className={`w-full p-2.5 border-2 border-black text-left rounded-none transition-all ${
                                  quizAnswer === opt.key
                                    ? 'bg-black text-white font-black'
                                    : 'bg-white text-black hover:bg-orange-50 font-bold'
                                }`}
                              >
                                {opt.key}) {opt.text}
                              </button>
                            ))}
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <button
                              onClick={() => handleAnswerQuiz(lesson)}
                              className="py-1.5 px-4 bg-emerald-400 hover:bg-emerald-350 border-2 border-black text-black font-black uppercase text-xs transition-all"
                            >
                              Enviar Resposta
                            </button>
                            
                            {lessonFeedback && (
                              <span className={`text-[11px] font-sans font-black ${lessonFeedback.includes('correta') ? 'text-emerald-700' : 'text-orange-600'}`}>
                                {lessonFeedback}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ACELERATOR HOOK / CELULA DE ACELERACAO */}
          <div className="bg-black text-white border-4 border-black p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" id="acceleration_cell_teaser">
            <div className="space-y-1.5 text-left md:max-w-md">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-black tracking-widest flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse stroke-[2.5]" />
                CÉLULA DE ACELERAÇÃO (EXCLUSIVO PREMIUM)
              </span>
              <h3 className="font-sans font-black text-lg uppercase tracking-tight">
                Fundo de Anúncios Cooperados do HUB
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                Quando você atingir 8 prospecções de sucesso, seu nível será promovido para Consultor Premium. Isso ativa seu acesso imediato à célula de tráfego, encaminhando mensagens de interessados da sua cidade direto para seu WhatsApp de atendimento.
              </p>
            </div>

            <div className="bg-white text-black p-4 border-4 border-black text-center font-mono w-full md:w-fit shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]" id="status_accelerator_locked">
              {consultant.level === 'Junior' ? (
                <>
                  <Lock className="w-6 h-6 text-orange-500 mx-auto mb-1.5 stroke-[2.5]" />
                  <span className="text-[9px] text-[#ef4444] block font-black uppercase tracking-widest">Aceleração Bloqueada</span>
                  <span className="text-[9px] text-gray-500 block mt-1 uppercase font-bold">STATUS: JÚNIOR</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-6 h-6 text-[#10b981] mx-auto mb-1.5 animate-bounce stroke-[2.5]" />
                  <span className="text-[9px] text-emerald-600 block font-black uppercase tracking-widest">Aceleração Ativada!</span>
                  <span className="text-[9px] text-emerald-700 block mt-1 uppercase font-bold">STATUS: PREMIUM</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
