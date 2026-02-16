import Hero from "../home/Hero";
import ProductGrid from "../home/ProductGrid";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";

export default function HomePage() {
    return (
        <>
            <Navbar/>
            <Hero/>
            <ProductGrid/>
            <Footer/>
        </>
    )
}