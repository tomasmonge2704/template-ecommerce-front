import { createContext, useState, useEffect } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

export const ProductsContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const getProducts = async (token) => {
    try {
      const response = await fetch(`${API_URL}/api/producto`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authentication: `${token}`,
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error)
    }
  };
  
  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getProducts(token);
  }, [token]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
