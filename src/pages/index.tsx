import * as React from 'react';
import { About } from '../components/About/About';
import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About me!</title>
      </Head>
      <About />
    </>
  );
}
