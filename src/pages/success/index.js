import { useContext,useEffect,useState } from "react";
import { useRouter } from 'next/router';
import { ComprasContext } from "@/context/comprasContext";
import { Spacer } from "@nextui-org/react";
import CompraDetail from "@/components/compras/detail";
export default function App() {
  const { compras } = useContext(ComprasContext);
  const router = useRouter();
  const [compraBuscada, setCompraBuscada] = useState('');
  useEffect(() => {
    setCompraBuscada(compras.find(e => e.pagoId === router.query.payment_id))
  }, [compras])
  return (
  <>
    <Spacer y={1} />
    {compraBuscada ? ( <CompraDetail item={compraBuscada}/>) : (<></>)}
  </>
  );
}