import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemove: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove }) => {
  return (
    <div className="cart">
      <h2>Varukorg</h2>
      {items.length === 0 ? (
        <p>Varukorgen är tom.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.product.id}>
              <span>
                {item.product.name} - {item.product.price} SEK (x{item.quantity}
                )
              </span>
              <button onClick={() => onRemove(item.product.id)}>Ta bort</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
