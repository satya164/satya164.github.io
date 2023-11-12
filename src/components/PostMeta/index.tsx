import type { Post } from '../../posts/_all';
import styles from './styles.module.css';

type Props = {
  post: Post;
};

export default function PostMeta({ post }: Props) {
  const { frontmatter, readingTime } = post;

  return (
    <div className={styles.meta}>
      <span>{readingTime.text}</span>
      <time dateTime={frontmatter.date}>
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(frontmatter.date))}
      </time>
    </div>
  );
}
