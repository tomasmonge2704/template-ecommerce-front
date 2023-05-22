import { ProductsContext } from "@/context/productsContext";
import { Grid,Spacer, Container } from "@nextui-org/react";
import { useContext } from 'react';
import ItemProductCard from "@/components/producto/item";
export default function App() {
  const { products, setProducts } = useContext(ProductsContext);
  return (
    <>
      <Spacer y={3} />
      <Container>
      <Grid.Container gap={2} justify="flex-start">
      {products.map((item, index) => (
        <ItemProductCard key={index} item={item} index={index} />
      ))}
    </Grid.Container>
    </Container>
   </>
  );
}