import Link from 'next/link';
import posts from '../posts/_all';
import styles from './page.module.css';
import PostMeta from '../components/PostMeta';

export default async function PostsPage() {
  return (
    <main>
      <ul className={styles.posts}>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} className={styles.item}>
              <h2>{post.frontmatter.title}</h2>
              <p>{post.frontmatter.description}</p>
              <PostMeta post={post} />
              <div className={styles.more}>Read more</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
