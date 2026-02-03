import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { FaStar, FaCheck } from "react-icons/fa";
import type { Product } from "../../types";
import Button from "../../components/atoms/Button";
import { useCart } from "../../hooks/useCart";
import { formatIDR } from "../../utils/formatCurrency";
import { api } from "../../api/mockApi";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("Product ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await api.products.getById(id);
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-white border border-gray-200 p-12 shadow-sm">
        <div className="text-center space-y-2">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-4 rounded-lg bg-white border border-gray-200 p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          {error || "Product Not Found"}
        </h1>
        <p className="text-gray-600">
          {error || "The product you're looking for doesn't exist."}
        </p>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-8 rounded-lg bg-white border border-gray-200 p-8 shadow-sm md:grid-cols-2">
        <div className="flex items-center justify-center">
          <img
            src={product.photoUrl}
            alt={product.name}
            className="max-h-96 w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600">{product.merchant}</p>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {formatIDR(product.price)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-lg text-yellow-500">
                  <FaStar />
                </span>
                <span className="font-semibold text-gray-900">
                  {product.ratings}
                </span>
                <span className="text-sm text-gray-600">
                  (based on customer reviews)
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {product.sold.toLocaleString()} sold
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            {product.stock > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Quantity:</span>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.stock} in stock
                  </span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <FaCheck /> Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              </div>
            ) : (
              <div className="rounded-lg bg-red-50 p-4 text-red-700">
                Out of Stock
              </div>
            )}
          </div>

          <Button
            onClick={() => navigate("/products")}
            variant="outline"
            className="w-full"
          >
            Back to Products
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-white border border-gray-200 p-8 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Product Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-gray-600">Merchant</p>
            <p className="text-gray-900">{product.merchant}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">Rating</p>
            <p className="text-gray-900">{product.ratings} / 5</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">Units Sold</p>
            <p className="text-gray-900">{product.sold.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">In Stock</p>
            <p className="text-gray-900">{product.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
