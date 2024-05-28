import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pssiappka 2024",
  description: "Pssiappka 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={metadata.description || ""} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="shortcut icon" href="/static/favicon-32x32.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
