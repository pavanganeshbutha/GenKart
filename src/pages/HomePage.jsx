import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories } from "../utils/productService.js";
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import CategoryBar from "../components/CategoryBar.jsx";

const HomePage = () => {
    // 1. State Management
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Data Fetching Logic
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                // Fetching both products and categories in parallel for speed
                const [productData, categoryData] = await Promise.all([
                    fetchProducts(),
                    fetchCategories()
                ]);

                setProducts(productData);
                setCategories(categoryData);
            } catch (err) {
                setError("Failed to load store data. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    // 3. Derived State: Filtering Logic
    // We don't store "filteredProducts" in state to avoid unnecessary re-renders
    const filteredProducts = activeCategory === "all"
        ? products
        : products.filter(product => product.category === activeCategory);

    // 4. Loading State UI
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-main">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-r-transparent"></div>
                    <p className="text-secondary font-medium animate-pulse">Loading GenKart Store...</p>
                </div>
            </div>
        );
    }

    // 5. Error State UI
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-main">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100">
                    <p className="text-red-600 font-bold mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-main pb-20">
            {/* Global Navigation */}
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                {/* Header Section */}
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                        Featured Products
                    </h1>
                    <p className="text-secondary text-lg">
                        Discover the best deals on GenKart today.
                    </p>
                </header>

                {/* Filter Section */}
                <section className="mb-8">
                    <CategoryBar
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                </section>

                {/* Product Grid Section */}
                <section>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-secondary/30">
                            <p className="text-secondary text-lg">No products found in this category.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default HomePage;