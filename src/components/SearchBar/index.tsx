'use client';

import { create, insert } from '@orama/orama';
import {
  afterInsert as highlightAfterInsert,
  searchWithHighlight,
  type Position,
  type SearchResultWithHighlight,
} from '@orama/plugin-match-highlight';
import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import { Spinner } from '../Spinner';
import styles from './styles.module.css';

type Props = {
  className?: string;
};

type DataItem = {
  id: string;
  title: string;
  description: string;
  content: string;
};

type DataStatus =
  | { type: 'idle' }
  | { type: 'loading' }
  | {
      type: 'success';
      db: Awaited<ReturnType<typeof create<DataItem>>>;
    }
  | {
      type: 'error';
      error: unknown;
    };

export function SearchBar({ className }: Props) {
  const [status, setStatus] = React.useState<DataStatus>({ type: 'idle' });
  const [query, setQuery] = React.useState('');
  const [results, setResults] =
    React.useState<SearchResultWithHighlight<DataItem> | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [selection, setSelection] = React.useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setStatus({ type: 'loading' });

      try {
        const response = await fetch('/data.json', {
          signal: controller.signal,
        });

        const data: DataItem[] = await response.json();

        const db = await create({
          schema: {
            id: 'string',
            title: 'string',
            description: 'string',
            content: 'string',
          },
          plugins: [
            {
              name: 'highlight',
              afterInsert: highlightAfterInsert,
            },
          ],
        });

        data.forEach((item) => {
          // @ts-expect-error figure out how to type this
          insert(db, item);
        });

        setStatus({ type: 'success', db });
      } catch (error) {
        console.error(error);

        setStatus({ type: 'error', error });
      }
    };

    fetchData();

    return () => {
      controller.abort('Component unmounted');
    };
  }, []);

  React.useEffect(() => {
    let cleanedUp = false;

    const search = async () => {
      if (query.trim() === '') {
        setResults(null);
        setSelection(null);
        setVisible(false);
        return;
      }

      const db = status.type === 'success' ? status.db : null;

      if (!db) {
        return;
      }

      const results = await searchWithHighlight(db, {
        term: query,
      });

      if (cleanedUp) {
        return;
      }

      setResults(results);
      setSelection(results.hits[0]?.id ?? null);
      setVisible(true);
    };

    if (status.type === 'success') {
      search();
    }

    return () => {
      cleanedUp = true;
    };
  }, [query, status]);

  React.useEffect(() => {
    if (visible) {
      document.getElementById('search-results')?.focus();
    }
  }, [visible]);

  React.useEffect(() => {
    if (selection) {
      const selected = document.getElementById(`search-result-${selection}`);

      if (selected) {
        selected.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selection]);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Close the results if the user clicks outside the form
      if (!formRef.current?.contains(e.target as Node)) {
        setVisible(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const comboKey =
        navigator.platform === 'MacIntel' ? e.metaKey : e.ctrlKey;

      if (e.code === 'KeyK' && comboKey) {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const onInputKeyUp = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':
      case 'ArrowDown':
        e.preventDefault();

        if (results?.hits.length) {
          const index = results.hits.findIndex((hit) => hit.id === selection);
          const nextId =
            results.hits[index + (e.key === 'ArrowUp' ? -1 : 1)]?.id;

          if (nextId) {
            setSelection(nextId);
          }
        }

        break;
    }
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case 'Tab':
        setVisible(false);
        break;
      case 'Escape':
        // Prevent from clearing the input
        e.preventDefault();
        setVisible(false);
        document.getElementById('search-input')?.blur();
        break;
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selection) {
      document.getElementById(`search-result-${selection}`)?.click();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      className={clsx(styles.container, className)}
    >
      <input
        id="search-input"
        aria-owns="search-results"
        autoCapitalize="none"
        autoComplete="off"
        aria-autocomplete="list"
        className={styles.input}
        name="q"
        type="search"
        placeholder="Type to search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={onInputKeyUp}
        onKeyDown={onInputKeyDown}
      />
      {status.type === 'loading' && <Spinner className={styles.loading} />}
      <div className={clsx(styles.results, visible && styles.visible)}>
        {status.type === 'success' && results?.hits.length ? (
          <ul id="search-results" role="listbox">
            {results.hits.map(({ id, document: doc, positions }) => {
              let subtitle;

              if (
                positions.description &&
                query.toLowerCase() in positions.description
              ) {
                subtitle = highlight(
                  doc.description,
                  query,
                  positions.description
                );
              } else {
                subtitle = highlight(doc.content, query, positions.content);
              }

              const title = highlight(doc.title, query, positions.title);

              return (
                <li
                  key={id}
                  role="option"
                  tabIndex={-1}
                  aria-selected={selection === id ? 'true' : 'false'}
                  className={selection === id ? styles.selected : ''}
                >
                  <Link
                    id={`search-result-${id}`}
                    tabIndex={-1}
                    href={`/posts/${doc.id}`}
                    onClick={() => {
                      setQuery('');
                      setVisible(false);
                      document.getElementById('search-input')?.blur();
                    }}
                    onMouseOver={() => setSelection(id)}
                  >
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={styles.blank} aria-live="polite" role="status">
            {status.type === 'error' ? 'An error ocurred' : 'No results found'}
          </p>
        )}
      </div>
    </form>
  );
}

const highlight = (
  text: string,
  query: string,
  positions: Record<string, Position[]> | undefined
) => {
  const position = positions?.[query.toLowerCase()];
  const limit = 90;

  if (position == null || !position[0]) {
    return text.slice(0, limit).trim();
  }

  // Get characters around the first match
  const additional =
    position[0].length > limit
      ? 0
      : Math.round((limit - position[0].length) / 2);

  const start = Math.max(position[0].start - additional, 0);
  const matched = text
    .slice(start, start + position[0].length + additional * 2)
    .slice(0, limit);

  const result = position.reduce<{
    text: string;
    offset: number;
    highlighted: (string | JSX.Element)[];
  }>(
    (acc, { start, length }, index) => {
      const matches = acc.text[start - acc.offset];

      if (matches) {
        acc.highlighted.push(
          acc.text.slice(0, start - acc.offset),
          // eslint-disable-next-line react/no-array-index-key
          <mark key={index}>
            {acc.text.slice(start - acc.offset, start - acc.offset + length)}
          </mark>
        );
        acc.text = acc.text.slice(start - acc.offset + length);
        acc.offset = start - acc.offset + length;
      }

      return acc;
    },
    { text: matched, offset: start, highlighted: [] }
  );

  const highlighted = result.highlighted.concat(result.text);

  // If we cut the text, add an ellipsis
  if (position[0].start - additional > 0) {
    highlighted.unshift('…');
  }

  return highlighted;
};
