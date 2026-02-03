import { Link } from "react-router";
import { useCart } from "../../hooks/useCart";
import Button from "../../components/atoms/Button";
import type { CartItem } from "../../types";
import { formatIDR } from "../../utils/formatCurrency";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();
  const total = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className="space-y-4 rounded-lg bg-white border border-gray-200 p-12 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="text-gray-600">
          Add some products to get started with shopping!
        </p>
        <Link to="/products">
          <Button variant="primary" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Shopping Cart</h1>

        <div className="rounded-lg bg-white border border-gray-200 shadow-sm">
          {cart.map((item: CartItem) => (
            <div
              key={item.product.id}
              className="flex gap-4 border-b border-gray-200 p-4 last:border-b-0"
            >
              <img
                src={item.product.photoUrl}
                alt={item.product.name}
                className="h-24 w-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-green-600">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600">{item.product.merchant}</p>
                <p className="mt-2 font-bold text-gray-900">
                  {formatIDR(item.product.price)}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg bg-white">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        Math.max(1, item.quantity - 1),
                      )
                    }
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        Math.min(item.product.stock, item.quantity + 1),
                      )
                    }
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="text-sm font-semibold text-gray-900">
                  {formatIDR(item.product.price * item.quantity)}
                </p>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-fit rounded-lg bg-green-50 border border-green-200 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Order Summary</h2>

        <div className="space-y-3 border-b border-gray-200 pb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">
              {formatIDR(total)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold text-gray-900">
              {formatIDR(total > 100 ? 0 : 50000)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-semibold text-gray-900">
              {formatIDR(total * 0.1)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-green-600">
            {formatIDR(total + (total > 100 ? 0 : 50000) + total * 0.1)}
          </span>
        </div>

        <div className="mt-6 space-y-2">
          <Link to="/checkout" className="block">
            <Button variant="primary" size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </Link>
          <Link to="/products" className="block">
            <Button variant="outline" size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <button
            onClick={clearCart}
            className="w-full rounded text-sm text-red-600 hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
