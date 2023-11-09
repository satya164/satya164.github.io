'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { CopyButton } from '../CopyButton';
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

  return (
    <pre ref={ref} className={clsx(className, styles.pre)} {...rest}>
      {children}
      <CopyButton preRef={ref} />
    </pre>
  );
}
