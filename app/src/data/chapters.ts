export interface ChapterMeta {
  slug: string
  path: string
  navTitle: string
  heroTitle: string
}

export const chapters: ChapterMeta[] = [
  {
    slug: 'welcome',
    path: '/',
    navTitle: 'Welcome',
    heroTitle: '1. Introduction: Welcome to the Platform Data Primer',
  },
  {
    slug: 'foundations',
    path: '/foundations',
    navTitle: 'Data Foundations',
    heroTitle: '2. What data do platforms collect?',
  },
  {
    slug: 'api',
    path: '/api',
    navTitle: 'API Access',
    heroTitle: '3. Setting up access to platform APIs',
  },
  {
    slug: 'warehouses',
    path: '/warehouses',
    navTitle: 'Data Models',
    heroTitle: '4. How platforms organize data warehouses',
  },
  {
    slug: 'workflows',
    path: '/workflows',
    navTitle: 'Workflows',
    heroTitle: '5. From questions to SQL workflows',
  },
  {
    slug: 'harms',
    path: '/harms',
    navTitle: 'Delegated Harms',
    heroTitle: '6. Mapping datasets to Article 34 delegated harms',
  },
  {
    slug: 'datasets',
    path: '/datasets',
    navTitle: 'Researcher Datasets',
    heroTitle: '7. Publicly available transparency datasets',
  },
  {
    slug: 'comparisons',
    path: '/comparisons',
    navTitle: 'Comparisons',
    heroTitle: '8. Comparing platform access and transparency',
  },
  {
    slug: 'engage',
    path: '/engage',
    navTitle: 'Engage',
    heroTitle: '9. Continue the conversation',
  },
]
