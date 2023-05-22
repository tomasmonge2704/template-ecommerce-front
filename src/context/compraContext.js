import { createContext, useState } from 'react';

export const CompraContext = createContext();

export function CompraProvider({ children }) {
  const [compra, setCompra] = useState([]);

  return <CompraContext.Provider value={{ compra, setCompra }}>{children}</CompraContext.Provider>;
}