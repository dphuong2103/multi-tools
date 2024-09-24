import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/context/auth-provider'
import { Inter as FontSans } from "next/font/google";
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import LoadingProvider from '@/context/loading-provider';
import { ThemeProvider } from '@/context/theme-provider';
import NavBar from '@/components/ui/nav-bar';
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MultiTools',
  description: "A collection of tools for developers",
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/_favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/_favicon/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/_favicon/apple-touch-icon.png',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        "h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        >
          <LoadingProvider>
            <AuthProvider>
              <div className="h-full flex flex-col">
                <NavBar />
                <div className="flex justify-center h-full">
                  <div className="w-full max-w-7xlxl h-full">
                    <main className="flex justify-center items-start p-1 md:p-6 w-full h-full">
                      {children}
                    </main>
                  </div>
                </div>
              </div>

            </AuthProvider>
          </LoadingProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
