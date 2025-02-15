import createMDX from '@next/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkGithubAdmonitions from 'remark-github-beta-blockquote-admonitions';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { remarkMdxToc } from 'remark-mdx-toc';
import readingTime from 'remark-reading-time';
import readingTimeMdx from 'remark-reading-time/mdx.js';
import { visit } from 'unist-util-visit';
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
  webpack: (webpackConfig, { dev, isServer }) => {
    webpackConfig.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/media/',
            outputPath: `${dev ? '' : '../'}${isServer ? '../' : ''}static/media/`,
            name: '[name].[hash:8].[ext]',
          },
        },
      ],
    });

    return webpackConfig;
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
      () => (tree) => {
        // Replace MDX video elements with native video elements
        // This is necessary so that rehype-mdx-import-media can handle them
        visit(tree, 'mdxJsxFlowElement', (node) => {
          if (
            node.name === 'video' &&
            node.attributes.find(
              (attr) => attr.name === 'src' && attr.value.endsWith('.mp4')
            )
          ) {
            node.type = 'element';
            node.data = {
              hName: 'video',
              hProperties: Object.fromEntries(
                node.attributes.map((attr) => [
                  attr.name,
                  attr.value === null ? true : attr.value,
                ])
              ),
            };

            delete node.attributes;
            delete node.children;
          }
        });
      },
    ],
    rehypePlugins: [
      rehypeMdxImportMedia,
      [rehypeCodeblockMeta, { match: { playground: true } }],
      [rehypeExternalLinks, { target: '_blank' }],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap', test: ['h2', 'h3', 'h4'] }],
      [rehypePrettyCode, rehypePrettyCodeOptions],
    ],
  },
});

export default withMDX(nextConfig);
