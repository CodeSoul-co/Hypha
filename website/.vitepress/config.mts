import { defineConfig, type DefaultTheme } from 'vitepress';

const release = '1.0.1';

export default defineConfig({
  base: '/Hypha/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: 'https://codesoul-co.github.io/Hypha/' },
  head: [
    ['link', { rel: 'icon', href: '/Hypha/hypha-logo.png' }],
    ['meta', { name: 'theme-color', content: '#0c332b' }],
    ['meta', { property: 'og:image', content: 'https://codesoul-co.github.io/Hypha/hypha-logo.png' }],
  ],
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'Hypha',
      description: 'Technical documentation for building event-first ReAct + FSM agent systems.',
      themeConfig: englishTheme(),
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'Hypha',
      description: '用于搭建 Event-first ReAct + FSM Agent 系统的技术文档。',
      themeConfig: chineseTheme(),
    },
  },
  themeConfig: englishTheme(),
});

function sharedTheme(): DefaultTheme.Config {
  return {
    logo: '/hypha-logo.png',
    siteTitle: 'HYPHA / DOCS',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/CodeSoul-co/Hypha' }],
  };
}

function englishTheme(): DefaultTheme.Config {
  return {
    ...sharedTheme(),
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Packages', link: '/packages/' },
      { text: 'Examples', link: '/guide/examples' },
      { text: `v${release}`, link: 'https://github.com/CodeSoul-co/Hypha/releases/tag/v1.0.1' },
      { text: 'Official site ↗', link: 'https://hypha.code-soul.com/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Build with Hypha',
          items: [
            { text: 'Get started', link: '/guide/getting-started' },
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Control an FSM', link: '/guide/fsm-control' },
            { text: 'Compose a full system', link: '/guide/full-system' },
            { text: 'Runnable examples', link: '/guide/examples' },
          ],
        },
      ],
      '/packages/': packageSidebar('Package reference'),
    },
    outline: { label: 'On this page', level: [2, 3] },
    docFooter: { prev: 'Previous', next: 'Next' },
    lastUpdated: { text: 'Last updated' },
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Appearance',
    langMenuLabel: 'Change language',
  };
}

function chineseTheme(): DefaultTheme.Config {
  return {
    ...sharedTheme(),
    nav: [
      { text: '指南', link: '/zh/guide/getting-started' },
      { text: '模块', link: '/zh/packages/' },
      { text: '示例', link: '/zh/guide/examples' },
      { text: `v${release}`, link: 'https://github.com/CodeSoul-co/Hypha/releases/tag/v1.0.1' },
      { text: '官方网站 ↗', link: 'https://hypha.code-soul.com/' },
    ],
    sidebar: {
      '/zh/guide/': [
        {
          text: '使用 Hypha 搭建系统',
          items: [
            { text: '快速开始', link: '/zh/guide/getting-started' },
            { text: '系统架构', link: '/zh/guide/architecture' },
            { text: '控制 FSM', link: '/zh/guide/fsm-control' },
            { text: '组合完整系统', link: '/zh/guide/full-system' },
            { text: '可运行示例', link: '/zh/guide/examples' },
          ],
        },
      ],
      '/zh/packages/': packageSidebar('模块参考', '/zh'),
    },
    outline: { label: '本页内容', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '最后更新' },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',
    langMenuLabel: '切换语言',
  };
}

function packageSidebar(title: string, prefix = ''): DefaultTheme.SidebarItem[] {
  return [
    {
      text: title,
      items: [
        { text: 'Overview / 总览', link: `${prefix}/packages/` },
        { text: 'Core & Storage', link: `${prefix}/packages/contracts` },
        { text: 'FSM, Kernel & Harness', link: `${prefix}/packages/execution` },
        { text: 'Models & Inference', link: `${prefix}/packages/intelligence` },
        { text: 'Memory, Skills, Tools & MCP', link: `${prefix}/packages/capabilities` },
        { text: 'Domain, Local, Cache & Testing', link: `${prefix}/packages/product-runtime` },
      ],
    },
  ];
}
