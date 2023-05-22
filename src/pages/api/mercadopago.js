const API_URL = process.env.NEXT_PUBLIC_API_KEY;
const mpaccesstoken = process.env.mpaccesstoken;
import axios from "axios";

export default async function handler(req, res) {
  if (req.body.data && req.body.type === 'payment') {
    const compra = await axios.get(
      `https://api.mercadopago.com/v1/payments/${req.body.data.id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${mpaccesstoken}`,
        },
      }
    );
    try {
      const data = {
        status: "Pagado",
        datosComprador: {
          username: compra.data.metadata.datos_comprador.username,
          metodoPago: compra.data.payment_type_id,
          envio:compra.data.metadata.datos_comprador.envio,
          adress: compra.data.metadata.datos_comprador.adress,
        },
        datosVendedor: {
          numeroCuenta: "1412412515212543",
          nombreCuenta: "filumSA",
        },
        productos: compra.data.metadata.productos,
        total:compra.data.metadata.total,
        pagoId:compra.data.id
      }
      data.productos = data.productos.map((producto) => {
        const { image_url, ...resto } = producto;
        return { imageURL: image_url, ...resto };
      });
      const body = JSON.stringify(data);
      const response = await fetch(`${API_URL}/api/compras`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication:compra.data.metadata.token,
        },
        body:body,
      });
      console.log(compra.data);
    } catch (error) {
      console.log(error);
    }
  }

  res.status(200).json({ name: 'tomas Doe' });
}
