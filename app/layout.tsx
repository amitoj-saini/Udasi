import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Udasi",
  description: "The map for sikhs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const theme = cookieStore.get("theme")?.value || "light";

  return (
    <html data-mode={theme} lang="en">
      <body className={`${inter.className} dark:bg-black bg-white text-black dark:text-white`}>{children}</body>
    </html>
  )
}
