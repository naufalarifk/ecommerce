import { useState } from "react";
import { useNavigate } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import Button from "../../components/atoms/Button";
import type { CartItem } from "../../types";
import { formatIDR } from "../../utils/formatCurrency";
import { api } from "../../api/mockApi";
const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const total = getTotalPrice();
  const shipping = total > 100 ? 0 : 50000;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    setIsProcessing(true);

    try {
      const result = await api.orders.processPayment(formData);

      if (result.success) {
        setOrderPlaced(true);
        setTimeout(() => {
          clearCart();
          navigate("/");
        }, 6000);
      } else {
        setPaymentError(result.error || "Payment failed. Please try again.");
      }
    } catch (err) {
      setPaymentError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="space-y-4 rounded-lg bg-white border border-gray-200 p-12 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="text-gray-600">
          Add items to your cart before checking out.
        </p>
        <Button onClick={() => navigate("/products")}>Back to Shopping</Button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="space-y-4 rounded-lg bg-green-50 border border-green-200 p-12 text-center shadow-sm">
        <div className="text-5xl text-green-600 flex justify-center">
          <FaCheckCircle />
        </div>
        <h1 className="text-2xl font-bold text-green-700">
          Order Placed Successfully!
        </h1>
        <p className="text-green-700">
          Your order has been confirmed. You'll receive a confirmation email
          shortly.
        </p>
        <p className="text-sm text-gray-600">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
        {paymentError && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 shadow-sm">
            <p className="text-red-700">{paymentError}</p>
          </div>
        )}

        <div className="rounded-lg bg-white border border-gray-200 p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Shipping Address
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none sm:col-span-2"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none sm:col-span-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Address *"
              value={formData.address}
              onChange={handleChange}
              required
              className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none sm:col-span-2"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none"
            />
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={handleChange}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-lg bg-white border border-gray-200 p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Payment Information
          </h2>

          <div className="grid gap-4">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number *"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              maxLength={16}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                maxLength={5}
                className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                maxLength={3}
                className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isProcessing}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {isProcessing ? "Processing..." : "Complete Order"}
        </Button>
      </form>

      <div className="h-fit rounded-lg bg-green-50 border border-green-200 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Order Summary</h2>

        <div className="mb-4 space-y-2 border-b border-gray-200 pb-4">
          {cart.map((item: CartItem) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.product.name} x{item.quantity}
              </span>
              <span className="font-semibold text-gray-900">
                {formatIDR(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

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
              {formatIDR(shipping)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-semibold text-gray-900">
              {formatIDR(tax)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-green-600">
            {formatIDR(finalTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
