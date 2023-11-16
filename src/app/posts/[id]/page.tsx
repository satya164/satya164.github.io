import type { Metadata } from 'next';
import { PostMeta } from '../../../components/PostMeta';
import { SocialLinks } from '../../../components/SocialLinks';
import { allIds, postById } from '../../../posts/_all';

type Props = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params }: Props) {
  const {
    Component: PostContent,
    frontmatter,
    readingTime,
  } = await postById(params.id);

  return (
    <main>
      <article>
        <h1>{frontmatter.title}</h1>
        <PostMeta date={frontmatter.date} readingTime={readingTime} />
        <PostContent />
      </article>
      <SocialLinks />
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontmatter } = await postById(params.id);

  return {
    ...frontmatter,
    openGraph: {
      type: 'article',
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: new Date(frontmatter.date).toISOString(),
      authors: ['Satyajit Sahoo'],
    },
    twitter: {
      card: 'summary',
      title: frontmatter.title,
      description: frontmatter.description,
      creator: '@satya164',
    },
  };
}

export async function generateStaticParams() {
  return allIds().map((id) => ({ id }));
}
