import Image from 'next/image';
import styles from './About.module.css';

import * as React from 'react';
import Link from 'next/link';

export function About() {
  return (
    <main className={styles.content}>
      <Image
        src={require('../../assets/images/avatar.jpg')}
        alt="Satyajit Sahoo"
        className={styles.avatar}
      />
      <h1 className={styles.title}>Satyajit Sahoo</h1>
      <p>
        I&apos;m a frontend developer who specializes in JavaScript, TypeScript
        and React Native. I have created and maintained many open source
        libraries such as{' '}
        <a href="https://reactnavigation.org" target="_blank" rel="noreferrer">
          React Navigation
        </a>
        ,{' '}
        <a
          href="https://reactnativepaper.com/"
          target="_blank"
          rel="noreferrer"
        >
          React Native Paper
        </a>
        ,{' '}
        <a
          href="https://callstack.github.io/react-native-builder-bob/"
          target="_blank"
          rel="noreferrer"
        >
          React Native Builder Bob
        </a>
        ,{' '}
        <a href="https://linaria.dev/" target="_blank" rel="noreferrer">
          Linaria
        </a>{' '}
        etc. When not coding, I loves cooking and playing video games.
      </p>
      <ul className={styles.links}>
        <li>
          <Link href="/posts">Blog</Link>
        </li>
        <li>
          <a
            href="https://twitter.com/satya164"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://github.com/satya164"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://dribbble.com/satya164"
            target="_blank"
            rel="noreferrer"
          >
            Dribbble
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/satya164"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </li>
      </ul>
    </main>
  );
}
