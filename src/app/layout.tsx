import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MapinSKHU',
  description: '회대인들을 위한 가장 빠르고 간편한 지도',
  openGraph: {
    title: 'MapinSKHU',
    description: '회대인들을 위한 가장 빠르고 간편한 지도',
    url: 'https://mapinskhu.com',
    siteName: 'MapinSKHU',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="fixed h-screen w-screen overflow-hidden bg-[#e6fdff]">{children}</body>
    </html>
  );
}
