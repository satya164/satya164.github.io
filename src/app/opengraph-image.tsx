import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { join } from 'path';

import { loadGoogleFont } from '../helpers/loadGoogleFont';
import metadata from '../metadata.json';

export default async function Image() {
  const avatarData = await readFile(
    join(process.cwd(), 'src/assets/images/avatar.jpg')
  );

  const avatarSrc = Uint8Array.from(avatarData).buffer;

  const arvo = await loadGoogleFont('Arvo');

  return new ImageResponse(
    <div style={styles.container}>
      <img
        style={styles.avatar}
        alt={metadata.author.name}
        // @ts-expect-error we need to pass array buffer for og preview
        src={avatarSrc}
      />
      <div style={styles.title}>{metadata.title}</div>
    </div>,
    {
      ...size,
      fonts: [arvo],
    }
  );
}

export const contentType = 'image/png';

export const size = {
  width: 1200,
  height: 630,
};

export const dynamic = 'force-static';

const styles = {
  container: {
    color: '#bbbed6',
    background: '#2a2d3d',
    width: '100%',
    height: '100%',
    padding: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Arvo',
    fontSize: 96,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: '50%',
    borderWidth: 2,
    borderColor: 'currentColor',
    borderStyle: 'solid',
    marginRight: 48,
  },
} as const;
