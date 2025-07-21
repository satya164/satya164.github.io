import type { MetadataRoute } from 'next';
import { postsByOffset } from '../posts/_all';

const url = process.env.NEXT_PUBLIC_SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await postsByOffset(0, Infinity);

  return posts.items.map(({ id, frontmatter }) => ({
    url: `${url}/posts/${id}`,
    lastModified: new Date(frontmatter.date),
  }));
}

export const dynamic = 'force-static';
