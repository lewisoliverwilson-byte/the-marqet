import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'

export default function PageLayout({ children, fullWidth = false }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-white">
        <div className={fullWidth ? '' : 'mx-auto max-w-6xl px-6 py-16'}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
