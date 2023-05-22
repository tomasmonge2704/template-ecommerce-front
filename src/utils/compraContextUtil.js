import { useContext } from "react";
import { CompraContext } from "@/context/compraContext";

export function UseCompraContext() {
  return useContext(CompraContext);
}