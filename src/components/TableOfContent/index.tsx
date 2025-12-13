'use client';

import React, { useEffect } from 'react';

import type { Toc } from '../../posts/_all';
import styles from './styles.module.css';

type Props = {
  toc: Toc;
};

export function TableOfContent({ toc }: Props) {
  const [current, setCurrent] = React.useState<string | null>(
    toc[0]?.slug ?? null
  );

  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3, h4');
    const ids = Array.from(headings).map((heading) => heading.id);
    const visibleIds: string[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Maintain a list of visible ids by adding or removing them based on the intersection state
          if (entry.isIntersecting) {
            if (!visibleIds.includes(entry.target.id)) {
              visibleIds.push(entry.target.id);
            }
          } else {
            if (visibleIds.includes(entry.target.id)) {
              visibleIds.splice(visibleIds.indexOf(entry.target.id), 1);
            }
          }

          // Get the first visible id so that we highlight the heading at the top of the viewport
          // We get from the list of ids so that the order matches the order of the headings
          const firstVisibleId =
            ids.find((id) => visibleIds.includes(id)) ?? null;

          // Only update the current id if it has changed
          if (firstVisibleId) {
            setCurrent(firstVisibleId);
          } else {
            // If no id is visible, try to get the last heading that is above the viewport
            // This way we highlight the heading that the current section is in
            const headingAboveViewport = Array.from(headings).findLast(
              (heading) => {
                const bounding = heading.getBoundingClientRect();
                return bounding.top < 0;
              }
            );

            setCurrent(headingAboveViewport?.id ?? null);
          }
        });
      },
      {
        // Trigger when the heading is above halfway in the viewport
        rootMargin: '0px 0px -50% 0px',
      }
    );

    headings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={styles.sticky}>
      <div className={styles.container}>
        <TableOfContentItem toc={toc} current={current} />
      </div>
    </nav>
  );
}

function TableOfContentItem({
  toc,
  current,
}: {
  toc: Toc;
  current: string | null;
}) {
  return (
    <ul>
      {toc.map((item) => {
        return (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              className={item.slug === current ? styles.current : undefined}
            >
              {item.value}
            </a>
            {item.children.length > 0 && (
              <TableOfContentItem toc={item.children} current={current} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
