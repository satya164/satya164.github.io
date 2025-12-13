'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import { CopyButton } from '../CopyButton';
import { Playground } from '../Playground';
import styles from './styles.module.css';

export function Pre({
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>) {
  const ref = useRef<HTMLPreElement>(null);

  if ('data-playground' in rest && rest['data-playground']) {
    if (typeof children !== 'string') {
      throw new Error(
        'Playground pre children must be a string, but received ' +
          typeof children
      );
    }

    return (
      <Playground className={className} {...rest}>
        {children}
      </Playground>
    );
  }

  return (
    <pre ref={ref} className={clsx(className, styles.pre)} {...rest}>
      {children}
      <CopyButton preRef={ref} />
    </pre>
  );
}
