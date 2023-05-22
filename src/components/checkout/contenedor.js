import {
  Container,
  Text,
  Grid,
  Spacer,
  Card,
  Checkbox,
} from "@nextui-org/react";
import { useState } from "react";
import Domicilio from "./domicilio";
import Cuenta from "./cuenta";
import { isMobile } from "react-device-detect";
export default function CheckoutContenedor({ cart, total }) {
  const [selected, setSelected] = useState("a domicilio");
  return (
    <Container >
      <Spacer y={isMobile ? 1 : 3} />
      <Grid.Container>
        <Grid xs={isMobile ? 0 : 1} />
        <Grid xs={isMobile ? 12 : 6}>
          <Container css={isMobile && {padding:"0px"}}>
            <Text h3>¿Cómo querés recibir o retirar tu compra?</Text>
            <Spacer y={1} />
            <Container>
              <Card>
                <Card.Body>
                  <Checkbox
                    color="primary"
                    isSelected={selected == "retiro local" ? true : false}
                    onChange={() => setSelected("retiro local")}
                  >
                    Retirar en nuestro domicilio
                  </Checkbox>
                </Card.Body>
              </Card>
            </Container>
            <Spacer y={1} />

            <Container>
              <Card>
                <Card.Body>
                  <Checkbox
                    color="primary"
                    isSelected={selected == "a domicilio" ? true : false}
                    onChange={() => setSelected("a domicilio")}
                  >
                    Envio a Domicilio por correo
                  </Checkbox>
                </Card.Body>
              </Card>
            </Container>

            <Spacer y={2} />
            <Domicilio tipoEnvio={selected} />
            <Spacer y={isMobile ? 1 : 0} />
          </Container>
        </Grid>
        
        <Grid xs={isMobile ? 12 : 3}>
          <Cuenta cart={cart} total={total} envio={selected} />
        </Grid>
        <Grid xs={2} />
      </Grid.Container>
      <Spacer y={4} />
    </Container>
  );
}
