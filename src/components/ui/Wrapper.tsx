import type { ReactElement } from "react";
import { NavLink } from "react-router";

const Wrapper = ({ children }: { children: ReactElement }) => {
  return (
    <main className="">
      <section className="bg-blue-300">
        <ul className="space-x-2 p-2">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/">Carts</NavLink>
          <NavLink to="/">Checkout</NavLink>
        </ul>
      </section>
      {children}
    </main>
  );
};

export default Wrapper;
