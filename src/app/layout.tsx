import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MapinSKHU',
  description: '성공회대학교 지도 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
