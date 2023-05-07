import { DM_Sans } from 'next/font/google'
const DMSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] })

// local files

import './globals.css'

export const metadata = {
  title: 'CHP Avatar Generator',
  description: 'Generate your customised CHP avatar in miliseconds!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={`${DMSans.className} h-screen`}>{children}</body>
    </html>
  )
}
