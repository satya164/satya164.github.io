import { SocialLinks } from '../../components/SocialLinks';

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <article>{children}</article>
      <SocialLinks />
    </main>
  );
}
