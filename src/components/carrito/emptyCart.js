import {
  Text,
  Container,
  Spacer,
  Card,
  Row,
  Button,
  Image,
} from "@nextui-org/react";
import Router from "next/router";

export default function EmptyCart() {
  return (
    <Container xl>
      <Card css={{ $$cardColor: "none" }}>
        <Card.Body>
          <Row justify="center" align="center">
            <Text
              h1
              size={40}
              weight="bold"
            >
              No tienes compras actualmente
            </Text>
            <Spacer y={3} />
          </Row>
          <Spacer y={2} />
          <Row justify="center" align="center">
            <Button
              shadow
              onPress={() => {
                Router.push("/productos");
              }}
              auto
            >
              Ver productos
            </Button>
          </Row>
          <Spacer y={2} />
          <Image
            src="/emptyCart.png"
            objectFit="contain"
            width="100%"
            height={300}
            css={{ borderRadius: "4%" }}
            alt="carritoVacio"
          />
                  </Card.Body>
      </Card>
    </Container>
  );
}
