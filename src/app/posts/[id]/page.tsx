import type { Metadata } from 'next';
import { SocialLinks } from '../../../components/SocialLinks';
import posts from '../../../posts/_all';
import PostMeta from '../../../components/PostMeta';

type Props = {
  params: {
    id: string;
  };
};

export default function PostPage({ params }: Props) {
  const post = posts.find((post) => post.id === params.id);

  if (post == null) {
    throw new Error(`Post not found: ${params.id}`);
  }

  const { content: PostContent, frontmatter } = post;

  return (
    <main>
      <article>
        <h1>{frontmatter.title}</h1>
        <PostMeta post={post} />
        <PostContent />
      </article>
      <SocialLinks />
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts.find((post) => post.id === params.id);

  if (post == null) {
    throw new Error(`Post not found: ${params.id}`);
  }

  return post.frontmatter;
}

export async function generateStaticParams() {
  return posts.map(({ id }) => ({ id }));
}
