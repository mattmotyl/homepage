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
    heroTitle: 'Welcome to the Platform Data Primer',
  },
  {
    slug: 'introduction',
    path: '/introduction',
    navTitle: 'Introduction',
    heroTitle: 'Introduction',
  },
  {
    slug: 'collect',
    path: '/collect',
    navTitle: 'What Platforms Collect',
    heroTitle: 'What Platforms Collect',
  },
  {
    slug: 'stored-used',
    path: '/stored-used',
    navTitle: 'How It’s Stored & Used',
    heroTitle: 'How It’s Stored & Used',
  },
  {
    slug: 'share',
    path: '/share',
    navTitle: 'What Platforms Share',
    heroTitle: 'What Platforms Share',
  },
  {
    slug: 'others-share',
    path: '/others-share',
    navTitle: 'What Others Share',
    heroTitle: 'What Others Share',
  },
  {
    slug: 'mapping',
    path: '/mapping',
    navTitle: 'Mapping Data to Concepts',
    heroTitle: 'Mapping Data to Concepts',
  },
  {
    slug: 'using-apis',
    path: '/using-apis',
    navTitle: 'Using APIs',
    heroTitle: 'Using APIs',
  },
  {
    slug: 'conclusion',
    path: '/conclusion',
    navTitle: 'Conclusion',
    heroTitle: 'Conclusion',
  },
  {
    slug: 'practice',
    path: '/practice',
    navTitle: 'Practice',
    heroTitle: 'Practice',
  },
  {
    slug: 'engage',
    path: '/engage',
    navTitle: 'Engage',
    heroTitle: 'Engage',
  },
]
