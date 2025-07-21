import { remark } from 'remark';
import strip from 'strip-markdown';

const context = require.context(
  '!!raw-loader!../../posts',
  true,
  /page\.mdx?$/,
  'lazy'
);

export async function GET() {
  const posts = await Promise.all(
    context
      .keys()
      .filter((key) => key.startsWith('.'))
      .map(async (filename) => {
        const name = filename.replace(/^\.\//, '').replace(/\/page\.mdx?$/, '');
        const id = name.replace(/^\d+-/, '');

        const { default: content } = await context(filename);

        const frontmatter = content
          .split('---')[1]
          ?.trim()
          .split('\n')
          .reduce((acc: Record<string, string>, line: string) => {
            const [key, value] = line.split(':');

            if (!key || !value) {
              throw new Error(`Invalid frontmatter line: ${line}`);
            }

            acc[key] = value.trim();
            return acc;
          }, {});

        if (!frontmatter) {
          throw new Error(`Frontmatter not found in ${filename}`);
        }

        const processed = await remark()
          .use(strip)
          .process(content.split('---')[2]);

        return {
          id,
          title: frontmatter.title,
          description: frontmatter.description,
          content: processed.value,
        };
      })
  );

  return new Response(JSON.stringify(posts), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const dynamic = 'force-static';
