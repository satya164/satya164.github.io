/* eslint-disable @next/next/no-img-element */

import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { join } from 'path';
import { loadGoogleFont } from '../../../helpers/loadGoogleFont';
import metadata from '../../../metadata.json';
import { allIds, postById } from '../../../posts/_all';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { id } = await params;
  const { frontmatter } = await postById(id);

  const avatarData = await readFile(
    join(process.cwd(), 'src/assets/images/avatar-small.jpg')
  );

  const avatarSrc = Uint8Array.from(avatarData).buffer;

  const [arvo, lato] = await Promise.all([
    loadGoogleFont('Arvo'),
    loadGoogleFont('Lato'),
  ]);

  return new ImageResponse(
    (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.blog}>{metadata.title}</div>
          <img
            style={styles.avatar}
            alt={metadata.author.name}
            // @ts-expect-error we need to pass array buffer for og preview
            src={avatarSrc}
          />
        </div>
        <div style={styles.spacer} />
        <div style={styles.title}>{frontmatter.title}</div>
      </div>
    ),
    {
      ...size,
      fonts: [arvo, lato],
    }
  );
}

export const contentType = 'image/png';

export const size = {
  width: 1200,
  height: 630,
};

export async function generateStaticParams() {
  return allIds().map((id) => ({ id }));
}

export const dynamic = 'force-static';

const styles = {
  container: {
    color: '#bbbed6',
    background: '#2a2d3d',
    width: '100%',
    height: '100%',
    padding: 48,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blog: {
    fontSize: 48,
    fontFamily: 'Lato',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    borderWidth: 2,
    borderColor: 'currentColor',
    borderStyle: 'solid',
  },
  title: {
    fontSize: 96,
    fontFamily: 'Arvo',
    fontWeight: 'bold',
    // Twitter overlaps the title on top of the image
    // So we add some margin to the bottom to avoid that
    marginBottom: 96,
  },
  spacer: {
    flex: 1,
  },
} as const;
