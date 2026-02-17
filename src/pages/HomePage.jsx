

import { useEffect, useState } from "react"; // UPDATED: Added hooks
import Hero from "../home/Hero";
import ProductGrid from "../home/ProductGrid";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import api from "../services/api";

export default function HomePage() {
    // UPDATED: State for products, loading, and errors
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // UPDATED: Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Call your API endpoint
                const { data } = await api.get("/products");
                // Set the products from the response payload
                setProducts(data.products);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Navbar/>
            <Hero/>
            
            {loading ? (
                <div className="text-center py-20 text-brand-dark font-body">Loading collection...</div>
            ) : error ? (
                <div className="text-center py-20 text-red-600 font-body">{error}</div>
            ) : (
                // PASSING DATA AS PROPS
                <ProductGrid products={products} />
            )}
            
            <Footer/>
        </>
    )
}