/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      // FIX: Added block scoping { } to allow const declarations
      const item = action.payload;
      const exist = state.cartItems.find(i => i._id === item._id);

      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i._id === exist._id ? item : i
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i._id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    () => {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : initialState;
    }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// FIX: ensure this is exported correctly
export const useCart = () => useContext(CartContext);