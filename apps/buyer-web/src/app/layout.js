import './globals.css';

export const metadata = {
  title: 'DoDoHub - Where Rare Content Lives',
  description:
    '🦤 AI-powered content marketplace with blockchain authenticity. Discover unique, verified digital assets.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
