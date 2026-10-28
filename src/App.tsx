import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Shield,
  Target,
  Flame,
  Users,
  Eye,
  Award,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Search,
  Play,
  Pause,
  RotateCcw,
  Instagram,
  Phone,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Menu,
  X,
  LayoutGrid,
  Presentation,
  Heart,
  Sparkles,
  ArrowRight,
  Lock,
} from 'lucide-react';
import {
  ROUNDS_DATA,
  PILLARS,
  WARMUP_DATA,
  FIRST_RHYTHM_DATA,
  MENTOR_DATA,
  CORPORATE_DIAGNOSTICS,
  type PillarType,
  type RoundItem,
} from './data/roundsData';

const PILLAR_ICONS: Record<PillarType, React.ReactNode> = {
  'O INTERNO': <Shield className="w-5 h-5" />,
  'ESTRATÉGIA E PERFORMANCE': <Target className="w-5 h-5" />,
  'RESILIÊNCIA E SUPERAÇÃO': <Flame className="w-5 h-5" />,
  'LIDERANÇA E RELACIONAMENTO': <Users className="w-5 h-5" />,
  'PERCEPÇÃO E PRESENÇA': <Eye className="w-5 h-5" />,
  'A MAESTRIA': <Award className="w-5 h-5" />,
};

function sanitizeInput(value: string, maxLength = 160): string {
  return value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .slice(0, maxLength);
}

function formatSpacedRound(round: number): string {
  const numStr = String(round).split('').join(' ');
  return `R O U N D  ${numStr} / 3 6`;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Warmup interactive state
  const [warmupActive, setWarmupActive] = useState(false);
  const [warmupStep, setWarmupStep] = useState(0);

  // Rounds explorer state
  const [viewMode, setViewMode] = useState<'slide' | 'grid'>('slide');
  const [activeRoundNumber, setActiveRoundNumber] = useState<number>(1);
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'TODOS'>('TODOS');
  const [selectedCycle, setSelectedCycle] = useState<number | 0>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDiagnostic, setActiveDiagnostic] = useState<string>('pressao');

  // Contact form state (with strict client-side sanitization)
  const [contactName, setContactName] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactFormat, setContactFormat] = useState('Vivência de Boxe Corporativa (Equipes / Liderança)');
  const [contactMessage, setContactMessage] = useState('');
  const [activeTacticalIndex, setActiveTacticalIndex] = useState(0);

  // Guided Warmup timer effect
  useEffect(() => {
    if (!warmupActive) return;
    const timer = window.setInterval(() => {
      setWarmupStep((prev) => {
        if (prev >= WARMUP_DATA.leftColumn.steps.length - 1) {
          setWarmupActive(false);
          return 0;
        }
        return prev + 1;
      });
    }, 3500);
    return () => window.clearInterval(timer);
  }, [warmupActive]);

  // Filtered rounds
  const filteredRounds = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ROUNDS_DATA.filter((item) => {
      if (selectedPillar !== 'TODOS' && item.pillar !== selectedPillar) return false;
      if (selectedCycle !== 0 && item.cycle !== selectedCycle) return false;
      if (q) {
        const hay = `${item.round} ${item.title} ${item.pillar} ${item.question} ${item.fusion.subtitle} ${item.fusion.description} ${item.training.subtitle} ${item.training.context} ${item.training.st} ${item.training.ct} ${item.legacy.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [selectedPillar, selectedCycle, searchQuery]);

  const currentRoundObj: RoundItem = useMemo(() => {
    return ROUNDS_DATA.find((r) => r.round === activeRoundNumber) || ROUNDS_DATA[0];
  }, [activeRoundNumber]);

  const handlePrevRound = useCallback(() => {
    if (filteredRounds.length === 0) return;
    const idx = filteredRounds.findIndex((r) => r.round === activeRoundNumber);
    if (idx <= 0) {
      setActiveRoundNumber(filteredRounds[filteredRounds.length - 1].round);
    } else {
      setActiveRoundNumber(filteredRounds[idx - 1].round);
    }
  }, [filteredRounds, activeRoundNumber]);

  const handleNextRound = useCallback(() => {
    if (filteredRounds.length === 0) return;
    const idx = filteredRounds.findIndex((r) => r.round === activeRoundNumber);
    if (idx === -1 || idx >= filteredRounds.length - 1) {
      setActiveRoundNumber(filteredRounds[0].round);
    } else {
      setActiveRoundNumber(filteredRounds[idx + 1].round);
    }
  }, [filteredRounds, activeRoundNumber]);

  const handleRandomRound = () => {
    const pool = filteredRounds.length > 0 ? filteredRounds : ROUNDS_DATA;
    const randomItem = pool[Math.floor(Math.random() * pool.length)];
    setActiveRoundNumber(randomItem.round);
    setViewMode('slide');
  };

  const jumpToRound = (roundNum: number) => {
    setSelectedPillar('TODOS');
    setSelectedCycle(0);
    setSearchQuery('');
    setActiveRoundNumber(roundNum);
    setViewMode('slide');
    const el = document.getElementById('rounds');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Keyboard navigation for slide view
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') handlePrevRound();
      if (e.key === 'ArrowRight') handleNextRound();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlePrevRound, handleNextRound]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInput(contactName.trim(), 80) || 'Visitante';
    const cleanCompany = sanitizeInput(contactCompany.trim(), 80);
    const cleanFormat = sanitizeInput(contactFormat, 100);
    const cleanMsg = sanitizeInput(contactMessage.trim(), 400);

    const lines = [
      `Olá, Eduardo Amaral! Vim pela página oficial da *Vivência de Boxe — A Constância em Equilíbrio*.`,
      ``,
      `*Nome:* ${cleanName}`,
      cleanCompany ? `*Empresa / Organização:* ${cleanCompany}` : '',
      `*Interesse:* ${cleanFormat}`,
      cleanMsg ? `*Mensagem:* ${cleanMsg}` : '',
    ].filter(Boolean);

    const url = `https://wa.me/${MENTOR_DATA.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const whatsappDirectUrl = `https://wa.me/${MENTOR_DATA.whatsappNumber}?text=${encodeURIComponent(
    'Olá, Eduardo Amaral! Gostaria de saber mais sobre a Vivência de Boxe e Mentorias Corporativas.'
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#26241F] text-[#F1F0EC] antialiased selection:bg-[#AA231C] selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#26241F]/95 backdrop-blur-md border-b border-[#45413A]/70 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.45)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a
            href="#inicio"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Eduardo Amaral — Mentorias e Boxe"
          >
            <div className="bg-white rounded-lg px-3 py-1.5 shadow-md transition-all duration-300 ease-out group-hover:shadow-lg group-hover:scale-[1.01]">
              <img
                src="/logo-light.svg"
                alt="Eduardo Amaral — Mentorias e Boxe"
                className="h-9 sm:h-10 w-auto"
              />
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide text-[#F1F0EC]/85">
            <a href="#inicio" className="hover:text-white transition-colors duration-200">
              A Vivência
            </a>
            <a href="#aquecimento" className="hover:text-white transition-colors duration-200">
              O Aquecimento
            </a>
            <a href="#mentor" className="hover:text-white transition-colors duration-200">
              Por Que Estou Aqui?
            </a>
            <a href="#primeiro-ritmo" className="hover:text-white transition-colors duration-200">
              O Primeiro Ritmo
            </a>
            <a href="#pilares" className="hover:text-white transition-colors duration-200">
              Os 6 Pilares
            </a>
            <a
              href="#rounds"
              className="text-[#F1F0EC] font-semibold px-3.5 py-1.5 rounded-lg bg-[#35322B] border border-[#AA231C]/50 hover:border-[#AA231C] shadow-sm transition-all duration-200"
            >
              Os 36 Rounds
            </a>
            <a href="#contato" className="hover:text-white transition-colors duration-200">
              Contato
            </a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#AA231C] hover:bg-[#B5251E] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-md shadow-[#AA231C]/20 hover:shadow-lg hover:shadow-[#AA231C]/30 transition-all duration-300 ease-out hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Vamos Treinar?</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#F1F0EC] hover:bg-[#35322B] transition-colors duration-200 focus:outline-none"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#26241F] border-b border-[#45413A] px-4 pt-3 pb-6 space-y-3 text-left shadow-xl">
            <div className="flex flex-col space-y-1.5 text-base font-medium">
              <a
                href="#inicio"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg hover:bg-[#35322B] transition-colors duration-200"
              >
                A Vivência
              </a>
              <a
                href="#aquecimento"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg hover:bg-[#35322B] transition-colors duration-200"
              >
                O Aquecimento
              </a>
              <a
                href="#mentor"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg hover:bg-[#35322B] transition-colors duration-200"
              >
                Por Que Estou Aqui? (O Mentor)
              </a>
              <a
                href="#primeiro-ritmo"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg hover:bg-[#35322B] transition-colors duration-200"
              >
                O Primeiro Ritmo
              </a>
              <a
                href="#pilares"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg hover:bg-[#35322B] transition-colors duration-200"
              >
                Os 6 Pilares
              </a>
              <a
                href="#rounds"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg bg-[#35322B] text-white font-semibold border-l-4 border-[#AA231C]"
              >
                Os 36 Rounds Interativos
              </a>
              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg hover:bg-[#35322B] transition-colors duration-200"
              >
                Contato
              </a>
            </div>
            <div className="pt-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#AA231C] hover:bg-[#B5251E] text-white font-semibold text-sm px-5 py-3 rounded-lg shadow-md transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar com Eduardo Amaral</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* HERO SECTION — Faithful to Slide 1 ("VIVÊNCIA DE BOXE - A CONSTÂNCIA EM EQUILÍBRIO") */}
        <section id="inicio" className="relative overflow-hidden">
          {/* Split background inspired by Slide 1 (#45413A left panel + #26241F right stage) */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[34%] bg-[#45413A] border-r border-[#544F45]/40 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              {/* Left Column: Logo Plaque + Mentor Portrait Card (on the #45413A panel on desktop) */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
                {/* Official White Rounded Logo Card from Slide 1 */}
                <div className="bg-white rounded-xl p-5 sm:p-6 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.45)] w-full max-w-xs border border-white/80 transition-all duration-300 ease-out hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.55)]">
                  <img
                    src="/logo-light.svg"
                    alt="Eduardo Amaral — Mentorias e Boxe"
                    className="w-full h-auto"
                  />
                </div>

                {/* High-Res Mentor Card */}
                <div className="w-full max-w-xs bg-[#26241F] rounded-2xl overflow-hidden border border-[#544F45]/60 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.55)] text-left transition-all duration-300 ease-out hover:border-[#544F45]">
                  <div className="relative aspect-[4/4.5] overflow-hidden bg-[#35322B]">
                    <img
                      src="/eduardo-amaral.jpg"
                      alt="Eduardo Amaral — Instrutor Técnico Federação Gaúcha de Boxe"
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#26241F] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-left">
                      <span className="inline-block bg-[#AA231C] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                        Federação Gaúcha de Boxe — FGB
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 space-y-2 text-left">
                    <h2 className="font-display font-bold text-lg tracking-wide text-white leading-snug">
                      {MENTOR_DATA.name}
                    </h2>
                    <p className="text-xs text-[#F1F0EC]/80 leading-relaxed">{MENTOR_DATA.role}</p>
                    <div className="w-10 h-0.5 bg-[#AA231C] my-2" />
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-[#F1F0EC]/90">
                      {MENTOR_DATA.experience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Slide 1 Typography & Call to Action — Strictly Left Aligned */}
              <div className="lg:col-span-8 lg:pl-10 space-y-7 sm:space-y-8 text-left">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#35322B] border border-[#AA231C]/50 text-xs font-semibold tracking-widest uppercase text-[#F1F0EC] shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#AA231C] animate-ping shrink-0" />
                  <span>Mentorias Corporativas • Palestras • Vivências Práticas</span>
                </div>

                <div className="space-y-2">
                  <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.06]">
                    VIVÊNCIA
                    <br />
                    <span className="inline-block">DE </span>{' '}
                    <span className="inline-block relative pb-2">
                      BOXE
                      <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#B5251E] rounded-full" />
                    </span>
                  </h1>
                </div>

                {/* Exact L-Shaped Crimson Bracket from Slide 1 */}
                <div className="max-w-md text-left pt-1">
                  <div className="border-l-[3px] border-[#B5251E] pl-4 sm:pl-5">
                    <div className="border-b-[3px] border-[#B5251E] pb-2.5 mb-4">
                      <p className="font-display font-semibold text-base sm:text-lg tracking-[0.08em] uppercase text-white leading-snug">
                        A CONSTÂNCIA EM EQUILÍBRIO
                      </p>
                    </div>
                    <div className="space-y-1.5 font-display text-lg sm:text-xl tracking-wider text-[#F1F0EC]/95 font-medium">
                      <p>SE SENTE...</p>
                      <p>SE CONECTA...</p>
                      <p>SE TREINA...</p>
                    </div>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-[#F1F0EC]/85 max-w-2xl leading-[1.75] text-left">
                  Conduzindo vivências de boxe e transformando o ritmo corporativo em{' '}
                  <strong className="text-white font-semibold">rounds mais leves</strong>. Uma
                  metodologia proprietária de <strong className="text-white">36 Rounds</strong> que
                  une a nobre arte do ringue à tomada de decisão, liderança e equilíbrio emocional
                  nas organizações.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-2">
                  <a
                    href="#rounds"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#AA231C] hover:bg-[#B5251E] text-white font-display font-bold text-sm uppercase tracking-wider px-7 py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(170,35,28,0.4)] hover:shadow-[0_14px_30px_-5px_rgba(181,37,30,0.5)] transition-all duration-300 ease-out hover:-translate-y-0.5"
                  >
                    <span>Explorar os 36 Rounds</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#35322B] hover:bg-[#45413A] text-white font-display font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded-xl border border-[#544F45] shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 text-[#B5251E]" />
                    <span>Levar para Minha Empresa</span>
                  </a>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-7 border-t border-[#45413A]/80 text-left">
                  <div className="bg-[#35322B]/70 rounded-xl p-4 sm:p-5 border border-[#45413A]/90 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:border-[#544F45] hover:-translate-y-0.5">
                    <p className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-none">
                      35 <span className="text-[#B5251E] text-base sm:text-lg">Anos</span>
                    </p>
                    <p className="text-xs text-[#F1F0EC]/80 mt-2 leading-snug">
                      De Constância em Equilíbrio
                    </p>
                  </div>
                  <div className="bg-[#35322B]/70 rounded-xl p-4 sm:p-5 border border-[#45413A]/90 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:border-[#544F45] hover:-translate-y-0.5">
                    <p className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-none">
                      36 <span className="text-[#B5251E] text-base sm:text-lg">Rounds</span>
                    </p>
                    <p className="text-xs text-[#F1F0EC]/80 mt-2 leading-snug">
                      Fusão Corporativo & Ringue
                    </p>
                  </div>
                  <div className="bg-[#35322B]/70 rounded-xl p-4 sm:p-5 border border-[#45413A]/90 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:border-[#544F45] hover:-translate-y-0.5">
                    <p className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-none">
                      6 <span className="text-[#B5251E] text-base sm:text-lg">Pilares</span>
                    </p>
                    <p className="text-xs text-[#F1F0EC]/80 mt-2 leading-snug">
                      Eixos de Evolução Prática
                    </p>
                  </div>
                  <div className="bg-[#35322B]/70 rounded-xl p-4 sm:p-5 border border-[#45413A]/90 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:border-[#544F45] hover:-translate-y-0.5">
                    <p className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-none">
                      FGB
                    </p>
                    <p className="text-xs text-[#F1F0EC]/80 mt-2 leading-snug">
                      Instrutor Técnico Oficial
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: O AQUECIMENTO — Faithful to Slide 2 */}
        <section id="aquecimento" className="bg-white text-[#26241F] py-20 sm:py-24 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left md:text-center space-y-4 mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-[#544F45]">
                PREPARAÇÃO ANTES DO PRIMEIRO SOAR DO SINO
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[0.04em] text-[#B5251E] uppercase leading-[1.08]">
                {WARMUP_DATA.title}
              </h2>
              <p className="text-sm sm:text-base text-[#544F45] max-w-2xl md:mx-auto leading-[1.7]">
                Antes de qualquer decisão estratégica ou movimento no ringue, o corpo e a mente
                precisam encontrar o ponto exato entre tranquilidade e agilidade.
              </p>

              {/* Guided Warmup Interactive Trigger */}
              <div className="pt-2 flex flex-wrap items-center justify-start md:justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (warmupActive) {
                      setWarmupActive(false);
                    } else {
                      setWarmupStep(0);
                      setWarmupActive(true);
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-[#26241F] hover:bg-[#35322B] text-white text-xs font-display font-bold uppercase tracking-wider px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 cursor-pointer"
                >
                  {warmupActive ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#B5251E]" />
                      <span>Pausar Aquecimento Guiado</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#B5251E]" />
                      <span>Iniciar Aquecimento Guiado (6 Passos)</span>
                    </>
                  )}
                </button>
                {warmupStep > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setWarmupActive(false);
                      setWarmupStep(0);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#544F45] hover:text-[#26241F] transition-colors duration-200 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reiniciar</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Column 1: UM ROUND DE EQUILÍBRIO */}
              <div className="bg-[#F1F0EC] rounded-2xl p-6 sm:p-9 lg:p-10 border border-[#544F45]/15 shadow-[0_10px_30px_-10px_rgba(38,36,31,0.08)] flex flex-col items-start text-left">
                <div className="border-t-[3px] border-[#26241F] pt-2.5 mb-7 inline-block">
                  <h3 className="font-display font-bold text-lg sm:text-xl tracking-wider text-[#B5251E] uppercase">
                    {WARMUP_DATA.leftColumn.heading}
                  </h3>
                </div>

                <ul className="w-full space-y-3.5">
                  {WARMUP_DATA.leftColumn.steps.map((step, idx) => {
                    const isCurrent = warmupActive && warmupStep === idx;
                    return (
                      <li
                        key={step.label}
                        onClick={() => setWarmupStep(idx)}
                        className={`p-4 sm:px-5 rounded-xl text-left border-l-4 transition-all duration-300 ease-out cursor-pointer ${
                          isCurrent
                            ? 'bg-[#B5251E] text-white border-[#26241F] shadow-md translate-x-1'
                            : warmupStep === idx
                            ? 'bg-white border-[#B5251E] text-[#26241F] shadow-sm'
                            : 'bg-white/80 hover:bg-white border-transparent hover:border-[#B5251E]/50 text-[#26241F] shadow-[0_2px_8px_-2px_rgba(38,36,31,0.05)] hover:shadow-sm'
                        }`}
                      >
                        <p className="font-display font-semibold text-sm sm:text-base tracking-wider uppercase leading-snug">
                          {step.label}
                        </p>
                        <p
                          className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                            isCurrent ? 'text-white/90' : 'text-[#544F45]'
                          }`}
                        >
                          {step.detail}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Column 2: TRANQUILIDADE / AGILIDADE */}
              <div className="bg-[#F1F0EC] rounded-2xl p-6 sm:p-9 lg:p-10 border border-[#544F45]/15 shadow-[0_10px_30px_-10px_rgba(38,36,31,0.08)] flex flex-col items-start text-left">
                <div className="border-t-[3px] border-[#26241F] pt-2.5 mb-7 inline-block">
                  <h3 className="font-display font-bold text-lg sm:text-xl tracking-wider text-[#B5251E] uppercase">
                    {WARMUP_DATA.rightColumn.heading}
                  </h3>
                </div>

                <ul className="w-full space-y-3.5">
                  {WARMUP_DATA.rightColumn.steps.map((step, idx) => {
                    const isCurrent = warmupActive && warmupStep === idx;
                    return (
                      <li
                        key={step.label}
                        onClick={() => setWarmupStep(idx)}
                        className={`p-4 sm:px-5 rounded-xl text-left border-l-4 transition-all duration-300 ease-out cursor-pointer ${
                          isCurrent
                            ? 'bg-[#26241F] text-white border-[#B5251E] shadow-md translate-x-1'
                            : warmupStep === idx
                            ? 'bg-white border-[#26241F] text-[#26241F] shadow-sm'
                            : 'bg-white/80 hover:bg-white border-transparent hover:border-[#26241F]/40 text-[#26241F] shadow-[0_2px_8px_-2px_rgba(38,36,31,0.05)] hover:shadow-sm'
                        }`}
                      >
                        <p className="font-display font-semibold text-sm sm:text-base tracking-wider uppercase leading-snug">
                          {step.label}
                        </p>
                        <p
                          className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                            isCurrent ? 'text-white/85' : 'text-[#544F45]'
                          }`}
                        >
                          {step.detail}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: POR QUE ESTOU AQUI? & ENTÃO, VAMOS TREINAR? — Faithful to Slides 3 & 5 */}
        <section id="mentor" className="bg-[#F1F0EC] text-[#26241F] py-20 sm:py-24 lg:py-28 border-t border-[#544F45]/15">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
            {/* Top Row: Slide 3 Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5 text-left">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#544F45]">
                  TRAJETÓRIA, TÉCNICA E PROPÓSITO
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#B5251E] tracking-tight uppercase leading-[1.08]">
                  {MENTOR_DATA.headline}
                </h2>
                <p className="text-base sm:text-lg text-[#35322B] leading-[1.75]">
                  Ao longo de <strong>35 anos dedicados ao boxe</strong> e à formação técnica pela{' '}
                  <strong>Federação Gaúcha de Boxe (FGB)</strong>, Eduardo Amaral compreendeu que o
                  ringue é o laboratório mais fiel do comportamento humano sob pressão.
                </p>
                <p className="text-base text-[#544F45] leading-[1.75]">
                  Na vida executiva e corporativa, profissionais enfrentam diariamente rounds
                  invisíveis: prazos curtos, decisões em milissegundos, conversas difíceis, metas
                  exigentes e a necessidade constante de manter a guarda emocional firme sem perder a
                  empatia.
                </p>
              </div>

              {/* Exact Dark Olive-Charcoal Card from Slide 3 */}
              <div className="lg:col-span-5">
                <div className="bg-[#2E3024] text-white rounded-2xl p-7 sm:p-10 shadow-[0_16px_38px_-12px_rgba(38,36,31,0.35)] border border-[#544F45]/40 space-y-4 text-left transition-all duration-300 ease-out hover:shadow-[0_20px_44px_-12px_rgba(38,36,31,0.45)]">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-wide uppercase leading-snug">
                    {MENTOR_DATA.name}
                  </h3>
                  <div className="space-y-1.5 text-[#F1F0EC]/90 text-base sm:text-lg leading-relaxed">
                    <p>{MENTOR_DATA.role}</p>
                    <p className="font-medium">{MENTOR_DATA.organization}</p>
                  </div>
                  <div className="w-14 h-1 bg-[#B5251E] my-4" />
                  <p className="font-display font-medium text-sm sm:text-base tracking-[0.12em] uppercase text-[#F1F0EC]">
                    {MENTOR_DATA.experience}
                  </p>
                </div>
              </div>
            </div>

            {/* Center Banner from Slide 3 */}
            <div className="bg-white rounded-2xl p-7 sm:p-10 lg:p-12 shadow-[0_10px_30px_-10px_rgba(38,36,31,0.08)] border border-[#544F45]/15 text-left md:text-center space-y-3">
              <div className="inline-block border-t-[3px] border-[#B5251E] pt-3 md:px-4">
                <p className="font-display font-bold text-lg sm:text-2xl tracking-wider uppercase text-[#26241F] leading-snug">
                  {MENTOR_DATA.missionTitle}
                </p>
              </div>
              <p className="font-display font-medium text-base sm:text-xl tracking-wide uppercase text-[#35322B] max-w-3xl md:mx-auto leading-relaxed">
                {MENTOR_DATA.missionSubtitle}
              </p>
            </div>

            {/* Slide 5 Section: ENTÃO, VAMOS TREINAR? + Formats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center bg-[#26241F] text-white rounded-3xl p-7 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(38,36,31,0.45)] border border-[#45413A]/60">
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                <div className="w-full max-w-[260px] sm:max-w-[280px] aspect-square rounded-2xl overflow-hidden border-2 border-[#B5251E] shadow-xl bg-[#45413A]">
                  <img
                    src="/eduardo-amaral.jpg"
                    alt="Eduardo Amaral — Então, vamos treinar?"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out hover:scale-[1.02]"
                  />
                </div>
              </div>
              <div className="lg:col-span-8 space-y-6 text-left">
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#B5251E] uppercase tracking-wide leading-[1.1]">
                  {MENTOR_DATA.callToAction}
                </h3>
                <p className="text-[#F1F0EC]/85 text-base sm:text-lg leading-[1.75]">
                  A metodologia <strong>Vivência de Boxe</strong> é adaptada para a realidade da sua
                  organização ou jornada individual — sem necessidade de experiência prévia em artes
                  marciais, com total segurança, leveza e aplicação imediata no trabalho.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="bg-[#35322B] p-5 rounded-xl border border-[#544F45]/60 shadow-sm transition-all duration-300 ease-out hover:border-[#B5251E]/60 hover:-translate-y-0.5">
                    <p className="font-display font-bold text-sm uppercase text-white mb-1.5">
                      1. Vivência Corporativa
                    </p>
                    <p className="text-xs sm:text-[13px] text-[#F1F0EC]/80 leading-relaxed">
                      Imersão prática e reflexiva para times, convenções e eventos de liderança.
                    </p>
                  </div>
                  <div className="bg-[#35322B] p-5 rounded-xl border border-[#544F45]/60 shadow-sm transition-all duration-300 ease-out hover:border-[#B5251E]/60 hover:-translate-y-0.5">
                    <p className="font-display font-bold text-sm uppercase text-white mb-1.5">
                      2. Mentoria Executiva
                    </p>
                    <p className="text-xs sm:text-[13px] text-[#F1F0EC]/80 leading-relaxed">
                      Acompanhamento focado em tomada de decisão sob pressão, foco e equilíbrio.
                    </p>
                  </div>
                  <div className="bg-[#35322B] p-5 rounded-xl border border-[#544F45]/60 shadow-sm transition-all duration-300 ease-out hover:border-[#B5251E]/60 hover:-translate-y-0.5">
                    <p className="font-display font-bold text-sm uppercase text-white mb-1.5">
                      3. Palestras & Workshops
                    </p>
                    <p className="text-xs sm:text-[13px] text-[#F1F0EC]/80 leading-relaxed">
                      Os 36 Rounds aplicados à cultura organizacional, resiliência e alta performance.
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-2.5 bg-[#AA231C] hover:bg-[#B5251E] text-white font-display font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5"
                  >
                    <span>Solicitar Proposta de Vivência</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DO RINGUE AO MUNDO CORPORATIVO */}
        <section id="primeiro-ritmo" className="bg-[#26241F] text-white py-20 sm:py-24 lg:py-28 border-t border-[#45413A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Cadência do Boxe aplicada à Liderança e Mundo Corporativo */}
              <div className="lg:col-span-6 space-y-7 text-left">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#B5251E]">
                    <Target className="w-4 h-4 text-[#B5251E] shrink-0" />
                    <span>{FIRST_RHYTHM_DATA.badge}</span>
                  </div>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#B5251E] uppercase tracking-wide leading-[1.12]">
                    {FIRST_RHYTHM_DATA.title}
                  </h2>
                </div>

                <ul className="space-y-3.5">
                  {FIRST_RHYTHM_DATA.points.map((point, index) => {
                    const firstLetter = point.charAt(0);
                    const rest = point.slice(1);
                    const isSelectedPhase =
                      activeTacticalIndex === index % FIRST_RHYTHM_DATA.tacticalPillars.length;
                    return (
                      <li
                        key={point}
                        onClick={() => setActiveTacticalIndex(index % FIRST_RHYTHM_DATA.tacticalPillars.length)}
                        className={`flex items-start gap-3.5 bg-[#35322B]/85 hover:bg-[#35322B] border rounded-xl px-5 py-4 text-left shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:translate-x-1 cursor-pointer ${
                          isSelectedPhase
                            ? 'border-[#B5251E]/80 bg-[#35322B]'
                            : 'border-[#45413A] hover:border-[#B5251E]/50'
                        }`}
                      >
                        <span className="text-[#B5251E] font-bold text-lg leading-snug shrink-0 mt-0.5">
                          •
                        </span>
                        <p className="text-sm sm:text-base font-medium text-[#F1F0EC] leading-relaxed text-left">
                          <strong className="text-[#B5251E] font-bold">{firstLetter}</strong>
                          {rest}
                        </p>
                      </li>
                    );
                  })}
                </ul>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#rounds"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#AA231C] hover:bg-[#B5251E] px-5 py-3 rounded-xl shadow-lg shadow-[#AA231C]/25 transition-all duration-300 ease-out hover:-translate-y-0.5"
                  >
                    <span>Praticar nos 36 Rounds</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <span className="text-xs tracking-widest uppercase text-[#F1F0EC]/65">
                    {FIRST_RHYTHM_DATA.subtitle}
                  </span>
                </div>
              </div>

              {/* Right Column: Painel Tático Interativo — Anatomia do Round (Ringue x Mundo Corporativo) */}
              <div className="lg:col-span-6 text-left">
                <div className="bg-[#35322B] p-6 sm:p-8 rounded-2xl border border-[#544F45]/70 shadow-[0_18px_42px_-12px_rgba(0,0,0,0.5)] space-y-6">
                  {/* Top Bar: Selector of the 4 Tactical Phases */}
                  <div className="flex items-start sm:items-center justify-between gap-4 border-b border-[#544F45]/60 pb-4">
                    <div className="text-left">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#B5251E] block">
                        PARALELO PRÁTICO • RINGUE × EMPRESA
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase mt-0.5 leading-snug">
                        A Anatomia de um Round Corporativo
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#26241F] border border-[#544F45] text-xs font-mono text-[#F1F0EC]/80 shrink-0">
                      0{activeTacticalIndex + 1} / 04
                    </span>
                  </div>

                  {/* Phase Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {FIRST_RHYTHM_DATA.tacticalPillars.map((pillar, idx) => (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => setActiveTacticalIndex(idx)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider border transition-all duration-300 ease-out cursor-pointer ${
                          activeTacticalIndex === idx
                            ? 'bg-[#B5251E] text-white border-[#B5251E] shadow-md'
                            : 'bg-[#26241F] text-[#F1F0EC]/75 border-[#45413A] hover:border-[#F1F0EC]/40 hover:text-white'
                        }`}
                      >
                        Fase 0{idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Active Tactical Comparison Card */}
                  {(() => {
                    const activeItem = FIRST_RHYTHM_DATA.tacticalPillars[activeTacticalIndex];
                    return (
                      <div className="bg-[#26241F] rounded-2xl p-5 sm:p-6 border border-[#45413A] shadow-inner space-y-5 text-left">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-display font-bold tracking-widest uppercase text-[#B5251E]">
                            {activeItem.tag}
                          </span>
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {activeItem.metric}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="bg-[#35322B]/70 rounded-xl p-4 border border-[#45413A] text-left">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F1F0EC]/60 block">
                              Fundamento no Boxe
                            </span>
                            <p className="font-display font-bold text-sm text-white uppercase mt-1 leading-snug">
                              {activeItem.ringTitle}
                            </p>
                          </div>
                          <div className="bg-[#35322B]/70 rounded-xl p-4 border border-[#B5251E]/40 text-left">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B5251E] block">
                              Tradução Corporativa
                            </span>
                            <p className="font-display font-bold text-sm text-white uppercase mt-1 leading-snug">
                              {activeItem.corpTitle}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-left">
                          <div className="bg-[#35322B]/50 rounded-xl p-4 border-l-4 border-[#B5251E]">
                            <p className="text-[#F1F0EC]/90">
                              <strong className="text-[#B5251E] font-display font-bold uppercase mr-1.5">
                                Sem Técnica (No Automático):
                              </strong>
                              {activeItem.st}
                            </p>
                          </div>
                          <div className="bg-[#35322B]/50 rounded-xl p-4 border-l-4 border-emerald-500">
                            <p className="text-white">
                              <strong className="text-emerald-400 font-display font-bold uppercase mr-1.5">
                                Com Técnica (Em Equilíbrio):
                              </strong>
                              {activeItem.ct}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="px-1 flex items-center justify-between text-xs text-[#F1F0EC]/70">
                    <span>Metodologia Aplicada — Eduardo Amaral (FGB)</span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTacticalIndex(
                          (prev) => (prev + 1) % FIRST_RHYTHM_DATA.tacticalPillars.length
                        )
                      }
                      className="text-[#B5251E] hover:underline font-semibold transition-colors duration-200 cursor-pointer"
                    >
                      Próxima Fase →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: OS 6 PILARES & DIAGNÓSTICO CORPORATIVO */}
        <section id="pilares" className="bg-[#35322B] text-white py-20 sm:py-24 lg:py-28 border-t border-[#45413A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
            <div className="text-left md:text-center max-w-3xl md:mx-auto space-y-3.5">
              <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-[#B5251E]">
                ARQUITETURA DOS 36 ROUNDS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-[1.1]">
                Os 6 Pilares da Constância em Equilíbrio
              </h2>
              <p className="text-sm sm:text-base text-[#F1F0EC]/85 leading-[1.72]">
                Os 36 Rounds são organizados em 6 ciclos completos. Cada ciclo percorre 6 dimensões
                essenciais da liderança, da inteligência emocional e da alta performance sustentável.
              </p>
            </div>

            {/* 6 Pillars Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  onClick={() => {
                    setSelectedPillar(pillar.id);
                    setSelectedCycle(0);
                    setActiveRoundNumber(pillar.rounds[0]);
                    const el = document.getElementById('rounds');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group bg-[#26241F] hover:bg-[#2E3024] rounded-2xl p-6 sm:p-7 border border-[#544F45]/60 hover:border-[#B5251E] transition-all duration-300 ease-out hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between shadow-[0_10px_28px_-8px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.55)] text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#AA231C]/15 border border-[#AA231C]/40 flex items-center justify-center text-[#B5251E] group-hover:bg-[#AA231C] group-hover:text-white transition-colors duration-300">
                        {PILLAR_ICONS[pillar.id]}
                      </div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#F1F0EC]/60">
                        6 Rounds
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wide text-white group-hover:text-[#B5251E] transition-colors duration-300 leading-snug">
                      {pillar.name}
                    </h3>
                    <p className="text-sm text-[#F1F0EC]/80 leading-[1.7] text-left">
                      {pillar.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#45413A] flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.rounds.map((rNum) => (
                        <button
                          key={rNum}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPillar(pillar.id);
                            setSelectedCycle(0);
                            setSearchQuery('');
                            setActiveRoundNumber(rNum);
                            setViewMode('slide');
                            const el = document.getElementById('rounds');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          title={`Ir para o Round ${rNum} (${pillar.name})`}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded border transition-all duration-200 cursor-pointer ${
                            activeRoundNumber === rNum
                              ? 'bg-[#B5251E] text-white border-[#B5251E] shadow-sm'
                              : 'bg-[#35322B] hover:bg-[#B5251E] text-[#F1F0EC]/90 hover:text-white border-[#544F45] hover:border-[#B5251E]'
                          }`}
                        >
                          R{rNum}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-[#B5251E] group-hover:translate-x-1 transition-transform duration-300 shrink-0">
                      Filtrar →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Corporate Diagnostic Selector */}
            <div className="bg-[#26241F] rounded-3xl p-6 sm:p-10 border border-[#544F45]/70 shadow-[0_18px_42px_-12px_rgba(0,0,0,0.45)] text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center">
                <div className="lg:col-span-5 space-y-3 text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B5251E]">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Bússola Executiva</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-snug">
                    Qual é o momento atual da sua equipe?
                  </h3>
                  <p className="text-sm sm:text-base text-[#F1F0EC]/80 leading-[1.7]">
                    Selecione um cenário corporativo ao lado para descobrir imediatamente quais
                    Rounds da metodologia trabalham essa competência na prática.
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="flex flex-wrap gap-2">
                    {CORPORATE_DIAGNOSTICS.map((diag) => (
                      <button
                        key={diag.id}
                        type="button"
                        onClick={() => setActiveDiagnostic(diag.id)}
                        className={`text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all duration-300 ease-out cursor-pointer ${
                          activeDiagnostic === diag.id
                            ? 'bg-[#AA231C] text-white border-[#AA231C] shadow-md'
                            : 'bg-[#35322B] text-[#F1F0EC]/85 border-[#544F45] hover:border-[#F1F0EC]/50 hover:text-white'
                        }`}
                      >
                        {diag.label}
                      </button>
                    ))}
                  </div>

                  {CORPORATE_DIAGNOSTICS.filter((d) => d.id === activeDiagnostic).map((diag) => (
                    <div
                      key={diag.id}
                      className="bg-[#35322B] rounded-2xl p-5 sm:p-6 border border-[#544F45] shadow-inner space-y-4 text-left"
                    >
                      <p className="text-sm sm:text-base text-[#F1F0EC]/90 leading-relaxed">
                        {diag.desc}
                      </p>
                      <div className="space-y-2.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#B5251E]">
                          Rounds Recomendados (Clique para abrir):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {diag.recommendedRounds.map((rNum) => {
                            const rObj = ROUNDS_DATA.find((x) => x.round === rNum);
                            return (
                              <button
                                key={rNum}
                                type="button"
                                onClick={() => jumpToRound(rNum)}
                                className="inline-flex items-center gap-2 bg-[#26241F] hover:bg-[#AA231C] text-white text-xs font-semibold px-3.5 py-2 rounded-lg border border-[#544F45] hover:border-[#AA231C] shadow-sm transition-all duration-200 cursor-pointer"
                              >
                                <span className="text-[#B5251E] font-bold">Round {rNum}:</span>
                                <span>{rObj?.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: OS 36 ROUNDS — Interactive Presentation & Complete Catalog (Slides 6 to 46) */}
        <section id="rounds" className="bg-[#F1F0EC] text-[#26241F] py-20 sm:py-24 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            {/* Section Header & Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#544F45]/20 pb-8 text-left">
              <div className="space-y-2.5">
                <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-[#B5251E]">
                  METODOLOGIA COMPLETA • SLIDES 6 A 46
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#26241F] uppercase tracking-tight leading-[1.08]">
                  Os 36 Rounds em Equilíbrio
                </h2>
                <p className="text-sm sm:text-base text-[#544F45] max-w-2xl leading-[1.7]">
                  Navegue por todos os 36 Rounds que conectam a <strong>Fusão de Realidades</strong>{' '}
                  (ambiente corporativo), a <strong>Vivência de Treinos</strong> (ST vs CT no ringue)
                  e a <strong>Vivência do Instrutor</strong> (o legado).
                </p>
              </div>

              {/* View Mode Switcher & Random Round */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleRandomRound}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#26241F] text-[#26241F] hover:text-white border border-[#544F45]/30 text-xs font-display font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-sm transition-all duration-300 ease-out cursor-pointer"
                >
                  <Shuffle className="w-4 h-4 text-[#B5251E]" />
                  <span>Sortear Round</span>
                </button>

                <div className="inline-flex rounded-xl bg-[#26241F] p-1 text-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setViewMode('slide')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      viewMode === 'slide'
                        ? 'bg-[#AA231C] text-white shadow-sm'
                        : 'text-[#F1F0EC]/75 hover:text-white'
                    }`}
                  >
                    <Presentation className="w-4 h-4" />
                    <span>Modo Ringue (Slide)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#AA231C] text-white shadow-sm'
                        : 'text-[#F1F0EC]/75 hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Todos os 36 ({filteredRounds.length})</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Bar (Pillar, Cycle, Search) */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_28px_-8px_rgba(38,36,31,0.07)] border border-[#544F45]/15 space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Search input */}
                <div className="md:col-span-5 relative">
                  <Search className="w-4 h-4 text-[#544F45] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(sanitizeInput(e.target.value, 80))}
                    placeholder="Buscar por tema, palavra-chave (ex: silêncio, foco, liderança, jab)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F1F0EC] rounded-xl text-sm text-[#26241F] placeholder-[#544F45]/70 border border-transparent focus:border-[#B5251E] focus:bg-white transition-all duration-200 focus:outline-none"
                  />
                </div>

                {/* Cycle filter */}
                <div className="md:col-span-7 flex flex-wrap items-center gap-1.5 justify-start md:justify-end">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#544F45] mr-1">
                    Ciclos:
                  </span>
                  {[
                    { id: 0, label: 'Todos (1–36)' },
                    { id: 1, label: 'C1 (1–6)' },
                    { id: 2, label: 'C2 (7–12)' },
                    { id: 3, label: 'C3 (13–18)' },
                    { id: 4, label: 'C4 (19–24)' },
                    { id: 5, label: 'C5 (25–30)' },
                    { id: 6, label: 'C6 (31–36)' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedCycle(c.id);
                        setSelectedPillar('TODOS');
                        setSearchQuery('');
                        const firstMatch = ROUNDS_DATA.find(
                          (r) => c.id === 0 || r.cycle === c.id
                        );
                        if (firstMatch) setActiveRoundNumber(firstMatch.round);
                      }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                        selectedCycle === c.id
                          ? 'bg-[#26241F] text-white shadow-sm'
                          : 'bg-[#F1F0EC] text-[#35322B] hover:bg-[#544F45]/20'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pillar Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#544F45]/10">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPillar('TODOS');
                    setSelectedCycle(0);
                    setSearchQuery('');
                    setActiveRoundNumber(1);
                  }}
                  className={`text-xs font-display font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    selectedPillar === 'TODOS' && selectedCycle === 0
                      ? 'bg-[#B5251E] text-white shadow-sm'
                      : 'bg-[#F1F0EC] text-[#35322B] hover:bg-[#544F45]/20'
                  }`}
                >
                  Todos os Pilares
                </button>
                {PILLARS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedPillar(p.id);
                      setSelectedCycle(0);
                      setSearchQuery('');
                      const firstInPillar = ROUNDS_DATA.find((r) => r.pillar === p.id);
                      if (firstInPillar) setActiveRoundNumber(firstInPillar.round);
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      selectedPillar === p.id
                        ? 'bg-[#B5251E] text-white shadow-sm'
                        : 'bg-[#F1F0EC] text-[#35322B] hover:bg-[#544F45]/20'
                    }`}
                  >
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Number Selector Bar (Filtered dynamically by Cycle / Pillar / Search) */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-5 shadow-[0_8px_28px_-8px_rgba(38,36,31,0.07)] border border-[#544F45]/15 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#544F45]">
                  {selectedCycle !== 0
                    ? `Rounds do Ciclo C${selectedCycle} (${filteredRounds.length} Rounds):`
                    : selectedPillar !== 'TODOS'
                    ? `Rounds do Pilar ${selectedPillar} (${filteredRounds.length} Rounds):`
                    : searchQuery.trim()
                    ? `Rounds Encontrados (${filteredRounds.length}):`
                    : 'Acesso Rápido por Round (1 a 36):'}
                </span>
                <span className="text-[11px] text-[#544F45]">
                  Dica: use as setas <kbd className="px-1.5 py-0.5 bg-[#F1F0EC] rounded">←</kbd>{' '}
                  <kbd className="px-1.5 py-0.5 bg-[#F1F0EC] rounded">→</kbd> do teclado
                </span>
              </div>

              {filteredRounds.length === 0 ? (
                <div className="text-left sm:text-center py-4 text-xs text-[#544F45]">
                  Nenhum round encontrado para esta busca.{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCycle(0);
                      setSelectedPillar('TODOS');
                      setSearchQuery('');
                      setActiveRoundNumber(1);
                    }}
                    className="text-[#B5251E] font-bold underline cursor-pointer ml-1"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : filteredRounds.length < 36 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {filteredRounds.map((r) => {
                    const isActive = r.round === activeRoundNumber;
                    return (
                      <button
                        key={r.round}
                        type="button"
                        onClick={() => {
                          setActiveRoundNumber(r.round);
                          setViewMode('slide');
                        }}
                        title={`Round ${r.round}: ${r.title}`}
                        className={`p-3 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                          isActive
                            ? 'bg-[#B5251E] text-white border-[#B5251E] shadow-md scale-[1.01]'
                            : 'bg-[#F1F0EC] hover:bg-[#26241F] text-[#26241F] hover:text-white border-transparent'
                        }`}
                      >
                        <span className="font-display font-extrabold text-xs block uppercase tracking-wider">
                          Round {r.round}
                        </span>
                        <span
                          className={`text-[11px] font-medium line-clamp-1 mt-0.5 block ${
                            isActive ? 'text-white/90' : 'opacity-80'
                          }`}
                        >
                          {r.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 lg:grid-cols-18 gap-1.5">
                  {ROUNDS_DATA.map((r) => {
                    const isActive = r.round === activeRoundNumber;
                    return (
                      <button
                        key={r.round}
                        type="button"
                        onClick={() => {
                          setActiveRoundNumber(r.round);
                          setViewMode('slide');
                        }}
                        title={`Round ${r.round}: ${r.title}`}
                        className={`h-8 rounded-lg font-display font-bold text-xs transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-[#B5251E] text-white shadow-md scale-105 ring-2 ring-[#B5251E]/40'
                            : 'bg-[#F1F0EC] hover:bg-[#26241F] text-[#26241F] hover:text-white'
                        }`}
                      >
                        {r.round}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SLIDE PRESENTATION MODE — 100% Faithful to Slides 6–46 */}
            {viewMode === 'slide' ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_18px_48px_-14px_rgba(38,36,31,0.12)] border border-[#544F45]/20 space-y-8 text-left">
                {/* Top Slide Header + Prev/Next Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#544F45]/15 pb-6 text-left">
                  <div className="space-y-2">
                    <p className="font-display font-bold text-sm sm:text-base tracking-[0.18em] text-[#B5251E] uppercase">
                      {formatSpacedRound(currentRoundObj.round)}
                    </p>
                    <h3 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-[42px] text-[#26241F] uppercase leading-[1.1] tracking-tight">
                      {currentRoundObj.title}
                    </h3>
                    <div className="inline-flex flex-wrap items-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-[#35322B]">
                      <span className="text-[#B5251E]">{PILLAR_ICONS[currentRoundObj.pillar]}</span>
                      <span>{currentRoundObj.pillar}</span>
                      <span className="text-[#544F45]/50">•</span>
                      <span className="text-[#544F45]">Ciclo {currentRoundObj.cycle} de 6</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start shrink-0">
                    <button
                      type="button"
                      onClick={handlePrevRound}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F1F0EC] hover:bg-[#26241F] text-[#26241F] hover:text-white text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                      aria-label="Round anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Anterior</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextRound}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#26241F] hover:bg-[#B5251E] text-white text-xs font-display font-bold uppercase tracking-wider shadow-sm transition-all duration-200 cursor-pointer"
                      aria-label="Próximo round"
                    >
                      <span>Próximo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Provocative Crimson Question */}
                <div className="text-left">
                  <p className="font-display font-bold text-base sm:text-xl text-[#B5251E] uppercase tracking-wide leading-snug">
                    {currentRoundObj.question}
                  </p>
                </div>

                {/* Dual Cards: FUSÃO DE REALIDADES (Light) + VIVÊNCIA DE TREINOS (Dark) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Left Card: FUSÃO DE REALIDADES (O que acontece) */}
                  <div className="bg-[#F1F0EC] rounded-2xl p-6 sm:p-8 border border-[#544F45]/15 shadow-[0_8px_24px_-8px_rgba(38,36,31,0.06)] flex flex-col justify-between space-y-6 text-left">
                    <div className="space-y-5">
                      {/* Crimson Oval Pill Header — Aligned Left for Clean Reading Hierarchy */}
                      <div className="flex justify-start">
                        <div className="bg-[#B5251E] text-white rounded-full px-6 py-2 text-left shadow-sm">
                          <p className="font-display font-bold text-xs tracking-wider uppercase">
                            FUSÃO DE REALIDADES
                          </p>
                          <p className="text-[11px] font-medium text-white/90">O que acontece</p>
                        </div>
                      </div>

                      <h4 className="font-display font-bold text-lg sm:text-xl text-[#26241F] uppercase tracking-wide leading-snug">
                        {currentRoundObj.fusion.subtitle}
                      </h4>

                      <p className="text-base sm:text-lg text-[#26241F]/90 leading-[1.75] text-left">
                        {currentRoundObj.fusion.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#544F45]/15 flex items-center justify-between gap-2 text-xs text-[#544F45]">
                      <span>Realidade Corporativa & Cotidiana</span>
                      <span className="font-semibold uppercase">Ambiente de Pressão</span>
                    </div>
                  </div>

                  {/* Right Card: VIVÊNCIA DE TREINOS (Como corrigir) */}
                  <div className="bg-[#35322B] text-white rounded-2xl p-6 sm:p-8 border border-[#544F45]/50 flex flex-col justify-between space-y-6 shadow-[0_12px_32px_-10px_rgba(38,36,31,0.28)] text-left">
                    <div className="space-y-5">
                      {/* Crimson Oval Pill Header — Aligned Left for Clean Reading Hierarchy */}
                      <div className="flex justify-start">
                        <div className="bg-[#B5251E] text-white rounded-full px-6 py-2 text-left shadow-sm">
                          <p className="font-display font-bold text-xs tracking-wider uppercase">
                            VIVÊNCIA DE TREINOS
                          </p>
                          <p className="text-[11px] font-medium text-white/90">Como corrigir</p>
                        </div>
                      </div>

                      <h4 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-wide leading-snug">
                        {currentRoundObj.training.subtitle}
                      </h4>

                      <div className="space-y-3.5 text-sm sm:text-base leading-[1.7] text-left">
                        <p className="text-[#F1F0EC]/90">{currentRoundObj.training.context}</p>
                        <div className="bg-[#26241F]/90 rounded-xl p-4 border-l-4 border-[#B5251E]">
                          <p className="text-[#F1F0EC]">
                            <strong className="text-[#B5251E] font-display font-bold tracking-wider mr-1.5">
                              ST:
                            </strong>
                            {currentRoundObj.training.st}
                          </p>
                        </div>

                        <p className="text-[#F1F0EC]/90 pt-1">{currentRoundObj.training.insight}</p>
                        <div className="bg-[#26241F]/90 rounded-xl p-4 border-l-4 border-emerald-500">
                          <p className="text-white">
                            <strong className="text-[#B5251E] font-display font-bold tracking-wider mr-1.5">
                              CT:
                            </strong>
                            {currentRoundObj.training.ct}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#544F45]/50 flex flex-wrap items-center justify-between gap-2 text-xs text-[#F1F0EC]/70">
                      <span>ST = Sem Técnica (Reação Automática)</span>
                      <span>CT = Com Técnica (Ação Consciente)</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Full-Width Crimson Banner: VIVÊNCIA DO INSTRUTOR (O legado) */}
                <div className="bg-[#AA231C] text-white rounded-2xl p-6 sm:p-8 lg:px-10 shadow-[0_12px_30px_-8px_rgba(170,35,28,0.4)] text-left">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/25 pb-4 lg:pb-0 lg:pr-6">
                      <p className="font-display font-bold text-base sm:text-lg tracking-wider uppercase">
                        VIVÊNCIA DO INSTRUTOR
                      </p>
                      <p className="text-sm font-medium text-white/90 mt-0.5">O legado</p>
                    </div>
                    <div className="lg:col-span-8 space-y-1.5 italic text-base sm:text-lg leading-[1.7] text-white text-left">
                      {currentRoundObj.legacy.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* GRID CATALOG MODE — Browse all filtered rounds at once */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRounds.map((item) => (
                  <div
                    key={item.round}
                    onClick={() => {
                      setActiveRoundNumber(item.round);
                      setViewMode('slide');
                    }}
                    className="group bg-white rounded-2xl p-6 shadow-[0_6px_22px_-6px_rgba(38,36,31,0.07)] hover:shadow-[0_16px_36px_-10px_rgba(38,36,31,0.16)] border border-[#544F45]/15 hover:border-[#B5251E] transition-all duration-300 ease-out hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer text-left"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-bold text-xs tracking-[0.15em] text-[#B5251E] uppercase">
                          ROUND {item.round} / 36
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F1F0EC] text-[#35322B]">
                          {item.pillar}
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-lg text-[#26241F] group-hover:text-[#B5251E] transition-colors duration-200 uppercase leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs font-semibold text-[#B5251E]/90 uppercase leading-relaxed">
                        {item.question}
                      </p>

                      <div className="bg-[#F1F0EC] rounded-xl p-3.5 text-xs text-[#35322B] space-y-1.5 leading-relaxed">
                        <p className="font-bold text-[#26241F]">{item.fusion.subtitle}</p>
                        <p className="line-clamp-2">{item.fusion.description}</p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#544F45]/15 flex items-center justify-between text-xs font-semibold text-[#26241F] group-hover:text-[#B5251E] transition-colors duration-200">
                      <span className="italic line-clamp-1 font-normal text-[#544F45]">
                        “{item.legacy[0]}”
                      </span>
                      <span className="shrink-0 ml-2">Ver Round →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 7: ENCERRAMENTO & CONTATO — Faithful to Slides 12, 19, 26, 33, 40, 47 */}
        <section id="contato" className="bg-[#35322B] text-white py-20 sm:py-24 lg:py-28 border-t border-[#45413A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Faithful Closing Slide Card (Slides 12/19/26/33/40/47) */}
              <div className="lg:col-span-6 bg-[#2E3024] rounded-3xl p-8 sm:p-12 border border-[#544F45]/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center text-center space-y-8">
                <img
                  src="/logo-dark.svg"
                  alt="Eduardo Amaral — Mentorias e Boxe"
                  className="w-60 sm:w-80 h-auto"
                />

                <div className="space-y-2 max-w-md">
                  <p className="font-display font-medium text-sm sm:text-base tracking-wider uppercase text-white leading-relaxed">
                    FELIZ PELO CARINHO DE TODOS.
                  </p>
                  <p className="font-display font-medium text-sm sm:text-base tracking-wider uppercase text-white leading-relaxed">
                    HONRADO EM COMPARTILHAR ESSE MOMENTO COM VOCÊS.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href={MENTOR_DATA.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 text-base sm:text-lg font-medium text-white hover:text-[#B5251E] transition-colors duration-200"
                  >
                    <Instagram className="w-5 h-5 text-[#B5251E]" />
                    <span className="tracking-wider">{MENTOR_DATA.instagram}</span>
                  </a>

                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 text-base sm:text-lg font-medium text-white hover:text-[#B5251E] transition-colors duration-200"
                  >
                    <Phone className="w-5 h-5 text-[#B5251E]" />
                    <span className="tracking-wider">{MENTOR_DATA.phoneDisplay}</span>
                  </a>
                </div>

                {/* Official QR Code from Presentation PDF */}
                <div className="flex flex-col items-center space-y-2.5 pt-2">
                  <div className="bg-white p-3.5 rounded-2xl shadow-lg">
                    <img
                      src="/qrcode.png"
                      alt="QR Code Oficial — Eduardo Amaral Mentorias e Boxe"
                      className="w-36 h-36 sm:w-40 sm:h-40 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#F1F0EC]/70">
                    Aponte a câmera para conectar
                  </span>
                </div>
              </div>

              {/* Right Column: Direct WhatsApp Booking Form */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="space-y-3 text-left">
                  <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#B5251E]">
                    AGENDE SUA VIVÊNCIA OU MENTORIA
                  </span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight leading-[1.12]">
                    Transforme o Ritmo da Sua Equipe em Rounds Mais Leves
                  </h2>
                  <p className="text-sm sm:text-base text-[#F1F0EC]/85 leading-[1.7]">
                    Preencha os dados abaixo para iniciar o atendimento direto pelo WhatsApp de{' '}
                    <strong>Eduardo Amaral</strong> e desenhar o formato ideal para sua empresa ou
                    liderança.
                  </p>
                </div>

                <form
                  onSubmit={handleContactSubmit}
                  className="bg-[#26241F] rounded-3xl p-6 sm:p-8 border border-[#544F45]/70 shadow-[0_18px_42px_-12px_rgba(0,0,0,0.45)] space-y-4 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-bold uppercase tracking-wider text-[#F1F0EC]/80 mb-1.5"
                      >
                        Seu Nome *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        maxLength={80}
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ex: Maurício Silva"
                        className="w-full px-4 py-3 rounded-xl bg-[#35322B] border border-[#544F45] text-white placeholder-[#F1F0EC]/40 text-sm transition-colors duration-200 focus:border-[#B5251E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-bold uppercase tracking-wider text-[#F1F0EC]/80 mb-1.5"
                      >
                        Empresa / Organização
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        maxLength={80}
                        value={contactCompany}
                        onChange={(e) => setContactCompany(e.target.value)}
                        placeholder="Nome da sua empresa"
                        className="w-full px-4 py-3 rounded-xl bg-[#35322B] border border-[#544F45] text-white placeholder-[#F1F0EC]/40 text-sm transition-colors duration-200 focus:border-[#B5251E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-format"
                      className="block text-xs font-bold uppercase tracking-wider text-[#F1F0EC]/80 mb-1.5"
                    >
                      Formato Desejado
                    </label>
                    <select
                      id="contact-format"
                      value={contactFormat}
                      onChange={(e) => setContactFormat(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#35322B] border border-[#544F45] text-white text-sm transition-colors duration-200 focus:border-[#B5251E] focus:outline-none"
                    >
                      <option value="Vivência de Boxe Corporativa (Equipes / Liderança)">
                        Vivência de Boxe Corporativa (Equipes / Liderança)
                      </option>
                      <option value="Palestra Executiva — Os 36 Rounds em Equilíbrio">
                        Palestra Executiva — Os 36 Rounds em Equilíbrio
                      </option>
                      <option value="Mentoria Individual / Executiva">
                        Mentoria Individual / Executiva
                      </option>
                      <option value="Treinamento Técnico e Comportamental">
                        Treinamento Técnico e Comportamental
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold uppercase tracking-wider text-[#F1F0EC]/80 mb-1.5"
                    >
                      Objetivo ou Momento da Equipe (Opcional)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      maxLength={400}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Conte brevemente sobre o evento, tamanho da equipe ou objetivo..."
                      className="w-full px-4 py-3 rounded-xl bg-[#35322B] border border-[#544F45] text-white placeholder-[#F1F0EC]/40 text-sm transition-colors duration-200 focus:border-[#B5251E] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#AA231C] hover:bg-[#B5251E] text-white font-display font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(170,35,28,0.4)] hover:shadow-[0_14px_30px_-5px_rgba(181,37,30,0.5)] transition-all duration-300 ease-out hover:-translate-y-0.5 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Enviar Solicitação via WhatsApp</span>
                  </button>

                  <div className="flex items-start sm:items-center justify-start gap-2 text-[11px] text-[#F1F0EC]/65 pt-1 text-left">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                    <span>
                      Comunicação segura e direta com {MENTOR_DATA.phoneDisplay} • Nenhum dado fica
                      armazenado em terceiros.
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#26241F] border-t border-[#45413A] py-10 text-xs text-[#F1F0EC]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <div className="flex flex-wrap items-center gap-3">
            <img
              src="/logo-dark.svg"
              alt="Eduardo Amaral — Mentorias e Boxe"
              className="h-7 w-auto"
            />
            <span className="text-[#544F45] hidden sm:inline">|</span>
            <span>35 Anos de Constância em Equilíbrio • FGB</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={MENTOR_DATA.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              {MENTOR_DATA.instagram}
            </a>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              {MENTOR_DATA.phoneDisplay}
            </a>
            <span className="inline-flex items-center gap-1 text-emerald-400/90">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Ambiente Seguro (HTTPS/CSP)</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp com Eduardo Amaral"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 bg-[#AA231C] hover:bg-[#B5251E] text-white font-display font-bold text-xs uppercase tracking-wider px-4 py-3.5 rounded-full shadow-[0_10px_28px_-4px_rgba(0,0,0,0.5)] border border-white/20 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">{MENTOR_DATA.phoneDisplay}</span>
      </a>
    </div>
  );
}
