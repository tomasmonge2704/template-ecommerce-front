import React from "react";
import MisComprasContenedor from "@/components/compras/contenedor";
import {
  Container,
  Spacer,
  Grid,
} from "@nextui-org/react";
export default function App() {
  return (
    <>
      <Spacer y={2} />
      <Container css={{ display: "flex", justifyContent: "center" }}>
        <Grid.Container gap={2}>
          <Grid xs={12}>
                <MisComprasContenedor/>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
}
