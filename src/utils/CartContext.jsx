import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Kalkulasi total harga (Mendukung properti price maupun startingPrice)
  const subtotal = cart.reduce((total, item) => {
    const itemPrice = item.price || item.startingPrice || 0;
    return total + itemPrice * (item.qty || 1);
  }, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}