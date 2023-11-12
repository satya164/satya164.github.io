import Link from 'next/link';
import posts from '../posts/_all';
import styles from './page.module.css';

export default async function PostsPage() {
  return (
    <main>
      <ul className={styles.posts}>
        {posts.map(({ id, frontmatter }) => (
          <li key={id}>
            <Link href={`/posts/${id}`} className={styles.item}>
              <h2>{frontmatter.title}</h2>
              <p>{frontmatter.description}</p>
              <div className={styles.more}>Read more</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
