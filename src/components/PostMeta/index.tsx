import type { ReadingTime } from '../../posts/_all';
import styles from './styles.module.css';

type Props = {
  date: string;
  readingTime: ReadingTime;
};

export default function PostMeta({ date, readingTime }: Props) {
  return (
    <div className={styles.meta}>
      <span>{readingTime.text}</span>
      <time dateTime={date}>
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(date))}
      </time>
    </div>
  );
}
