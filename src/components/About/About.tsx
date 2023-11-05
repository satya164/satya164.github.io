import Image from 'next/image';
import styles from './About.module.css';

import * as React from 'react';

const links = [
  {
    title: 'Twitter',
    href: 'https://twitter.com/satya164',
  },
  {
    title: 'GitHub',
    href: 'https://github.com/satya164',
  },
  {
    title: 'Dribbble',
    href: 'https://dribbble.com/satya164',
  },
  {
    title: 'Instagram',
    href: 'https://instagram.com/satya164',
  },
];

const projects = [
  {
    title: 'React Navigation',
    href: 'https://reactnavigation.org',
  },
  {
    title: 'React Native Paper',
    href: 'https://reactnativepaper.com',
  },
  {
    title: 'React Native Builder Bob',
    href: 'https://callstack.github.io/react-native-builder-bob',
  },
  {
    title: 'Linaria',
    href: 'https://linaria.dev',
  },
];

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
        {projects.map((project) => (
          <>
            <a
              key={project.href}
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              {project.title}
            </a>
            ,{' '}
          </>
        ))}
        etc. When not coding, I loves cooking and playing video games.
      </p>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
