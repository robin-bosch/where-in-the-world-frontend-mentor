import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Header/Header'
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Where in the world?',
  description: 'Where in the world?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
	<html lang="en">
    
		<body className={`${nunito_sans.className}`}>
    <ThemeProvider>
      <Header/>
			{children}
      
			</ThemeProvider>
		</body>
    
	</html>
  )
}
