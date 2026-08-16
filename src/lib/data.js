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

export const projects = [
  {
    title: "ClinicAI SCA",
    status: "Hackathon",
    statusColor: "green",
    description:
      "Protótipo de IA para apoiar a triagem da Síndrome Coronariana Aguda, desenvolvido em equipe durante o Hackathon Univassouras. Participação em um programa ligado a uma oportunidade de aceleração de até R$ 200 mil.",
    tags: ["Python", "IA", "Saúde", "Hackathon"],
    accent: "green",
    image: null, // troque por um caminho de screenshot real, ex: "/src/assets/projects/clinicai.png"
    links: [],
  },
  {
    title: "VassVegas Campus",
    status: "Em desenvolvimento",
    statusColor: "blue",
    description:
      "Plataforma universitária que conecta estudantes, empresas, repúblicas, atléticas e parceiros em um único ecossistema digital. Atuo no desenvolvimento do MVP e nas decisões de produto junto a uma equipe multidisciplinar.",
    tags: ["React", "TypeScript", "Supabase", "Produto"],
    accent: "violet",
    image: null,
    links: [],
  },
  {
    title: "PIEMP / CNPq",
    status: "Pesquisa",
    statusColor: "amber",
    description:
      "Programa de inovação e pesquisa onde desenvolvo soluções envolvendo inteligência artificial, automação e análise de dados ao longo de seis meses.",
    tags: ["Python", "IA", "Dados", "Automação"],
    accent: "blue",
    image: null,
    links: [],
  },
  {
    title: "EmpregaAI",
    status: "Em desenvolvimento",
    statusColor: "blue",
    description:
      "Plataforma inteligente voltada para empregabilidade pública, conectando cidadãos, empresas e gestão pública através de inteligência de dados e recomendação de oportunidades.",
    tags: ["Django", "Python", "GovTech", "IA"],
    accent: "green",
    image: null,
    links: [],
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
