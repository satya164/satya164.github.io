import createMDX from '@next/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkMdxImages from 'remark-mdx-images';
import readingTime from 'remark-reading-time';
import readingTimeMdx from 'remark-reading-time/mdx.js';
import rehypeCodeblockMeta from './src/plugins/rehype-codeblock-meta.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  cleanDistDir: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    typedRoutes: true,
  },
};

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  theme: 'material-theme-palenight',
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    format: 'mdx',
    remarkPlugins: [
      remarkGfm,
      remarkMdxImages,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      readingTime,
      readingTimeMdx,
    ],
    rehypePlugins: [
      [rehypeCodeblockMeta, { match: { playground: true } }],
      [rehypeExternalLinks, { target: '_blank' }],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap', test: ['h2', 'h3'] }],
      [rehypePrettyCode, rehypePrettyCodeOptions],
    ],
  },
});

export default withMDX(nextConfig);
