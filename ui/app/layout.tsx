import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { archivo } from "./fonts";

export const metadata: Metadata = {
  title: "Hermit",
  description:
    "A decentralized SMPC platform for secure and private data collaboration and AI analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={archivo.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
