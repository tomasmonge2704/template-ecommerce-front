import { createContext, useReducer,useMemo,useState } from "react";

const initialState = [];

const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case "ADD_TO_CART": {
        const id = actionPayload._id;
        const cantidad = actionPayload.cantidad;
        const productInCartIndex = state.findIndex((item) => item._id === id);
        if (productInCartIndex >= 0) {
          const newState = structuredClone(state);
          newState[productInCartIndex].cantidad = Number(newState[productInCartIndex].cantidad) + Number(cantidad);
          return newState;
      }
      return [...state, { ...actionPayload, cantidad }];
    }
    case "CHANGE_CANTIDAD":{
        const id = actionPayload._id;
        const productInCartIndex = state.findIndex((item) => item._id === id);
        const newState = structuredClone(state);
        newState[productInCartIndex].cantidad = actionPayload.cantidad;
        return newState;
    }
    case "REMOVE_FROM_CART": {
      const id = actionPayload._id;
      return state.filter((item) => item._id !== id);
    }
    case "CLEAR_CART": {
      return initialState;
    }
  }
  return state;
};

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [total, setTotal] = useState(0);
  useMemo(
    () =>{
        let sumatoria = 0;
        for (let i = 0; i < state.length; i++) {
            sumatoria += state[i].cantidad * state[i].precio;
        }
        setTotal(sumatoria)
    },
    [state]);
  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  const removeFromCart = (product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });
  const changeCantidad = (product) =>
    dispatch({
      type: "CHANGE_CANTIDAD",
      payload: product,
    });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ cart: state,total:total, addToCart, removeFromCart, clearCart,changeCantidad }}
    >
      {children}
    </CartContext.Provider>
  );
}
