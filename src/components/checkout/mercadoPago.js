import { Card} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Script from "next/script";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

export default function MercadoPagoCard({ compra }) {
  const [preferenceId, setPreferenceId] = useState('');
  const [body,setBody] = useState({})
  const token  = localStorage.getItem("token");
  useEffect(() => {
    compra.token = token;
    setBody(JSON.stringify(compra));
  }, [compra]);
  useEffect(() => {
    if (preferenceId && MercadoPago) {
      const mp = new MercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY);
      const bricksBuilder = mp.bricks();
      bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
          preferenceId: preferenceId,
        },
        text: {
          cardTitle: "Pagar con Mercado Pago",
        }
      });
    }
  }, [preferenceId]);
  const handleMercadoPago = async () => {
    try {
      const response = await fetch(`${API_URL}/api/mercadopago/create-preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: `${token}`,
        },
        body:body,
      });
      const { preferenceId } = await response.json();
      setPreferenceId(preferenceId);
    } catch (error) {
      alert(error);
    }
  };

  return (<>
  <Script src="https://sdk.mercadopago.com/js/v2"></Script>
    {preferenceId ? (
      <div id="wallet_container"></div>
    ) : (
    <Card
      isHoverable
      variant="bordered"
      isPressable
      css={{ w: "100%", h: 120 }}
      onClick={handleMercadoPago}
    >
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src="/mercado-pago.png"
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
        
      </Card.Body>
    </Card>
    )}
    </>
  );
}
