import { Link } from "react-router";
import { FaTruck, FaShieldAlt, FaLock } from "react-icons/fa";
import Button from "./components/atoms/Button";

function App() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-xl bg-green-600 py-20 text-white">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold">Welcome to ShopHub</h1>
          <p className="mb-8 text-xl opacity-90">
            Discover amazing products at unbeatable prices
          </p>
          <Link to="/products">
            <Button variant="secondary" size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-white border border-gray-200 p-6 text-center shadow-sm">
          <div className="mb-4 text-3xl text-green-600 flex justify-center">
            <FaTruck />
          </div>
          <h3 className="mb-2 font-semibold text-gray-900">Fast Delivery</h3>
          <p className="text-sm text-gray-600">
            Get your products delivered within 2-3 business days
          </p>
        </div>
        <div className="rounded-lg bg-white border border-gray-200 p-6 text-center shadow-sm">
          <div className="mb-4 text-3xl text-green-600 flex justify-center">
            <FaShieldAlt />
          </div>
          <h3 className="mb-2 font-semibold text-gray-900">Quality Assured</h3>
          <p className="text-sm text-gray-600">
            All products are verified and come with warranty
          </p>
        </div>
        <div className="rounded-lg bg-white border border-gray-200 p-6 text-center shadow-sm">
          <div className="mb-4 text-3xl text-green-600 flex justify-center">
            <FaLock />
          </div>
          <h3 className="mb-2 font-semibold text-gray-900">Secure Payment</h3>
          <p className="text-sm text-gray-600">
            Your payment information is always secure and encrypted
          </p>
        </div>
      </section>

      <section className="rounded-lg bg-green-50 border border-green-200 py-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Ready to Shop?
        </h2>
        <p className="mb-8 text-gray-600">
          Browse our latest collection of products
        </p>
        <Link to="/products">
          <Button variant="primary" size="lg">
            Explore Products
          </Button>
        </Link>
      </section>
    </div>
  );
}

export default App;
