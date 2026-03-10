import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/themes.css";
import "@/styles/fonts.css";
import "@/styles/layouts.css";

export const metadata: Metadata = {
  title: "WanderLog - Travel Stories & Adventures",
  description: "Stories from the road, beautifully told. A travel blog capturing adventures from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
