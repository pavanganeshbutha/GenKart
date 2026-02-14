const CategoryBar = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            <button
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                    activeCategory === "all"
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-white text-secondary border border-secondary/20 hover:border-primary"
                }`}
            >
                All Products
            </button>

            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all whitespace-nowrap ${
                        activeCategory === cat
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "bg-white text-secondary border border-secondary/20 hover:border-primary"
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryBar;