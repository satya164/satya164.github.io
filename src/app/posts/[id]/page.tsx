import type { Metadata } from 'next';
import { PostMeta } from '../../../components/PostMeta';
import { SocialLinks } from '../../../components/SocialLinks';
import { TableOfContent } from '../../../components/TableOfContent';
import metadata from '../../../metadata.json';
import { allIds, postById } from '../../../posts/_all';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  const {
    Component: PostContent,
    frontmatter,
    toc,
    readingTime,
  } = await postById(id);

  return (
    <main>
      <article>
        <TableOfContent toc={toc} />
        <h1>{frontmatter.title}</h1>
        <PostMeta date={frontmatter.date} readingTime={readingTime} />
        <PostContent />
      </article>
      <SocialLinks />
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { frontmatter } = await postById(id);

  return {
    ...frontmatter,
    openGraph: {
      type: 'article',
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: new Date(frontmatter.date).toISOString(),
      authors: [metadata.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      creator: `@${metadata.author.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return allIds().map((id) => ({ id }));
}
