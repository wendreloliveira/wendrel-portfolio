export const profile = {
  name: "Wendrel Oliveira",
  roles: ["Engenharia de Software", "Produtos Digitais", "Automação & IA"],
  subtitle:
    "Estudante de Engenharia de Software na Univassouras construindo experiência prática em produtos digitais, automação e times multidisciplinares — de MVPs em equipe a entregas reais para empresas.",
  location: "Brasil",
  email: "contato@wendrel.dev",
  whatsapp: "https://wa.me/55",
  linkedin: "https://www.linkedin.com/in/wendrel-oliveira",
  github: "https://github.com/wendrel-oliveira",
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

// Projetos em destaque — apresentação editorial (estudo de caso completo).
// layoutVariant controla a composição: "left" (texto à esq./produto à dir.),
// "right" (produto à esq./texto à dir.) ou "visual" (mídia em maior evidência).
export const featuredProjects = [
  {
    slug: "empregaai",
    order: 1,
    title: "EmpregaAI",
    tagline:
      "Plataforma inteligente de empregabilidade que conecta pessoas, oportunidades e desenvolvimento profissional.",
    layoutVariant: "left",
    accent: "blue",
    status: "Em desenvolvimento",
    statusColor: "blue",
    context:
      "Nasceu de um projeto multidisciplinar entre Engenharia de Software e Gestão Pública, pensado como uma plataforma para aproximar cidadãos, empresas e oportunidades reais de trabalho.",
    problem:
      "Candidatos têm dificuldade para traduzir habilidades reais em oportunidades compatíveis, e processos de seleção carecem de um vocabulário estruturado para comparar perfil e vaga além de palavras-chave soltas.",
    role:
      "Atuo no desenvolvimento do produto dentro de uma equipe multidisciplinar, contribuindo com o onboarding e perfil do candidato, o vocabulário estruturado de habilidades e a base da lógica de matching entre perfil e oportunidades.",
    decisions: [
      "Vocabulário estruturado de habilidades e áreas, em vez de tags livres, para permitir comparação consistente entre perfil e vaga.",
      "Onboarding do candidato pensado para capturar habilidades reais, não apenas cargos anteriores.",
      "Arquitetura pensada para evoluir de matching por regras para recomendação mais sofisticada sem reescrever a base de dados.",
    ],
    stack: ["Python", "Django", "SQL"],
    links: [],
    media: emptyMedia(),
  },
  {
    slug: "risk",
    order: 2,
    title: "RISK Soluções Empresariais",
    tagline: "Evolução da presença digital de uma empresa real.",
    layoutVariant: "right",
    accent: "violet",
    status: null,
    statusColor: "violet",
    context: "",
    problem: "",
    role: "",
    decisions: [],
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    links: [],
    media: emptyMedia(),
  },
  {
    slug: "dkastro",
    order: 3,
    title: "DKastro",
    tagline: "",
    layoutVariant: "visual",
    accent: "green",
    status: null,
    statusColor: "green",
    context: "",
    problem: "",
    role: "",
    decisions: [],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: [],
    media: emptyMedia(),
  },
];

// Outros projetos & experiências — apresentação compacta, sem estudo de caso completo.
export const secondaryProjects = [
  {
    slug: "vassvegas",
    title: "VassVegas Campus",
    status: "Em desenvolvimento",
    statusColor: "blue",
    tagline:
      "Plataforma universitária que conecta estudantes, empresas, repúblicas, atléticas e parceiros em um único ecossistema digital. Atuo no desenvolvimento do MVP e nas decisões de produto junto a uma equipe multidisciplinar.",
    stack: ["React", "TypeScript", "Supabase"],
    accent: "violet",
    links: [],
    media: emptyMedia(),
  },
  {
    slug: "clinicai",
    title: "ClinicAI SCA",
    status: "Hackathon",
    statusColor: "green",
    tagline:
      "Protótipo de IA para apoiar a triagem da Síndrome Coronariana Aguda, desenvolvido em equipe durante o Hackathon Univassouras. Participação em um programa ligado a uma oportunidade de aceleração de até R$ 200 mil.",
    stack: ["Python", "IA"],
    accent: "green",
    links: [],
    media: emptyMedia(),
  },
  {
    slug: "piemp",
    title: "PIEMP / CNPq",
    status: "Pesquisa",
    statusColor: "amber",
    tagline:
      "Programa de inovação e pesquisa onde desenvolvo soluções envolvendo inteligência artificial, automação e análise de dados ao longo de seis meses.",
    stack: ["Python", "IA", "Dados", "Automação"],
    accent: "blue",
    links: [],
    media: emptyMedia(),
  },
];

export const timeline = [
  {
    year: "2025",
    title: "Ingresso em Engenharia de Software",
    description: "Início da graduação na Univassouras, com foco em fundamentos sólidos de lógica, algoritmos e desenvolvimento de software.",
  },
  {
    year: "2025",
    title: "Hackathon Univassouras",
    description: "Desenvolvimento do ClinicAI SCA, competindo por um programa de aceleração de R$ 200 mil.",
  },
  {
    year: "2025",
    title: "PIEMP / CNPq",
    description: "Início do programa de inovação e pesquisa aplicada em IA, automação e dados.",
  },
  {
    year: "2025",
    title: "VassVegas Campus",
    description: "Entrada no time multidisciplinar responsável pelo MVP da plataforma universitária.",
  },
  {
    year: "2025",
    title: "Atuação profissional na RISK Empresarial",
    description: "Aplicação prática de desenvolvimento e automação em ambiente corporativo.",
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
      { name: "Flask", usage: "Usado em APIs e projetos backend com Python." },
    ],
  },
  {
    category: "Dados",
    items: [
      { name: "Supabase", usage: "Autenticação, banco de dados e storage do VassVegas Campus." },
      { name: "SQL", usage: "Modelagem de dados em projetos como PIEMP e EmpregaAI." },
    ],
  },
  {
    category: "Ferramentas",
    items: [
      { name: "Git", usage: "Versionamento em todos os projetos." },
      { name: "GitHub", usage: "Colaboração e histórico de código em equipe." },
      { name: "Vite", usage: "Build tool do RISK e deste portfólio." },
    ],
  },
];
