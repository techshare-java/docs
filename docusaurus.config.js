// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TechShare Docs',
  tagline: 'Order & Subscription Management — API reference, guides, and tutorials.',
  favicon: 'img/favicon.ico',

  url: 'https://techshare-java.github.io',
  baseUrl: '/docs/',

  organizationName: 'techshare-java',
  projectName: 'docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'TechShare',
        logo: {
          alt: 'TechShare Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'API Reference',
          },
          {
            type: 'docSidebar',
            sidebarId: 'guidesSidebar',
            position: 'left',
            label: 'Guides',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialsSidebar',
            position: 'left',
            label: 'Tutorials',
          },
          {
            href: 'https://github.com/techshare-java',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'API Reference', to: '/api-reference/overview' },
              { label: 'Guides', to: '/guides/architecture' },
              { label: 'Tutorials', to: '/tutorials/getting-started' },
            ],
          },
          {
            title: 'Repositories',
            items: [
              {
                label: 'Backend (Spring Boot)',
                href: 'https://github.com/techshare-java/techshare-be',
              },
              {
                label: 'Frontend (React)',
                href: 'https://github.com/techshare-java/techshare-fe',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TechShare Workshop.`,
      },
      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['java', 'bash', 'json', 'typescript'],
      },
    }),
};

export default config;
