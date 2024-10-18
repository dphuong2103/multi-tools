import "@/app//globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import LoadingProvider from "@/contexts/loading-provider";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Locale } from "@/i18n.config";
import BeforeUnloadProvider from "@/contexts/before-unload-provider";
import { getDictionary } from "@/lib/dictionary";
import NextTopLoader from "nextjs-toploader";
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
              {/* <AuthProvider> */}
              <NextTopLoader
                color="#2299DD"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                // showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                zIndex={1600}
                showAtBottom={false}
              />
              {children}
              {/* </AuthProvider> */}
            </LoadingProvider>
            <Toaster />
          </BeforeUnloadProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
