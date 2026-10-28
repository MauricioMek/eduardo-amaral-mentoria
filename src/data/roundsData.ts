export type PillarType =
  | 'O INTERNO'
  | 'ESTRATÉGIA E PERFORMANCE'
  | 'RESILIÊNCIA E SUPERAÇÃO'
  | 'LIDERANÇA E RELACIONAMENTO'
  | 'PERCEPÇÃO E PRESENÇA'
  | 'A MAESTRIA';

export interface RoundItem {
  round: number;
  cycle: number;
  title: string;
  pillar: PillarType;
  question: string;
  fusion: {
    subtitle: string;
    description: string;
  };
  training: {
    subtitle: string;
    context: string;
    st: string;
    insight: string;
    ct: string;
  };
  legacy: string[];
}

export interface PillarInfo {
  id: PillarType;
  name: string;
  shortDesc: string;
  rounds: number[];
}

export const PILLARS: PillarInfo[] = [
  {
    id: 'O INTERNO',
    name: 'O Interno',
    shortDesc: 'Autodomínio, pausa antes da reação, responsabilidade sem drama, autocompaixão e superação da paralisia.',
    rounds: [1, 7, 13, 19, 25, 31],
  },
  {
    id: 'ESTRATÉGIA E PERFORMANCE',
    name: 'Estratégia e Performance',
    shortDesc: 'Gestão de energia e tempo, leitura em milissegundos, recuperação estratégica, criação de ângulos e propósito.',
    rounds: [2, 8, 14, 20, 26, 32],
  },
  {
    id: 'RESILIÊNCIA E SUPERAÇÃO',
    name: 'Resiliência e Superação',
    shortDesc: 'Levantar com presença, olhar firme após o impacto, aprender com a queda, sacrifício consciente e saber parar.',
    rounds: [3, 9, 15, 21, 27, 33],
  },
  {
    id: 'LIDERANÇA E RELACIONAMENTO',
    name: 'Liderança e Relacionamento',
    shortDesc: 'Escolher combates, corrigir com clareza, liderar pelo exemplo, inspirar pela humildade, respeito e escuta ativa.',
    rounds: [4, 10, 16, 22, 28, 34],
  },
  {
    id: 'PERCEPÇÃO E PRESENÇA',
    name: 'Percepção e Presença',
    shortDesc: 'Visão do todo, valorização do caminho, postura de confiança, respiração sob pressão, foco no agora e bússola interna.',
    rounds: [5, 11, 17, 23, 29, 35],
  },
  {
    id: 'A MAESTRIA',
    name: 'A Maestria',
    shortDesc: 'Constância invisível, valores inegociáveis, autocorreção sem plateia, limites com empatia, iniciativa e amor à forja.',
    rounds: [6, 12, 18, 24, 30, 36],
  },
];

export const WARMUP_DATA = {
  title: 'O AQUECIMENTO',
  leftColumn: {
    heading: 'UM ROUND DE EQUILÍBRIO',
    steps: [
      { label: 'PÉS EQUILIBRADOS', detail: 'Sinta a base firme no chão, distribuindo o peso com estabilidade.' },
      { label: 'OMBROS RELAXADOS', detail: 'Solte a tensão acumulada no pescoço e nos ombros.' },
      { label: 'RESPIREM FUNDO', detail: 'Traga oxigênio e reduza o ritmo acelerado do automático.' },
      { label: 'MÃOS LEVES', detail: 'Desfaça a rigidez antes do movimento; prontidão sem tensão.' },
      { label: 'OLHOS FECHADOS', detail: 'Silencie o ruído visual externo por alguns segundos.' },
      { label: 'MENTE PRESENTE', detail: 'Ancore sua atenção total no aqui e no agora.' },
    ],
  },
  rightColumn: {
    heading: 'TRANQUILIDADE / AGILIDADE',
    steps: [
      { label: 'PREPARANDO CORPO E MENTE', detail: 'Alinhamento integral antes de iniciar qualquer entrega.' },
      { label: 'EQUILÍBRIO ENTRE CALMA E VELOCIDADE', detail: 'A pressa é inimiga da potência; a serenidade gera rapidez limpa.' },
      { label: 'LUCIDEZ ENCONTRA A PRECISÃO', detail: 'Quando a mente desacelera, o gesto atinge o alvo exato.' },
      { label: 'RESPIRAR FUNDO', detail: 'O ar como regulador direto do estado emocional sob demanda.' },
      { label: 'MOVER-SE COM INTENÇÃO', detail: 'Nenhum passo desperdiçado; cada ação possui propósito claro.' },
      { label: 'PONTO DE EQUILÍBRIO ANTES DA AÇÃO', detail: 'A base construída antes do primeiro golpe define o resultado do round.' },
    ],
  },
};

export const FIRST_RHYTHM_DATA = {
  badge: 'CADÊNCIA, TÉCNICA E ALTA PERFORMANCE',
  title: 'DO RINGUE AO MUNDO CORPORATIVO',
  subtitle: '35 ANOS DE CONSTÂNCIA EM EQUILÍBRIO',
  points: [
    'O controle do ritmo impede reações no impulso em negociações e momentos críticos.',
    'Base firme e guarda alta preservam a clareza mental diante de crises e metas agressivas.',
    'O jab prepara o direto: processos bem executados sustentam grandes entregas.',
    'Energia estratégica: foco intenso no essencial supera horas de desgaste no automático.',
    'O minuto no corner: pausa consciente, escuta ativa e ajuste rápido de rota com a equipe.',
  ],
  tacticalPillars: [
    {
      id: 'centro',
      tag: 'FASE 01 • POSICIONAMENTO',
      ringTitle: 'Domínio do Centro do Ringue',
      corpTitle: 'Protagonismo e Presença Executiva',
      st: 'Ficar recuado nas cordas, apenas reagindo a urgências e apagando incêndios o dia inteiro.',
      ct: 'Assumir o centro com base firme, ditar a cadência das prioridades e conduzir reuniões com segurança.',
      metric: '+Clareza de Prioridades',
    },
    {
      id: 'guarda',
      tag: 'FASE 02 • AUTODOMÍNIO',
      ringTitle: 'Guarda Alta e Leitura de Distância',
      corpTitle: 'Inteligência Emocional sob Pressão',
      st: 'Expor o queixo ao responder críticas no calor da hora ou envolver-se em combates desnecessários.',
      ct: 'Absorver o impacto com serenidade, filtrar o que realmente importa e agir no tempo estratégico.',
      metric: '-Desgaste Emocional',
    },
    {
      id: 'combinacao',
      tag: 'FASE 03 • EXECUÇÃO',
      ringTitle: 'Precisão Técnica vs. Força Bruta',
      corpTitle: 'Produtividade Limpa e Direcionada',
      st: 'Disparar golpes sem mira por 2 horas seguidas, gerando exaustão física e baixo resultado real.',
      ct: 'Conectar fundamentos com intenção clara: menos ruído operacional e máxima eficiência na entrega.',
      metric: '+Performance Sustentável',
    },
    {
      id: 'corner',
      tag: 'FASE 04 • LIDERANÇA',
      ringTitle: 'O Intervalo Estratégico no Corner',
      corpTitle: 'Feedback Construtivo e Recuperação',
      st: 'Ignorar os sinais de fadiga da equipe e corrigir erros no grito, gerando tensão e paralisia.',
      ct: 'Orientar com clareza técnica em 60 segundos, recuperar o fôlego e voltar para o próximo round melhor.',
      metric: '+Engajamento e Longevidade',
    },
  ],
};

export const MENTOR_DATA = {
  name: 'EDUARDO AMARAL',
  role: 'Instrutor Técnico',
  organization: 'Federação Gaúcha de Boxe (FGB)',
  experience: '35 ANOS DE CONSTÂNCIA EM EQUILÍBRIO',
  headline: 'POR QUE ESTOU AQUI?',
  missionTitle: 'CONDUZINDO VIVÊNCIAS DE BOXE',
  missionSubtitle: 'E TRANSFORMANDO O RITMO CORPORATIVO EM ROUNDS MAIS LEVES.',
  callToAction: 'ENTÃO, VAMOS TREINAR?',
  closingGratitude: 'FELIZ PELO CARINHO DE TODOS. HONRADO EM COMPARTILHAR ESSE MOMENTO COM VOCÊS.',
  instagram: '@eduardoamaral.oficial',
  instagramUrl: 'https://www.instagram.com/eduardoamaral.oficial/',
  phoneDisplay: '(51) 98175-6704',
  whatsappNumber: '5551981756704',
};

export const ROUNDS_DATA: RoundItem[] = [
  {
    round: 1,
    cycle: 1,
    title: 'O SILÊNCIO ANTES DO GOLPE',
    pillar: 'O INTERNO',
    question: 'VOCÊ REAGE NO IMPULSO OU SABE ESPERAR O MOMENTO CERTO?',
    fusion: {
      subtitle: '“REAÇÃO NO CALOR DA HORA”',
      description:
        'Responder no calor do momento em situações de pressão gera desgaste desnecessário. A pausa estratégica preserva sua imagem e sua clareza mental.',
    },
    training: {
      subtitle: '“GUARDA ALTA, RESPIRAÇÃO FUNDA”',
      context: 'Levava um golpe e já disparava tudo na raiva, sem guarda.',
      st: 'ataca descontrolado, queixo exposto, sem base.',
      insight: 'A pausa trouxe clareza: absorva o impacto na guarda. Só contra-ataque no tempo certo.',
      ct: 'absorve o impacto na guarda, solta um contra-ataque limpo e controlado.',
    },
    legacy: [
      'O silêncio não é fraqueza.',
      'É a pausa estratégica que evita o impulso cego.',
      'Quem domina o silêncio, domina a própria reação.',
    ],
  },
  {
    round: 2,
    cycle: 1,
    title: 'GESTÃO DA ENERGIA E DO TEMPO',
    pillar: 'ESTRATÉGIA E PERFORMANCE',
    question: 'VOCÊ TERMINA O DIA EXAUSTO E COM A SENSAÇÃO DE QUE NÃO PRODUZIU O ESSENCIAL?',
    fusion: {
      subtitle: '“CORRERIA SEM FOCO”',
      description:
        'Tentar atender a todas as demandas simultaneamente leva ao esgotamento. Foco é priorizar o que realmente gera resultado.',
    },
    training: {
      subtitle: '“INTENSIDADE > DURAÇÃO”',
      context: 'Queria treinar 2 horas direto, sem pausa, no automático.',
      st: 'se move cansado, sem foco, apenas cumprindo horário.',
      insight: 'A orientação foi: 30 minutos com foco valem mais que 2 horas de movimento vazio.',
      ct: 'executa 30 minutos de alta intensidade com pausa estratégica e foco total.',
    },
    legacy: [
      'O tempo corre, mas o corpo não corre junto.',
      'A pausa conserva para usar no momento certo.',
      'Preservar seu combustível é estratégia, não preguiça.',
    ],
  },
  {
    round: 3,
    cycle: 1,
    title: 'LEVANTAR COM PRESENÇA, NÃO COM JUSTIFICATIVA',
    pillar: 'RESILIÊNCIA E SUPERAÇÃO',
    question: 'QUANDO ALGO NÃO SAI COMO PLANEJADO, VOCÊ BUSCA JUSTIFICATIVAS OU AJUSTA A ROTA?',
    fusion: {
      subtitle: '“ERROU E FICOU SE EXPLICANDO”',
      description:
        'Um projeto que não saiu como esperado não exige longas explicações, mas sim um ajuste rápido e confiante para a próxima entrega.',
    },
    training: {
      subtitle: '“LEVANTAR SEM TEATRO”',
      context: 'Caiu e ficou no chão se explicando com o parceiro.',
      st: 'fica no chão, olha para o lado, busca justificativa externa.',
      insight: 'A mensagem foi clara: levante, ajuste a guarda e volta pro centro.',
      ct: 'levanta imediatamente, ajusta a postura e retorne sem drama.',
    },
    legacy: [
      'A verdadeira vitória está em levantar sem pedir desculpas.',
      'Assumir a responsabilidade na ação é o que separa quem evolui de quem estagna.',
      'Servir de exemplo ao levantar é a maior lição que você pode dar.',
    ],
  },
  {
    round: 4,
    cycle: 1,
    title: 'ISSO NÃO É MEU COMBATE',
    pillar: 'LIDERANÇA E RELACIONAMENTO',
    question: 'VOCÊ GASTA ENERGIA EM SITUAÇÕES QUE FOGEM DO SEU CONTROLE?',
    fusion: {
      subtitle: '“ENERGIA DESPERDIÇADA”',
      description:
        'Envolver-se em questões que não são de sua alçada drena o foco e a energia que deveriam estar direcionados aos seus objetivos.',
    },
    training: {
      subtitle: '“ESCOLHENDO A LUTA”',
      context: 'Queria responder a toda provocação, saindo do plano.',
      st: 'se dispersa e perde o foco do treino.',
      insight: 'O entendimento veio: preserve sua energia. Nem todo golpe recebido precisa de resposta.',
      ct: 'guarda alta, ignora a provocação e foca no próprio objetivo.',
    },
    legacy: [
      'Preservar energia para a luta que importa é pura estratégia.',
      'Saber dizer "não" e manter o foco no seu objetivo é dignidade em ação.',
      'Nem todo desafio merece sua luva.',
    ],
  },
  {
    round: 5,
    cycle: 1,
    title: 'OLHAR QUE ENXERGA O TODO',
    pillar: 'PERCEPÇÃO E PRESENÇA',
    question: 'VOCÊ FICA FIXO NO DETALHE QUE DEU ERRADO OU CONSEGUE ENXERGAR O CONTEXTO GERAL?',
    fusion: {
      subtitle: '“VISÃO DE TÚNEL”',
      description:
        'Focar apenas em um ponto específico pode ofuscar a visão do progresso geral e das oportunidades ao redor.',
    },
    training: {
      subtitle: '“LEITURA DO COMBATE”',
      context: 'Travava olhando apenas para o punho do oponente.',
      st: 'fica tenso, olha fixo para um ponto e perde a visão do todo.',
      insight: 'A percepção mudou: quem vê só a luva, leva o golpe do quadril.',
      ct: 'relaxa o olhar, enxerga o corpo todo do oponente e antecipa o movimento.',
    },
    legacy: [
      'Maestria é ler o corpo inteiro e o contexto ao redor.',
      'O foco no detalhe é importante, mas sem a visão do todo, você se perde.',
      'Enxergar o todo traz a calma necessária para a melhor decisão.',
    ],
  },
  {
    round: 6,
    cycle: 1,
    title: 'A CONSTÂNCIA SEM PROMESSA DE VITÓRIA',
    pillar: 'A MAESTRIA',
    question: 'VOCÊ SÓ SE DEDICA QUANDO HÁ RECONHECIMENTO IMEDIATO OU HONRA O PROCESSO?',
    fusion: {
      subtitle: '“TREINO INVISÍVEL”',
      description:
        'Entregar excelência mesmo nos dias sem visibilidade é o que define o verdadeiro profissional e constrói reputação sólida.',
    },
    training: {
      subtitle: '“REPETIÇÃO SOLITÁRIA”',
      context: 'Só se dedicava quando havia luta à vista.',
      st: 'treina leve nos dias comuns, guardando energia só para o "show".',
      insight: 'O entendimento se firmou: a maestria nasce na repetição que ninguém pediu, mas que você escolheu.',
      ct: 'executa o fundamento com a mesma intensidade e compromisso, com ou sem plateia.',
    },
    legacy: [
      'A constância, mesmo sem promessa de vitória, é o verdadeiro treino que ninguém vê.',
      'Honrar o compromisso consigo mesmo nos dias difíceis forja um caráter inabalável.',
      'O processo silencioso é o maior legado que você pode deixar.',
    ],
  },
  {
    round: 7,
    cycle: 2,
    title: 'ASSUMIR O ERRO SEM DRAMATIZAÇÃO',
    pillar: 'O INTERNO',
    question: 'QUANDO SURGE UM OBSTÁCULO, VOCÊ PROCURA CULPADOS OU ASSUME A SOLUÇÃO?',
    fusion: {
      subtitle: '“ASSUMINDO A RESPONSABILIDADE”',
      description:
        'Atribuir dificuldades a fatores externos prolonga o desafio. Assumir a responsabilidade pela solução devolve o poder de ação.',
    },
    training: {
      subtitle: '“LEVANTAR SEM OLHAR PARA O INSTRUTOR”',
      context: 'Levava um golpe limpo e ficava olhando para o árbitro pedindo falta.',
      st: 'busca validação externa, espera que alguém resolva por ele.',
      insight: 'A orientação foi: leve o golpe, ajuste a guarda e volte pro centro.',
      ct: 'assume o impacto, não reclama e retoma a postura imediatamente.',
    },
    legacy: [
      'O erro não precisa de teatro, precisa de solução.',
      'Gastar energia procurando culpado é desperdício de fôlego.',
      'Assumir com simplicidade e seguir em frente é o verdadeiro equilíbrio.',
    ],
  },
  {
    round: 8,
    cycle: 2,
    title: 'A DECISÃO EM MILISSEGUNDOS',
    pillar: 'ESTRATÉGIA E PERFORMANCE',
    question: 'NA PRESSÃO DE UMA DECISÃO, VOCÊ REAGE NO AUTOMÁTICO OU USA A PAUSA ESTRATÉGICA?',
    fusion: {
      subtitle: '“PAUSA ESTRATÉGICA”',
      description:
        'Tomar decisões sob alta demanda e pressão, sem uma breve pausa para respirar, pode levar a escolhas precipitadas.',
    },
    training: {
      subtitle: '“CALMA NO CAOS”',
      context: 'Se desesperava e tentava devolver o golpe na mesma velocidade.',
      st: 'reage no impulso, perde a base e a clareza.',
      insight: 'A percepção mudou: a clareza em milissegundos vale mais que a pressa descontrolada.',
      ct: 'respira, lê o cenário em fração de segundo e escolhe a melhor resposta.',
    },
    legacy: [
      'A decisão em milissegundos não é pressa, é leitura.',
      'A vitória está em estar no tempo certo, com calma no caos.',
      'Treinar essa clareza transforma a pressão em precisão.',
    ],
  },
  {
    round: 9,
    cycle: 2,
    title: 'MANTER O OLHAR FIRME MESMO APÓS O GOLPE',
    pillar: 'RESILIÊNCIA E SUPERAÇÃO',
    question: 'APÓS RECEBER UM FEEDBACK DIFÍCIL, VOCÊ SE RECOLHE OU MANTÉM A POSTURA PROFISSIONAL?',
    fusion: {
      subtitle: '“POSTURA APÓS A QUEDA”',
      description:
        'Receber uma observação desafiadora e manter a serenidade transmite segurança, maturidade e abertura para o crescimento.',
    },
    training: {
      subtitle: '“OLHAR NO HORIZONTE”',
      context: 'Tomava um combo e desviava o olhar para o chão.',
      st: 'encolhe os ombros, perde a referência e a dignidade.',
      insight: 'A mensagem foi: mantenha o olhar firme. O corpo segue o que os olhos enxergam.',
      ct: 'mantém o queixo baixo e o olhar firme, mesmo após o impacto.',
    },
    legacy: [
      'Manter o olhar firme, mesmo após o golpe, mostra respeito e foco, não vergonha.',
      'A integridade na queda é o que prepara o seu retorno.',
      'O centro se mantém quando a postura não quebra.',
    ],
  },
  {
    round: 10,
    cycle: 2,
    title: 'CORRIGIR COM CLAREZA, NÃO COM AUTORIDADE',
    pillar: 'LIDERANÇA E RELACIONAMENTO',
    question: 'SUA FORMA DE ORIENTAR GERA APRENDIZADO OU APENAS RESISTÊNCIA?',
    fusion: {
      subtitle: '“FEEDBACK QUE CONSTRÓI”',
      description:
        'Apontar ajustes de forma construtiva e respeitosa fortalece a equipe e promove um ambiente de confiança mútua.',
    },
    training: {
      subtitle: '“PALAVRA QUE CONSTRÓI”',
      context: 'Errava o movimento e eu podia apenas gritar. Escolhi mostrar o ajuste técnico com calma.',
      st: 'corrigir com grito gera medo, tensão e erro repetido.',
      insight: 'A abordagem mudou: a palavra construtiva é técnica, aponta o erro e respeita a jornada.',
      ct: 'aponto o ajuste com clareza, e o atleta corrige o movimento com confiança.',
    },
    legacy: [
      'A palavra verdadeira constrói, enquanto a palavra vazia corrói a confiança.',
      'Corrigir com clareza e respeito é a base da evolução.',
      'Liderar é mostrar o caminho, não apenas apontar o erro.',
    ],
  },
  {
    round: 11,
    cycle: 2,
    title: 'OLHAR QUE VÊ O CAMINHO, NÃO SÓ O DESTINO',
    pillar: 'PERCEPÇÃO E PRESENÇA',
    question: 'VOCÊ ESTÁ TÃO FOCADO NO RESULTADO FINAL QUE ESQUECE DE VALORIZAR O PROCESSO?',
    fusion: {
      subtitle: '“RESPEITO AO PROCESSO”',
      description:
        'Valorizar as pequenas conquistas diárias da equipe é tão importante quanto o resultado final do projeto.',
    },
    training: {
      subtitle: '“O JAB PREPARA O DIRETO”',
      context: 'Queria pular etapas para chegar ao movimento complexo.',
      st: 'ignora a base, querendo o resultado final sem o processo.',
      insight: 'A consciência técnica despertou: o jab prepara, o direto conecta. O destino é consequência.',
      ct: 'respeita cada etapa, constrói a base e o resultado vem com qualidade.',
    },
    legacy: [
      'O olhar que vê o caminho honra cada passo da jornada.',
      'O destino final é apenas uma consequência natural de um processo bem executado.',
      'Respeitar as etapas é a verdadeira sabedoria.',
    ],
  },
  {
    round: 12,
    cycle: 2,
    title: 'INTEGRIDADE NOS VALORES PESSOAIS',
    pillar: 'A MAESTRIA',
    question: 'QUANDO A PRESSÃO AUMENTA, VOCÊ MANTÉM SUA ÉTICA OU BUSCA ATALHOS?',
    fusion: {
      subtitle: '“VALORES INEGOCIÁVEIS”',
      description:
        'Manter a integridade e os valores profissionais, mesmo sob pressão por resultados, é a marca de um líder inabalável.',
    },
    training: {
      subtitle: '“FIRMEZA NO CENTRO”',
      context: 'A tentação era usar um movimento para vencer, já que estava cansado.',
      st: 'força além do limite ético, buscando atalhos para a vitória.',
      insight: 'A consciência despertou: a verdadeira força está na clareza e integridade, não na vitória a qualquer custo.',
      ct: 'mantém a técnica limpa e a dignidade intacta, mesmo sob pressão.',
    },
    legacy: [
      'A integridade pessoal e os valores internos são fundamentais, mesmo sob pressão.',
      'Equilíbrio é a escolha diária de voltar ao centro, mantendo firmeza nos valores e flexibilidade nas formas.',
      'A coerência silenciosa é o maior legado que você pode deixar.',
    ],
  },
  {
    round: 13,
    cycle: 3,
    title: 'DISCIPLINA COM AUTOCOMPAIXÃO',
    pillar: 'O INTERNO',
    question: 'VOCÊ SE COBRA TANTO QUE A EXIGÊNCIA EXCESSIVA ESTÁ GERANDO CANSAÇO?',
    fusion: {
      subtitle: '“COBRANÇA EXCESSIVA”',
      description:
        'Buscar a perfeição em todas as entregas pode gerar bloqueio. A busca pela melhoria constante deixa sempre espaço para o aprendizado contínuo.',
    },
    training: {
      subtitle: '“TENSÃO X FLUIDEZ”',
      context: 'Ficava rígido de tanto querer acertar, perdendo a velocidade.',
      st: 'tensiona os ombros, trava a respiração e o movimento fica lento.',
      insight: 'A orientação foi: guarda alta e postura firme, mas com ombros relaxados e respiração fluida.',
      ct: 'solta a tensão desnecessária e o movimento volta a fluir com potência.',
    },
    legacy: [
      'A verdadeira resistência não é feita de rigidez, mas de equilíbrio.',
      'Forçar demais quebra, aliviar demais entrega o ponto.',
      'Disciplina com autocompaixão é a base da longevidade.',
    ],
  },
  {
    round: 14,
    cycle: 3,
    title: 'RECUPERAÇÃO COMO PARTE DA ESTRATÉGIA',
    pillar: 'ESTRATÉGIA E PERFORMANCE',
    question: 'VOCÊ CONSIDERA O DESCANSO UMA PERDA DE TEMPO OU PARTE DA ESTRATÉGIA?',
    fusion: {
      subtitle: '“MEDO DE PARAR”',
      description:
        'Cuidar da própria energia e fazer pausas reais é fundamental para manter a qualidade e a presença no trabalho.',
    },
    training: {
      subtitle: '“O RESET NO CANTO”',
      context: 'Queria ficar no saco de pancadas o tempo todo, sem beber água.',
      st: 'ignora os sinais do corpo, treinando até a falha total e sem qualidade.',
      insight: 'A percepção mudou: o corpo pede pausa, a mente vê estratégia.',
      ct: 'respeita o intervalo, recupera o fôlego e retorna o treino com qualidade.',
    },
    legacy: [
      'Parar não é desistir, é recarregar.',
      'A recuperação consciente é o que separa o amador do profissional.',
      'Respeitar o próprio limite é a maior estratégia de alta performance.',
    ],
  },
  {
    round: 15,
    cycle: 3,
    title: 'A DOR DA DERROTA COMO SEMENTE DE CLAREZA',
    pillar: 'RESILIÊNCIA E SUPERAÇÃO',
    question: 'VOCÊ ENCARA UM RESULTADO ABAIXO DO ESPERADO COMO FRACASSO OU COMO MAPA DE AJUSTE?',
    fusion: {
      subtitle: '“APRENDENDO COM A QUEDA”',
      description:
        'Um indicador que não atingiu a meta não é um fim, mas um dado valioso para refinar a estratégia.',
    },
    training: {
      subtitle: '“O MAPA DO PRÓXIMO ACERTO”',
      context: 'Após perder um sparring, o atleta queria culpar o equipamento ou o cansaço.',
      st: 'se vitimiza, reclama da sorte e não assume a responsabilidade.',
      insight: 'A reflexão trouxe: a dor da derrota revela exatamente onde a técnica precisa evoluir.',
      ct: 'analisa friamente o erro e transforma a frustração em foco técnico.',
    },
    legacy: [
      'O fracasso não é uma identidade, é apenas um dado.',
      'Quem confunde o erro com quem ele é, nunca evolui.',
      'A derrota bem analisada é o mapa mais preciso para a próxima vitória.',
    ],
  },
  {
    round: 16,
    cycle: 3,
    title: 'LIDERAR PELO EXEMPLO DIÁRIO',
    pillar: 'LIDERANÇA E RELACIONAMENTO',
    question: 'AS PESSOAS AO SEU REDOR TE SEGUEM PELA SUA POSTURA OU APENAS PELA SUA POSIÇÃO?',
    fusion: {
      subtitle: '“PRESENÇA QUE INSPIRA”',
      description:
        'A coerência entre o que se fala e o que se pratica é o que constrói respeito genuíno na equipe.',
    },
    training: {
      subtitle: '“ESPELHO NO RINGUE”',
      context: 'Reclamava que o parceiro não seguia o ritmo, mas ele mesmo estava desanimado.',
      st: 'cobra o outro, mas ele mesmo está com a energia baixa sem postura.',
      insight: 'A constatação foi: a verdadeira liderança é baseada em presença que inspira.',
      ct: 'ele muda a própria energia, ajusta a base e o parceiro acompanha naturalmente.',
    },
    legacy: [
      'Ninguém segue um discurso que a prática desmente.',
      'A autoridade real nasce da coerência entre o que se fala e o que se faz.',
      'Seja o exemplo que você gostaria de ter ao seu lado.',
    ],
  },
  {
    round: 17,
    cycle: 3,
    title: 'A POSTURA QUE COMUNICA CONFIANÇA',
    pillar: 'PERCEPÇÃO E PRESENÇA',
    question: 'MESMO CANSADO, SUA POSTURA COMUNICA CONFIANÇA OU DESÂNIMO?',
    fusion: {
      subtitle: '“LINGUAGEM CORPORAL”',
      description:
        'Manter a postura ereta e o olhar presente, mesmo ao final de um longo dia, transmite liderança e profissionalismo.',
    },
    training: {
      subtitle: '“GUARDA E OLHAR”',
      context: 'No final do treino, o atleta deixava os braços caírem e o olhar no chão.',
      st: 'postura curvada, comunicando fraqueza e desistência.',
      insight: 'A orientação foi: queixo levemente baixo, ombros relaxados e olhar firme. O corpo fala antes da boca.',
      ct: 'mantém a postura ereta e a confiança serena até o último segundo do round.',
    },
    legacy: [
      'O corpo comunica sua intenção antes de você abrir a boca.',
      'Manter a postura ereta no cansaço é um ato de respeito consigo e com o outro.',
      'A confiança serena é a armadura mais forte que você pode vestir.',
    ],
  },
  {
    round: 18,
    cycle: 3,
    title: 'O ERRO QUE VOCÊ CORRIGE SOZINHO',
    pillar: 'A MAESTRIA',
    question: 'VOCÊ FAZ O EXCELENTE APENAS QUANDO ESTÁ SENDO OBSERVADO?',
    fusion: {
      subtitle: '“COMPROMISSO INVISÍVEL”',
      description:
        'A verdadeira maestria profissional acontece na preparação silenciosa e no cuidado com os detalhes, mesmo sem supervisão.',
    },
    training: {
      subtitle: '“REPETIÇÃO SEM PLATEIA”',
      context: 'Fazia os fundamentos perfeitamente só quando eu estava observando.',
      st: 'executa bem apenas sob fiscalização, buscando aplausos.',
      insight: 'A mensagem foi: a maestria nasce na repetição solitária que ninguém pediu, mas que você escolheu.',
      ct: 'revisa e executa o movimento por padrão próprio, sem necessidade de plateia.',
    },
    legacy: [
      'A constância nos bastidores forja o caráter que ninguém pode tirar.',
      'Fazer o certo sem esperar reconhecimento é a marca da verdadeira maestria.',
      'O processo silencioso é o que sustenta os grandes resultados.',
    ],
  },
  {
    round: 19,
    cycle: 4,
    title: 'O MEDO DE ERRAR / O JAB QUE CONGELA',
    pillar: 'O INTERNO',
    question: 'VOCÊ JÁ DEIXOU DE PARTICIPAR POR MEDO DE NÃO TER A RESPOSTA PERFEITA?',
    fusion: {
      subtitle: '“PARALISIA POR ANÁLISE”',
      description:
        'O medo de não saber tudo pode paralisar. A segurança vem de saber que o aprendizado é uma jornada contínua.',
    },
    training: {
      subtitle: '“O JAB QUE CONGELA”',
      context: 'Travava na hora de soltar o primeiro golpe, esperando o momento perfeito.',
      st: 'fica paralisado, com os músculos tensos, sem iniciar o movimento.',
      insight: 'A pausa trouxe clareza: o golpe não precisa ser perfeito, precisa ser seu. O corpo obedece quando a mente para de duvidar.',
      ct: 'solta o movimento com fluidez, aceitando a imperfeição.',
    },
    legacy: [
      'O medo de errar é apenas a mente tentando te proteger de um fantasma.',
      'A ação, mesmo com dúvida, quebra a paralisia.',
      'Mover-se é a única forma de descobrir o caminho verdadeiro.',
    ],
  },
  {
    round: 20,
    cycle: 4,
    title: 'A FINTA MENTAL: CRIAR ESPAÇO',
    pillar: 'ESTRATÉGIA E PERFORMANCE',
    question: 'VOCÊ INSISTE EM UMA ABORDAGEM QUE NÃO ESTÁ FUNCIONANDO OU BUSCA NOVAS PERSPECTIVAS?',
    fusion: {
      subtitle: '“INSISTÊNCIA NO ERRADO”',
      description:
        'Adaptar a estratégia quando os resultados não aparecem é um sinal de inteligência e flexibilidade profissional.',
    },
    training: {
      subtitle: '“CRIANDO O ÂNGULO”',
      context: 'Insistia em atacar pela frente contra um oponente maior e mais forte.',
      st: 'bate de frente, gasta energia e não gera resultado.',
      insight: 'A percepção mudou: você desvia, cria o ângulo e ataca onde não esperam.',
      ct: 'finta, muda o ângulo de ataque e encontra o espaço vazio.',
    },
    legacy: [
      'A finta mental nos liberta da teimosia.',
      'Criar espaço não é desistir do objetivo, é encontrar a rota mais inteligente para alcançá-lo.',
      'A inteligência sempre supera a força bruta.',
    ],
  },
  {
    round: 21,
    cycle: 4,
    title: 'O CORTE DE PESO: SACRIFÍCIO CONSCIENTE',
    pillar: 'RESILIÊNCIA E SUPERAÇÃO',
    question: 'VOCÊ ESTÁ DISPOSTO A ABRIR MÃO DO CONFORTO IMEDIATO PELO RESULTADO A LONGO PRAZO?',
    fusion: {
      subtitle: '“ESCOLHA DIFÍCIL”',
      description:
        'Investir tempo no planejamento e na organização hoje garante entregas mais fluidas e menos estressantes amanhã.',
    },
    training: {
      subtitle: '“DISCIPLINA FORA DO RINGUE”',
      context: 'Queria comer o que não devia na véspera da pesagem, buscando alívio imediato.',
      st: 'busca conforto imediato, sabotando o objetivo maior.',
      insight: 'A clareza veio: o sacrifício de hoje compra a liberdade de amanhã.',
      ct: 'aceita o desconforto temporário como preço estratégico da conquista.',
    },
    legacy: [
      'O corte de peso ensina que nem todo desejo precisa ser atendido agora.',
      'O sacrifício consciente é a prova de que você controla seus impulsos, e não o contrário.',
      'A recompensa real sempre vale a espera.',
    ],
  },
  {
    round: 22,
    cycle: 4,
    title: 'INSPIRAR PELA HUMILDADE, NÃO PELO EGO',
    pillar: 'LIDERANÇA E RELACIONAMENTO',
    question: 'SUA LIDERANÇA PRECISA SE IMPOR PELA VOZ ALTA OU PELA PRESENÇA SERENA?',
    fusion: {
      subtitle: '“NECESSIDADE DE APROVAÇÃO”',
      description:
        'A autoridade verdadeira é construída através da competência, do respeito e da calma, não do volume da voz.',
    },
    training: {
      subtitle: '“O ATLETA SILENCIOSO”',
      context: 'Comemorava exageradamente cada pequeno acerto, buscando aplausos.',
      st: 'fala alto, busca plateia e precisa de validação externa.',
      insight: 'A constatação foi: a força de verdade se manifesta na quietude do esforço contínuo, sem anúncios.',
      ct: 'deixa a técnica ser sua única voz, sem necessidade de anúncio.',
    },
    legacy: [
      'O ego precisa de plateia, a humildade precisa de propósito.',
      'Liderar sem ego é permitir que o trabalho brilhe mais do que o seu nome.',
      'O silêncio da excelência é ensurdecedor.',
    ],
  },
  {
    round: 23,
    cycle: 4,
    title: 'A RESPIRAÇÃO QUE PRECEDE A PRESSÃO',
    pillar: 'PERCEPÇÃO E PRESENÇA',
    question: 'NA HORA DA PRESSÃO, SUA RESPIRAÇÃO TRAVA OU VOCÊ USA O AR PARA MANTER O CONTROLE?',
    fusion: {
      subtitle: '“CAOS E SUFOCO”',
      description:
        'Em reuniões ou situações delicadas, uma respiração consciente é a ferramenta mais rápida para recuperar a clareza mental.',
    },
    training: {
      subtitle: '“AR COMO FERRAMENTA”',
      context: 'Prendia a respiração ao receber pressão, ficando rígido e lento.',
      st: 'fica tenso, lento e o pânico toma conta do corpo.',
      insight: 'A orientação foi: respirar é a primeira vitória da mente sobre o pânico.',
      ct: 'solta o ar no momento do impacto, mantendo a fluidez e o controle.',
    },
    legacy: [
      'A respiração é o controle remoto do seu sistema nervoso.',
      'No caos, quem domina o ar, domina a situação.',
      'A serenidade no presente é a maior vantagem competitiva.',
    ],
  },
  {
    round: 24,
    cycle: 4,
    title: 'GUARDA FIRME, CORAÇÃO ABERTO',
    pillar: 'A MAESTRIA',
    question: 'VOCÊ SE FECHA DIANTE DE DIVERGÊNCIAS OU ESTABELECE LIMITES COM EMPATIA?',
    fusion: {
      subtitle: '“MUROS EM VEZ DE PONTES”',
      description:
        'É possível ser firme em suas convicções profissionais e, ao mesmo tempo, manter a cordialidade e o respeito no ambiente.',
    },
    training: {
      subtitle: '“DEFESA SEM RIGIDEZ”',
      context: 'Ficava tão tenso na defesa que não conseguia contra-atacar, travado pelo medo.',
      st: 'se fecha, fica agressivo e perde a conexão com o combate.',
      insight: 'A mensagem foi: mantenha a guarda alta, mas com o coração aberto e os músculos relaxados.',
      ct: 'estabelece limites claros na defesa, mas mantém a empatia e a fluidez.',
    },
    legacy: [
      'Estabelecer limites não significa construir muros.',
      'A verdadeira força permite que você se proteja do golpe sem perder a conexão com o outro.',
      'Limites claros são dignidade em ação.',
    ],
  },
  {
    round: 25,
    cycle: 5,
    title: 'IMPULSO CEGO: ATAQUE SEM GUARDA',
    pillar: 'O INTERNO',
    question: 'VOCÊ DECIDE NO CALOR DO MOMENTO E DEPOIS PERCEBE QUE SE EXPÔS DESNECESSARIAMENTE?',
    fusion: {
      subtitle: '“REAÇÃO SEM PROTEÇÃO”',
      description:
        'Responder a críticas ou cobranças de forma imediata e emocional pode escalar situações que seriam resolvidas com calma.',
    },
    training: {
      subtitle: '“FORÇA COM CONTROLE”',
      context: 'Soltava um direto com toda a força, mas deixava o queixo totalmente descoberto.',
      st: 'ataca com força bruta, queixo exposto, totalmente vulnerável.',
      insight: 'A percepção mudou: a mão pode ir longe, mas a guarda precisa estar no lugar.',
      ct: 'mantém a guarda colada ao rosto, atacando com controle e proteção.',
    },
    legacy: [
      'O impulso cego queima pontes e expõe vulnerabilidades.',
      'Agir com estratégia, e não com raiva, preserva sua integridade.',
      'A verdadeira força mantém a guarda alta, mesmo no momento do ataque.',
    ],
  },
  {
    round: 26,
    cycle: 5,
    title: 'O RINGUE COMO TERRITÓRIO',
    pillar: 'ESTRATÉGIA E PERFORMANCE',
    question: 'VOCÊ SABE OCUPAR SEU ESPAÇO COM PRESENÇA OU FICA RECUADO EM REUNIÕES?',
    fusion: {
      subtitle: '“OCUPAÇÃO DE ESPAÇO”',
      description:
        'Contribuir com suas ideias e experiências em reuniões enriquece o coletivo e valoriza sua expertise.',
    },
    training: {
      subtitle: '“DOMÍNIO DO CENTRO”',
      context: 'Preso nas cordas, cedendo terreno a cada investida do oponente.',
      st: 'recua sem motivo, perde a base e entrega a luta.',
      insight: 'A orientação foi: ocupe o centro do ringue com dignidade.',
      ct: 'firma a base, ocupa o centro e passa a ditar o ritmo do combate.',
    },
    legacy: [
      'Ocupar seu lugar não é arrogância, é respeito pelo seu próprio valor.',
      'Quem recua demais, perde a capacidade de responder.',
      'A presença firme no seu território é o primeiro passo para qualquer vitória.',
    ],
  },
  {
    round: 27,
    cycle: 5,
    title: 'O NOCAUTE TÉCNICO: A SABEDORIA DE SABER PARAR',
    pillar: 'RESILIÊNCIA E SUPERAÇÃO',
    question: 'VOCÊ INSISTE EM UM PROJETO QUE JÁ MOSTROU LIMITAÇÕES OU SABE REAVALIAR O CAMINHO?',
    fusion: {
      subtitle: '“INSISTÊNCIA PREJUDICIAL”',
      description:
        'Reconhecer quando uma estratégia precisa ser reformulada é um ato de coragem e sabedoria, não de fraqueza.',
    },
    training: {
      subtitle: '“PROTEÇÃO DA LONGEVIDADE”',
      context: 'Insistia em continuar um treino muito pesado, mesmo com uma lesão leve se agravando.',
      st: 'força além do limite, ignorando os sinais de alerta do corpo.',
      insight: 'A interrupção trouxe o aprendizado: proteger seu futuro é mais importante que vencer um round.',
      ct: 'reconhece o limite, ajusta a carga e preserva a longevidade.',
    },
    legacy: [
      'Saber parar exige mais coragem do que insistir no erro.',
      'A longevidade da sua carreira e da sua vida depende dessa escolha consciente.',
      'A verdadeira resiliência sabe quando é hora de baixar os braços para se recuperar.',
    ],
  },
  {
    round: 28,
    cycle: 5,
    title: 'O RESPEITO NO APERTO DE MÃO FINAL',
    pillar: 'LIDERANÇA E RELACIONAMENTO',
    question: 'APÓS UMA DISCUSSÃO ACALORADA, VOCÊ MANTÉM A INTEGRIDADE OU GUARDA RANCOR?',
    fusion: {
      subtitle: '“ENCERRAMENTO COM DIGNIDADE”',
      description:
        'Seguir em frente com profissionalismo e respeito, mesmo após divergências, fortalece o ambiente para todos.',
    },
    training: {
      subtitle: '“HONRA APÓS O COMBATE”',
      context: 'Dois atletas trocavam golpes pesados.',
      st: 'termina o combate de mau humor, carregando a raiva.',
      insight: 'A consciência despertou: o aperto de mão não é formalidade, é o selo de dignidade aplicado ao encerramento.',
      ct: 'ao soar o sino, se abraçam e se cumprimentam com respeito mútuo.',
    },
    legacy: [
      'A forma como você termina define como será lembrado.',
      'Manter a integridade no encerramento é a prova final de caráter.',
      'O respeito mútuo transforma qualquer conflito em aprendizado.',
    ],
  },
  {
    round: 29,
    cycle: 5,
    title: 'PRESENÇA NO AGORA, NÃO ANSIEDADE PELO FUTURO',
    pillar: 'PERCEPÇÃO E PRESENÇA',
    question: 'SUA MENTE ESTÁ ANSIOSA PELO FINAL DO MÊS OU PRESENTE NA TAREFA DE HOJE?',
    fusion: {
      subtitle: '“FOCO NO PRESENTE”',
      description:
        'Preocupar-se excessivamente com os resultados futuros pode roubar a energia e a conexão necessárias para a entrega do presente.',
    },
    training: {
      subtitle: '“OLHAR NO PRESENTE”',
      context: 'Se distraía pensando no resultado da luta antes mesmo de ela começar.',
      st: 'mente ansiosa, olha para os lados, perde o ritmo do agora.',
      insight: 'A pausa trouxe clareza: o único round que importa é este. Esqueça o placar e foque no próximo movimento.',
      ct: 'ancora a mente no presente, relaxa os ombros e executa o movimento atual.',
    },
    legacy: [
      'A ansiedade pelo futuro rouba a energia do presente.',
      'Estar verdadeiramente presente é a única forma de executar com clareza no caos.',
      'O agora é o único momento onde você tem o poder real de agir.',
    ],
  },
  {
    round: 30,
    cycle: 5,
    title: 'O SINO DA RESPONSABILIDADE',
    pillar: 'A MAESTRIA',
    question: 'VOCÊ ESPERA QUE OUTROS RESOLVAM PROBLEMAS RECORRENTES OU TOMA A INICIATIVA?',
    fusion: {
      subtitle: '“ASSUMINDO A FRENTE”',
      description:
        'Identificar uma oportunidade de melhoria e dar o primeiro passo para resolvê-la demonstra proatividade e cuidado com a organização.',
    },
    training: {
      subtitle: '“FECHANDO A DISTÂNCIA”',
      context: 'Cansado abraçava o oponente, esperando o árbitro ou o treinador gritar "separem" para descansar.',
      st: 'se apoia no oponente, esperando ordens externas para se soltar.',
      insight: 'A mensagem foi: a verdadeira maestria é ter a disciplina de se soltar e reajustar a base por conta própria, sem esperar o apito.',
      ct: 'se desvencilha sozinho, recupera a postura e volta a lutar com autonomia.',
    },
    legacy: [
      'Todo problema ignorado é um espaço vazio esperando alguém.',
      'Quem espera ordens, permanece no banco.',
      'Quem dá o passo à frente, transforma o vazio.',
    ],
  },
  {
    round: 31,
    cycle: 6,
    title: 'O CANSAÇO QUE VOCÊ NÃO MOSTRA',
    pillar: 'O INTERNO',
    question: 'VOCÊ FAZ DO SEU CANSAÇO UM MOTIVO DE RECLAMAÇÃO OU AJUSTA O RITMO COM DIGNIDADE?',
    fusion: {
      subtitle: '“DISCIPLINA SILENCIOSA”',
      description:
        'Reconhecer o cansaço é humano, mas escolher manter a postura e a qualidade do trabalho é um ato de profissionalismo.',
    },
    training: {
      subtitle: '“POSTURA NO DESGASTE”',
      context: 'Reclamava alto a cada round, buscando pena ou uma pausa do treinador.',
      st: 'faz do desgaste um espetáculo, buscando alívio externo.',
      insight: 'A orientação foi: sentir o cansaço é normal, mas a postura ereta é uma escolha.',
      ct: 'respira fundo, ajusta a base e mantém a técnica até o fim, em silêncio.',
    },
    legacy: [
      'A dor do esforço repetido não quebra, ela ensina onde você está forçando demais ou cuidando de menos.',
      'A verdadeira força se manifesta no esforço, sem anúncios.',
      'Seguir com dignidade, mesmo cansado, é a maior prova de caráter.',
    ],
  },
  {
    round: 32,
    cycle: 6,
    title: 'CLAREZA DE PROPÓSITO, NÃO SÓ DE META',
    pillar: 'ESTRATÉGIA E PERFORMANCE',
    question: 'VOCÊ ESTÁ CORRENDO ATRÁS DE NÚMEROS OU FOCADO NA QUALIDADE REAL DO TRABALHO?',
    fusion: {
      subtitle: '“FOCO NO PROCESSO”',
      description:
        'Quando o foco está no processo bem feito e no cuidado com as pessoas, os bons resultados tornam-se uma consequência natural.',
    },
    training: {
      subtitle: '“ALÉM DO BARULHO”',
      context: 'Só queria bater com força, buscando o barulho alto.',
      st: 'bate com força bruta, sem ritmo, ignorando a forma correta.',
      insight: 'A percepção mudou: o foco é quem você se torna, não o barulho que faz.',
      ct: 'executa cada golpe com precisão, valorizando a técnica acima da força.',
    },
    legacy: [
      'A meta é apenas um destino no mapa, o propósito é o combustível da jornada.',
      'Correr sem sentido gera exaustão, não excelência.',
      'Alinhar o propósito transforma a obrigação diária em uma missão com significado.',
    ],
  },
  {
    round: 33,
    cycle: 6,
    title: 'RETOMAR O PLANO SEM DRAMA',
    pillar: 'RESILIÊNCIA E SUPERAÇÃO',
    question: 'QUANDO O IMPREVISTO ACONTECE, VOCÊ GERA DRAMA OU AJUSTA A ROTA COM SERENIDADE?',
    fusion: {
      subtitle: '“AJUSTE SEM TEATRO”',
      description:
        'Diante de mudanças de última hora, a calma e a capacidade de adaptação são as maiores aliadas do profissional.',
    },
    training: {
      subtitle: '“REAÇÃO AO IMPREVISTO”',
      context: 'Um golpe surpresa desequilibrou o atleta, que ficou parado reclamando.',
      st: 'faz drama, reclama da situação e perde o foco da solução.',
      insight: 'A pausa trouxe clareza: o golpe veio, a consciência reconheceu, o corpo ajustou. Sem teatro, apenas execução.',
      ct: 'recupera o equilíbrio e retoma a estratégia em segundos.',
    },
    legacy: [
      'O drama consome a energia que deveria ser usada na solução.',
      'Reconhecer o erro e ajustar a rota imediatamente é a marca de quem está no controle.',
      'A execução silenciosa vale mais que mil justificativas barulhentas.',
    ],
  },
  {
    round: 34,
    cycle: 6,
    title: 'ESCUTAR MAIS DO QUE FALAR',
    pillar: 'LIDERANÇA E RELACIONAMENTO',
    question: 'VOCÊ INTERROMPE PARA DAR SUA OPINIÃO OU SILENCIA PARA REALMENTE COMPREENDER?',
    fusion: {
      subtitle: '“ESCUTA ATIVA”',
      description:
        'Ouvir atentamente as colocações de colegas antes de responder constrói pontes e soluções mais eficazes.',
    },
    training: {
      subtitle: '“SILÊNCIO NO CORNER”',
      context: 'Durante a explicação de uma combinação, o atleta já queria sair executando, interrompendo a instrução.',
      st: 'interrompe, impõe sua ideia e não absorve a instrução.',
      insight: 'A orientação foi: observe. A técnica se aprende com os olhos e o corpo.',
      ct: 'silencia, observa a demonstração completa e executa com precisão.',
    },
    legacy: [
      'Falar preenche o ambiente, mas escutar preenche a mente de entendimento.',
      'A palavra verdadeira constrói, mas só quando nasce de uma escuta genuína.',
      'Liderar pela escuta é a forma mais alta de respeito e inteligência emocional.',
    ],
  },
  {
    round: 35,
    cycle: 6,
    title: 'OLHAR QUE RETORNA A SI MESMO',
    pillar: 'PERCEPÇÃO E PRESENÇA',
    question: 'VOCÊ BUSCA APROVAÇÃO CONSTANTE OU CONFIA NA SUA EXPERIÊNCIA E INTUIÇÃO?',
    fusion: {
      subtitle: '“BÚSSOLA INTERNA”',
      description:
        'Confiar na sua formação e no seu julgamento profissional traz segurança e autenticidade para a sua atuação.',
    },
    training: {
      subtitle: '“CONFIANÇA NO PRÓPRIO RITMO”',
      context: 'Olhava para a plateia ou para o treinador buscando aprovação a cada golpe.',
      st: 'muda o ritmo para agradar, perdendo a própria identidade e base.',
      insight: 'A percepção mudou: a autopercepção constante mantém o equilíbrio, sem absorver a expectativa alheia.',
      ct: 'fecha o foco em si mesmo, confiando na sua própria bússola interna.',
    },
    legacy: [
      'Buscar validação externa é entregar o controle da sua vida a estranhos.',
      'Manter a guarda emocional alta, sem carregar o peso alheio, é dignidade em ação.',
      'A conexão verdadeira começa quando você não precisa se anular para agradar.',
    ],
  },
  {
    round: 36,
    cycle: 6,
    title: 'A DOR DO ESFORÇO REPETIDO COMO FORJA',
    pillar: 'A MAESTRIA',
    question: 'VOCÊ VÊ AS TAREFAS REPETITIVAS COMO UM FARDO OU COMO A BASE DA SUA EXCELÊNCIA?',
    fusion: {
      subtitle: '“AMOR À FORJA”',
      description:
        'A consistência na execução, no planejamento e na rotina é o alicerce silencioso que sustenta o sucesso profissional.',
    },
    training: {
      subtitle: '“A FORJA DO JAB”',
      context: 'Reclamava do desconforto a cada repetição, querendo trocar de exercício.',
      st: 'faz o movimento de qualquer jeito, buscando apenas acabar logo.',
      insight: 'A compreensão veio: essa dor não é castigo, é o músculo virando aço. É a forja.',
      ct: 'abraça o desconforto, mantém a forma perfeita e sente o golpe ficar mais sólido.',
    },
    legacy: [
      'A dor da derrota e do esforço repetido são mestres que forjam sabedoria.',
      'O verdadeiro treino acontece nos dias sem vontade, baseado em promessas feitas a si mesmo.',
      'O processo silencioso é o único legado que ninguém pode tirar de você.',
    ],
  },
];

export const CORPORATE_DIAGNOSTICS = [
  {
    id: 'pressao',
    label: 'Reações impulsivas sob pressão',
    desc: 'Equipes que respondem no calor do momento e perdem clareza em reuniões críticas.',
    recommendedRounds: [1, 8, 23, 25],
  },
  {
    id: 'exaustao',
    label: 'Exaustão e correria sem foco',
    desc: 'Sensação de trabalhar o dia inteiro no automático sem produzir o essencial.',
    recommendedRounds: [2, 13, 14, 32],
  },
  {
    id: 'lideranca',
    label: 'Alinhamento de liderança e feedback',
    desc: 'Comunicação ruidosa, dificuldade de receber críticas ou liderar pelo exemplo.',
    recommendedRounds: [9, 10, 16, 22, 34],
  },
  {
    id: 'resiliencia',
    label: 'Desânimo diante de imprevistos ou metas',
    desc: 'Busca por justificativas externas quando um projeto exige ajuste rápido de rota.',
    recommendedRounds: [3, 7, 15, 20, 33],
  },
  {
    id: 'constancia',
    label: 'Disciplina, autonomia e excelência nos bastidores',
    desc: 'Construir cultura de responsabilidade e qualidade mesmo quando ninguém está olhando.',
    recommendedRounds: [6, 12, 18, 30, 36],
  },
];
