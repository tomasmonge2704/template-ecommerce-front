import { Text, Spacer, Card, Button, Grid, Container } from "@nextui-org/react";
import React from "react";
import CartItem from "./cartItem";
import Router from "next/router";
import { isMobile } from "react-device-detect";
export default function Cart({
  cart,
  total,
  removeFromCart,
  clearCart,
  changeCantidad,
}) {
  const checkout = () => {
    Router.push('/checkout')
  }
  return (
    <Grid.Container gap={isMobile ? 0 : 3} justify="center">
      <Grid xs={12}>
        <Container>
        <Text h1> Carrito</Text>
        </Container>
      </Grid>
      <Grid xs={isMobile ? 12 : 8}>
        <Container>
          {cart.map((item, index) => (
            <>
              <CartItem
                key={index}
                changeCantidad={changeCantidad}
                item={item}
                index={index}
                removeFromCart={removeFromCart}
              />
              <Spacer y={1} />
            </>
          ))}
          <Spacer y={1} />
          <Container css={{ display: "flex", justifyContent: "center" }}>
            <Button shadow color="error" onClick={clearCart}>
              Clear Cart
            </Button>
          </Container>
          <Spacer y={2} />
        </Container>
      </Grid>
      <Grid xs={isMobile ? 10.5 : 4}>
        <Card css={{ maxHeight: "300px" }}>
          <Card.Body>
            <Container css={{ display: "flex", justifyContent: "center" }}>
              <Text h3>Order Summary</Text>
            </Container>
            <Spacer y={1} />
            <Card variant="flat">
              <Card.Body>
                <Container
                  css={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text size="$xl">Total: </Text>
                  <Text size="$xl">${total}</Text>
                </Container>
              </Card.Body>
            </Card>
            <Spacer y={2} />
            <Button shadow color="primary" auto onClick={checkout}>
              Checkout
            </Button>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
