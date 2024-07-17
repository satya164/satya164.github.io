import createMDX from '@next/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkGithubAdmonitions from 'remark-github-beta-blockquote-admonitions';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkMdxImages from 'remark-mdx-images';
import { remarkMdxToc } from 'remark-mdx-toc';
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
      remarkMdxToc,
      readingTime,
      readingTimeMdx,
      [
        remarkGithubAdmonitions,
        {
          classNameMaps: {
            block: (title) =>
              `admonition admonition-${title.toLowerCase().replace(/\s+/g, '-')}`,
            title: 'admonition-title',
          },
          titleTextMap: (text) => {
            const title = text.substring(2, text.length - 1);

            return {
              // Capitalize the first letter of the title
              displayTitle:
                title.charAt(0).toUpperCase() + title.slice(1).toLowerCase(),
              checkedTitle: title,
            };
          },
        },
      ],
    ],
    rehypePlugins: [
      [rehypeCodeblockMeta, { match: { playground: true } }],
      [rehypeExternalLinks, { target: '_blank' }],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap', test: ['h2', 'h3', 'h4'] }],
      [rehypePrettyCode, rehypePrettyCodeOptions],
    ],
  },
});

export default withMDX(nextConfig);
