import type { ReactElement } from "react";
import Header from "./Header";

const Wrapper = ({ children }: { children: ReactElement }) => {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-8">{children}</section>
    </main>
  );
};

export default Wrapper;
