export type Lang = "en" | "ru" | "uz";

export interface Translations {
  nav: {
    howItWorks: string;
    theProblem: string;
    guarantee: string;
    signIn: string;
    getStarted: string;
  };
  hero: {
    badge: string;
    heading1: string;
    heading2: string;
    body: string;
    findConsultant: string;
    iAmConsultant: string;
  };
  heroStats: { value: string; label: string }[];
  productCard: {
    topMatch: string;
    matchPct: string;
    rating: string;
    students: string;
    success: string;
    activeMilestones: string;
    escrowBalance: string;
    escrowAmount: string;
    milestonesProgress: string;
    milestoneItems: { label: string; done: boolean }[];
  };
  howItWorks: {
    sectionLabel: string;
    heading: string;
    flow: { step: string; title: string; desc: string }[];
    features: { title: string; desc: string }[];
  };
  problem: {
    sectionLabel: string;
    heading: string;
    stats: { value: number; prefix?: string; suffix: string; label: string }[];
    cardTitle: string;
    cardBody: string;
    cardPoints: string[];
    cardFooter: string;
  };
  guarantee: {
    sectionLabel: string;
    heading: string;
    benefits: { title: string; points: string[] }[];
    promise: {
      badge: string;
      title: string;
      body: string;
      points: string[];
      cta: string;
    };
  };
  cta: {
    heading: string;
    body: string;
    createAccount: string;
    signIn: string;
  };
  footer: {
    brandDesc: string;
    contact: string;
    followUs: string;
    copyright: string;
  };
  compare: {
    backToHome: string;
    appSubtitle: string;
    tabs: { signIn: string; register: string };
    form: {
      fullName: string;
      email: string;
      password: string;
      fullNamePlaceholder: string;
      emailPlaceholder: string;
      passwordPlaceholder: string;
    };
    submitSignIn: string;
    submitCreateAccount: string;
    onboarding: {
      title: string;
      subtitle: string;
      stepLabel: string;
      stepOf: string;
      step1Title: string;
      step1Sub: string;
      step2Title: string;
      step2Sub: string;
      step3Title: string;
      step3Sub: string;
      step4Title: string;
      step4Sub: string;
      gpa: string;
      ielts: string;
      sat: string;
      optional: string;
      notSet: string;
      addScore: string;
      clear: string;
      ieltsExpert: string;
      ieltsGood: string;
      ieltsCompetent: string;
      ieltsModest: string;
      satExcellent: string;
      satGood: string;
      satAverage: string;
      satBelowAvg: string;
      degreeLevel: string;
      fieldOfStudy: string;
      selectMajor: string;
      specifyMajor: string;
      specifyPlaceholder: string;
      consultingBudget: string;
      consultingBudgetHint: string;
      educationBudget: string;
      educationBudgetHint: string;
      preferredCountries: string;
      preferredCountriesHint: string;
      reviewDegree: string;
      reviewMajor: string;
      reviewGpa: string;
      reviewIelts: string;
      reviewSat: string;
      reviewConsultingBudget: string;
      reviewEducationBudget: string;
      reviewCountries: string;
      notSpecified: string;
      any: string;
      completeProfile: string;
      back: string;
      continue: string;
    };
    main: {
      welcome: string;
      dashboard: string;
      filterTitle: string;
      filterCountry: string;
      allCountries: string;
      filterRating: string;
      anyRating: string;
      clear: string;
      showing: string;
      showingOf: string;
      yourProfile: string;
      edit: string;
      degree: string;
      major: string;
      budget: string;
      gpa: string;
      topMatches: string;
      topMatchesSubtitle: string;
      matchScore: string;
      viewProfile: string;
      hire: string;
      compare: string;
      noResults: string;
      noResultsHint: string;
      clearFilters: string;
      comparing: string;
      consultantSingle: string;
      consultantPlural: string;
      hideComparison: string;
      showComparison: string;
      comparison: string;
      tableRating: string;
      tableSuccessRate: string;
      tableStudentsHelped: string;
      tablePriceRange: string;
      tableMatchScore: string;
      tableCountries: string;
      defaultDesc: string;
    };
  };
  dashboard: {
    nav: {
      title: string;
      dashboard: string;
      findConsultants: string;
      escrowPayments: string;
      editProfile: string;
      student: string;
      signOut: string;
    };
    header: {
      welcomeBack: string;
      subtitle: string;
      editProfile: string;
    };
    stats: {
      activeApps: string;
      milestonesWk: string;
      escrow: string;
      released: string;
    };
    applications: {
      title: string;
      findConsultant: string;
      progress: string;
      total: string;
      details: string;
      emptyState: string;
      browseConsultants: string;
    };
    activity: {
      title: string;
      empty: string;
    };
    profile: {
      title: string;
      subtitle: string;
      academicScores: string;
      gpaScale: string;
      ieltsOptional: string;
      satOptional: string;
      degreeMajor: string;
      degreeLevel: string;
      major: string;
      selectMajor: string;
      budget: string;
      consultingBudget: string;
      educationBudget: string;
      preferredCountries: string;
      saveChanges: string;
      cancel: string;
      saved: string;
    };
  };
}

// ─────────────────────────── ENGLISH ───────────────────────────
const en: Translations = {
  nav: {
    howItWorks: "How It Works",
    theProblem: "The Problem",
    guarantee: "Guarantee",
    signIn: "Sign In",
    getStarted: "Get Started",
  },
  hero: {
    badge: "Escrow-protected consulting marketplace",
    heading1: "Premium Guidance.",
    heading2: "Real Accountability.",
    body: "The trust-first marketplace to compare and hire top consultants. Payments held in escrow until your consultant delivers verified milestones.",
    findConsultant: "Find a Consultant",
    iAmConsultant: "Compare Consultants",
  },
  heroStats: [
    { value: "2,400+", label: "Students matched" },
    { value: "94%", label: "Satisfaction rate" },
    { value: "$0", label: "Lost to disputes" },
  ],
  productCard: {
    topMatch: "Your Top Match",
    matchPct: "96% match",
    rating: "Rating",
    students: "Students",
    success: "Success",
    activeMilestones: "Active Milestones",
    escrowBalance: "Escrow balance",
    escrowAmount: "$1,200 protected",
    milestonesProgress: "2 of 3 milestones funded",
    milestoneItems: [
      { label: "Statement of Purpose — Draft 1", done: true },
      { label: "University Shortlist (8 schools)", done: true },
      { label: "Application Review — Round 1", done: false },
    ],
  },
  howItWorks: {
    sectionLabel: "How It Works",
    heading: "A three-step process built around your protection",
    flow: [
      { step: "01", title: "Build your profile", desc: "Enter your academic background, budget, and destination countries. Takes under two minutes." },
      { step: "02", title: "Compare consultants", desc: "Browse ranked matches tailored to your profile. Filter by country, rating, and price." },
      { step: "03", title: "Hire with escrow", desc: "Fund milestones in escrow. Payment releases only after you approve each deliverable." },
    ],
    features: [
      { title: "Escrow Protection", desc: "Payment is held in escrow until each milestone is reviewed and approved by you." },
      { title: "Live Progress", desc: "Every deliverable is tracked in a shared dashboard with timestamped updates." },
      { title: "Verified Consultants", desc: "Every profile goes through a manual quality and consistency review before listing." },
      { title: "Precision Matching", desc: "Our ranking engine weighs GPA, budget, degree level, and target countries." },
    ],
  },
  problem: {
    sectionLabel: "The Problem",
    heading: "Traditional consulting runs on blind trust",
    stats: [
      { value: 67, suffix: "%", label: "of students report communication blackouts during critical application phases." },
      { prefix: "$", value: 3, suffix: "k+", label: "paid upfront on average before any measurable output is delivered." },
      { value: 1, suffix: " in 4", label: "students feel they were oversold on admission outcomes." },
    ],
    cardTitle: "The incentive is misaligned",
    cardBody: "When a consultant is paid upfront, the financial incentive to maintain quality disappears. Students have no leverage once payment is made.",
    cardPoints: [
      "No refund if expectations aren't met",
      "No transparency on work in progress",
      "No accountability after payment clears",
    ],
    cardFooter: "Lerank escrow keeps the incentive aligned from start to finish.",
  },
  guarantee: {
    sectionLabel: "The Guarantee",
    heading: "Milestone escrow. Both sides protected.",
    benefits: [
      {
        title: "For students",
        points: [
          "Pay per milestone, not upfront in full",
          "Dispute any deliverable before releasing funds",
          "Full refund for incomplete milestones",
        ],
      },
      {
        title: "For consultants",
        points: [
          "Guaranteed payment upon approval",
          "Clear milestone scope prevents scope creep",
          "Automated release — no chasing invoices",
        ],
      },
    ],
    promise: {
      badge: "Lerank Promise",
      title: "Escrow guarantee",
      body: "Every payment on Lerank is held in a regulated escrow account. Funds are released only when you explicitly approve a milestone. We do not take sides — we enforce the agreement.",
      points: [
        "Regulated payment processing",
        "Dispute resolution within 48h",
        "Automatic refund for unstarted milestones",
        "Zero fees on disputed refunds",
      ],
      cta: "Start with Escrow Protection",
    },
  },
  cta: {
    heading: "Apply with confidence.",
    body: "Create your free account, compare ranked consultants, and pay only for verified, delivered work.",
    createAccount: "Create Free Account",
    signIn: "Sign In",
  },
  footer: {
    brandDesc: "The trust-first marketplace to compare and hire top consultants. We protect clients through milestone-based escrow payments.",
    contact: "Contact",
    followUs: "Follow Us",
    copyright: "© 2026 Lerank. Trust-first consulting marketplace.",
  },
  compare: {
    backToHome: "Back to home",
    appSubtitle: "Premium consulting marketplace",
    tabs: { signIn: "Sign In", register: "Register" },
    form: {
      fullName: "Full Name",
      email: "Email Address",
      password: "Password",
      fullNamePlaceholder: "Your full name",
      emailPlaceholder: "you@email.com",
      passwordPlaceholder: "••••••••",
    },
    submitSignIn: "Sign In",
    submitCreateAccount: "Create Account",
    onboarding: {
      title: "Build Your Profile",
      subtitle: "We use this to rank consultants perfectly for you.",
      stepLabel: "Step",
      stepOf: "of",
      step1Title: "Academic Background",
      step1Sub: "Your scores help us match the right consultant tier.",
      step2Title: "Academic Goals",
      step2Sub: "Tell us what you're aiming for.",
      step3Title: "Budget & Destinations",
      step3Sub: "Helps us filter consultants you can actually afford.",
      step4Title: "Review & Confirm",
      step4Sub: "Everything looks correct? We'll start matching you.",
      gpa: "GPA",
      ielts: "IELTS Score",
      sat: "SAT Score",
      optional: "optional",
      notSet: "not set",
      addScore: "Add score",
      clear: "Clear",
      ieltsExpert: "Expert",
      ieltsGood: "Good",
      ieltsCompetent: "Competent",
      ieltsModest: "Modest",
      satExcellent: "Excellent",
      satGood: "Good",
      satAverage: "Average",
      satBelowAvg: "Below Avg",
      degreeLevel: "Target Degree Level",
      fieldOfStudy: "Field of Study / Major",
      selectMajor: "Select your major…",
      specifyMajor: "Specify Major",
      specifyPlaceholder: "e.g. Environmental Science",
      consultingBudget: "Consulting Budget",
      consultingBudgetHint: "Max you'll spend on a consulting service.",
      educationBudget: "Annual Education Budget",
      educationBudgetHint: "Tuition + living costs per year.",
      preferredCountries: "Preferred Countries",
      preferredCountriesHint: "Select all that interest you.",
      reviewDegree: "Degree",
      reviewMajor: "Major",
      reviewGpa: "GPA",
      reviewIelts: "IELTS",
      reviewSat: "SAT",
      reviewConsultingBudget: "Consulting Budget",
      reviewEducationBudget: "Education Budget / yr",
      reviewCountries: "Countries",
      notSpecified: "Not specified",
      any: "Any",
      completeProfile: "Complete Profile",
      back: "Back",
      continue: "Continue",
    },
    main: {
      welcome: "Welcome, ",
      dashboard: "Dashboard",
      filterTitle: "Filters",
      filterCountry: "Country",
      allCountries: "All Countries",
      filterRating: "Min Rating",
      anyRating: "Any Rating",
      clear: "Clear",
      showing: "Showing",
      showingOf: "of",
      yourProfile: "Your Profile",
      edit: "Edit",
      degree: "Degree",
      major: "Major",
      budget: "Budget",
      gpa: "GPA",
      topMatches: "Your Top Matches",
      topMatchesSubtitle: "Ranked by compatibility with your profile and budget.",
      matchScore: "Match score",
      viewProfile: "View Profile",
      hire: "Hire",
      compare: "Compare",
      noResults: "No consultants match your filters",
      noResultsHint: "Try adjusting the country or rating filters.",
      clearFilters: "Clear filters",
      comparing: "Comparing",
      consultantSingle: "consultant",
      consultantPlural: "consultants",
      hideComparison: "Hide",
      showComparison: "Show",
      comparison: "comparison",
      tableRating: "Rating",
      tableSuccessRate: "Success Rate",
      tableStudentsHelped: "Students Helped",
      tablePriceRange: "Price Range",
      tableMatchScore: "Match Score",
      tableCountries: "Countries",
      defaultDesc: "Premium education consulting with personalized guidance for international applicants.",
    },
  },
  dashboard: {
    nav: {
      title: "Lerank",
      dashboard: "Dashboard",
      findConsultants: "Find Consultants",
      escrowPayments: "Escrow Payments",
      editProfile: "Edit Profile",
      student: "Student",
      signOut: "Sign Out",
    },
    header: {
      welcomeBack: "Welcome back, ",
      subtitle: "Here is the latest on your university applications.",
      editProfile: "Edit Profile",
    },
    stats: {
      activeApps: "Active Apps",
      milestonesWk: "Milestones (wk)",
      escrow: "Escrow",
      released: "Released",
    },
    applications: {
      title: "Active Applications",
      findConsultant: "Find consultant",
      progress: "Progress",
      total: "Total:",
      details: "Details",
      emptyState: "No active applications yet.",
      browseConsultants: "Browse Consultants",
    },
    activity: {
      title: "Recent Activity",
      empty: "No recent activity",
    },
    profile: {
      title: "Edit Profile",
      subtitle: "Update your academic profile for better consultant matches.",
      academicScores: "Academic Scores",
      gpaScale: "GPA Scale",
      ieltsOptional: "IELTS Score (optional, max 9.0)",
      satOptional: "SAT Score (optional, max 1600)",
      degreeMajor: "Degree & Major",
      degreeLevel: "Degree Level",
      major: "Major",
      selectMajor: "Select major…",
      budget: "Budget",
      consultingBudget: "Consulting Budget",
      educationBudget: "Education Budget / yr",
      preferredCountries: "Preferred Countries",
      saveChanges: "Save Changes",
      cancel: "Cancel",
      saved: "Saved!",
    },
  },
};

// ─────────────────────────── RUSSIAN ───────────────────────────
const ru: Translations = {
  nav: {
    howItWorks: "Как работает",
    theProblem: "Проблема",
    guarantee: "Гарантия",
    signIn: "Войти",
    getStarted: "Начать",
  },
  hero: {
    badge: "Площадка с защитой эскроу",
    heading1: "Премиальное руководство.",
    heading2: "Реальная ответственность.",
    body: "Площадка для сравнения и найма лучших консультантов. Платежи в эскроу до тех пор, пока ваш консультант не выполнит проверенные этапы.",
    findConsultant: "Найти консультанта",
    iAmConsultant: "Сравнить консультантов",
  },
  heroStats: [
    { value: "2 400+", label: "Подобранных студентов" },
    { value: "94%", label: "Удовлетворённость" },
    { value: "$0", label: "Потеряно в спорах" },
  ],
  productCard: {
    topMatch: "Ваш лучший выбор",
    matchPct: "96% совпадение",
    rating: "Рейтинг",
    students: "Студенты",
    success: "Успех",
    activeMilestones: "Активные этапы",
    escrowBalance: "Баланс эскроу",
    escrowAmount: "$1 200 под защитой",
    milestonesProgress: "2 из 3 этапов",
    milestoneItems: [
      { label: "Мотивационное письмо — Черновик 1", done: true },
      { label: "Список университетов (8 школ)", done: true },
      { label: "Проверка заявки — Раунд 1", done: false },
    ],
  },
  howItWorks: {
    sectionLabel: "Как работает",
    heading: "Три шага, построенных вокруг вашей защиты",
    flow: [
      { step: "01", title: "Создайте профиль", desc: "Укажите академические данные, бюджет и страны. Занимает менее двух минут." },
      { step: "02", title: "Сравните консультантов", desc: "Просматривайте ранжированные совпадения. Фильтруйте по стране, рейтингу и цене." },
      { step: "03", title: "Нанять через эскроу", desc: "Пополняйте этапы в эскроу. Платёж выпускается только после вашего одобрения." },
    ],
    features: [
      { title: "Защита эскроу", desc: "Платёж удерживается в эскроу до тех пор, пока каждый этап не одобрен вами." },
      { title: "Живой прогресс", desc: "Каждый результат отслеживается на общей панели с метками времени." },
      { title: "Проверенные консультанты", desc: "Каждый профиль проходит проверку качества перед публикацией." },
      { title: "Точное сопоставление", desc: "Наш движок учитывает GPA, бюджет, уровень образования и страны." },
    ],
  },
  problem: {
    sectionLabel: "Проблема",
    heading: "Традиционный консалтинг на слепом доверии",
    stats: [
      { value: 67, suffix: "%", label: "студентов сообщают об отсутствии связи в критические фазы." },
      { prefix: "$", value: 3, suffix: "k+", label: "уплачено авансом до получения измеримого результата." },
      { value: 1, suffix: " из 4", label: "студентов считают, что им преувеличили шансы на поступление." },
    ],
    cardTitle: "Стимулы не совпадают",
    cardBody: "Когда консультант получает оплату авансом, стимул поддерживать качество исчезает. После оплаты у студентов нет рычагов влияния.",
    cardPoints: [
      "Нет возврата, если ожидания не оправданы",
      "Нет прозрачности в ходе работы",
      "Нет ответственности после оплаты",
    ],
    cardFooter: "Эскроу Lerank поддерживает согласованность стимулов от начала до конца.",
  },
  guarantee: {
    sectionLabel: "Гарантия",
    heading: "Поэтапное эскроу. Обе стороны защищены.",
    benefits: [
      {
        title: "Для студентов",
        points: [
          "Оплата по этапам, не полный аванс",
          "Оспаривайте результат перед выплатой",
          "Полный возврат за незавершённые этапы",
        ],
      },
      {
        title: "Для консультантов",
        points: [
          "Гарантированная оплата после одобрения",
          "Чёткие рамки предотвращают расширение задач",
          "Автоматический выпуск — без погони за счетами",
        ],
      },
    ],
    promise: {
      badge: "Обещание Lerank",
      title: "Гарантия эскроу",
      body: "Каждый платёж на Lerank удерживается на регулируемом эскроу-счёте. Средства выпускаются только когда вы явно одобряете этап. Мы не принимаем ничьей стороны.",
      points: [
        "Регулируемая обработка платежей",
        "Разрешение споров в течение 48 часов",
        "Автоматический возврат за незапущенные этапы",
        "Нулевая комиссия на спорные возвраты",
      ],
      cta: "Начать с защитой эскроу",
    },
  },
  cta: {
    heading: "Подавайте заявки уверенно.",
    body: "Создайте бесплатный аккаунт, сравните консультантов и платите только за выполненную работу.",
    createAccount: "Создать бесплатный аккаунт",
    signIn: "Войти",
  },
  footer: {
    brandDesc: "Площадка для сравнения и найма лучших консультантов. Защита клиентов через поэтапные эскроу-платежи.",
    contact: "Контакты",
    followUs: "Подписаться",
    copyright: "© 2026 Lerank. Консалтинговая площадка, ориентированная на доверие.",
  },
  compare: {
    backToHome: "На главную",
    appSubtitle: "Премиальная консалтинговая площадка",
    tabs: { signIn: "Войти", register: "Регистрация" },
    form: {
      fullName: "Полное имя",
      email: "Электронная почта",
      password: "Пароль",
      fullNamePlaceholder: "Ваше полное имя",
      emailPlaceholder: "you@email.com",
      passwordPlaceholder: "••••••••",
    },
    submitSignIn: "Войти",
    submitCreateAccount: "Создать аккаунт",
    onboarding: {
      title: "Создайте профиль",
      subtitle: "Это поможет нам идеально подобрать консультантов для вас.",
      stepLabel: "Шаг",
      stepOf: "из",
      step1Title: "Академические данные",
      step1Sub: "Ваши оценки помогают нам подобрать нужный уровень консультанта.",
      step2Title: "Академические цели",
      step2Sub: "Расскажите нам, чего вы хотите достичь.",
      step3Title: "Бюджет и направления",
      step3Sub: "Помогает фильтровать консультантов по вашему бюджету.",
      step4Title: "Проверка и подтверждение",
      step4Sub: "Всё верно? Мы начнём подбор консультантов.",
      gpa: "GPA",
      ielts: "Балл IELTS",
      sat: "Балл SAT",
      optional: "необязательно",
      notSet: "не указан",
      addScore: "Добавить балл",
      clear: "Очистить",
      ieltsExpert: "Эксперт",
      ieltsGood: "Хорошо",
      ieltsCompetent: "Компетентно",
      ieltsModest: "Скромно",
      satExcellent: "Отлично",
      satGood: "Хорошо",
      satAverage: "Средне",
      satBelowAvg: "Ниже среднего",
      degreeLevel: "Уровень образования",
      fieldOfStudy: "Область / Специальность",
      selectMajor: "Выберите специальность…",
      specifyMajor: "Укажите специальность",
      specifyPlaceholder: "напр. Экологические науки",
      consultingBudget: "Консалтинговый бюджет",
      consultingBudgetHint: "Макс. сумма на консалтинговые услуги.",
      educationBudget: "Годовой бюджет на образование",
      educationBudgetHint: "Стоимость обучения + проживание в год.",
      preferredCountries: "Предпочтительные страны",
      preferredCountriesHint: "Выберите все, которые вас интересуют.",
      reviewDegree: "Степень",
      reviewMajor: "Специальность",
      reviewGpa: "GPA",
      reviewIelts: "IELTS",
      reviewSat: "SAT",
      reviewConsultingBudget: "Консалт. бюджет",
      reviewEducationBudget: "Бюджет на образование / год",
      reviewCountries: "Страны",
      notSpecified: "Не указано",
      any: "Любые",
      completeProfile: "Завершить профиль",
      back: "Назад",
      continue: "Продолжить",
    },
    main: {
      welcome: "Добро пожаловать, ",
      dashboard: "Панель",
      filterTitle: "Фильтры",
      filterCountry: "Страна",
      allCountries: "Все страны",
      filterRating: "Мин. рейтинг",
      anyRating: "Любой рейтинг",
      clear: "Сбросить",
      showing: "Показано",
      showingOf: "из",
      yourProfile: "Ваш профиль",
      edit: "Изменить",
      degree: "Степень",
      major: "Специальность",
      budget: "Бюджет",
      gpa: "GPA",
      topMatches: "Лучшие совпадения",
      topMatchesSubtitle: "Ранжированы по совместимости с вашим профилем и бюджетом.",
      matchScore: "Совпадение",
      viewProfile: "Профиль",
      hire: "Нанять",
      compare: "Сравнить",
      noResults: "Консультанты не найдены",
      noResultsHint: "Попробуйте изменить фильтры по стране или рейтингу.",
      clearFilters: "Сбросить фильтры",
      comparing: "Сравнение",
      consultantSingle: "консультанта",
      consultantPlural: "консультантов",
      hideComparison: "Скрыть",
      showComparison: "Показать",
      comparison: "сравнение",
      tableRating: "Рейтинг",
      tableSuccessRate: "Процент успеха",
      tableStudentsHelped: "Помог студентов",
      tablePriceRange: "Диапазон цен",
      tableMatchScore: "Совпадение",
      tableCountries: "Страны",
      defaultDesc: "Премиальное консультирование по образованию с персональным руководством для иностранных абитуриентов.",
    },
  },
  dashboard: {
    nav: {
      title: "Lerank",
      dashboard: "Панель",
      findConsultants: "Найти консультантов",
      escrowPayments: "Платежи эскроу",
      editProfile: "Редактировать",
      student: "Студент",
      signOut: "Выйти",
    },
    header: {
      welcomeBack: "С возвращением, ",
      subtitle: "Последние данные о ваших заявках в университеты.",
      editProfile: "Редактировать",
    },
    stats: {
      activeApps: "Активные заявки",
      milestonesWk: "Этапы (нед.)",
      escrow: "Эскроу",
      released: "Выпущено",
    },
    applications: {
      title: "Активные заявки",
      findConsultant: "Найти консультанта",
      progress: "Прогресс",
      total: "Итого:",
      details: "Детали",
      emptyState: "Нет активных заявок.",
      browseConsultants: "Просмотр консультантов",
    },
    activity: {
      title: "Последняя активность",
      empty: "Нет последней активности",
    },
    profile: {
      title: "Редактировать профиль",
      subtitle: "Обновите профиль для лучшего подбора консультантов.",
      academicScores: "Академические оценки",
      gpaScale: "Шкала GPA",
      ieltsOptional: "Балл IELTS (необязательно, макс. 9.0)",
      satOptional: "Балл SAT (необязательно, макс. 1600)",
      degreeMajor: "Степень и специальность",
      degreeLevel: "Уровень образования",
      major: "Специальность",
      selectMajor: "Выберите специальность…",
      budget: "Бюджет",
      consultingBudget: "Консалтинговый бюджет",
      educationBudget: "Бюджет на образование / год",
      preferredCountries: "Предпочтительные страны",
      saveChanges: "Сохранить",
      cancel: "Отмена",
      saved: "Сохранено!",
    },
  },
};

// ─────────────────────────── UZBEK ───────────────────────────
const uz: Translations = {
  nav: {
    howItWorks: "Qanday ishlaydi",
    theProblem: "Muammo",
    guarantee: "Kafolat",
    signIn: "Kirish",
    getStarted: "Boshlash",
  },
  hero: {
    badge: "Eskrou himoyali konsulting bozori",
    heading1: "Premium yo'nalish.",
    heading2: "Haqiqiy mas'uliyat.",
    body: "Eng yaxshi konsultantlarni solishtirish va yollash uchun ishonchga asoslangan bozor. To'lovlar bosqichlar bajarilmaguncha eskroud turiladi.",
    findConsultant: "Konsultant topish",
    iAmConsultant: "Konsultantlarni solishtirish",
  },
  heroStats: [
    { value: "2 400+", label: "Mos talabalar" },
    { value: "94%", label: "Qoniqish darajasi" },
    { value: "$0", label: "Nizolarda yo'qotilgan" },
  ],
  productCard: {
    topMatch: "Eng yaxshi tanlov",
    matchPct: "96% mos",
    rating: "Reyting",
    students: "Talabalar",
    success: "Muvaffaqiyat",
    activeMilestones: "Faol bosqichlar",
    escrowBalance: "Eskrou balansi",
    escrowAmount: "$1,200 himoyada",
    milestonesProgress: "3 dan 2 bosqich",
    milestoneItems: [
      { label: "Motivatsion xat — 1-qoralama", done: true },
      { label: "Universitetlar ro'yxati (8 ta)", done: true },
      { label: "Ariza ko'rib chiqish — 1-tur", done: false },
    ],
  },
  howItWorks: {
    sectionLabel: "Qanday ishlaydi",
    heading: "Himoyangiz atrofida qurilgan uch bosqich",
    flow: [
      { step: "01", title: "Profil yarating", desc: "Akademik ma'lumot, byudjet va mamlakatlarni kiriting. Ikki daqiqadan kam." },
      { step: "02", title: "Solishtiring", desc: "Reytingli mos kelishlarni ko'ring. Mamlakat, reyting va narx bo'yicha filtrlang." },
      { step: "03", title: "Eskrou orqali yollash", desc: "Bosqichlarni eskroud to'ldiring. To'lov faqat tasdiqlashingizdan keyin chiqariladi." },
    ],
    features: [
      { title: "Eskrou himoyasi", desc: "To'lov har bir bosqich siz tomonidan tasdiqlangunicha eskroud turiladi." },
      { title: "Jonli jarayon", desc: "Har bir natija vaqt belgisi bilan umumiy panelda kuzatiladi." },
      { title: "Tasdiqlangan konsultantlar", desc: "Har bir profil ro'yxatga kiritilishdan oldin sifat tekshiruvidan o'tadi." },
      { title: "Aniq moslash", desc: "Tizimimiz GPA, byudjet, ta'lim darajasi va mamlakatlarni hisobga oladi." },
    ],
  },
  problem: {
    sectionLabel: "Muammo",
    heading: "An'anaviy konsulting ko'r-ko'rona ishonchga asoslanadi",
    stats: [
      { value: 67, suffix: "%", label: "talabalar muhim bosqichlarda aloqa uzilganligini bildiradi." },
      { prefix: "$", value: 3, suffix: "k+", label: "o'rtacha natija yetkazilishidan oldin avans to'langan." },
      { value: 1, suffix: " dan 4", label: "talabalar qabul natijalariga oid haddan tashqari va'da berilganligini his qiladi." },
    ],
    cardTitle: "Rag'bat mos kelmaydi",
    cardBody: "Konsultant avans olganida, sifatni saqlab qolish uchun moliyaviy rag'bat yo'qoladi. To'lovdan keyin talabaning ta'siri qolmaydi.",
    cardPoints: [
      "Kutilmalar bajarilmasa qaytarib berilmaydi",
      "Davom etayotgan ish bo'yicha shaffoflik yo'q",
      "To'lovdan keyin javobgarlik yo'q",
    ],
    cardFooter: "Lerank eskroui boshlanishidan oxirigacha rag'batni muvofiqlashtiradi.",
  },
  guarantee: {
    sectionLabel: "Kafolat",
    heading: "Bosqichli eskrou. Ikkala tomon himoyalangan.",
    benefits: [
      {
        title: "Talabalar uchun",
        points: [
          "Bosqich uchun to'lang, to'liq avans emas",
          "Mablag' chiqishidan oldin natijani bahslashing",
          "Tugallanmagan bosqichlar uchun to'liq qaytarish",
        ],
      },
      {
        title: "Konsultantlar uchun",
        points: [
          "Tasdiqlanganidan keyin kafolatlangan to'lov",
          "Aniq doira vazifalar kengayishini oldini oladi",
          "Avtomatik chiqarish — hisoblarni quvish yo'q",
        ],
      },
    ],
    promise: {
      badge: "Lerank va'dasi",
      title: "Eskrou kafolati",
      body: "Leranktagi har bir to'lov tartibga solingan eskrou hisobida turiladi. Mablag' faqat siz bosqichni tasdiqlaganingizda chiqariladi. Biz kelishuvni bajaramiz.",
      points: [
        "Tartibga solingan to'lov qayta ishlash",
        "48 soat ichida nizo yechimi",
        "Boshlanmagan bosqichlar uchun avtomatik qaytarish",
        "Bahslashilgan qaytarishlarda nol komissiya",
      ],
      cta: "Eskrou himoyasi bilan boshlash",
    },
  },
  cta: {
    heading: "Ishonch bilan ariza bering.",
    body: "Bepul hisob yarating, konsultantlarni solishtiring va faqat tasdiqlangan ish uchun to'lang.",
    createAccount: "Bepul hisob yaratish",
    signIn: "Kirish",
  },
  footer: {
    brandDesc: "Konsultantlarni solishtirish va yollash uchun ishonchga asoslangan bozor. Mijozlarni bosqichli eskrou to'lovlari orqali himoya.",
    contact: "Aloqa",
    followUs: "Kuzatib boring",
    copyright: "© 2026 Lerank. Ishonchga asoslangan konsalting bozori.",
  },
  compare: {
    backToHome: "Bosh sahifaga",
    appSubtitle: "Premium konsalting bozori",
    tabs: { signIn: "Kirish", register: "Ro'yxatdan o'tish" },
    form: {
      fullName: "To'liq ism",
      email: "Elektron pochta",
      password: "Parol",
      fullNamePlaceholder: "To'liq ismingiz",
      emailPlaceholder: "you@email.com",
      passwordPlaceholder: "••••••••",
    },
    submitSignIn: "Kirish",
    submitCreateAccount: "Hisob yaratish",
    onboarding: {
      title: "Profil yarating",
      subtitle: "Bu bizga konsultantlarni siz uchun ideal tanlashga yordam beradi.",
      stepLabel: "Qadam",
      stepOf: "dan",
      step1Title: "Akademik ma'lumotlar",
      step1Sub: "Ballaringiz bizga to'g'ri konsultant darajasini topishga yordam beradi.",
      step2Title: "Akademik maqsadlar",
      step2Sub: "Nimaga erishmoqchi ekanligingizni ayting.",
      step3Title: "Byudjet va yo'nalishlar",
      step3Sub: "Byudjetingizga mos konsultantlarni filtrlashga yordam beradi.",
      step4Title: "Ko'rib chiqish",
      step4Sub: "Hamma narsa to'g'rimi? Mos kelishni boshlaymiz.",
      gpa: "GPA",
      ielts: "IELTS bali",
      sat: "SAT bali",
      optional: "ixtiyoriy",
      notSet: "belgilanmagan",
      addScore: "Bal qo'shish",
      clear: "Tozalash",
      ieltsExpert: "Ekspert",
      ieltsGood: "Yaxshi",
      ieltsCompetent: "Kompetent",
      ieltsModest: "O'rtacha",
      satExcellent: "A'lo",
      satGood: "Yaxshi",
      satAverage: "O'rtacha",
      satBelowAvg: "O'rtachadan past",
      degreeLevel: "Ta'lim darajasi",
      fieldOfStudy: "O'qish sohasi / Mutaxassislik",
      selectMajor: "Mutaxassislikni tanlang…",
      specifyMajor: "Mutaxassislikni belgilang",
      specifyPlaceholder: "mas. Ekologiya",
      consultingBudget: "Konsalting byudjeti",
      consultingBudgetHint: "Konsalting uchun maksimal xarajat.",
      educationBudget: "Yillik ta'lim byudjeti",
      educationBudgetHint: "O'qish + yashash xarajatlari yiliga.",
      preferredCountries: "Afzal mamlakatlar",
      preferredCountriesHint: "Qiziqtiradiganlarni tanlang.",
      reviewDegree: "Daraja",
      reviewMajor: "Mutaxassislik",
      reviewGpa: "GPA",
      reviewIelts: "IELTS",
      reviewSat: "SAT",
      reviewConsultingBudget: "Konsalting byudjeti",
      reviewEducationBudget: "Ta'lim byudjeti / yil",
      reviewCountries: "Mamlakatlar",
      notSpecified: "Belgilanmagan",
      any: "Istalgan",
      completeProfile: "Profilni yakunlash",
      back: "Orqaga",
      continue: "Davom etish",
    },
    main: {
      welcome: "Xush kelibsiz, ",
      dashboard: "Panel",
      filterTitle: "Filtrlar",
      filterCountry: "Mamlakat",
      allCountries: "Barcha mamlakatlar",
      filterRating: "Min. reyting",
      anyRating: "Istalgan reyting",
      clear: "Tozalash",
      showing: "Ko'rsatilmoqda",
      showingOf: "dan",
      yourProfile: "Profilingiz",
      edit: "Tahrirlash",
      degree: "Daraja",
      major: "Mutaxassislik",
      budget: "Byudjet",
      gpa: "GPA",
      topMatches: "Eng yaxshi mos kelishlar",
      topMatchesSubtitle: "Profilingiz va byudjetingizga mosligi bo'yicha reytinglangan.",
      matchScore: "Mos kelish",
      viewProfile: "Profil",
      hire: "Yollash",
      compare: "Solishtirish",
      noResults: "Hech bir konsultant topilmadi",
      noResultsHint: "Mamlakat yoki reyting filtrlarini o'zgartiring.",
      clearFilters: "Filtrlarni tozalash",
      comparing: "Solishtirilmoqda",
      consultantSingle: "konsultant",
      consultantPlural: "konsultant",
      hideComparison: "Yashirish",
      showComparison: "Ko'rsatish",
      comparison: "solishtirish",
      tableRating: "Reyting",
      tableSuccessRate: "Muvaffaqiyat",
      tableStudentsHelped: "Talabalar",
      tablePriceRange: "Narx diapazoni",
      tableMatchScore: "Mos kelish",
      tableCountries: "Mamlakatlar",
      defaultDesc: "Xorijiy abituriyentlar uchun individual ko'rsatma bilan premium ta'lim konsultingi.",
    },
  },
  dashboard: {
    nav: {
      title: "Lerank",
      dashboard: "Panel",
      findConsultants: "Konsultant topish",
      escrowPayments: "Eskrou to'lovlari",
      editProfile: "Tahrirlash",
      student: "Talaba",
      signOut: "Chiqish",
    },
    header: {
      welcomeBack: "Xush kelibsiz, ",
      subtitle: "Universitetga ariza berish bo'yicha so'nggi ma'lumotlar.",
      editProfile: "Tahrirlash",
    },
    stats: {
      activeApps: "Faol arizalar",
      milestonesWk: "Bosqichlar (hft.)",
      escrow: "Eskrou",
      released: "Chiqarilgan",
    },
    applications: {
      title: "Faol arizalar",
      findConsultant: "Konsultant topish",
      progress: "Jarayon",
      total: "Jami:",
      details: "Tafsilotlar",
      emptyState: "Hali faol arizalar yo'q.",
      browseConsultants: "Konsultantlarni ko'rish",
    },
    activity: {
      title: "So'nggi faollik",
      empty: "So'nggi faollik yo'q",
    },
    profile: {
      title: "Profilni tahrirlash",
      subtitle: "Konsultantlarni yaxshiroq tanlash uchun profilingizni yangilang.",
      academicScores: "Akademik ballar",
      gpaScale: "GPA shkala",
      ieltsOptional: "IELTS bali (ixtiyoriy, maks. 9.0)",
      satOptional: "SAT bali (ixtiyoriy, maks. 1600)",
      degreeMajor: "Daraja va mutaxassislik",
      degreeLevel: "Ta'lim darajasi",
      major: "Mutaxassislik",
      selectMajor: "Mutaxassislikni tanlang…",
      budget: "Byudjet",
      consultingBudget: "Konsalting byudjeti",
      educationBudget: "Ta'lim byudjeti / yil",
      preferredCountries: "Afzal mamlakatlar",
      saveChanges: "Saqlash",
      cancel: "Bekor qilish",
      saved: "Saqlandi!",
    },
  },
};

export const translations: Record<Lang, Translations> = { en, ru, uz };

export function detectLanguage(): Lang {
  const saved = localStorage.getItem("lerank_lang");
  if (saved === "en" || saved === "ru" || saved === "uz") return saved;
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("ru")) return "ru";
  if (nav.startsWith("uz")) return "uz";
  return "en";
}
