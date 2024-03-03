import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import Nav from "@/components/ui/nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Provider from "../../util/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  viewport: "initial-scale=1.0 user-scalable=no",
  title: "Flashcards",
  description: "Flashcards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="viewport" content={metadata.viewport} />
        <style>{`
          html, body {
            touch-action: none;
          }
        `}</style>
      </Head>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
