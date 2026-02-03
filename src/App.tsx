import { useState } from "react";
import Button from "./components/atoms/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      this is homepage
      <p className="text-red-600">test</p>
      <Button />
    </>
  );
}

export default App;
