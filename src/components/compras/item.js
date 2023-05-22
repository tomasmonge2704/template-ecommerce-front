import {
  Grid,
  Spacer,
  Button,
  Card,
  Text,
  Container,
  Image,
} from "@nextui-org/react";
import Router from "next/router";
import moment from "moment-timezone";
import CartItemView from "../carrito/cartItemView";
import { isMobile } from "react-device-detect";

export default function CompraItem({ item, index }) {
  const fechaTransformada = moment(item.fechaCompra)
    .tz("America/Argentina/Buenos_Aires")
    .format("DD/MM/YYYY HH:mm");
  const fechaTransformadaRecibido = moment(item.fechaRecibido)
    .tz("America/Argentina/Buenos_Aires")
    .format("DD/MM/YYYY HH:mm");
  return (
    <Card isHoverable variant="bordered">
      <Card.Header>
        <Grid.Container>
        <Grid xs={12}>
            {item.status == "Entregado" ? (
              <Text color="success">
                {item.status} | {fechaTransformadaRecibido}
              </Text>
            ) : (
              <Text color="primary">{item.status}</Text>
            )}
          </Grid>
          <Grid xs={12} alignItems="baseline">
            <Text css={{ marginRight: "5px" }}>Fecha de la compra:</Text>
            <Text b>{fechaTransformada}</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body>
        <Grid.Container
          key={index}
          gap={1}
          justify="center"
          css={{ borderTop: "5px Black" }}
        >
          {item.productos.length == 1 ? (
            <Grid xs={isMobile ? 6 : 3}>
              <Image
                src={"https://nextui.org" + item.productos[0].imageURL}
                objectFit="cover"
                width="100%"
                height={150}
                css={{ borderRadius: "4%" }}
                alt={item.productos[0].nombre}
              />
            </Grid>
          ) : (
            <></>
          )}

          <Grid xs={isMobile ? (item.productos.length == 1 ? 6 : 12) : 7}>
            <Container css={{ textAlign: "start", display: "grid" }}>
              {item.productos.length == 1 ? (
                <>
                  <Text>{item.productos[0].nombre}</Text>
                  <Text>${item.productos[0].precio}</Text>
                  <Text>{item.productos[0].cantidad} Unidades</Text>
                  <Text>
                    {item.productos[0].descripcion.length > 20
                      ? item.productos[0].descripcion.substring(0, 20) + "..."
                      : item.productos[0].descripcion}
                  </Text>
                </>
              ) : (
                item.productos.map((item, index) => (
                  <>
                    <CartItemView item={item} index={index} />
                    <Spacer y={1} />
                  </>
                ))
              )}
            </Container>
          </Grid>
          {item.productos.length == 1 ? <></> : <Grid xs={3} />}
          <Grid xs={isMobile ? 12 : 2}>
            {item.productos.length !== 1 ? (
              <Container css={{ display: "grid" }}>
                <Button
                  onClick={() => Router.push("/mis-compras/" + item._id)}
                  shadow
                  color="secondary"
                  auto
                >
                  Ver compra
                </Button>
              </Container>
            ) : (
              <Container css={{ display: "grid" }}>
                <Spacer y={isMobile ? 1 : 0} />
                <Button
                  onClick={() => Router.push("/mis-compras/" + item._id)}
                  shadow
                  color="secondary"
                  auto
                >
                  Ver compra
                </Button>
                <Spacer y={isMobile ? 1 : 0} />
                <Button
                  onClick={() =>
                    Router.push("/producto/" + item.productos[0]._id)
                  }
                  shadow
                  color="primary"
                  auto
                >
                  Volver a Comprar
                </Button>
              </Container>
            )}
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
}
