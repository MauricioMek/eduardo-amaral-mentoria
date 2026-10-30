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
  const [contactFormat, setContactFormat] = useState('Vivências do Boxe');
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
    const cleanFormat = sanitizeInput(contactFormat, 100);
    const cleanMsg = sanitizeInput(contactMessage.trim(), 400);

    const lines = [
      `Olá, Eduardo Amaral! Vim pela página oficial da *Vivência de Boxe — A Constância em Equilíbrio*.`,
      ``,
      `*Nome:* ${cleanName}`,
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
      <header className="sticky top-0 z-50 bg-[#26241F]/95 backdrop-blur-md border-b border-[#45413A]/80 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6),inset_0_-1px_0_0_rgba(241,240,236,0.06)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide text-[#F1F0EC]/85">
            <a href="#apresentacao" className="hover:text-white transition-colors duration-200">
              Apresentação
            </a>
            <a
              href="#vivencia-corporativa"
              className="hover:text-white transition-colors duration-200"
            >
              Vivências do Boxe
            </a>
            <a
              href="#biomecanica-boxe"
              className="hover:text-white transition-colors duration-200"
            >
              Biomecânica do Boxe
            </a>
            <a
              href="#treino-executivo"
              className="hover:text-white transition-colors duration-200"
            >
              Treino Executivo
            </a>
            <a href="#contato" className="hover:text-white transition-colors duration-200">
              Contato
            </a>
          </nav>

          <div className="lg:hidden text-xs font-display font-bold tracking-[0.18em] uppercase text-[#F1F0EC]/90">
            Eduardo Amaral
          </div>

          <div className="hidden sm:flex items-center gap-3 ml-auto lg:ml-0">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium-crimson inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-lg"
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
          <div className="lg:hidden bg-[#26241F] border-b border-[#45413A] px-4 pt-3 pb-6 space-y-3 text-left shadow-2xl">
            <div className="flex flex-col space-y-1.5 text-base font-medium">
              <a
                href="#apresentacao"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg hover:bg-[#35322B] transition-colors duration-200"
              >
                Apresentação
              </a>
              <a
                href="#vivencia-corporativa"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg hover:bg-[#35322B] transition-colors duration-200"
              >
                Vivências do Boxe
              </a>
              <a
                href="#biomecanica-boxe"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg hover:bg-[#35322B] transition-colors duration-200"
              >
                Biomecânica do Boxe
              </a>
              <a
                href="#treino-executivo"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg hover:bg-[#35322B] transition-colors duration-200"
              >
                Treino Executivo
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
                className="btn-premium-crimson w-full inline-flex items-center justify-center gap-2 text-white font-semibold text-sm px-5 py-3 rounded-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Vamos Treinar?</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* SECTION 1: APRESENTAÇÃO — Quem é Eduardo Amaral, sua história e "Por que estou aqui?" */}
        <section id="apresentacao" className="bg-[#1C1A17] text-white py-20 sm:py-24 lg:py-28 border-b border-[#45413A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Portrait & Official Identity */}
              <div className="lg:col-span-4 flex flex-col items-start space-y-5">
                <div className="w-full max-w-[290px] aspect-[4/4.5] rounded-2xl overflow-hidden border-2 border-[#B5251E] shadow-[0_14px_34px_-8px_rgba(0,0,0,0.5)] bg-[#35322B]">
                  <img
                    src="/eduardo-amaral.jpg"
                    alt="Eduardo Amaral — Apresentação e Trajetória"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out hover:scale-[1.03]"
                  />
                </div>
                <div className="text-left space-y-1">
                  <p className="font-display font-bold text-lg uppercase tracking-wide text-white">
                    {MENTOR_DATA.name}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-[#F1F0EC]/80">
                    Instrutor Técnico certificado pela Federação Gaúcha de Boxe (FGB).
                  </p>
                </div>
              </div>

              {/* Right Column: Profissional, Trajetória e "Por Que Estou Aqui?" integrado */}
              <div className="lg:col-span-8 space-y-5 text-left">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#B5251E]">
                  APRESENTAÇÃO • QUEM É EDUARDO AMARAL E SUA TRAJETÓRIA
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.08]">
                  EDUARDO AMARAL
                </h2>
                <p className="text-base sm:text-lg text-[#F1F0EC]/90 leading-[1.75] text-editorial-justify">
                  Instrutor Técnico certificado pela Federação Gaúcha de Boxe (FGB) e especialista em vivências práticas, Eduardo Amaral construiu uma trajetória sólida marcada pela disciplina, constância e respeito ao desenvolvimento humano. Com 35 anos de ringue, ele traduz a inteligência do boxe em treinamentos de alta performance, levando clareza, estratégia e resiliência para equipes corporativas e instituições de ensino.
                </p>

                <div className="pt-2 space-y-3 border-t border-[#45413A]">
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#B5251E] tracking-tight uppercase leading-snug">
                    {MENTOR_DATA.headline}
                  </h3>
                  <p className="text-base sm:text-lg text-[#F1F0EC]/90 leading-[1.75] text-editorial-justify">
                    Ao longo de 35 anos dedicados ao boxe e à formação técnica pela Federação Gaúcha de Boxe (FGB), compreendi que o ringue é o laboratório mais fiel do comportamento humano sob pressão.
                  </p>
                  <p className="text-base text-[#F1F0EC]/85 leading-[1.75] text-editorial-justify">
                    Na vida executiva, profissionais enfrentam diariamente rounds invisíveis: prazos curtos, decisões em milissegundos, conversas difíceis, metas exigentes e a necessidade constante de manter a guarda emocional firme sem perder a empatia.
                  </p>
                  <p className="text-base text-[#F1F0EC]/85 leading-[1.75] text-editorial-justify">
                    Meu trabalho é traduzir essa inteligência do ringue para o ambiente corporativo. Ensino equipes a manter a clareza no caos, a não levar golpes emocionais e a trocar a reação impulsiva pela ação estratégica.
                  </p>
                  <p className="text-base font-medium text-white leading-[1.75] text-editorial-justify">
                    O resultado? Transformo a rotina pesada em rounds mais leves.
                  </p>
                </div>
              </div>
            </div>

            {/* Center Banner Maintained as Requested */}
            <div className="card-3d-dark rounded-2xl p-7 sm:p-10 lg:p-12 border border-[#544F45]/50 text-left space-y-3">
              <div className="inline-block border-t-[3px] border-[#B5251E] pt-3">
                <p className="font-display font-bold text-lg sm:text-2xl tracking-wider uppercase text-white leading-snug">
                  {MENTOR_DATA.missionTitle}
                </p>
              </div>
              <p className="font-display font-medium text-base sm:text-xl tracking-wide uppercase text-[#F1F0EC]/90 max-w-3xl leading-relaxed">
                {MENTOR_DATA.missionSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: VIVÊNCIAS DE BOXE / TREINAMENTO CORPORATIVO (Hero + Do Ringue ao Mundo Corporativo) */}
        <section id="vivencia-corporativa" className="relative overflow-hidden">
          {/* Part A: Vivência de Boxe / Treinamento Corporativo */}
          <div className="relative overflow-hidden">
            {/* Split background inspired by Slide 1 (#45413A left panel + #26241F right stage) */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-[34%] bg-[#45413A] border-r border-[#544F45]/50 shadow-[12px_0_36px_-12px_rgba(0,0,0,0.45)] pointer-events-none" />
            {/* Subtle Ambient Studio Illumination */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-28 right-1/4 w-[520px] h-[520px] rounded-full bg-[#B5251E]/[0.07] blur-3xl"
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
                {/* Left Column: Logo Plaque + Mentor Portrait Card (on the #45413A panel on desktop) */}
                <div className="lg:col-span-4 flex flex-col items-start space-y-6">
                  {/* Official White Rounded Logo Card from Slide 1 */}
                  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_8px_rgba(0,0,0,0.25),0_18px_38px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,1)] w-full max-w-xs border border-white/90 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]">
                    <img
                      src="/logo-light.svg"
                      alt="Eduardo Amaral — Mentorias e Boxe"
                      className="w-full h-auto"
                    />
                  </div>

                  {/* High-Res Mentor Card with 3D Depth & Rim Lighting */}
                  <div className="card-3d-dark w-full max-w-xs rounded-2xl overflow-hidden border border-[#544F45]/70 text-left group">
                    <div className="relative aspect-[4/4.5] overflow-hidden bg-[#35322B]">
                      <img
                        src="/eduardo-amaral.jpg"
                        alt="Eduardo Amaral — Instrutor Técnico Federação Gaúcha de Boxe"
                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#26241F] via-[#26241F]/15 to-transparent" />
                      <div className="absolute bottom-3.5 left-4 right-4 text-left">
                        <span className="inline-block bg-[#AA231C] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-[0_4px_12px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.2)]">
                          Federação Gaúcha de Boxe (FGB)
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6 space-y-2 text-left">
                      <h2 className="font-display font-bold text-lg tracking-wide text-white leading-snug">
                        {MENTOR_DATA.name}
                      </h2>
                      <p className="text-xs text-[#F1F0EC]/80 leading-relaxed">
                        Instrutor Técnico de Boxe
                      </p>
                      <div className="w-10 h-0.5 bg-[#AA231C] my-2" />
                      <p className="text-[11px] font-semibold tracking-widest uppercase text-[#F1F0EC]/90">
                        {MENTOR_DATA.experience}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Slide 1 Typography & Call to Action */}
                <div className="lg:col-span-8 lg:pl-10 space-y-7 sm:space-y-8 text-left">
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#35322B]/90 border border-[#AA231C]/50 text-xs font-semibold tracking-widest uppercase text-[#F1F0EC] shadow-[0_4px_14px_-2px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(241,240,236,0.1)]">
                    <span className="w-2 h-2 rounded-full bg-[#AA231C] animate-ping shrink-0" />
                    <span>Vivências do Boxe • Treinamento Corporativo • Alta Performance</span>
                  </div>

                  <div className="space-y-2">
                    <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]">
                      VIVÊNCIA
                      <br />
                      <span className="inline-block">DO </span>{' '}
                      <span className="inline-block relative pb-2">
                        BOXE
                        <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#B5251E] rounded-full shadow-[0_2px_10px_rgba(181,37,30,0.6)]" />
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

                  <p className="text-base sm:text-lg text-[#F1F0EC]/85 max-w-[60ch] leading-[1.75] text-editorial-justify">
                    Conduzindo vivências de boxe e transformando rotinas em{' '}
                    <strong className="text-white font-semibold">rounds mais leves</strong>. Uma
                    metodologia proprietária de <strong className="text-white">36 Rounds</strong> que
                    une a nobre arte do ringue à tomada de decisão, liderança e equilíbrio emocional
                    em empresas e instituições de ensino.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-2">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-premium-dark w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white font-display font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded-xl border border-[#544F45]/80 hover:border-[#F1F0EC]/40"
                    >
                      <MessageCircle className="w-4 h-4 text-[#B5251E]" />
                      <span>Levar para Minha Empresa</span>
                    </a>
                  </div>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-7 border-t border-[#45413A]/80 text-left">
                    <div className="card-3d-dark rounded-xl p-4 sm:p-5 border border-[#45413A]/90 hover:border-[#544F45]">
                      <p className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-none">
                        35 <span className="text-[#B5251E] text-base sm:text-lg">Anos</span>
                      </p>
                      <p className="text-xs text-[#F1F0EC]/80 mt-2 leading-snug">
                        De Constância em Equilíbrio
                      </p>
                    </div>
                    <div className="card-3d-dark rounded-xl p-4 sm:p-5 border border-[#45413A]/90 hover:border-[#544F45]">
                      <p className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-none">
                        36 <span className="text-[#B5251E] text-base sm:text-lg">Rounds</span>
                      </p>
                      <p className="text-xs text-[#F1F0EC]/80 mt-2 leading-snug">
                        Fusão Corporativo & Ringue
                      </p>
                    </div>
                    <div className="card-3d-dark rounded-xl p-4 sm:p-5 border border-[#45413A]/90 hover:border-[#544F45]">
                      <p className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-none">
                        6 <span className="text-[#B5251E] text-base sm:text-lg">Pilares</span>
                      </p>
                      <p className="text-xs text-[#F1F0EC]/80 mt-2 leading-snug">
                        Eixos de Evolução Prática
                      </p>
                    </div>
                    <div className="card-3d-dark rounded-xl p-4 sm:p-5 border border-[#45413A]/90 hover:border-[#544F45]">
                      <p className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-none">
                        FGB
                      </p>
                      <p className="text-xs text-[#F1F0EC]/80 mt-2 leading-snug">
                        Instrutor Técnico de Boxe
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Part B: Do Ringue ao Mundo Corporativo (integrado em Vivências de Boxe / Treinamento Corporativo) */}
          <div id="primeiro-ritmo" className="relative overflow-hidden bg-[#26241F] text-white py-20 sm:py-24 lg:py-28 border-t border-[#45413A]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#B5251E]/[0.06] blur-3xl"
            />
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* Left Column: Cadência do Boxe aplicada à Liderança e Mundo Corporativo */}
                <div className="lg:col-span-6 space-y-7 text-left">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 bg-[#B5251E] text-white px-3.5 py-1.5 rounded text-xs font-bold tracking-[0.18em] uppercase shadow-sm">
                      <Target className="w-4 h-4 text-white shrink-0" />
                      <span>{FIRST_RHYTHM_DATA.badge}</span>
                    </div>
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#B5251E] uppercase tracking-wide leading-[1.12]">
                      {FIRST_RHYTHM_DATA.title}
                    </h2>
                  </div>

                  <ul className="space-y-3.5">
                    {FIRST_RHYTHM_DATA.points.map((point, index) => {
                      const isSelectedPhase =
                        activeTacticalIndex === index % FIRST_RHYTHM_DATA.tacticalPillars.length;
                      return (
                        <li
                          key={point}
                          onClick={() => setActiveTacticalIndex(index % FIRST_RHYTHM_DATA.tacticalPillars.length)}
                          className={`card-3d-dark flex items-start gap-3.5 border rounded-xl px-5 py-4 text-left cursor-pointer ${
                            isSelectedPhase
                              ? 'border-[#B5251E]/85 bg-[#35322B]'
                              : 'border-[#45413A] hover:border-[#B5251E]/60'
                          }`}
                        >
                          <span className="text-white font-bold text-lg leading-snug shrink-0 mt-0.5">
                            •
                          </span>
                          <p className="text-sm sm:text-base font-medium text-white leading-relaxed text-editorial-justify">
                            {point}
                          </p>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <span className="text-xs tracking-widest uppercase text-[#F1F0EC]/65">
                      {FIRST_RHYTHM_DATA.subtitle}
                    </span>
                  </div>
                </div>

                {/* Right Column: Painel Tático Interativo — Anatomia do Round (Ringue x Mundo Corporativo) */}
                <div className="lg:col-span-6 text-left">
                  <div className="surface-stage-dark p-6 sm:p-8 rounded-2xl border border-[#544F45]/75 space-y-6">
                    {/* Top Bar: Selector of the 4 Tactical Phases */}
                    <div className="flex items-start sm:items-center justify-between gap-4 border-b border-[#544F45]/60 pb-4">
                      <div className="text-left space-y-1.5">
                        <span className="inline-block bg-[#B5251E] text-white px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-widest shadow-sm">
                          PARALELO PRÁTICO • RINGUE × EMPRESA
                        </span>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase leading-snug">
                          A Anatomia de um Round Corporativo
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#26241F] border border-[#544F45] text-xs font-mono text-[#F1F0EC]/80 shrink-0 shadow-inner">
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
                              ? 'btn-premium-crimson text-white border-[#B5251E]'
                              : 'bg-[#26241F] text-[#F1F0EC]/75 border-[#45413A] hover:border-[#F1F0EC]/40 hover:text-white hover:-translate-y-0.5'
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
                        <div className="bg-[#26241F] rounded-2xl p-5 sm:p-6 border border-[#45413A] shadow-[inset_0_2px_10px_rgba(0,0,0,0.45)] space-y-5 text-left">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="inline-block bg-[#B5251E] text-white px-3 py-1 rounded text-xs font-display font-bold tracking-widest uppercase shadow-sm">
                              {activeItem.tag}
                            </span>
                            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              {activeItem.metric}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="bg-[#35322B]/80 rounded-xl p-4 border border-[#45413A] shadow-[inset_0_1px_0_rgba(241,240,236,0.06)] text-left">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F1F0EC]/60 block">
                                Fundamento no Boxe
                              </span>
                              <p className="font-display font-bold text-sm text-white uppercase mt-1.5 leading-snug">
                                {activeItem.ringTitle}
                              </p>
                            </div>
                            <div className="bg-[#35322B]/80 rounded-xl p-4 border border-[#B5251E]/45 shadow-[inset_0_1px_0_rgba(241,240,236,0.06)] text-left">
                              <span className="inline-block bg-[#B5251E] text-white px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                Tradução Corporativa
                              </span>
                              <p className="font-display font-bold text-sm text-white uppercase mt-1.5 leading-snug">
                                {activeItem.corpTitle}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                            <div className="bg-[#35322B]/55 rounded-xl p-4 border-l-4 border-[#B5251E]">
                              <p className="text-[#F1F0EC]/90 text-editorial-justify">
                                <strong className="text-[#B5251E] font-display font-bold uppercase mr-1.5">
                                  Sem Técnica (No Automático):
                                </strong>
                                {activeItem.st}
                              </p>
                            </div>
                            <div className="bg-[#35322B]/55 rounded-xl p-4 border-l-4 border-emerald-500">
                              <p className="text-white text-editorial-justify">
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

                    <div className="px-1 flex items-center justify-between gap-3 text-xs text-[#F1F0EC]/70">
                      <span>Metodologia Aplicada • Eduardo Amaral (FGB)</span>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTacticalIndex(
                            (prev) => (prev + 1) % FIRST_RHYTHM_DATA.tacticalPillars.length
                          )
                        }
                        className="bg-[#B5251E] hover:bg-[#AA231C] text-white px-3.5 py-1.5 rounded font-semibold transition-colors duration-200 shadow-sm cursor-pointer shrink-0"
                      >
                        Próxima Fase →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BIOMECÂNICA DO BOXE */}
        <section id="biomecanica-boxe" className="relative bg-white text-[#26241F] py-20 sm:py-24 lg:py-28 border-t border-[#544F45]/15">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Título de Impacto (Topo) */}
            <div className="text-left space-y-3 max-w-3xl border-l-[3px] border-[#B5251E] pl-5 sm:pl-6">
              <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-[#B5251E]">
                Biomecânica do Boxe
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#26241F] uppercase tracking-tight leading-[1.08]">
                DOMINE A CIÊNCIA DO MOVIMENTO NO BOXE.
              </h2>
              <p className="text-base sm:text-lg text-[#544F45] leading-[1.7] text-editorial-justify">
                Aprenda a usar a anatomia do seu corpo a seu favor, onde quer que você esteja no Brasil.
              </p>
            </div>

            {/* O que você vai desenvolver */}
            <div className="space-y-6 text-left">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#544F45]">
                O QUE VOCÊ VAI DESENVOLVER
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-3d-light bg-[#F1F0EC] rounded-2xl p-6 sm:p-7 border border-[#544F45]/15 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label="Rotação">🔄</span>
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wide text-[#26241F]">
                      ROTAÇÃO E POTÊNCIA
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#544F45] leading-relaxed text-editorial-justify">
                    Entenda como girar o tronco corretamente para gerar força real, sem sobrecarregar os ombros ou as costas.
                  </p>
                </div>

                <div className="card-3d-light bg-[#F1F0EC] rounded-2xl p-6 sm:p-7 border border-[#544F45]/15 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label="Esquivas">🛡️</span>
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wide text-[#26241F]">
                      ESQUIVAS FLUIDAS
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#544F45] leading-relaxed text-editorial-justify">
                    Aprenda a sair da linha de golpe com leveza e agilidade, usando o centro de gravidade e não apenas a cintura.
                  </p>
                </div>

                <div className="card-3d-light bg-[#F1F0EC] rounded-2xl p-6 sm:p-7 border border-[#544F45]/15 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label="Base">🦶</span>
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wide text-[#26241F]">
                      BASE E DESLOCAMENTO
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#544F45] leading-relaxed text-editorial-justify">
                    Construa uma fundação sólida. Aprenda a se mover com equilíbrio, prontidão e economia de energia.
                  </p>
                </div>

                <div className="card-3d-light bg-[#F1F0EC] rounded-2xl p-6 sm:p-7 border border-[#544F45]/15 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label="Anatomia">⚡</span>
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wide text-[#26241F]">
                      ANATOMIA DO GOLPE
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#544F45] leading-relaxed text-editorial-justify">
                    Descubra como conectar pés, quadril, tronco e braço em um único movimento contínuo e devastador.
                  </p>
                </div>
              </div>
            </div>

            {/* Como Funciona */}
            <div className="card-3d-light bg-[#F1F0EC] rounded-2xl p-7 sm:p-9 border border-[#544F45]/15 space-y-3 text-left">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#B5251E]">
                COMO FUNCIONA
              </span>
              <p className="text-base sm:text-lg text-[#26241F] leading-relaxed text-editorial-justify">
                Não importa sua localização. Através de uma análise técnica detalhada e orientações práticas, eu te ajudo a corrigir vícios de movimento, destravar sua agilidade e aplicar a inteligência de 35 anos de ringue no seu treino diário.
              </p>
              <p className="text-base sm:text-lg font-bold text-[#B5251E] italic">
                Menos força bruta. Mais eficiência técnica.
              </p>
            </div>

            {/* Chamada para Ação */}
            <div className="pt-2 text-left">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium-crimson inline-flex items-center gap-3 text-white font-display font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg"
              >
                <span>QUERO APRENDER A TÉCNICA CORRETA</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: TREINO EXECUTIVO */}
        <section id="treino-executivo" className="bg-[#1C1A17] text-white py-20 sm:py-24 lg:py-28 border-t border-[#45413A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Título de Impacto (Topo) */}
            <div className="text-left space-y-4 max-w-4xl border-l-[3px] border-[#B5251E] pl-5 sm:pl-7">
              <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#B5251E]">
                TREINO EXECUTIVO EM GRAMADO/RS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] text-white uppercase tracking-tight leading-[1.12]">
                <span className="block drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">TREINE COM INTENSIDADE.</span>
                <span className="block text-[#B5251E] mt-1 drop-shadow-[0_4px_18px_rgba(181,37,30,0.35)]">EVOLUA COM PROPÓSITO.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#F1F0EC]/85 leading-[1.75] text-editorial-justify max-w-2xl pt-1">
                Treino presencial em Gramado/RS para empresários e profissionais que buscam saúde física, mental e alta performance.
              </p>
            </div>

            {/* O que você vai desenvolver */}
            <div className="space-y-6 text-left">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F1F0EC]/70">
                O QUE VOCÊ VAI DESENVOLVER
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="card-3d-dark rounded-2xl p-6 border border-[#544F45]/60 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label="Clareza">🧠</span>
                    <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-wide text-white">
                      CLAREZA MENTAL
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F1F0EC]/80 leading-relaxed text-editorial-justify">
                    Descarregue o estresse do dia a dia. O boxe é a válvula de escape perfeita para quem toma decisões o tempo todo.
                  </p>
                </div>

                <div className="card-3d-dark rounded-2xl p-6 border border-[#544F45]/60 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label="Agilidade">⚡</span>
                    <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-wide text-white">
                      AGILIDADE E COORDENAÇÃO
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F1F0EC]/80 leading-relaxed text-editorial-justify">
                    Reative reflexos que a rotina de escritório adormeceu. Movimentos precisos, rápidos e eficientes.
                  </p>
                </div>

                <div className="card-3d-dark rounded-2xl p-6 border border-[#544F45]/60 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label="Condicionamento">💪</span>
                    <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-wide text-white">
                      CONDICIONAMENTO COMPLETO
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F1F0EC]/80 leading-relaxed text-editorial-justify">
                    Trabalhe o corpo inteiro em uma única sessão. Força, resistência e flexibilidade sem impacto excessivo.
                  </p>
                </div>

                <div className="card-3d-dark rounded-2xl p-6 border border-[#544F45]/60 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label="Foco">🎯</span>
                    <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-wide text-white">
                      FOCO E DISCIPLINA
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F1F0EC]/80 leading-relaxed text-editorial-justify">
                    Cada treino é um exercício de concentração. Aprenda a estar 100% presente, no ringue e na vida.
                  </p>
                </div>

                <div className="card-3d-dark rounded-2xl p-6 border border-[#544F45]/60 space-y-3 md:col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label="Defesa">🛡️</span>
                    <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-wide text-white">
                      DEFESA PESSOAL REAL
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F1F0EC]/80 leading-relaxed text-editorial-justify">
                    Aprenda movimentos práticos de proteção que aumentam sua confiança e segurança no dia a dia.
                  </p>
                </div>
              </div>
            </div>

            {/* Para quem é este treino? + Onde e Como */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="card-3d-dark rounded-2xl p-7 border border-[#544F45]/60 space-y-3">
                <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#B5251E]">
                  PARA QUEM É ESTE TREINO?
                </span>
                <p className="text-sm sm:text-base text-[#F1F0EC]/90 leading-relaxed text-editorial-justify">
                  Para empresários, executivos e profissionais liberais que já têm uma vida intensa e buscam uma atividade física diferenciada, eficaz e que respeita seus limites.
                </p>
                <p className="text-sm sm:text-base font-bold text-white italic pt-1">
                  Não é para quem quer competir. É para quem quer viver melhor.
                </p>
              </div>

              <div className="card-3d-dark rounded-2xl p-7 border border-[#544F45]/60 space-y-3">
                <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#B5251E]">
                  ONDE E COMO
                </span>
                <div className="space-y-2 text-sm sm:text-base text-[#F1F0EC]/90">
                  <p><strong className="text-white">Local:</strong> Gramado/RS</p>
                  <p><strong className="text-white">Formato:</strong> Treinos individuais ou em pequenos grupos</p>
                  <p><strong className="text-white">Foco:</strong> Saúde, performance e bem-estar (sem pressão de competição)</p>
                </div>
              </div>
            </div>

            {/* Chamada para Ação */}
            <div className="pt-2 text-left">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium-crimson inline-flex items-center gap-3 text-white font-display font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg"
              >
                <span>QUERO AGENDAR MEU TREINO</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 7: ENCERRAMENTO & CONTATO — Faithful to Slides 12, 19, 26, 33, 40, 47 */}
        <section id="contato" className="relative overflow-hidden bg-[#35322B] text-white py-20 sm:py-24 lg:py-28 border-t border-[#45413A]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-[#B5251E]/[0.07] blur-3xl"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Faithful Closing Slide Card (Slides 12/19/26/33/40/47) */}
              <div className="card-3d-olive lg:col-span-6 rounded-3xl p-8 sm:p-12 border border-[#544F45]/65 flex flex-col items-center text-center space-y-8">
                <img
                  src="/logo-dark.svg"
                  alt="Eduardo Amaral — Mentorias e Boxe"
                  className="w-60 sm:w-80 h-auto"
                />

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
                  <div className="bg-white p-3.5 rounded-2xl shadow-[0_12px_28px_-6px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,1)] transition-transform duration-300 ease-out hover:scale-[1.03]">
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
                  <p className="text-sm sm:text-base text-[#F1F0EC]/85 leading-[1.7] max-w-[60ch] text-editorial-justify">
                    Preencha os dados abaixo para iniciar o atendimento direto pelo WhatsApp de{' '}
                    <strong>Eduardo Amaral</strong> e desenhar o formato ideal para sua empresa ou
                    liderança.
                  </p>
                </div>

                <form
                  onSubmit={handleContactSubmit}
                  className="surface-stage-dark rounded-3xl p-6 sm:p-8 border border-[#544F45]/75 space-y-4 text-left"
                >
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
                      className="w-full px-4 py-3 rounded-xl bg-[#35322B] border border-[#544F45] text-white placeholder-[#F1F0EC]/40 text-sm shadow-inner transition-colors duration-200 focus:border-[#B5251E] focus:outline-none"
                    />
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
                      className="w-full px-4 py-3 rounded-xl bg-[#35322B] border border-[#544F45] text-white text-sm shadow-inner transition-colors duration-200 focus:border-[#B5251E] focus:outline-none"
                    >
                      <option value="Vivências do Boxe">Vivências do Boxe</option>
                      <option value="Biomecânica do Boxe">Biomecânica do Boxe</option>
                      <option value="Treino Executivo">Treino Executivo</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold uppercase tracking-wider text-[#F1F0EC]/80 mb-1.5"
                    >
                      Enviar Mensagem (Opcional)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      maxLength={400}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Conte brevemente sobre o evento, tamanho da equipe ou objetivo..."
                      className="w-full px-4 py-3 rounded-xl bg-[#35322B] border border-[#544F45] text-white placeholder-[#F1F0EC]/40 text-sm shadow-inner transition-colors duration-200 focus:border-[#B5251E] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-premium-crimson w-full inline-flex items-center justify-center gap-2.5 text-white font-display font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-xl cursor-pointer"
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
        className="btn-premium-crimson fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 text-white font-display font-bold text-xs uppercase tracking-wider px-4 py-3.5 rounded-full border border-white/20"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">{MENTOR_DATA.phoneDisplay}</span>
      </a>
    </div>
  );
}
