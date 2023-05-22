import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { UserProvider } from "@/context/userContext";
import { CartProvider } from "@/context/cartContext";
import { ProductProvider } from "@/context/productsContext";
import { ComprasProvider } from "@/context/comprasContext";
import { CompraProvider } from "@/context/compraContext";
import { SessionProvider } from "next-auth/react";
import { CheckAuth } from "@/components/auth";
import NavbarComponent from "@/components/navbar";
import "../styles/globals.css";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      backgroundContrast: "#2b2d2f",
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <CompraProvider>
          <ComprasProvider>
            <CartProvider>
              <ProductProvider>
                <NextThemesProvider
                  defaultTheme="system"
                  attribute="class"
                  value={{
                    light: lightTheme.className,
                    dark: darkTheme.className,
                  }}
                >
                  <NextUIProvider>
                    <CheckAuth>
                      <NavbarComponent/>
                      <Component {...pageProps} />
                    </CheckAuth>
                  </NextUIProvider>
                </NextThemesProvider>
              </ProductProvider>
            </CartProvider>
          </ComprasProvider>
        </CompraProvider>
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
