import React, { useState, useEffect, useContext } from "react";
import { Pagination, Container, Spacer, Image, Text } from "@nextui-org/react";
import CompraItem from "./item";
import EmptyCart from "../carrito/emptyCart";
import moment from "moment";
import { ComprasContext } from "@/context/comprasContext";

export default function MisComprasContenedor() {
  const { compras } = useContext(ComprasContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedCompras, setSortedCompras] = useState([]);
  const [comprasLoaded, setComprasLoaded] = useState(false);

  useEffect(() => {
    const sortCompras = (compras) => {
      const compareFn = (a, b) => {
        const fechaA = moment(a.fechaCompra).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        const fechaB = moment(b.fechaCompra).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        return moment(fechaB).toDate() - moment(fechaA).toDate();
      };
      return [...compras].sort(compareFn);
    };

    if (compras.length > 0) {
      const sorted = sortCompras(compras);
      setSortedCompras(sorted);
      setComprasLoaded(true);
    }
  }, [compras]);

  if (!comprasLoaded) {
    return (
      <EmptyCart/>
    );
  }

  return (
    <Container css={{padding:"0px"}}>
      <Spacer y={1} />
      {sortedCompras
        .slice((currentPage - 1) * 2, currentPage * 2)
        .map((item, index) => (
          <Container key={index} css={{padding:"0px"}}>
            <CompraItem item={item} index={index} />
            <Spacer y={1} />
          </Container>
        ))}
      <Spacer y={1} />
      <Container css={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          total={Math.ceil(sortedCompras.length / 2)}
          initialPage={1}
          onChange={(newPage) => setCurrentPage(newPage)}
        />
      </Container>
    </Container>
  );
}
