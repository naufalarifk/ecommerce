import { Link } from "react-router";
import { FaStar, FaCheck } from "react-icons/fa";
import type { Product } from "../../types";
import Button from "./Button";
import { useCart } from "../../hooks/useCart";
import { formatIDR } from "../../utils/formatCurrency";
import { useState } from "react";

interface ProductDisplayProps {
  item: Product;
  index?: number;
}

const ProductDisplay = ({ item }: ProductDisplayProps) => {
  const { merchant, name, photoUrl, price, ratings, sold, id, stock } = item;
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(item, 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/product/${id}`}>
        <div className="relative mb-3 overflow-hidden rounded-md bg-gray-100">
          <img
            src={photoUrl}
            alt={name}
            className="h-48 w-full object-cover transition-transform hover:scale-105"
          />
          {stock < 10 && (
            <div className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white">
              Low Stock
            </div>
          )}
        </div>
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900">
          {name}
        </h3>
      </Link>

      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm text-gray-600">{merchant}</span>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg font-bold text-gray-900">
          {formatIDR(price)}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-xs text-yellow-500">
            <FaStar />
          </span>
          <span className="text-xs text-gray-600">{ratings}</span>
        </div>
      </div>

      <p className="mb-3 text-xs text-gray-600">{sold.toLocaleString()} sold</p>

      <Button
        onClick={handleAddToCart}
        disabled={stock === 0}
        variant="primary"
        size="sm"
        className="w-full flex items-center justify-center gap-2"
      >
        {isAdding ? (
          <>
            <FaCheck /> Added!
          </>
        ) : (
          "Add to Cart"
        )}
      </Button>
    </div>
  );
};

export default ProductDisplay;
