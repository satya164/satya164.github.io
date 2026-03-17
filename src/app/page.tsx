import Image from 'next/image';
import Link from 'next/link';

import avatar from '../assets/images/avatar-small.jpg';
import { PostMeta } from '../components/PostMeta';
import metadata from '../metadata.json';
import { postsByOffset } from '../posts/_all';
import styles from './page.module.css';

export default async function PostsPage() {
  const posts = await postsByOffset(0, 10);

  return (
    <main>
      <Link href="/about" className={styles.intro}>
        <Image src={avatar} alt="Avatar" className={styles.avatar} />
        <div>
          <div className={styles.name}>{metadata.author.name}</div>
          <div className={styles.tagline}>
            Writing about code and things I find interesting
          </div>
        </div>
      </Link>
      <ul className={styles.posts}>
        {posts.items.map(({ id, frontmatter, readingTime }) => (
          <li key={id} className={styles.item}>
            <Link href={`/posts/${id}`} className={styles.link}>
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
