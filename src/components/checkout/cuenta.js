import { Container, Text, Spacer, Card, Button } from "@nextui-org/react";
import React from "react";
import CartItemView from "../carrito/cartItemView";
import ContactoCard from "./constactoCard";
import MercadoPagoCard from "./mercadoPago";
import { UserContext } from "@/context/userContext";
import { CompraContext } from "@/context/compraContext";
export default function Cuenta({ cart, total,envio }) {
  const [selected, setSelected] = React.useState(false);
  const { user } = React.useContext(UserContext);
  const { compra,setCompra } = React.useContext(CompraContext);
  React.useEffect(() => {
    setCompra({
      status: "Nuevo",
      datosComprador: {
        username: user.username,
        metodoPago: "Credito",
        numeroCuenta: "1010049219412",
        envio,
        adress: user.adress,
      },
      datosVendedor: {
        numeroCuenta: "1412412515212543",
        nombreCuenta: "filumSA",
      },
      productos: cart,
      total,
    })
  }, [cart,total,envio]);
  
  return (
    <Card>
      <Card.Body>
        {selected == true ? (
          <>
            <Spacer y={1} />
            <Button shadow onClick={() => setSelected(false)}>Volver</Button>
            <Spacer y={2} />
            <MercadoPagoCard compra={compra}/>
            <div id="wallet_container"></div>
            <Spacer y={1} />
          </>
        ) : (
          <>
            <Card css={{ $$cardColor: "none" }}>
              <Card.Body>
                <Container>
                {cart.map((item, index) => (
                    <>
                    <CartItemView item={item} index={index} />
                    <Spacer y={1} />
                    </>
                  ))}
                  <div className="separator">
                    <hr
                      className="line"
                      style={{ height: "2px", backgroundColor: "#adadad" }}
                    />
                  </div>
                  <Spacer y={1} />
                  <Container
                    css={{ display: "flex",padding:"0px" ,justifyContent: "space-between" }}
                  >
                    <Text size="$xl">Pagás </Text>
                    <Text size="$xl">${total}</Text>
                  </Container>
                </Container>
              </Card.Body>
            </Card>
            <Spacer y={1} />
            <Button shadow onClick={() => setSelected(true)}>Continuar</Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
