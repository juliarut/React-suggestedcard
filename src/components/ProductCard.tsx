import React from "react";

interface ProductCardProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ onClick, children }) => {
  return (
    <div className="product-card" onClick={onClick}>
      {children}
    </div>
  );
};

export default ProductCard;
