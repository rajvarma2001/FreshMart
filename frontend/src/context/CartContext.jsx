import { createContext, useContext, useState , useEffect} from "react";
import { useAuth } from "./AuthContext";
import {
  addToCartApi,
  getCartApi,
  updateCartApi,
  removeCartApi,
} from "../services/cartApi";

const CartContext = createContext();


export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const { user } = useAuth();

  const fetchCart = async () => {
  try {
      const token = localStorage.getItem("token");

      const data = await getCartApi(user._id, token);

      const formattedItems =
        data.items?.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        })) || [];

      setItems(formattedItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchCart();
    }
  }, [user]);

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      await addToCartApi(
        { userId: user._id, productId: product._id, quantity: 1 },
        token
      );
      
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item._id === product._id);

        if (existingItem) {
          return prevItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...prevItems, { ...product, quantity: 1 }];
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await removeCartApi({ userId: user._id, productId }, token);
      
      setItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await updateCartApi(
        { userId: user._id, productId, quantity },
        token
      );
      
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      // Clear all items by sending remove request for each item
      for (const item of items) {
        await removeCartApi({ userId: user._id, productId: item._id }, token);
      }
      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const getTotal = () => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

