import path from 'path';
import fs from 'fs';
import fm from 'front-matter';
import { z } from 'zod';
import Link from 'next/link';
import styles from './page.module.css';

const schema = z.object({
  title: z.string(),
  description: z.string(),
});

async function getPosts() {
  const root = path.join(process.cwd(), 'src', 'app');

  const dirs = await fs.promises.readdir(path.join(root, 'posts'));
  const posts = await Promise.all(
    dirs
      .filter((dir) => {
        const dirpath = path.join(root, 'posts', dir);

        return fs.statSync(dirpath).isDirectory();
      })
      .map(async (dir) => {
        const post = await fs.promises.readFile(
          path.join(root, 'posts', dir, 'page.md'),
          'utf-8'
        );

        const { attributes } = fm(post);

        return {
          ...schema.parse(attributes),
          href: `/posts/${dir}`,
        };
      })
  );

  return posts;
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main>
      <ul className={styles.posts}>
        {posts.map((post) => (
          <li key={post.href}>
            <Link href={post.href} className={styles.item}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <div className={styles.more}>Read more</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
