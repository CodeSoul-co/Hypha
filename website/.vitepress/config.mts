import { defineConfig, type DefaultTheme } from 'vitepress';

const release = '1.0.1';

export default defineConfig({
  base: '/Hypha/',
  appearance: false,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: 'https://codesoul-co.github.io/Hypha/' },
  head: [
    ['link', { rel: 'icon', href: '/Hypha/hypha-logo.png' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    [
      'meta',
      { property: 'og:image', content: 'https://codesoul-co.github.io/Hypha/hypha-logo.png' },
    ],
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
      { text: 'API', link: '/api/' },
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
            { text: 'Development workflow', link: '/guide/development-workflow' },
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Feature map', link: '/guide/capability-map' },
            { text: 'Control an FSM', link: '/guide/fsm-control' },
            { text: 'Compose a full system', link: '/guide/full-system' },
            { text: 'Runnable examples', link: '/guide/examples' },
          ],
        },
      ],
      '/packages/': packageSidebar('Package reference'),
      '/api/': apiSidebar('Complete API'),
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
      { text: 'API', link: '/zh/api/' },
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
            { text: '开发与发布流程', link: '/zh/guide/development-workflow' },
            { text: '系统架构', link: '/zh/guide/architecture' },
            { text: '逐功能地图', link: '/zh/guide/capability-map' },
            { text: '控制 FSM', link: '/zh/guide/fsm-control' },
            { text: '组合完整系统', link: '/zh/guide/full-system' },
            { text: '可运行示例', link: '/zh/guide/examples' },
          ],
        },
      ],
      '/zh/packages/': packageSidebar('模块参考', '/zh'),
      '/zh/api/': apiSidebar('完整 API', '/zh'),
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

function apiSidebar(title: string, prefix = ''): DefaultTheme.SidebarItem[] {
  return [
    {
      text: title,
      items: [{ text: 'Overview / 总览', link: `${prefix}/api/` }],
    },
    {
      text: 'Contracts & execution',
      collapsed: false,
      items: [
        { text: 'Core', link: `${prefix}/api/core` },
        { text: 'Storage', link: `${prefix}/api/storage` },
        { text: 'FSM', link: `${prefix}/api/fsm` },
        { text: 'Kernel', link: `${prefix}/api/kernel` },
        { text: 'Harness', link: `${prefix}/api/harness` },
      ],
    },
    {
      text: 'Intelligence & capabilities',
      collapsed: true,
      items: [
        { text: 'Models', link: `${prefix}/api/models` },
        { text: 'Inference', link: `${prefix}/api/inference` },
        { text: 'Memory', link: `${prefix}/api/memory` },
        { text: 'Skills', link: `${prefix}/api/skills` },
        { text: 'Tools', link: `${prefix}/api/tools` },
        { text: 'MCP', link: `${prefix}/api/mcp` },
      ],
    },
    {
      text: 'Composition & operations',
      collapsed: true,
      items: [
        { text: 'Domain', link: `${prefix}/api/domain` },
        { text: 'Adapters Local', link: `${prefix}/api/adapters-local` },
        { text: 'Serving Cache', link: `${prefix}/api/serving-cache` },
        { text: 'Testing', link: `${prefix}/api/testing` },
      ],
    },
  ];
}

function packageSidebar(title: string, prefix = ''): DefaultTheme.SidebarItem[] {
  return [
    {
      text: title,
      items: [{ text: 'Overview / 总览', link: `${prefix}/packages/` }],
    },
    {
      text: 'Contracts / 契约',
      collapsed: false,
      items: [
        { text: 'Core', link: `${prefix}/packages/core` },
        { text: 'Storage', link: `${prefix}/packages/storage` },
      ],
    },
    {
      text: 'Execution / 执行',
      collapsed: false,
      items: [
        { text: 'FSM', link: `${prefix}/packages/fsm` },
        { text: 'Kernel', link: `${prefix}/packages/kernel` },
        { text: 'Harness', link: `${prefix}/packages/harness` },
      ],
    },
    {
      text: 'Intelligence / 推理',
      collapsed: true,
      items: [
        { text: 'Models', link: `${prefix}/packages/models` },
        { text: 'Inference', link: `${prefix}/packages/inference` },
      ],
    },
    {
      text: 'Capabilities / 能力',
      collapsed: true,
      items: [
        { text: 'Memory', link: `${prefix}/packages/memory` },
        { text: 'Skills', link: `${prefix}/packages/skills` },
        { text: 'Tools', link: `${prefix}/packages/tools` },
        { text: 'MCP', link: `${prefix}/packages/mcp` },
      ],
    },
    {
      text: 'Composition / 组合',
      collapsed: true,
      items: [
        { text: 'Domain', link: `${prefix}/packages/domain` },
        { text: 'Adapters Local', link: `${prefix}/packages/adapters-local` },
        { text: 'Serving Cache', link: `${prefix}/packages/serving-cache` },
        { text: 'Testing', link: `${prefix}/packages/testing` },
      ],
    },
  ];
}
