import { useContext } from "react";
import { useRouter } from 'next/router';
import { ComprasContext } from "@/context/comprasContext";
import { Spacer } from "@nextui-org/react";
import CompraDetail from "@/components/compras/detail";
export default function App() {
  const { compras } = useContext(ComprasContext);
  const router = useRouter();
  const compraBuscada = compras.find(e => e._id === router.query.compra);

  return (
  <>
    <Spacer y={1} />
    {compraBuscada ? ( <CompraDetail item={compraBuscada}/>) : (<></>)}
  </>
  );
}