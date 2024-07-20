'use client';

import type { create } from '@orama/orama';
import type {
  Position,
  SearchResultWithHighlight,
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

const ID = {
  input: 'search-input',
  results: 'search-results',
};

export function SearchBar({ className }: Props) {
  const [status, setStatus] = React.useState<DataStatus>({ type: 'idle' });
  const [query, setQuery] = React.useState('');
  const [results, setResults] =
    React.useState<SearchResultWithHighlight<DataItem> | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [selection, setSelection] = React.useState<string | null>(null);
  const searchRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    let cleanedUp = false;

    const search = async () => {
      const db = status.type === 'success' ? status.db : null;

      if (query.trim() === '' || !db) {
        setResults(null);
        setSelection(null);
        setVisible(false);
        return;
      }

      const { searchWithHighlight } = await import(
        '@orama/plugin-match-highlight'
      );

      const results = await searchWithHighlight(db, {
        term: query,
        boost: {
          title: 3,
          description: 2,
          content: 1,
        },
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
      document.getElementById(ID.results)?.focus();
    }
  }, [visible]);

  React.useEffect(() => {
    if (selection) {
      const selected = document.getElementById(`${ID.results}-${selection}`);

      if (selected) {
        selected.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selection]);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Close the results if the user clicks outside the search area
      if (!searchRef.current?.contains(e.target as Node)) {
        setVisible(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const comboKey =
        navigator.platform === 'MacIntel' ? e.metaKey : e.ctrlKey;

      if (e.code === 'KeyK' && comboKey) {
        e.preventDefault();
        document.getElementById(ID.input)?.focus();
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':
      case 'ArrowDown':
        // Prevent the default behavior of moving the cursor
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
      case 'Enter':
        e.preventDefault();

        if (selection) {
          document.getElementById(`${ID.results}-${selection}`)?.click();
        }
        break;
      case 'Escape':
        // Prevent from clearing the input
        e.preventDefault();
        setVisible(false);
        document.getElementById(ID.input)?.blur();
        break;
      case 'Tab':
        // Don't prevent default to allow tabbing through the page
        setVisible(false);
        break;
    }
  };

  const onInputFocus = async () => {
    if (status.type !== 'idle' && status.type !== 'error') {
      return;
    }

    setStatus({ type: 'loading' });

    try {
      const response = await fetch('/data.json');

      const data: DataItem[] = await response.json();

      const { create, insert } = await import('@orama/orama');
      const { afterInsert } = await import('@orama/plugin-match-highlight');

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
            afterInsert,
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

  return (
    <search ref={searchRef} className={clsx(styles.search, className)}>
      <div className={styles.wrapper}>
        <input
          id={ID.input}
          autoCapitalize="none"
          autoComplete="off"
          aria-autocomplete="list"
          className={styles.input}
          name="q"
          type="search"
          placeholder="Type to search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={onInputFocus}
          onKeyDown={onInputKeyDown}
        />
        {status.type === 'loading' && <Spinner className={styles.loading} />}
      </div>
      <div
        aria-live="polite"
        className={clsx(styles.results, visible && styles.visible)}
      >
        {status.type === 'success' && results?.hits.length ? (
          <ul id={ID.results} role="listbox">
            {results.hits.map(({ id, document: doc, positions }) => {
              let subtitle;

              if (
                positions.description &&
                (query.toLowerCase() in positions.description ||
                  Object.keys(positions.description).length >
                    Object.keys(positions.content ?? {}).length)
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
                    id={`${ID.results}-${id}`}
                    tabIndex={-1}
                    href={`/posts/${doc.id}`}
                    onClick={() => {
                      setQuery('');
                      setVisible(false);
                      document.getElementById(ID.input)?.blur();
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
          <p className={styles.blank} role="status">
            {status.type === 'error' ? 'An error ocurred' : 'No results found'}
          </p>
        )}
      </div>
    </search>
  );
}

const highlight = (
  text: string,
  query: string,
  positions: Record<string, Position[]> | undefined
) => {
  const limit = 100;
  const all = positions
    ? Object.values(positions).reduce((acc, p) => [...acc, ...p], [])
    : [];

  let first = positions?.[query.toLowerCase()]?.[0];

  if (first == null) {
    // Sometimes positions don't include a match even though it's in the text
    // So we check against the text itself directly
    const index = text.toLowerCase().indexOf(query.toLowerCase());

    if (index > -1) {
      all.unshift({ start: index, length: query.length });
    }
  }

  if (first == null) {
    first = all[0];
  }

  if (first == null) {
    return text.slice(0, limit).trim();
  }

  // Get characters around the first match
  const additional =
    first.length > limit ? 0 : Math.round((limit - first.length) / 2);

  const start = Math.max(first.start - additional, 0);
  const matched = text
    .slice(start, start + first.length + additional * 2)
    .slice(0, limit);

  const result = all.reduce<{
    text: string;
    offset: number;
    highlighted: (string | JSX.Element)[];
  }>(
    (acc, { start, length }, index) => {
      const matches = acc.text[start - acc.offset];

      if (matches) {
        const begin = start - acc.offset;
        const end = begin + length;

        acc.highlighted.push(
          acc.text.slice(0, begin),
          // eslint-disable-next-line react/no-array-index-key
          <mark key={index}>{acc.text.slice(begin, end)}</mark>
        );
        acc.text = acc.text.slice(end);
        acc.offset += end;
      }

      return acc;
    },
    { text: matched, offset: start, highlighted: [] }
  );

  const highlighted = result.highlighted.concat(result.text);

  // If we cut the text from the beginning, add an ellipsis
  if (start > 0) {
    highlighted.unshift('…');
  }

  return highlighted;
};
