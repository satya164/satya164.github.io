const context = require.context('.', true, /\.mdx?$/);

type Frontmatter = {
  title: string;
  description: string;
};

const posts = context
  .keys()
  .filter((key) => key.startsWith('.'))
  .map((filename) => {
    const { default: content, frontmatter } = context(filename) as {
      default: React.ComponentType;
      frontmatter: Frontmatter;
    };

    return {
      id: filename.replace(/\.mdx?$/, '').replace(/^.*\//, ''),
      content,
      frontmatter,
    };
  });

export default posts;
