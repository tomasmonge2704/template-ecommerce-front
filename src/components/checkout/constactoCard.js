import { Card,Col, Text, Button, Row } from "@nextui-org/react";

export default function ContactoCard() {
  return (
        <Card variant="bordered" css={{ mw: "330px" }}>
          <Card.Header>
            <Text b>Acordar el pago con nosotros</Text>
          </Card.Header>
          <Card.Body css={{ py: "$10" }}>
            <Text>
                Podes confirmar tu compra
            </Text>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
          <Row>
        <Col>
          <Row>
            <Col span={3}>
              <Card.Image
                src="/whatsapp.png"
                height={40}
                width={40}
                alt="Breathing app icon"
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button
              flat
              auto
              rounded
              color="success"
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                Continuar
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
          </Card.Footer>
        </Card>
      
  );
}
