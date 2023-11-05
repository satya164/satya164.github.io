const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true,
  readingTime: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
};

module.exports = withNextra(nextConfig);
