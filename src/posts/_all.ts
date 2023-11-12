const context = require.context('.', true, /\.mdx?$/);

type Frontmatter = {
  title: string;
  date: string;
  description: string;
};

type ReadingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};

export type Post = {
  id: string;
  content: React.ComponentType;
  frontmatter: Frontmatter;
  readingTime: ReadingTime;
};

const posts: Post[] = context
  .keys()
  .filter((key) => key.startsWith('.'))
  .map((filename) => {
    const {
      default: content,
      frontmatter,
      readingTime,
    } = context(filename) as {
      default: React.ComponentType;
      frontmatter: Frontmatter;
      readingTime: ReadingTime;
    };

    return {
      id: filename.replace(/\.mdx?$/, '').replace(/^.*\//, ''),
      content,
      frontmatter,
      readingTime,
    };
  });

export default posts;
