import { postsByOffset } from '../../posts/_all';

const url = process.env.NEXT_PUBLIC_SITE_URL;

const links = [{ href: '/' }, { href: '/about' }, { href: '/talks' }] as const;

export async function GET() {
  const posts = await postsByOffset(0, Infinity);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...links, ...posts.items.map(({ id }) => ({ href: `/posts/${id}` }))]
    .map(({ href }) => {
      return `
  <url>
    <loc>${`${url}${href}`}</loc>
  </url>
    `;
    })
    .join('')}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

export const dynamic = 'force-static';
