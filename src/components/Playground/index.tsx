import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import materialPalenight from './material-palenight.json';
import styles from './styles.module.css';

import clsx from 'clsx';

type Props = {
  'children': string;
  'className'?: string;
  'data-playground'?: unknown;
  'data-dependencies'?: string;
  'data-height'?: string;
};

export const Playground = ({
  className,
  children,
  'data-playground': playground,
  'data-dependencies': dependencies,
  'data-height': height,
}: Props) => {
  const template = playground === 'react' ? 'react' : 'vanilla';
  const filename = {
    react: 'App.js',
    vanilla: 'index.js',
  }[template];

  return (
    <SandpackProvider
      theme={materialPalenight}
      template={template}
      files={{
        [filename]: { code: children },
      }}
      customSetup={{
        dependencies: dependencies
          ? Object.fromEntries(
              dependencies.split(',').map((entry) => entry.split('@'))
            )
          : {},
      }}
    >
      <SandpackLayout
        className={clsx(className, styles.container)}
        style={{
          // @ts-expect-error the properties don't consider CSS variables
          '--editor-height': height || '50%',
        }}
      >
        <SandpackCodeEditor className={clsx(styles.pane, styles.editor)} />
        <SandpackPreview className={styles.pane} />
      </SandpackLayout>
    </SandpackProvider>
  );
};
