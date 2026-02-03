import type { Products } from "../../types";

const ProductDisplay = ({ item, index }: { item: Products; index: number }) => {
  const { merchant, name, photoUrl, price, ratings, sold } = item;

  return <div></div>;
};

export default ProductDisplay;
