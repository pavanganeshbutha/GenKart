// src/utils/productService.js

// 1. Export for all products
export const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error("Product fetch error:", error);
        return [];
    }
};

// 2. Export for categories
export const fetchCategories = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        return await response.json();
    } catch (error) {
        console.error("Category fetch error:", error);
        return [];
    }
};