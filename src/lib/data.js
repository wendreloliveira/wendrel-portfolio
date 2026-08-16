export const profile = {
  name: "Wendrel Oliveira",
  roles: ["Software Engineer", "Python Developer", "Automation & AI"],
  subtitle:
    "Estudante de Engenharia de Software na Univassouras, focado em construir produtos reais com Python, automação e inteligência artificial — do protótipo à decisão de produto.",
  location: "Brasil",
  email: "contato@wendrel.dev",
  whatsapp: "https://wa.me/55",
  linkedin: "https://www.linkedin.com/in/wendrel-oliveira",
  github: "https://github.com/wendrel-oliveira",
};

export const stats = [
  { value: 4, suffix: "", label: "projetos em andamento" },
  { value: 1, suffix: "", label: "hackathon competido" },
  { value: 200, suffix: "k", label: "em prêmio disputado", prefix: "R$" },
  { value: 6, suffix: " meses", label: "de pesquisa aplicada" },
];

export const projects = [
  {
    title: "ClinicAI SCA",
    status: "Hackathon",
    statusColor: "green",
    description:
      "Projeto de IA para auxiliar hospitais na triagem da Síndrome Coronariana Aguda, reduzindo tempo de atendimento e apoiando decisões médicas. Competimos por um programa de aceleração de R$ 200 mil no Hackathon Univassouras.",
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

export const technologies = [
  { name: "Python", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "HTML", category: "language" },
  { name: "CSS", category: "language" },
  { name: "SQL", category: "language" },
  { name: "React", category: "framework" },
  { name: "Flask", category: "framework" },
  { name: "Django", category: "framework" },
  { name: "Tailwind", category: "framework" },
  { name: "Supabase", category: "platform" },
  { name: "Git", category: "tool" },
  { name: "GitHub", category: "tool" },
];

export const skills = [
  { name: "Python", level: 92 },
  { name: "Lógica & Algoritmos", level: 88 },
  { name: "React / JavaScript", level: 75 },
  { name: "Automação & IA", level: 80 },
  { name: "SQL & Modelagem de Dados", level: 78 },
];
