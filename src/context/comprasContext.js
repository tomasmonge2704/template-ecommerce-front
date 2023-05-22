import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./userContext";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

export const ComprasContext = createContext();

export function ComprasProvider({ children }) {
  const [compras, setCompras] = useState([]);
  const { user } = useContext(UserContext);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (user) {
      setToken(localStorage.getItem("token"));
      const getCompras = async (token) => {
        try {
          const response = await fetch(
            `${API_URL}/api/compras/${user.username}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authentication: `${token}`,
              },
            }
          );
          const data = await response.json();
          setCompras(data);
        } catch (error) {
          setCompras([]);
        }
      };
      getCompras(token);
    }
  }, [token, user]);

  return (
    <ComprasContext.Provider value={{ compras, setCompras }}>
      {children}
    </ComprasContext.Provider>
  );
}
