import {
  Text,
  Container,
  Grid,
  Image,
  Spacer,
  Card,
  Row,
  Link,
  Collapse,
} from "@nextui-org/react";
import moment from "moment-timezone";
import CartItemView from "../carrito/cartItemView";
import { isMobile } from "react-device-detect";
export default function CompraDetail({ item }) {
  const fechaTransformada = moment(item.fechaCompra)
    .tz("America/Argentina/Buenos_Aires")
    .format("DD/MM/YYYY HH:mm");
  const fechaTransformadaRecibido = moment(item.fechaRecibido)
    .tz("America/Argentina/Buenos_Aires")
    .format("DD/MM/YYYY HH:mm");
  return (
    <Container css={{ padding: "0px", marginTop: "0px" }}>
      <Grid.Container gap={isMobile ? 0 : 2} css={{ marginTop: "0px" }}>
        <Grid xs={isMobile ? 12 : 7}>
          <Container css={{ display: "grid" }}>
            <Row css={{ alignItems: "center" }}>
              <Link block href="/mis-compras">
                Mis compras
              </Link>
              / Estado de la compra
            </Row>
            <Spacer y={1} />
            <Card>
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
                    <Text css={{ marginRight: "5px" }}>
                      Fecha de la compra:
                    </Text>
                    <Text b>{fechaTransformada}</Text>
                  </Grid>
                </Grid.Container>
              </Card.Header>
              <Card.Body>
                {item.productos.map((item, index) => (
                  <>
                    <CartItemView item={item} index={index} />
                    <Spacer y={1} />
                  </>
                ))}
              </Card.Body>
            </Card>
          </Container>
        </Grid>
        <Spacer y={1} />
        <Grid xs={isMobile ? 12 : 4}>
          <Container>
            <Spacer y={isMobile ? 0 : 2.5} />
            <Card>
              <Card.Header>
                {" "}
                <Text b>Detalle de la compra</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <Container
                  css={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text size="$xl">Total</Text>
                  <Text size="$xl">${item.total}</Text>
                </Container>
                <Spacer y={1} />
                <Collapse.Group>
                  <Collapse subtitle="Detalle del pago y envio">
                    <Container
                      css={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Text size="$xl">Tipo de envio</Text>
                      <Text size="$xl">{item.datosComprador.envio}</Text>
                    </Container>
                    <Spacer y={1} />
                    <Container
                      css={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Text size="$xl">Metodo de pago</Text>
                      <Text size="$xl">{item.datosComprador.metodoPago}</Text>
                    </Container>
                  </Collapse>
                </Collapse.Group>
              </Card.Body>
            </Card>
          </Container>
        </Grid>
      </Grid.Container>
      <Spacer y={isMobile ? 3 : 0} />
    </Container>
  );
}
