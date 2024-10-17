import "@/app//globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/contexts/auth-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import LoadingProvider from "@/contexts/loading-provider";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Locale } from "@/i18n.config";
import { NavigationEvents } from "@/components/navigation-events";
import BeforeUnloadProvider from "@/contexts/before-unload-provider";
import { getDictionary } from "@/lib/dictionary";

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
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}) {
  const dictionary = await getDictionary(params.locale);
  return (
    <html lang={params.locale}>
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased",
          fontSans.className,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <BeforeUnloadProvider dictionary={dictionary}>
            <LoadingProvider>
              <AuthProvider>{children}</AuthProvider>
            </LoadingProvider>
            <Toaster />
          </BeforeUnloadProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
