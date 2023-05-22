import React from "react";
import { styled, Image, Grid, Input,Card,Text, Container, Spacer } from "@nextui-org/react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { isMobile } from "react-device-detect";
const StyledButton = styled("button", {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    '&:active': {
      opacity: 0.8,
    }
  });

export default function CartItem({changeCantidad, item,removeFromCart }) {
  const [cantidad, setCantidad] = React.useState(item.cantidad);
  React.useMemo(() => {
    if(cantidad <= item.stock){
      item.cantidad = Number(cantidad);
    }else{
      setCantidad(item.stock);
    }
    changeCantidad(item);
  }, [cantidad]);
    const handleDeleteItem = () =>{
        removeFromCart(item)
    }
  return (
    <Card><Card.Body>
    <Grid.Container gap={isMobile ? 0 : 1} justify="center">
      <Grid xs={isMobile ? 4 : 2}>
        <Image
          src={"https://nextui.org" + item.imageURL}
          objectFit="cover"
          width="100%"
          height={150}
          css={{borderRadius:"4%"}}
          alt={item.nombre}
        />
      </Grid>
      <Grid xs={6} css={{textAlign:"strat"}}>
        <Container>
        <Text>
        {item.nombre}  
        </Text>    
        <Text>${item.precio}</Text>
        <Spacer y={1}/>
      <Input labelLeft="Cantidad"  width="160px" type="Number" value={cantidad} onChange={(e) => setCantidad(e.target.value)}/>
      </Container>
      </Grid>
      <Grid xs={isMobile ? 2 : 3} css={{display:"flex",justifyContent:"flex-end",alignItems:"baseline"}}>
      <StyledButton onClick={handleDeleteItem}>
        <DeleteIcon size={20} fill="#FF0080"/>
      </StyledButton>
      </Grid>
    </Grid.Container>
    </Card.Body></Card>
  );
}
