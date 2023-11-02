export default {
  head: ({ meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  footer: (
    <p>
      Copyright © {new Date().getFullYear()} Satyajit Sahoo. All rights
      reserved.
    </p>
  ),
  readMore: 'Read More →',
  postFooter: null,
  darkMode: false,
};
