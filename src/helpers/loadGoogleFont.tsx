export async function loadGoogleFont(font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}`;
  const css = await (await fetch(url)).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource?.length && resource[1]) {
    const response = await fetch(resource[1]);

    if (response.status === 200) {
      const arrayBuffer = await response.arrayBuffer();

      return {
        name: font,
        data: arrayBuffer,
        style: 'normal',
      } as const;
    }
  }

  throw new Error(`Failed to load font data for ${font}`);
}
