import { micromark } from 'micromark';
import { frontmatter, frontmatterHtml } from 'micromark-extension-frontmatter';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { mdx } from 'micromark-extension-mdx';
import metadata from '../../metadata.json';
import { index } from '../../posts/_all';

const url = process.env.NEXT_PUBLIC_SITE_URL;

export async function GET() {
  const posts = await index();

  const rss = `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${metadata.title}</title>
    <description>${metadata.description}</description>
    <link>${url}</link>
    <atom:link href="${url}/rss.xml" rel="self" type="application/rss+xml" />
${(
  await Promise.all(
    posts.map(async ({ load, text }) => {
      const post = await load();
      const html = micromark(await text(), {
        extensions: [gfm(), mdx(), frontmatter()],
        htmlExtensions: [gfmHtml(), frontmatterHtml()],
      });

      return `
    <item>
      <guid>${url}/posts/${post.id}</guid>
      <link>${url}/posts/${post.id}</link>
      <title>${post.frontmatter.title}</title>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${html}]]></description>
    </item>`;
    })
  )
).join('\n')}
  </channel>
</rss>
  `;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
