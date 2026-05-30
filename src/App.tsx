/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  MapPin, 
  Clock, 
  User, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  X, 
  ChevronRight, 
  MessageSquare, 
  PhoneCall, 
  AlertCircle,
  TrendingUp,
  Award,
  ThumbsUp,
  Search,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STORES_DATA, REVIEWS_DATA } from './data';
import { Store, LeadFormData } from './types';

// Import local page images to enable base64 inline compiler support
import heroStoreFacade from './assets/images/hero_store_banner_1780162677924.png';
import ambassadorTeam from './assets/images/regenerated_image_1780161351194.png';

export default function App() {
  // Navigation / screen state:
  // 'landing' -> The direct conversion landing page
  // 'analyzing' -> Interactive custom credit check simulator (5-7s)
  // 'approved' -> Congratulation stage showing physical store listings & custom WhatsApp CTAs
  const [screen, setScreen] = useState<'landing' | 'analyzing' | 'approved'>('landing');

  // Form Fields
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    cpf: '',
    phone: '',
    income: '',
    desiredBrand: 'Qualquer Marca',
    selectedStoreId: 'matriz',
    termsAccepted: true
  });

  // Validation Error States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Active Store for highlights
  const [selectedStore, setSelectedStore] = useState<Store>(STORES_DATA[0]);

  // Simulated analysis logs inside stage 2
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);

  // Legal Modal Content state
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  // Simulation steps
  const analysisSteps = [
    'Conectando ao sistema de consulta cadastral da Receita Federal...',
    'Validando CPF e histórico de registros comerciais...',
    'Iniciando consulta aos bancos de dados de crédito (SPC e Serasa)...',
    'Avaliando capacidade de parcelamento com base na renda declarada...',
    'Cruzando dados geográficos com a filial de escolha...',
    'Processando política de score flexível Pinheirinho...',
    'Crédito Aprovado! Gravando proposta em banco de dados seguro...'
  ];

  // Key Statistics
  const stats = [
    { label: 'Aprovação Facilitada', val: '94%' },
    { label: 'Sem Consulta Tradicional', val: 'Boleto' },
    { label: 'Lojas na Sua Região', val: '17 Unidades' },
    { label: 'Entrega na Hora', val: '0 Entrada' }
  ];

  // Autoformatting CPF values while typing (xxx.xxx.xxx-xx)
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Formatting mask
    if (value.length > 9) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}.${value.slice(3)}`;
    }
    
    setFormData({ ...formData, cpf: value });
    if (errors.cpf) setErrors({ ...errors, cpf: '' });
  };

  // Autoformatting Phone values while typing ((xx) xxxxx-xxxx)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Formatting mask
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    
    setFormData({ ...formData, phone: value });
    if (errors.phone) setErrors({ ...errors, phone: '' });
  };

  // Humanize currency display for income input
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value === '') {
      setFormData({ ...formData, income: '' });
      return;
    }
    const numeric = parseInt(value, 10);
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numeric);
    
    setFormData({ ...formData, income: formatted });
    if (errors.income) setErrors({ ...errors, income: '' });
  };

  // Form Submission Validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim() || formData.fullName.trim().split(' ').length < 2) {
      newErrors.fullName = 'Por favor, digite seu nome e sobrenome completo.';
    }
    if (formData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = 'Insira um CPF válido com 11 dígitos.';
    }
    if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Insira um número de WhatsApp completo com DDD.';
    }
    if (!formData.income) {
      newErrors.income = 'Informe a sua renda mensal aproximada.';
    }
    if (!formData.termsAccepted) {
      newErrors.terms = 'É necessário aceitar os Termos de Uso e Política de Privacidade.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to error
      const firstError = Object.keys(newErrors)[0];
      const element = document.getElementById(`field-${firstError}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Move to analyzing screen
    setScreen('analyzing');
    setAnalysisProgress(0);
    setAnalysisStepIndex(0);
    setAnalysisLogs([analysisSteps[0]]);
  };

  // Handle Analysis Loading Process Effect (6 seconds total)
  useEffect(() => {
    if (screen !== 'analyzing') return;

    // Time budget: 6000ms
    // We increment step indexes every 850ms
    const stepDuration = 850;
    
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScreen('approved');
          }, 600);
          return 100;
        }
        return prev + 1.8; // incremental speed
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setAnalysisStepIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < analysisSteps.length) {
          setAnalysisLogs((prevLogs) => [...prevLogs, analysisSteps[nextIndex]]);
          return nextIndex;
        }
        clearInterval(stepInterval);
        return prevIndex;
      });
    }, stepDuration);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [screen]);

  // Generate WhatsApp custom link for specific stores
  const getWhatsAppLinkForStore = (store: Store) => {
    // Get first name to simplify
    const nameShort = formData.fullName.split(' ')[0] || 'Cliente';
    const cleanCpf = formData.cpf ? ` (CPF: ${formData.cpf})` : '';
    const text = `Olá! Sou o(a) ${nameShort}${cleanCpf}. Acabei de realizar a minha pré-análise de crédito online com vocês e fui PRÉ-APROVADO(A)! 🎉 Gostaria de agendar meu horário de atendimento na unidade *Pinheirinho Celulares - ${store.name}* para conferir os modelos de celulares disponíveis e retirar meu smartphone novo. Aguardo confirmação do horário! Muito obrigado!`;
    return `https://wa.me/55${store.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* HEADER FACIAL: Transparent warning indicating offline-first mock DB, or quick top info block */}
      <div className="bg-[#0B3C9B] text-white py-2.5 px-4 text-center text-xs md:text-sm font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span>Sua chance de celular novo sem consultas tradicionais: parcelado no boleto bancário!</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* =========================================================================
            SCREEN 1: LANDING CONVERSION PAGE
            ========================================================================= */}
        {screen === 'landing' && (
          <motion.div
            key="landing-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col"
          >
            {/* BLOCK 1: Banner de Apertura (Fachada) */}
            <div className="relative w-full h-[320px] md:h-[420px] lg:h-[480px] bg-slate-900 overflow-hidden flex items-end">
              {/* Backing Realist store physical facade image provided by client (representing real shop trust) */}
              <img 
                src={heroStoreFacade} 
                alt="Fachada Pinheirinho Celulares" 
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70 scale-105 pointer-events-none"
                referrerPolicy="no-referrer"
                id="main-facade-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20"></div>
              
              {/* Overlaid Header styling for trust and grandeur without classic navigation menu */}
              <div className="relative max-w-7xl w-full mx-auto px-4 md:px-8 pb-8 md:pb-12 z-10">
                <div className="flex flex-col gap-3 max-w-3xl">
                  {/* Glowing text accent */}
                  <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/95 text-white font-semibold text-xs uppercase tracking-widest shadow-xl shadow-orange-950/20">
                    <Award className="w-3.5 h-3.5" /> Credibilidade de Lojas Físicas Reais
                  </span>
                  
                  {/* Styled Corporate Logo Overlay */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-2xl p-2.5 flex items-center justify-center border border-slate-100">
                      {/* Stylized PC monogram */}
                      <span className="font-display font-extrabold text-3xl text-[#0B3C9B] tracking-tighter">P<span className="text-orange-500">C</span></span>
                    </div>
                    <div>
                      <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-none drop-shadow">
                        Pinheirinho <span className="text-orange-500">Celulares</span>
                      </h1>
                      <p className="text-slate-300 font-normal text-sm md:text-base mt-1.5 font-sans leading-relaxed">
                        Rede líder em Curitiba e Região Metropolitana em crediário próprio e celulares parcelados no boleto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Badge overlay */}
              <div className="absolute top-4 right-4 bg-white/95 text-slate-900 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg backdrop-blur text-xs font-semibold z-10">
                <ShieldCheck className="w-4 h-4 text-[#0B3C9B]" />
                <span>Empresa Certificada</span>
              </div>
            </div>

            {/* BLOCK 2: Banner promocional secundário (Main Benefit Focus) */}
            <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 py-6 text-white shadow-lg overflow-hidden relative">
              {/* Background decorative patterns */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                  {/* Benefit Core Text Info */}
                  <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                      <Smartphone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-2xl md:text-3xl leading-tight">
                        Seu Smartphone Novo no Boleto Bancário!
                      </h3>
                      <p className="text-orange-50 text-base font-medium mt-1">
                        Crédito facilitado para assalariados, autônomos e aposentados. Sem taxas abusivas, sem necessidade de pagamento à vista!
                      </p>
                    </div>
                  </div>

                  {/* Highlight pills */}
                  <div className="flex items-center justify-center shrink-0 w-full md:w-auto">
                    <span className="px-4 py-2 rounded-xl bg-teal-900/40 border border-white/25 text-white font-extrabold text-xs md:text-sm uppercase tracking-wider text-center">
                      💳 Boleto em até 24x
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BLOCK 3: Seção Central de Conversão (Chamada à Ação) */}
            <div className="bg-slate-50 py-12 md:py-20">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* Specific exact title text from client */}
                <div className="text-center mb-10 md:mb-16">
                  <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-none mb-4">
                    Faça uma pré-análise online aqui 👇👇
                  </h2>
                  <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                    Preencha os dados abaixo de forma segura em 1 minuto e simule se seu plano de financiamento está liberado!
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  
                  {/* FORM PANEL (Lg: 7 columns) */}
                  <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl shadow-slate-150 border border-slate-100 p-6 md:p-10 transition-all">
                    
                    <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                        <FileText className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg text-slate-900">Formulário de Solicitação de Crédito</h4>
                        <p className="text-slate-500 text-xs">Dados criptografados e em conformidade com as diretrizes da LGPD</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Name Field */}
                      <div id="field-fullName" className="space-y-1.5">
                        <label className="text-xs md:text-sm font-bold text-slate-700 block uppercase tracking-wide">
                          Nome Completo (Conforme Identidade) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                            <User className="w-5 h-5" />
                          </span>
                          <input 
                            type="text" 
                            placeholder="Ex: Matheus Oliveira de Souza"
                            value={formData.fullName}
                            onChange={(e) => {
                              setFormData({ ...formData, fullName: e.target.value });
                              if (errors.fullName) setErrors({ ...errors, fullName: '' });
                            }}
                            className={`w-full py-3.5 pl-11 pr-4 bg-slate-50/70 border rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition ${errors.fullName ? 'border-red-400 ring-2 ring-red-100 bg-red-50/20' : 'border-slate-200 focus:border-orange-500'}`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* CPF Field */}
                        <div id="field-cpf" className="space-y-1.5">
                          <label className="text-xs md:text-sm font-bold text-slate-700 block uppercase tracking-wide">
                            CPF <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                              <FileText className="w-5 h-5" />
                            </span>
                            <input 
                              type="text" 
                              placeholder="000.000.000-00"
                              value={formData.cpf}
                              onChange={handleCpfChange}
                              className={`w-full py-3.5 pl-11 pr-4 bg-slate-50/70 border rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition ${errors.cpf ? 'border-red-400 ring-2 ring-red-100 bg-red-50/20' : 'border-slate-200 focus:border-orange-500'}`}
                            />
                          </div>
                          {errors.cpf && (
                            <p className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.cpf}
                            </p>
                          )}
                        </div>

                        {/* WhatsApp Phone Field */}
                        <div id="field-phone" className="space-y-1.5">
                          <label className="text-xs md:text-sm font-bold text-slate-700 block uppercase tracking-wide">
                            WhatsApp / Celular <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                              <MessageSquare className="w-5 h-5" />
                            </span>
                            <input 
                              type="text" 
                              placeholder="(41) 99999-9999"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              className={`w-full py-3.5 pl-11 pr-4 bg-slate-50/70 border rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition ${errors.phone ? 'border-red-400 ring-2 ring-red-100 bg-red-50/20' : 'border-slate-200 focus:border-orange-500'}`}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Income Field */}
                        <div id="field-income" className="space-y-1.5">
                          <label className="text-xs md:text-sm font-bold text-slate-700 block uppercase tracking-wide">
                            Renda Mensal Aproximada <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-sm">
                              R$
                            </span>
                            <input 
                              type="text" 
                              placeholder="Digite o valor mensal"
                              value={formData.income}
                              onChange={handleIncomeChange}
                              className={`w-full py-3.5 pl-11 pr-4 bg-slate-50/70 border rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition ${errors.income ? 'border-red-400 ring-2 ring-red-100 bg-red-50/20' : 'border-slate-200 focus:border-orange-500'}`}
                            />
                          </div>
                          {errors.income && (
                            <p className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.income}
                            </p>
                          )}
                        </div>

                        {/* Store Selector */}
                        <div className="space-y-1.5">
                          <label className="text-xs md:text-sm font-bold text-slate-700 block uppercase tracking-wide">
                            Loja para Retirada Mais Próxima
                          </label>
                          <select 
                            value={formData.selectedStoreId}
                            onChange={(e) => {
                              setFormData({ ...formData, selectedStoreId: e.target.value });
                              const s = STORES_DATA.find(x => x.id === e.target.value);
                              if (s) setSelectedStore(s);
                            }}
                            className="w-full py-3.5 px-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-slate-950 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
                          >
                            {STORES_DATA.map((store) => (
                              <option key={store.id} value={store.id}>
                                {store.name} ({store.city})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Desired Brand Option Grid */}
                      <div className="space-y-2">
                        <label className="text-xs md:text-sm font-bold text-slate-700 block uppercase tracking-wide">
                          Qual aparelho você deseja financiar?
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['Apple (iPhone)', 'Samsung S/A', 'Motorola', 'Xiaomi - Outros'].map((brand) => (
                            <button
                              key={brand}
                              type="button"
                              onClick={() => setFormData({ ...formData, desiredBrand: brand })}
                              className={`py-3 px-3.5 rounded-xl border-2 text-xs md:text-sm font-semibold transition text-center focus:outline-none ${formData.desiredBrand === brand ? 'border-[#0B3C9B] bg-blue-50 text-[#0B3C9B]' : 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100/75'}`}
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Terms Acceptance Link Action Block */}
                      <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={formData.termsAccepted}
                            onChange={(e) => {
                              setFormData({ ...formData, termsAccepted: e.target.checked });
                              if (errors.terms && e.target.checked) setErrors({ ...errors, terms: '' });
                            }}
                            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                          />
                          <span className="text-slate-600 text-xs leading-relaxed font-medium">
                            Autorizo a consulta e uso dos meus dados acima para pré-análise e simulação de limite de financiamento no boleto na unidade escolhida, em total conformidade com a LGPD. Declaro que li e concordo com os{' '}
                            <button 
                              type="button"
                              onClick={() => setModalType('terms')}
                              className="text-orange-600 font-bold underline hover:text-[#0B3C9B]"
                            >
                              Termos de Uso
                            </button>{' '}
                            e{' '}
                            <button 
                              type="button"
                              onClick={() => setModalType('privacy')}
                              className="text-orange-600 font-bold underline hover:text-[#0B3C9B]"
                            >
                              Políticas de Privacidade
                            </button>.
                          </span>
                        </label>
                        {errors.terms && (
                          <p className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.terms}
                          </p>
                        )}
                      </div>

                      {/* Big Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-extrabold text-lg shadow-xl shadow-orange-500/10 hover:shadow-orange-700/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                      >
                        Enviar Dados Para Pré-Análise <ArrowRight className="w-5.5 h-5.5" />
                      </button>

                    </form>
                  </div>

                  {/* AMBASSADOR PANEL (Lg: 5 columns) - Shows smiling representatives looking/pointing to the side to double down motivation */}
                  <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-8 mt-4 lg:mt-0">
                    
                    {/* Visual Ambassador Highlight Graphic */}
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white">
                      <div className="aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/5] relative bg-slate-100">
                        <img 
                          src={ambassadorTeam} 
                          alt="Equipe de Atendimento Pinheirinho Celulares" 
                          className="w-full h-full object-cover object-top filter contrast-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent"></div>
                        
                        {/* Interactive Float Tag */}
                        <div className="absolute bottom-4 left-4 right-4 bg-orange-600/95 backdrop-blur-md text-white p-3.5 rounded-2xl flex items-center gap-3.5 shadow-lg border border-orange-400/25">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                            <PhoneCall className="w-5.5 h-5.5" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest font-extrabold text-orange-200">Embaixadores da Marca</p>
                            <h5 className="font-display font-medium text-sm md:text-base">Equipe de Atendimento Pinheirinho 🤝</h5>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 md:p-8 space-y-4">
                        <h4 className="font-display font-bold text-xl text-slate-900">Por que escolher o nosso crediário?</h4>
                        <ul className="space-y-3.5">
                          <li className="flex items-start gap-2.5 text-slate-600 text-sm">
                            <span className="w-5.5 h-5.5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3px]" />
                            </span>
                            <span><strong>Aprovamos score baixo</strong> e negativados (mediante análise flexível própria de loja).</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-slate-600 text-sm">
                            <span className="w-5.5 h-5.5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3px]" />
                            </span>
                            <span><strong>Lojas reais</strong> com assistência técnica especializada e mais de 10 anos de mercado.</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-slate-600 text-sm">
                            <span className="w-5.5 h-5.5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3px]" />
                            </span>
                            <span>Garantia oficial de fábrica em todos os aparelhos originais com nota fiscal.</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Numeric performance indicators */}
                    <div className="grid grid-cols-2 gap-4">
                      {stats.map((st, i) => (
                        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col text-center">
                          <span className="font-display font-extrabold text-[#0B3C9B] text-xl md:text-2xl">{st.val}</span>
                          <span className="text-slate-500 font-medium text-xs mt-1">{st.label}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* BLOCK 4: Seção de Prova Social (Galeria de Clientes) */}
            <div className="bg-slate-900 py-16 md:py-24 text-white overflow-hidden relative">
              {/* Subtle background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-950/20 blur-[150px] rounded-full pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                
                <div className="text-center mb-12 md:mb-16">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-orange-400 font-extrabold text-xs uppercase tracking-widest border border-white/5">
                    Clientes Satisfeitos
                  </span>
                  <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight mt-3">
                    Quem Compra Conosco, Recomenda!
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
                    Confira momentos reais de clientes retirando seus celulares zero km em nossas unidades físicas.
                  </p>
                </div>

                {/* Grid of Client Stories with overlaid reviews & star rating */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {REVIEWS_DATA.map((rev, idx) => (
                    <div 
                      key={rev.id}
                      className="group bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative flex flex-col justify-between"
                    >
                      {/* Image block inside store */}
                      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
                        <img 
                          src={rev.imageUrl} 
                          alt={rev.clientName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                        
                        {/* Gold stars overlaid overlay exactly as requested */}
                        <div className="absolute top-3 left-3 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-lg border border-white/10 text-xs">
                          <span className="text-yellow-400 font-extrabold tracking-tight">⭐️⭐️⭐️⭐️⭐️</span>
                        </div>

                        {/* Location / purchase tag */}
                        <span className="absolute bottom-3 left-3 bg-orange-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                          {rev.tag}
                        </span>
                      </div>

                      {/* Text content details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <p className="text-slate-300 text-sm italic font-normal leading-relaxed mb-4">
                          "{rev.text}"
                        </p>
                        
                        <div className="flex items-center gap-2.5 pt-3 border-t border-slate-800">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-display font-extrabold text-xs">
                            {rev.clientName.charAt(0)}
                          </div>
                          <div>
                            <h5 className="font-semibold text-xs text-white">{rev.clientName}</h5>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-green-500" /> Compra Confirmada
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* BLOCK 5: Seção de Autoridade e Avaliações do Google */}
            <div className="bg-white py-16 md:py-24 border-y border-slate-150 relative">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 md:p-14 border border-slate-150 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10">
                  
                  {/* Visual google authority details */}
                  <div className="space-y-4 max-w-2xl text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-800">
                      {/* Logo mimicking Google Reviews styling */}
                      <div className="flex items-center gap-1.5 bg-white shadow-sm border border-slate-200 px-4 py-2 rounded-2xl">
                        <span className="font-extrabold font-display text-blue-500">G</span>
                        <span className="font-extrabold font-display text-red-500">o</span>
                        <span className="font-extrabold font-display text-yellow-500">o</span>
                        <span className="font-extrabold font-display text-blue-500">g</span>
                        <span className="font-extrabold font-display text-green-500">l</span>
                        <span className="font-extrabold font-display text-red-500">e</span>
                        <span className="text-slate-400 font-semibold text-sm ml-2">Reviews</span>
                      </div>
                    </div>

                    <h2 className="font-display font-black text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight">
                      +10.000 avaliações <span className="text-orange-500">positivas</span> na internet
                    </h2>
                    
                    <p className="text-slate-600 text-lg md:text-xl font-medium max-w-xl">
                      Aprovado por quem mora na capital e no interior da Grande Curitiba. Atendimento ágil e transparência!
                    </p>
                  </div>

                  {/* Recognition stamp */}
                  <div className="flex flex-col items-center bg-white border border-slate-200 shadow-xl rounded-2xl p-6 md:p-8 text-center shrink-0 w-full sm:w-[320px]">
                    <div className="flex gap-1.5 text-yellow-400 mb-2">
                      <Star className="w-6 h-6 fill-yellow-400" />
                      <Star className="w-6 h-6 fill-yellow-400" />
                      <Star className="w-6 h-6 fill-yellow-400" />
                      <Star className="w-6 h-6 fill-yellow-400" />
                      <Star className="w-6 h-6 fill-yellow-400" />
                    </div>
                    
                    <span className="text-slate-850 font-display font-extrabold text-3xl tracking-tight">Nota 4.9<span className="text-slate-400 font-semibold text-sm">/5.0</span></span>
                    
                    {/* The prominent "2026" highlighted sentence */}
                    <div className="mt-3.5 pt-3.5 border-t border-slate-100 text-center">
                      <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block">Reconhecimento Oficial</span>
                      <p className="text-[#0B3C9B] font-extrabold text-sm mt-1 leading-tight">
                        "a rede mais conceituada de <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-600">2026</span>"
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* BLOCK 6: Rodapé Minimalista */}
            <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-900">
              <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
                
                {/* Clean centralized logo */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
                    <span className="font-display font-extrabold text-xl tracking-tighter">P<span className="text-slate-950">C</span></span>
                  </div>
                  <span className="font-display font-black text-white text-xl tracking-tight">Pinheirinho <span className="text-orange-500">Celulares</span></span>
                </div>

                {/* Corporate Legalese */}
                <p className="text-[11px] md:text-xs text-slate-500 max-w-2xl leading-relaxed">
                  © 2026 VENTURA & PINHEIRINHO CELULARES LTDA. Todos os direitos reservados. 
                  <br />
                  CNPJ: 22.587.912/0001-99 | Av. Winston Churchill, 2630 - Pinheirinho, Curitiba - Região Metropolitana, PR.
                  <br />
                  A aprovação de propostas está sujeita à análise de crédito interna flexível e validação presencial de documentos em nossas lojas parceiras. Financiamento sujeito a encargos discriminados em contrato.
                </p>

                {/* Simple 2-link menu */}
                <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <button 
                    onClick={() => setModalType('terms')}
                    className="hover:text-orange-500 transition focus:outline-none"
                  >
                    Termos de Uso
                  </button>
                  <span className="text-slate-800">|</span>
                  <button 
                    onClick={() => setModalType('privacy')}
                    className="hover:text-orange-500 transition focus:outline-none"
                  >
                    Política de Privacidade
                  </button>
                </div>

              </div>
            </footer>

          </motion.div>
        )}

        {/* =========================================================================
            SCREEN 2: SIMULATED CREDIT SCORE CHECK ANIMATION (5-7 seconds)
            ========================================================================= */}
        {screen === 'analyzing' && (
          <motion.div
            key="analyzing-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="fixed inset-0 bg-slate-950 z-50 overflow-y-auto py-10 px-4 flex items-center justify-center text-white"
          >
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Backglow dots */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                
                {/* Modern circular loader */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-8">
                  {/* Squircles and spinners */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="50%" 
                      cy="50%" 
                      r="42%" 
                      className="stroke-slate-800 fill-none" 
                      strokeWidth="6"
                    />
                    <circle 
                      cx="50%" 
                      cy="50%" 
                      r="42%" 
                      className="stroke-orange-500 fill-none transition-all duration-300" 
                      strokeWidth="8"
                      strokeDasharray="260"
                      strokeDashoffset={260 - (260 * analysisProgress) / 100}
                    />
                  </svg>
                  
                  {/* Centered Percentage indicator */}
                  <div className="absolute flex flex-col items-center">
                    <span className="font-display font-black text-3xl md:text-4xl text-white tracking-tighter">
                      {Math.min(100, Math.round(analysisProgress))}%
                    </span>
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">SCORE CHECK</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight text-white mb-2 leading-tight">
                  Processando Sua Pré-Análise de Crédito
                </h3>
                
                <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto mb-8 font-medium">
                  Aguarde enquanto nosso sistema próprio avalia as melhores condições de parcelamento de boleto para o CPF informado...
                </p>

                {/* Simulated interactive logs parsing box styled as a modern console terminal feedback panel */}
                <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-800 p-5 text-left font-mono text-xs text-slate-300 space-y-2.5 h-[160px] overflow-y-auto shadow-inner">
                  {analysisLogs.map((log, i) => (
                    <div key={i} className={`flex items-start gap-2.5 ${i === analysisLogs.length - 1 ? 'text-orange-400 font-semibold' : 'opacity-70'}`}>
                      <span className="text-[#0B3C9B] font-extrabold select-none shrink-0">&gt;_</span>
                      <span className="leading-relaxed">{log}</span>
                    </div>
                  ))}
                </div>

                {/* Small caution reminder */}
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-6">
                  ⚠️ NÃO FECHE ESTA PÁGINA OU O NAVEGADOR
                </p>

              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            SCREEN 3: CONGRATULATION APPROVAL STAGE WITH LOJA SCHEDULER & WHATSAPP LINKING
            ========================================================================= */}
        {screen === 'approved' && (
          <motion.div
            key="approved-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-slate-50 min-h-screen py-10 px-4 md:px-8 flex flex-col"
          >
            <div className="max-w-7xl mx-auto w-full space-y-12">
              
              {/* Grand congratulations header exactly as requested */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-150 p-8 md:p-14 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-amber-400 to-[#0B3C9B]"></div>
                
                {/* Verified Animation Emblem */}
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6 shadow-md shadow-green-100/50">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5px] animate-bounce" />
                </div>

                <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-[#0B3C9B] tracking-tight leading-none mb-4">
                  Crédito Pré-Aprovado! 🎉🥳
                </h1>
                
                {/* Striking highlighted typography describing specific instructions */}
                <p className="text-slate-800 text-lg md:text-2xl max-w-3xl mx-auto font-extrabold leading-normal mt-4">
                  "Agende um horário na loja mais próxima e ganhe um novo celular incluso no seu pedido"
                </p>
                <div className="mt-4 bg-orange-50 border border-orange-200 py-2.5 px-4 rounded-2xl inline-flex items-center gap-2 text-orange-700 font-bold text-xs md:text-sm">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>🎁 BRINDE EXCLUSIVO: Reservando hoje você garante Capinha + Película inclusos sem taxas!</span>
                </div>

                {/* Simulated Lead info card wrapper for maximum satisfaction */}
                <div className="mt-8 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-slate-600 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-500" />
                    <span>Beneficiário: <strong className="text-slate-900">{formData.fullName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    <span>CPF: <strong className="text-slate-900">{formData.cpf}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-orange-500" />
                    <span>Aparelho Selecionado: <strong className="text-slate-900">{formData.desiredBrand}</strong></span>
                  </div>
                </div>
              </div>

              {/* NOSSAS LOJAS AREA: Physical store lists with addresses, working hours, and contact WhatsApp direct buttons with photos */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-extrabold text-2xl md:text-4xl text-slate-900 tracking-tight text-center md:text-left flex items-center gap-3 justify-center md:justify-start">
                    <MapPin className="w-7 h-7 text-[#0B3C9B] animate-pulse" /> Nossas Lojas Próximas - Escolha Onde Retirar:
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base text-center md:text-left mt-2 max-w-xl">
                    Selecione a sua loja de preferência, clique no WhatsApp para agendar seu atendimento exclusivo e saia no mesmo dia de celular novo!
                  </p>
                </div>

                {/* Filter and selector trigger */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {STORES_DATA.map((store) => (
                    <div 
                      key={store.id}
                      className={`group bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl flex flex-col justify-between ${formData.selectedStoreId === store.id ? 'ring-2 ring-orange-500 border-orange-500 scale-[1.01]' : 'border-slate-150'}`}
                    >
                      {/* Store Photo Block */}
                      <div className="aspect-[16/10] w-full relative bg-slate-900 overflow-hidden">
                        <img 
                          src={store.imageUrl} 
                          alt={store.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent"></div>
                        
                        {/* Preferred selection flash tag */}
                        {formData.selectedStoreId === store.id && (
                          <span className="absolute top-3 left-3 bg-orange-600 text-white font-extrabold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-lg border border-orange-400">
                            Selecionada na Análise
                          </span>
                        )}

                        <span className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md text-white font-black text-xs px-2.5 py-1 rounded-lg">
                          📍 {store.city}
                        </span>
                      </div>

                      {/* Store details block */}
                      <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                        
                        <div className="space-y-3">
                          <h4 className="font-display font-extrabold text-lg text-slate-900 tracking-tight group-hover:text-[#0B3C9B] transition">
                            {store.name}
                          </h4>
                          
                          {/* Complete Address */}
                          <div className="flex items-start gap-2.5 text-slate-600 text-xs">
                            <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-semibold">{store.address}</span>
                          </div>

                          {/* Hours */}
                          <div className="flex items-center gap-2.5 text-slate-500 text-xs">
                            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="font-medium">{store.hours}</span>
                          </div>

                          {/* WhatsApp number (explicitly visible) */}
                          <div className="flex items-center gap-2.5 text-slate-700 text-xs font-semibold bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5 w-fit">
                            <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>WhatsApp: <strong className="text-emerald-700">({store.whatsapp.slice(0, 2)}) {store.whatsapp.slice(2, 7)}-{store.whatsapp.slice(7)}</strong></span>
                          </div>

                          {/* Phone number (explicitly visible if exists) */}
                          {store.phone && (
                            <div className="flex items-center gap-2.5 text-slate-600 text-xs font-semibold bg-blue-50 border border-blue-100 rounded-xl px-3 py-1.5 w-fit">
                              <PhoneCall className="w-4 h-4 text-blue-600 shrink-0" />
                              <span>Telefone: <strong className="text-blue-700">{store.phone}</strong></span>
                            </div>
                          )}
                        </div>

                        {/* Interactive WhatsApp message direct CTA button exactly as requested */}
                        <a
                          href={getWhatsAppLinkForStore(store)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Agendar no WhatsApp
                        </a>

                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 text-center">
                  <button
                    onClick={() => {
                      setFormData({
                        fullName: '',
                        cpf: '',
                        phone: '',
                        income: '',
                        desiredBrand: 'Qualquer Marca',
                        selectedStoreId: 'matriz',
                        termsAccepted: true
                      });
                      setScreen('landing');
                    }}
                    className="text-slate-500 hover:text-orange-500 font-extrabold text-xs uppercase tracking-widest underline transition focus:outline-none"
                  >
                    ← Realizar Novo Cadastro / Simulação
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* =========================================================================
          LGPD COMPLIANT TERMS OF USE & PRIVACY POLICY MODALS
          ========================================================================= */}
      <AnimatePresence>
        {modalType !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto py-10 px-4 flex items-center justify-center text-slate-800"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full border border-slate-100 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition p-1.5 focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <h3 className="font-display font-bold text-2xl text-slate-900">
                  {modalType === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}
                </h3>
                
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider uppercase">
                  Pinheirinho Celulares — Atualizado em Janeiro de 2026
                </p>

                {modalType === 'terms' ? (
                  <div className="text-slate-600 text-sm space-y-4 leading-relaxed font-normal">
                    <p className="font-semibold text-slate-900">1. Termos de Serviço</p>
                    <p>Ao submeter sua simulação ou preencher o formulário de conversão na landing page da Pinheirinho Celulares, o termo de uso rege o consentimento prévio para a coleta temporária de CPF, Nome, telefone e estimativa de renda.</p>
                    <p className="font-semibold text-slate-900">2. Requisitos de Idade e Elegibilidade</p>
                    <p>O serviço prestado é exclusivamente designado para indivíduos maiores de 18 anos civis na forma da constituição brasileira, possuidores de documento de CPF regularizado nacionalmente.</p>
                    <p className="font-semibold text-slate-900">3. Análise Prévia Flexible de Crédito</p>
                    <p>O usuário concorda que a análise simulativa online representa uma etapa informativa prévia baseada no cruzamento de dados de renda estimados e CPF. O veredicto final e liberação efetiva do aparelho financiado ocorrem única e exclusivamente por atendimento presencial assistido em nossas filiais credenciadas com comprovação vacinal legal e identidade física original.</p>
                  </div>
                ) : (
                  <div className="text-slate-600 text-sm space-y-4 leading-relaxed font-normal">
                    <p className="font-semibold text-slate-900">1. Compromisso com a Segurança e LGPD</p>
                    <p>Em conformidade expressa com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018), a Pinheirinho Celulares assegura a integridade total do tratamento de dados pessoais coletados neste canal de aquisição de leads.</p>
                    <p className="font-semibold text-slate-900">2. Finalidade das Coletas</p>
                    <p>Os dados inseridos no formulário (Nome Completo, CPF, Celular, Renda declarada, Loja de preferência) destinam-se exclusivamente para a realização do cálculo preliminar do score creditício interno, agendamento facilitado de atendimento de retirada na franquia física selecionada e envio de mensagens via WhatsApp oficiais de suporte ao cliente.</p>
                    <p className="font-semibold text-slate-900">3. Guarda e Eliminação Segura</p>
                    <p>Nenhuma informação privada coletada nesta landing page é transmitida, vendida ou transferida a terceiros sem relação cooperativa de suporte ao financiamento. Os dados corporativos residem em servidores hospedados em nuvem sob rígida proteção de acesso controlado.</p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-end">
                <button
                  onClick={() => setModalType(null)}
                  className="py-2.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs md:text-sm font-bold shadow-md transition"
                >
                  Entendi e Aceito
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
