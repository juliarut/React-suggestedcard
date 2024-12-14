import React, { useState } from "react";
import "./App.css";
import productsData from "./products.json";

// Typdefinition för en produkt
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

function App() {
  const products: Product[] = productsData; // Typa JSON-data
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Typa vald produkt

  // Visa detaljerad vy om en produkt är vald
  if (selectedProduct) {
    return (
      <div className="product-detail">
        <h1>{selectedProduct.name}</h1>
        <img src={selectedProduct.image} alt={selectedProduct.name} />
        <p>{selectedProduct.description}</p>
        <p>Pris: {selectedProduct.price} SEK</p>
        <button onClick={() => setSelectedProduct(null)}>Tillbaka</button>
      </div>
    );
  }

  // Visa produktlistan som standard
  return (
    <div className="product-list">
      <h1>Våra Lakritsprodukter</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price} SEK</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
