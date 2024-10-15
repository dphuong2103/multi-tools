import "@/app//globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/contexts/auth-provider";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import LoadingProvider from "@/contexts/loading-provider";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Locale } from "@/i18n.config";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}) {
  return (
    <html lang={params.locale}>
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <LoadingProvider>
            <AuthProvider>{children}</AuthProvider>
          </LoadingProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
