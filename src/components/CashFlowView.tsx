import React, { useState } from 'react';
import { HUB_PRODUCTS } from '../data';
import { DollarSign, Wallet, Percent, Users, TrendingUp, HelpCircle, ArrowRightLeft, Landmark } from 'lucide-react';
import { Product } from '../types';

export default function CashFlowView() {
  const [selectedProductId, setSelectedProductId] = useState<string>(HUB_PRODUCTS[0].id);
  const [customPrice, setCustomPrice] = useState<number>(HUB_PRODUCTS[0].price);
  const [customSplitRate, setCustomSplitRate] = useState<number>(80); // percentage given to the consultant (e.g. 80%)
  const [activeConsultants, setActiveConsultants] = useState<number>(15);
  const [salesPerConsultant, setSalesPerConsultant] = useState<number>(5);
  const [platformFee, setPlatformFee] = useState<number>(49); // R$ 49 activation fee

  const selectedProduct = HUB_PRODUCTS.find(p => p.id === selectedProductId) || HUB_PRODUCTS[0];

  // Adjust custom price when product changes
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pId = e.target.value;
    setSelectedProductId(pId);
    const prod = HUB_PRODUCTS.find(p => p.id === pId);
    if (prod) {
      setCustomPrice(prod.price);
      setCustomSplitRate(Math.round(prod.commissionRate * 100));
    }
  };

  // CALCULATIONS
  const price = customPrice;
  const rateToConsultant = customSplitRate / 100;
  const rateToHub = 1 - rateToConsultant;

  const commissionPerSale = price * rateToConsultant;
  const hubRetainedPerSale = price * rateToHub;

  const totalSalesCount = activeConsultants * salesPerConsultant;
  const totalVolumeSales = totalSalesCount * price;

  const totalConsultantsPayouts = totalSalesCount * commissionPerSale;
  const totalHubRetainedPayouts = totalSalesCount * hubRetainedPerSale;

  const totalPlatformFeesRevenue = activeConsultants * platformFee;
  const totalHubRevenue = totalHubRetainedPayouts + totalPlatformFeesRevenue;

  // Let's assume a portion of the Hub's retention (e.g., 20% of its commission or a fixed custom R$ 10 per sale) goes to the Marketing Cooperado fund
  const mktCooperadoFeePerSale = Math.min(hubRetainedPerSale * 0.4, 40); // 40% of hub split goes to marketing fund or capped
  const totalMktCooperadoFund = totalSalesCount * mktCooperadoFeePerSale;
  const netHubEarnings = totalHubRevenue - totalMktCooperadoFund;

  return (
    <div className="space-y-8 animate-fade-in" id="cashflow_root">
      {/* SECTION HEADER */}
      <div className="border-b-4 border-black pb-5">
        <span className="bg-amber-400 text-black font-sans text-xs uppercase font-black tracking-widest px-3 py-1.5 border-2 border-black inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Monetização de Alta Performance
        </span>
        <h2 className="text-3xl font-sans font-black text-black tracking-tight mt-4 uppercase flex items-center gap-3">
          <Landmark className="w-7 h-7 text-black stroke-[2.5]" />
          Simulador do Fluxo de Caixa & Split Comercial
        </h2>
        <p className="text-gray-600 font-sans mt-2 text-sm max-w-3xl font-semibold">
          Mapeie como o dinheiro circula no seu ecossistema. Calcule os ganhos do microempreendedor local, o faturamento gerado em taxas básicas de plataforma e a margem de retenção para sustentar toda a franquia e publicidade do HUB.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="cashflow_panels_wrapper">
        {/* PANEL 1: CONTROLS & PARAMS */}
        <div className="lg:col-span-5 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6" id="cashflow_controls_panel">
          <h3 className="font-sans font-black text-black text-lg uppercase tracking-tight border-b-2 border-black pb-3">
            Variáveis Operacionais
          </h3>

          {/* Product Select */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block">
              1. Selecionar Solução Base
            </label>
            <select
              value={selectedProductId}
              onChange={handleProductChange}
              id="select_product_sim"
              className="w-full bg-white border-2 border-black py-2.5 px-3 text-xs text-black font-sans font-bold uppercase focus:outline-none focus:bg-orange-50"
            >
              {HUB_PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.vertical}] {p.name} - R$ {p.price} ({Math.round(p.commissionRate * 100)}% Repasse)
                </option>
              ))}
            </select>
          </div>

          {/* Grid sliders first row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block">
                Preço Bruto (R$)
              </label>
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(Math.max(1, parseInt(e.target.value) || 0))}
                id="input_price_sim"
                className="w-full bg-white border-2 border-black py-1.5 px-3 text-xs text-black font-mono font-black focus:outline-none focus:bg-orange-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block justify-between flex">
                <span>Split Repassado</span>
                <span className="text-black font-black underline">{customSplitRate}%</span>
              </label>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={customSplitRate}
                onChange={(e) => setCustomSplitRate(parseInt(e.target.value))}
                id="input_split_sim"
                className="w-full h-2 bg-gray-200 border border-black rounded-none appearance-none cursor-pointer accent-black"
              />
            </div>
          </div>

          <div className="border-t-2 border-black pt-5 space-y-5">
            {/* Active Consultants */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block">
                  2. Microfranqueados Ativos
                </label>
                <span className="text-xs font-sans font-black px-2.5 py-1 bg-amber-400 border-2 border-black text-black">
                  {activeConsultants} unidades
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={activeConsultants}
                onChange={(e) => setActiveConsultants(parseInt(e.target.value))}
                id="input_consultants_sim"
                className="w-full h-2 bg-gray-200 border border-black rounded-none appearance-none cursor-pointer accent-black"
              />
              <span className="text-[10px] text-gray-400 block font-mono font-bold uppercase">
                Empreendedores faturando no HUB recorrentemente.
              </span>
            </div>

            {/* Sales Per Consultant */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block">
                  3. Volume de Vendas/Mês por Unidade
                </label>
                <span className="text-xs font-sans font-black px-2.5 py-1 bg-black border-2 border-black text-white">
                  {salesPerConsultant} clientes/mês
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={salesPerConsultant}
                onChange={(e) => setSalesPerConsultant(parseInt(e.target.value))}
                id="input_sales_cap_sim"
                className="w-full h-2 bg-gray-200 border border-black rounded-none appearance-none cursor-pointer accent-black"
              />
              <span className="text-[10px] text-gray-400 block font-mono font-bold uppercase">
                Projeção operacional média de vendas fechadas mensais de cada parceiro.
              </span>
            </div>

            {/* Platform Recurrent Fee */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block">
                  4. Taxa Mensal de Plataforma / Royalties
                </label>
                <span className="text-xs font-sans font-black px-2.5 py-1 bg-cyan-400 border-2 border-black text-black">
                  R$ {platformFee} /mês
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={platformFee}
                onChange={(e) => setPlatformFee(parseInt(e.target.value))}
                id="input_fee_sim"
                className="w-full h-2 bg-gray-200 border border-black rounded-none appearance-none cursor-pointer accent-black"
              />
              <span className="text-[10px] text-gray-400 block font-mono font-bold uppercase">
                Garante o comprometimento básico, infra, treinamento continuado e ferramentas digitais.
              </span>
            </div>
          </div>
        </div>

        {/* PANEL 2: RESULTS VISUALIZATION & METRICS */}
        <div className="lg:col-span-7 space-y-6" id="cashflow_metrics_panel">
          {/* HIGH-LEVEL RESULTS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box A: Consultant Share */}
            <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition-all">
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <div className="p-1.5 bg-emerald-100 border border-black text-black">
                  <Wallet className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[9px] font-mono bg-emerald-400 text-black px-2 py-0.5 border border-black font-black uppercase">
                  REPASSE INDIVIDUAL
                </span>
              </div>
              <div className="mt-4">
                <p className="text-[10px] text-gray-400 font-mono tracking-wider uppercase font-bold">Por Venda Efetuada:</p>
                <p id="sim_res_consultant_sale" className="text-2xl font-sans font-black text-black mt-1">
                  R$ {commissionPerSale.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <span className="text-xs text-gray-650 font-semibold block mt-1">
                  Correspondente a {customSplitRate}% diretos do Split
                </span>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                <p className="text-[10px] text-gray-400 font-mono tracking-wider uppercase font-bold">Volume Total Distribuído ({totalSalesCount} v):</p>
                <p id="sim_res_consultant_total" className="text-xl font-sans font-black text-emerald-650 mt-1">
                  R$ {totalConsultantsPayouts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[10px] text-gray-500 font-semibold mt-0.5 uppercase">
                  Média de <strong className="font-bold underline">R$ {(totalConsultantsPayouts / activeConsultants).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/mês</strong> por microfranqueado ativo.
                </p>
              </div>
            </div>

            {/* Box B: HUB Share */}
            <div className="bg-black text-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
              <div className="flex justify-between items-start border-b border-gray-800 pb-3">
                <div className="p-1.5 bg-amber-400 border border-black text-black">
                  <Landmark className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[9px] font-mono bg-amber-400 text-black px-2 py-0.5 border border-black font-black uppercase">
                  RETENÇÃO DE GESTÃO DO HUB
                </span>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-bold">Margem por venda:</p>
                <p id="sim_res_hub_sale" className="text-2xl font-sans font-black text-[#ffffff] mt-1">
                  R$ {hubRetainedPerSale.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <span className="text-xs text-[#f3f4f6]" >
                  Apenas {100 - customSplitRate}% detido para suporte e infraestrutura
                </span>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2 font-semibold">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Margem Comercial Retida:</span>
                  <span id="sim_res_hub_commission" className="font-mono text-white">R$ {totalHubRetainedPayouts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                  <span>Mensalidades Plataforma ({activeConsultants} u):</span>
                  <span id="sim_res_hub_platform" className="font-mono text-white">R$ {totalPlatformFeesRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm font-black border-t border-solid border-slate-800 pt-2 text-[#fbbf24] uppercase">
                  <span>Margem Bruta Empresa:</span>
                  <span id="sim_res_hub_total_bruto">R$ {totalHubRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILED MONEY FLOW BREAKDOWN */}
          <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-5" id="cashflow_flow_breakdown">
            <h4 className="font-sans font-black text-black text-sm uppercase tracking-tight flex items-center gap-2 border-b-2 border-black pb-3">
              <ArrowRightLeft className="w-4 h-4 text-orange-500 stroke-[2.5]" />
              Destinação do Volume Total Movimentado (R$ {totalVolumeSales.toLocaleString('pt-BR')} do Ecossistema)
            </h4>

            {/* Custom Horizontal Stacked Bar representing split */}
            <div className="space-y-2" id="stacked_bar_wrapper font-sans">
              <div className="flex justify-between text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                <span>Comissão de Atração ({customSplitRate}%)</span>
                <span>Retenção Comercial ({100 - customSplitRate}%)</span>
              </div>
              <div className="w-full h-8 bg-gray-200 border-2 border-black overflow-hidden flex" id="financial_ratio_bar">
                <div
                  className="bg-emerald-500 h-full border-r-2 border-black transition-all duration-300 flex items-center justify-center text-xs text-white font-black"
                  style={{ width: `${customSplitRate}%` }}
                >
                  {customSplitRate}% PARCEIROS
                </div>
                <div
                  className="bg-black h-full transition-all duration-300 flex items-center justify-center text-xs text-slate-300 font-extrabold"
                  style={{ width: `${100 - customSplitRate}%` }}
                >
                  {100 - customSplitRate}% HUB
                </div>
              </div>
            </div>

            {/* Sub-monetization pools (platform, splits, fund) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-black mt-4 font-sans font-semibold">
              {/* Pool 1 */}
              <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] text-gray-450 block font-mono font-black uppercase">A) INFRA E PLATAFORMA</span>
                <p className="text-base font-black font-mono text-black mt-1">
                  R$ {totalPlatformFeesRevenue.toLocaleString('pt-BR')}
                </p>
                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed text-slate-500 font-semibold font-sans">
                  Sustentabilidade técnica. Garente provedores de hospedagem dos sites, checkout e ferramentas integradas.
                </p>
              </div>

              {/* Pool 2 */}
              <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] text-gray-450 block font-mono font-black uppercase">B) INVESTIMENTO DE TRÁFEGO</span>
                <p className="text-base font-black font-mono text-indigo-700 mt-1">
                  R$ {totalMktCooperadoFund.toLocaleString('pt-BR')}
                </p>
                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed text-slate-500 font-semibold font-sans">
                  Táticos de marketing cooperado. Direcionamos comissões retidas para campanhas digitais geradoras de novos clientes.
                </p>
              </div>

              {/* Pool 3 */}
              <div className="bg-amber-400 border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] text-black block font-mono font-black uppercase">C) RECEITA LÍQUIDA HUB</span>
                <p id="sim_res_hub_net_profit" className="text-base font-black font-mono text-black mt-1">
                  R$ {netHubEarnings.toLocaleString('pt-BR')}
                </p>
                <p className="text-[10px] text-black mt-1 leading-relaxed font-bold font-sans">
                  Margem livre de dividendos operacionais da sua marca estruturada após suporte técnico e aquisição compartilhada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
