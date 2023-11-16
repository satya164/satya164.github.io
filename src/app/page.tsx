import Link from 'next/link';
import { PostMeta } from '../components/PostMeta';
import { postsByOffset } from '../posts/_all';
import styles from './page.module.css';

export default async function PostsPage() {
  const posts = await postsByOffset(0, 10);

  return (
    <main>
      <ul className={styles.posts}>
        {posts.items.map(({ id, frontmatter, readingTime }) => (
          <li key={id}>
            <Link href={`/posts/${id}`} className={styles.item}>
              <h2>{frontmatter.title}</h2>
              <p>{frontmatter.description}</p>
              <PostMeta date={frontmatter.date} readingTime={readingTime} />
              <div className={styles.more}>Read more</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
