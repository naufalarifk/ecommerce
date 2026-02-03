import { Link, useLocation } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";

const Header = () => {
  const { cart } = useCart();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/cart", label: "Cart" },
    { path: "/checkout", label: "Checkout" },
  ];

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-green-600 font-semibold"
      : "text-gray-600";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-green-600">
            ShopHub
          </Link>

          <nav className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${isActive(item.path)}`}
              >
                {item.label}
                {item.path === "/cart" && cart.length > 0 && (
                  <span className="ml-2 inline-block rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
                    {cart.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex md:hidden">
            <Link to="/cart" className="relative text-gray-600">
              <span className="text-2xl text-green-600">
                <FaShoppingCart />
              </span>
              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
