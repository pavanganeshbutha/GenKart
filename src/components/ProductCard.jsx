import { ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
    // Destructure for cleaner code
    const { title, price, image, category, rating } = product;

    return (
        <div className="group bg-card-bg rounded-2xl border border-secondary/10 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-white p-6">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                    {category}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-accent text-accent" />
                    <span className="text-xs font-medium text-secondary">{rating?.rate || "4.5"}</span>
                </div>

                <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2 text-sm md:text-base hover:text-primary transition-colors cursor-pointer">
                    {title}
                </h3>

                {/* Price & Action */}
                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-secondary font-medium">Price</span>
                        <span className="text-xl font-bold text-slate-900">${price}</span>
                    </div>

                    <button
                        className="p-3 bg-slate-900 text-white rounded-xl hover:bg-primary transition-colors shadow-lg shadow-slate-200"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;