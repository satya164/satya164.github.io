import type { Metadata } from 'next';

import styles from './page.module.css';

const talks = [
  {
    title: 'A peek into React Navigation 7',
    conference: 'React Native EU 2023',
    videoId: '3zvbeN_91nk',
  },
  {
    title:
      'Panel Discussion with Sanket Sahu, Aman Mittal, Evan Bacon, Satyajit Sahoo',
    conference: 'React Day Bangalore 2021',
    videoId: '_HKzhe8f47Y',
  },
  {
    title: 'React Navigation 6.x, fresh from the oven',
    conference: 'React Native EU 2021',
    videoId: 'd12Sb6LwdMs',
  },
  {
    title: 'Changes in React Navigation 5',
    conference: 'The React Native Show Podcast - Episode 4',
    videoId: 'h7WAnw3ptfk',
  },
  {
    title: 'Component First Navigation In React Native',
    conference: 'React Day Berlin 2019',
    videoId: 'rcW58vGDtTg',
  },
  {
    title: 'How to publish a React Native component library',
    conference: 'App.js Conf 2019',
    videoId: 'y3M6mD2Hv9A',
  },
  {
    title: 'Building custom renderers with react',
    conference: 'ReactFoo 2018 Pune',
    videoId: 'QoxIXKRtVGg',
  },
  {
    title: 'Building Expo Snack',
    conference: 'React Native EU 2017',
    videoId: 'j7jgoKDNX_I',
  },
];

export default async function TalksPage() {
  return (
    <main>
      <ul className={styles.videos}>
        {talks.map((talk) => (
          <li key={talk.title}>
            <h3>
              {talk.title} - {talk.conference}
            </h3>
            <iframe
              // eslint-disable-next-line @eslint-react/dom/no-unsafe-iframe-sandbox
              sandbox="allow-scripts allow-same-origin"
              className={styles.embed}
              src={`https://www.youtube.com/embed/${talk.videoId}`}
              title={talk.title}
              allowFullScreen
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Talks',
  description: 'Talks and panel discussions featuring Satyajit Sahoo',
};
