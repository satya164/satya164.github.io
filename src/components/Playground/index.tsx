import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import clsx from 'clsx';
import materialPalenight from './material-palenight.json';
import styles from './styles.module.css';

type Props = {
  'children': string;
  'className'?: string;
  'data-playground'?: unknown;
  'data-preview'?: string;
  'data-dependencies'?: string;
  'data-editor-height'?: string;
  'data-preview-height'?: string;
};

export const Playground = ({
  className,
  children,
  'data-playground': playground,
  'data-preview': preview,
  'data-dependencies': dependencies,
  'data-editor-height': editorHeight,
  'data-preview-height': previewHeight,
}: Props) => {
  const template = playground === 'react' ? 'react' : 'vanilla';
  const filename = {
    react: 'App.js',
    vanilla: 'index.js',
  }[template];

  const editorVisible = preview !== 'true';

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
          '--editor-height':
            editorHeight || (editorVisible ? 'var(--sp-layout-height)' : '0'),
          '--preview-height': previewHeight || 'var(--sp-layout-height)',
        }}
      >
        {editorVisible && (
          <SandpackCodeEditor className={clsx(styles.pane, styles.editor)} />
        )}
        <SandpackPreview
          showOpenInCodeSandbox={editorVisible}
          showRefreshButton={editorVisible}
          className={clsx(styles.pane, styles.preview)}
        />
      </SandpackLayout>
    </SandpackProvider>
  );
};
