import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import {
  Container,
  Spacer,
} from "@nextui-org/react";
import Cart from "@/components/carrito/cart";
import EmptyCart from "@/components/carrito/emptyCart";
import { isMobile } from "react-device-detect";
export default function App() {
  const { cart,total, changeCantidad, removeFromCart, clearCart } =
    useContext(CartContext);
  return (
    <>
      <Spacer y={isMobile ? 1 : 3} />
      <Container gap={0}>
        {cart.length == 0 ? (
          <EmptyCart/>
        ) : (
          <Cart cart={cart} total={total} changeCantidad={changeCantidad} removeFromCart={removeFromCart} clearCart={clearCart} />
        )}
      </Container>
    </>
  );
}
