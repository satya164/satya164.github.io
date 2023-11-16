import { visit } from 'unist-util-visit';

/**
 * Plugin to process codeblock meta
 *
 * @param {{ match: { [key: string]: string }, element: JSX.ElementType }} options
 */
export default function rehypeCodeblockMeta(options) {
  if (!options?.match) {
    throw new Error('rehype-codeblock-meta: `match` option is required');
  }

  return (tree) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName === 'pre' &&
        node.children?.length === 1 &&
        node.children[0].tagName === 'code'
      ) {
        const codeblock = node.children[0];
        const meta = codeblock.data?.meta;

        if (meta) {
          const attributes = meta.split(' ').reduce((acc, attribute) => {
            const [key, value = 'true'] = attribute.split('=');

            return Object.assign(acc, {
              [`data-${key}`]: value.replace(/^"(.+(?="$))"$/, '$1'),
            });
          }, {});

          if (
            Object.entries(options.match).some(([key, value]) => {
              if (value === true) {
                return attributes[`data-${key}`];
              } else {
                return attributes[`data-${key}`] === value;
              }
            })
          ) {
            Object.assign(node.properties, attributes);

            node.tagName = options.element || 'pre';
            node.children = codeblock.children;
          }
        }
      }
    });
  };
}
