export const profile = {
  name: "Wendrel Oliveira",
  roles: ["Engenharia de Software", "Produtos Digitais", "Automação & IA"],
  headline: ["Eu aprendo construindo.", "E construo para resolver problemas reais."],
  subtitle:
    "Engenharia de Software aplicada a produtos digitais, automação e experiências web — de MVPs multidisciplinares a entregas reais para empresas.",
  formation: "Cursando Engenharia de Software — Univassouras",
  location: "Brasil",
  email: "oliveirawendrel767@gmail.com",
  whatsapp: "https://wa.me/5524993134210",
  linkedin: "https://www.linkedin.com/in/wendrel-oliveira",
  github: "https://github.com/wendreloliveira",
  instagram: "https://www.instagram.com/heeywl/",
};

export const stats = [
  { value: 5, suffix: "", label: "projetos em construção ou entregues" },
  { value: 1, suffix: "", label: "projeto real entregue para empresa" },
  { value: 1, suffix: "", label: "hackathon com prototipação sob pressão" },
  { value: 6, suffix: " meses", label: "de pesquisa aplicada (PIEMP/CNPq)" },
];

// Estrutura de mídia comum a todo projeto — populada quando screenshots reais chegarem.
// Nenhum campo aqui deve receber mockup ou interface fictícia.
const emptyMedia = () => ({
  cover: null,
  desktop: [],
  mobile: [],
  details: [],
  video: null,
});

// Projetos em destaque — todos usam o mesmo ProjectCase (design system
// único); a identidade de cada um vem dos screenshots, da copy, do status
// e da stack, não de uma estrutura de layout diferente.
export const featuredProjects = [
  {
    slug: "empregaai",
    order: 4,
    title: "EmpregaAI",
    category: "Produto digital • Empregabilidade",
    tagline:
      "Plataforma de empregabilidade em desenvolvimento para conectar pessoas, oportunidades e caminhos de evolução profissional.",
    accent: "blue",
    status: "Em desenvolvimento",
    statusColor: "blue",
    context:
      "O EmpregaAI está sendo desenvolvido no contexto do PIEMP por uma equipe multidisciplinar de Engenharia de Software e Gestão Pública, com orientação de um professor mentor da área de Ciência da Computação — pensado como uma plataforma para aproximar cidadãos, empresas e oportunidades reais de trabalho.",
    problem:
      "Candidatos têm dificuldade para traduzir habilidades reais em oportunidades compatíveis, e processos de seleção carecem de um vocabulário estruturado para comparar perfil e vaga além de palavras-chave soltas.",
    role:
      "Participo do desenvolvimento do produto e da implementação técnica ao lado de outro integrante de Engenharia de Software, trabalhando em conjunto com duas integrantes de Gestão Pública na definição da experiência, do problema e da proposta de valor. Minha contribuição técnica inclui o onboarding e perfil do candidato, o vocabulário estruturado de habilidades e a base da lógica de matching entre perfil e oportunidades.",
    decisions: [
      "Vocabulário estruturado de habilidades e áreas, em vez de tags livres, para permitir comparação consistente entre perfil e vaga.",
      "Onboarding do candidato pensado para capturar habilidades reais, não apenas cargos anteriores.",
      "Arquitetura pensada para evoluir de matching por regras para recomendação mais sofisticada sem reescrever a base de dados.",
    ],
    stack: ["Python", "Django", "SQL"],
    liveUrl: "https://emprega-ai-wheat.vercel.app/",
    links: [],
    media: {
      ...emptyMedia(),
      cover: "/projects/empregaai/cover.webp",
      desktop: [
        { src: "/projects/empregaai/cover.webp", alt: "EmpregaAI — tela principal", caption: "Tela principal" },
        { src: "/projects/empregaai/desktop-para-quem.webp", alt: "EmpregaAI — para quem é a plataforma", caption: "Para quem é a plataforma" },
        { src: "/projects/empregaai/desktop-onboarding.webp", alt: "EmpregaAI — onboarding do candidato", caption: "Onboarding do candidato" },
      ],
    },
  },
  {
    slug: "naboa",
    order: 2,
    title: "NABOA Streetwear",
    category: "E-commerce demonstrativo • Full stack",
    tagline:
      "De vitrine estática a uma aplicação full-stack em Flask: catálogo dinâmico, autenticação, carrinho, pedidos, estoque e PostgreSQL persistente.",
    highlights: ["291 testes automatizados", "Flask + PostgreSQL", "Deploy público no Render"],
    accent: "amber",
    status: "Demo pública",
    statusColor: "amber",
    context:
      "Começou como uma vitrine estática em HTML, CSS e JavaScript. Evoluiu para uma aplicação Flask dinâmica, com banco de dados relacional, autenticação e regras de negócio reais por trás do catálogo. É uma vitrine demonstrativa — nenhum pagamento real é processado.",
    problem: "",
    role:
      "Responsável pelo desenvolvimento da aplicação: modelagem do banco de dados, autenticação, regras de carrinho e estoque, testes automatizados e publicação em produção.",
    decisions: [
      "Evolução arquitetural: vitrine estática (HTML/CSS/JS) evoluiu para uma aplicação Flask dinâmica, com banco de dados e regras de negócio reais.",
      "Integridade de carrinho, pedido e estoque: controle transacional, proteção contra duplicação de pedido e proteção contra alteração do carrinho após a revisão.",
      "Persistência e publicação: PostgreSQL persistente no Neon, migrações com Alembic e deploy público no Render.",
    ],
    stack: ["Python", "Flask", "PostgreSQL", "SQLAlchemy", "pytest"],
    liveUrl: "https://naboa-streetwear.onrender.com/",
    liveCtaLabel: "Ver projeto ao vivo",
    livePreview: {
      coldStartNotice: {
        title: "Iniciando a demo da NABOA",
        message:
          "A aplicação está hospedada no plano gratuito do Render e pode levar alguns segundos para iniciar após um período sem acesso.",
      },
    },
    links: [],
    media: {
      ...emptyMedia(),
      cover: "/projects/naboa/cover.webp",
      desktop: [
        { src: "/projects/naboa/cover.webp", alt: "NABOA Streetwear — página inicial", caption: "Página inicial" },
        { src: "/projects/naboa/desktop-catalogo.webp", alt: "NABOA Streetwear — catálogo", caption: "Catálogo" },
        { src: "/projects/naboa/desktop-produto.webp", alt: "NABOA Streetwear — detalhe de produto", caption: "Detalhe de produto" },
      ],
    },
  },
  {
    slug: "risk",
    order: 1,
    title: "RISK Soluções Empresariais",
    category: "Projeto empresarial",
    tagline: "Evolução da presença digital de uma empresa real de BPO financeiro, contabilidade e RH.",
    accent: "violet",
    status: "Entregue",
    statusColor: "violet",
    context:
      "Projeto real para a RISK Soluções Empresariais, evoluindo a presença digital da empresa do zero — identidade visual, conteúdo institucional e um site preparado para crescer com o negócio.",
    problem:
      "A empresa precisava de uma presença digital que traduzisse a credibilidade do atendimento presencial para o ambiente online, com um caminho claro para transformar visitantes em contato comercial.",
    role:
      "Responsável pelo desenvolvimento do site institucional — estrutura de componentes, implementação da identidade visual, UX, otimização de imagens, SEO e responsividade.",
    decisions: [
      "Arquitetura de conteúdo pensada para crescer: cada frente de atuação (BPO Financeiro, Contabilidade, RH, Auditoria, Certificado Digital) isolada como seção própria.",
      "Fluxo de diagnóstico gratuito como principal caminho de geração de lead, com formulário enxuto e retorno em PDF.",
      "Paleta e tipografia editoriais (dourado sobre azul-marinho) para transmitir solidez institucional sem parecer um template genérico.",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://risk-platform-b11.pages.dev/",
    liveCtaLabel: "Explorar projeto",
    links: [],
    media: {
      ...emptyMedia(),
      cover: "/projects/risk/cover.webp",
      desktop: [
        { src: "/projects/risk/cover.webp", alt: "RISK — página inicial", caption: "Página inicial" },
        { src: "/projects/risk/desktop-servicos.webp", alt: "RISK — serviços", caption: "Serviços" },
        { src: "/projects/risk/desktop-metodo.webp", alt: "RISK — nosso método", caption: "Nosso método" },
        { src: "/projects/risk/desktop-diagnostico.webp", alt: "RISK — diagnóstico gratuito", caption: "Diagnóstico gratuito" },
      ],
    },
  },
  {
    slug: "dkastro",
    order: 3,
    title: "D' Kastro Café Bistrô",
    category: "Frontend & Motion",
    tagline: "Landing page para um café bistrô real em Vassouras — RJ.",
    accent: "green",
    status: "Entregue",
    statusColor: "green",
    context:
      "D' Kastro é um café bistrô real em Vassouras — RJ, com café, padaria, pratos executivos e self-service no mesmo endereço. A landing page apresenta a casa e direciona o visitante para o WhatsApp.",
    problem:
      "O negócio atende públicos diferentes ao longo do dia — do café da manhã ao almoço completo — e precisava de uma experiência digital que refletisse essa variedade sem fragmentar a marca.",
    role:
      "Responsável pelo desenvolvimento completo da landing page: estrutura de seções, tipografia editorial, motion de scroll e responsividade.",
    decisions: [
      "Tipografia serifada em grande escala para dar peso editorial à marca, fugindo do template genérico de restaurante.",
      "Seções organizadas por momento de consumo (café, padaria, pratos executivos, self-service) em vez de um cardápio único e extenso.",
      "WhatsApp como canal principal de conversão, coerente com o funcionamento real do atendimento do bistrô.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://dkastro-landing.vercel.app/",
    liveCtaLabel: "Experiência ao vivo",
    links: [],
    media: {
      ...emptyMedia(),
      cover: "/projects/dkastro/cover.webp",
      desktop: [
        { src: "/projects/dkastro/cover.webp", alt: "D' Kastro — hero", caption: "Hero" },
        { src: "/projects/dkastro/desktop-a-casa.webp", alt: "D' Kastro — a casa", caption: "A casa" },
        { src: "/projects/dkastro/desktop-pratos.webp", alt: "D' Kastro — pratos executivos", caption: "Pratos executivos" },
        { src: "/projects/dkastro/desktop-self-service.webp", alt: "D' Kastro — self-service", caption: "Self-service" },
        { src: "/projects/dkastro/desktop-cta.webp", alt: "D' Kastro — chamada para WhatsApp", caption: "Chamada para WhatsApp" },
      ],
    },
  },
];

// Outros projetos & experiências — apresentação compacta, sem estudo de caso completo.
export const secondaryProjects = [
  {
    slug: "vassvegas",
    category: "Produto multidisciplinar",
    title: "VassVegas Campus",
    status: "MVP em desenvolvimento",
    tagline:
      "Ecossistema digital que conecta estudantes, atléticas, repúblicas, empresas e parceiros de Vassouras em um único lugar — eventos, oportunidades, networking e banco de talentos.",
    role: "Atuo no desenvolvimento do MVP e nas decisões de produto, dentro de uma equipe multidisciplinar (desenvolvimento, marketing e gestão).",
    stack: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    links: [],
    media: {
      ...emptyMedia(),
      cover: "/projects/vassvegas/cover.webp",
    },
  },
  {
    slug: "clinicai",
    category: "Hackathon",
    title: "ClinicAI SCA",
    status: "Protótipo — Hackathon",
    tagline:
      "Protótipo de IA desenvolvido em equipe durante o Hackathon Univassouras, explorando o apoio à triagem da Síndrome Coronariana Aguda.",
    role:
      "Participei da equipe de prototipação, da definição da lógica do problema à primeira versão funcional, dentro do tempo limitado do hackathon.",
    stack: ["Python", "IA"],
    links: [],
    media: {
      ...emptyMedia(),
      cover: "/projects/clinicai/cover.webp",
      coverAlt:
        "Desenvolvimento do protótipo ClinicAI SCA durante o Hackathon Univassouras — mãos digitando com a interface do sistema aberta na tela do notebook.",
    },
  },
];

export const timeline = [
  {
    tag: "Formação",
    title: "Engenharia de Software",
    description: "Início da graduação na Univassouras — fundamentos de lógica, algoritmos e desenvolvimento de software como base para tudo que veio depois.",
  },
  {
    tag: "Hackathon",
    title: "ClinicAI SCA — Hackathon Univassouras",
    description: "Protótipo de IA para apoiar a triagem da Síndrome Coronariana Aguda, em equipe, sob pressão de tempo. Participação em um programa ligado a uma oportunidade de aceleração de até R$ 200 mil.",
  },
  {
    tag: "Produto multidisciplinar",
    title: "VassVegas Campus",
    description: "Entrada no time multidisciplinar responsável pelo MVP de um ecossistema universitário digital.",
  },
  {
    tag: "Produto",
    title: "EmpregaAI / PIEMP",
    description: "Projeto multidisciplinar de Engenharia de Software e Gestão Pública, com orientação de um professor mentor da área de Ciência da Computação — desenvolvimento do EmpregaAI, uma plataforma de empregabilidade, da lógica de perfil ao matching entre candidato e oportunidade.",
  },
  {
    tag: "Empresarial",
    title: "RISK & DKastro",
    description: "Passagem para projetos reais em contexto comercial: evolução digital de uma empresa de BPO financeiro e a landing page de um negócio local.",
  },
];

export const technologyGroups = [
  {
    category: "Front-end",
    items: [
      { name: "React", usage: "Usado no RISK, no VassVegas Campus e neste portfólio." },
      { name: "Next.js", usage: "Usado no DKastro." },
      { name: "TypeScript", usage: "Usado no DKastro e no VassVegas Campus." },
      { name: "Tailwind CSS", usage: "Usado no RISK, DKastro, VassVegas Campus e neste portfólio." },
      { name: "Framer Motion", usage: "Usado no RISK, DKastro e neste portfólio." },
    ],
  },
  {
    category: "Back-end",
    items: [
      { name: "Python", usage: "Usado em APIs, automação e lógica de aplicações no EmpregaAI e no PIEMP." },
      { name: "Django", usage: "Usado no backend do EmpregaAI." },
      { name: "Flask", usage: "Backend e regras de negócio da aplicação da NABOA — rotas, autenticação e lógica de carrinho e estoque." },
      { name: "SQLAlchemy", usage: "ORM e modelagem do banco relacional da NABOA." },
    ],
  },
  {
    category: "Dados",
    items: [
      { name: "Supabase", usage: "Autenticação, banco de dados e storage do VassVegas Campus." },
      { name: "PostgreSQL", usage: "Banco relacional de produção da NABOA, hospedado no Neon, com migrações via Alembic." },
      { name: "SQL", usage: "Modelagem de dados em projetos como PIEMP e EmpregaAI." },
    ],
  },
  {
    category: "Ferramentas",
    items: [
      { name: "Git", usage: "Versionamento em todos os projetos." },
      { name: "GitHub", usage: "Colaboração e histórico de código em equipe." },
      { name: "Vite", usage: "Build tool do RISK e deste portfólio." },
      { name: "pytest", usage: "291 testes automatizados no backend da NABOA." },
    ],
  },
];
