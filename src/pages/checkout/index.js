import CheckoutContenedor from "@/components/checkout/contenedor";
import { CartContext } from "@/context/cartContext";
import { useContext } from "react";
import EmptyCart from "@/components/carrito/emptyCart";
export default function App() {
  const { cart,total } = useContext(CartContext);
  return (
    <>
      {cart.length == 0 ? (<EmptyCart/>):(<CheckoutContenedor total={total} cart={cart}/>)}
    </>
  );
}