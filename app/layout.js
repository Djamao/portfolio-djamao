import './globals.css'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'

export const metadata = {
  title: 'Djamao Pierre — Designer Digital',
  description: 'Portfolio de Djamao Pierre, designer digital français.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
