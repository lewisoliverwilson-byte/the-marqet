import Navbar from '../components/sections/Navbar'
import Hero from '../components/sections/Hero'
import FeaturedListings from '../components/sections/FeaturedListings'
import Categories from '../components/sections/Categories'
import HowItWorks from '../components/sections/HowItWorks'
import ForSellers from '../components/sections/ForSellers'
import FAQ from '../components/sections/FAQ'
import Newsletter from '../components/sections/Newsletter'
import Footer from '../components/sections/Footer'

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedListings />
        <Categories />
        <HowItWorks />
        <ForSellers />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
