'use client';

import { getSandpackCssText } from '@codesandbox/sandpack-react';
import { useServerInsertedHTML } from 'next/navigation';

export default function StyleRegistry() {
  useServerInsertedHTML(() => {
    return (
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
        id="sandpack"
      />
    );
  });

  return null;
}
