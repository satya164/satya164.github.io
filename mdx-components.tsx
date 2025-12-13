import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

import { Pre } from './src/components/Pre';

const Img = ({
  src,
  ...rest
}: DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  return (
    <Image
      {...rest}
      // @ts-expect-error - we get correct type due to remark-mdx-images
      src={src}
    />
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Pre,
    img: Img,
  };
}
