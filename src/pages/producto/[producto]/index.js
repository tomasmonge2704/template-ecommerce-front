import { useContext } from "react";
import { useRouter } from 'next/router';
import { ProductsContext } from "@/context/productsContext";
import { Spacer } from "@nextui-org/react";
import { isMobile } from "react-device-detect";
import ProductDetail from "@/components/producto/detail";

export default function App() {
  const { products } = useContext(ProductsContext);
  const router = useRouter();
  const productoBuscado = products.find(producto => producto._id === router.query.producto);

  return (
  <>
    <Spacer y={isMobile ? 1 : 3} />
    <ProductDetail product={productoBuscado}/>
  </>
  );
}