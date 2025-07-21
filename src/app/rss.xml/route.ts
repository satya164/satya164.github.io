import metadata from '../../metadata.json';
import { postsByOffset } from '../../posts/_all';

const url = process.env.NEXT_PUBLIC_SITE_URL;

export async function GET() {
  const posts = await postsByOffset(0, Infinity);

  const rss = `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${metadata.title}</title>
    <description>${metadata.description}</description>
    <link>${url}</link>
    <atom:link href="${url}/rss.xml" rel="self" type="application/rss+xml" />
${posts.items
  .map((post) => {
    return `
    <item>
      <guid>${url}/posts/${post.id}</guid>
      <link>${url}/posts/${post.id}</link>
      <title>${post.frontmatter.title}</title>
      <description>${post.frontmatter.description}</description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>
  `;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}

export const dynamic = 'force-static';
