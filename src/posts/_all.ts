import GithubSlugger from 'github-slugger';

const context = import.meta.webpackContext('.', {
  regExp: /page\.mdx?$/,
  recursive: true,
});

export type Frontmatter = {
  title: string;
  date: string;
  description: string;
};

export type ReadingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};

export type Toc = TocItem[];

type TocItem = {
  depth: number;
  value: string;
  slug: string;
  children: TocItem[];
};

type PostModule = {
  default: React.ComponentType;
  frontmatter: Frontmatter;
  toc: Toc;
  readingTime: ReadingTime;
};

export async function postsByOffset(offset: number, limit: number) {
  const items = await Promise.all(
    posts.slice(offset, offset + limit).map((post) => post.load())
  );

  return {
    items,
    limit,
    offset,
    total: posts.length,
  };
}

export async function postById(id: string) {
  const post = posts.find((post) => post.id === id);

  if (!post) {
    throw new Error(`Post not found: ${id}`);
  }

  return post.load();
}

export function allIds() {
  return posts.map((post) => post.id);
}

const posts = context
  .keys()
  .filter((key) => key.startsWith('.'))
  .map((filename) => {
    const name = filename.replace(/^\.\//, '').replace(/\/page\.mdx?$/, '');
    const id = name.replace(/^\d+-/, '');
    const index = Number(name.replace(/-.*$/, ''));

    if (isNaN(index)) {
      throw new Error(`Invalid index in filename: ${filename}`);
    }

    if (id === '') {
      throw new Error(`Invalid id in filename: ${filename}`);
    }

    return {
      id,
      index,
      filename,
      async load() {
        const { default: Component, ...meta } = (await context(
          filename
        )) as PostModule;

        const slugger = new GithubSlugger();
        const slugify = (toc: TocItem): TocItem => {
          const slug = slugger.slug(toc.value);

          return {
            ...toc,
            slug,
            children: toc.children.map(slugify),
          };
        };

        return {
          ...meta,
          toc: meta.toc.map(slugify),
          id,
          Component,
        };
      },
    };
  })
  .sort((a, b) => b.index - a.index);

posts.forEach((post, i) => {
  if (posts.findIndex((p) => p.index === post.index) !== i) {
    throw new Error(`Duplicate index: ${post.index} for ${post.filename}`);
  }

  if (posts.findIndex((p) => p.id === post.id) !== i) {
    throw new Error(`Duplicate id: ${post.id} for ${post.filename}`);
  }
});
