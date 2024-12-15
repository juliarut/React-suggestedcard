import React, { useState } from "react";
import "./App.css";
import productsData from "./products.json";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

function App() {
  const products: Product[] = productsData;
  const [view, setView] = useState<"products" | "cart">("products");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
    []
  );

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  if (selectedProduct) {
    return (
      <div className="product-detail">
        <h1>{selectedProduct.name}</h1>
        <img src={selectedProduct.image} alt={selectedProduct.name} />
        <p>{selectedProduct.description}</p>
        <p>Pris: {selectedProduct.price} SEK</p>
        <button onClick={() => setSelectedProduct(null)}>Tillbaka</button>
        <button onClick={() => addToCart(selectedProduct)}>
          Lägg i varukorgen
        </button>
      </div>
    );
  }

  if (view === "cart") {
    return (
      <div className="cart-view">
        <h1>Varukorg</h1>
        <Cart items={cart} onRemove={removeFromCart} />
        <button onClick={() => setView("products")}>
          Tillbaka till produkter
        </button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h1>Våra Lakritsprodukter</h1>
      <button onClick={() => setView("cart")}>Visa varukorg</button>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price} SEK</p>
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

export default App;
