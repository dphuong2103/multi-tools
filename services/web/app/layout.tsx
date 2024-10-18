import "@/app/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n.config";
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "MultiTools",
  description: "A collection of tools for developers",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/_favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/_favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/_favicon/apple-touch-icon.png",
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}) {
  return (
    <html lang={"en"}>
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased",
          fontSans.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
