import { Navbar, Badge, Link, Text, Avatar, Dropdown } from "@nextui-org/react";
import { Logo } from "./Logo.js";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme, styled } from "@nextui-org/react";
import { MoonIcon } from "@/components/icons/MoonIcon.js";
import { SunIcon } from "@/components/icons/SunIcon.js";
import { CartIcon } from "./icons/CartIcon.js";
import { useContext,useEffect,useState } from "react";
import { UserContext } from "@/context/userContext";
import { CartContext } from "@/context/cartContext.js";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Router from "next/router";
import { isMobile } from "react-device-detect";

const StyledButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  "&:active": {
    opacity: 0.8,
  },
});

export default function NavbarComponent() {
  const router = useRouter();
  const page = router.pathname;
  const navbarLinks = [
    { nombre: "Home", href: "/" },
    { nombre: "Productos", href: "/productos" },
  ];
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  function dropdownAction(e) {
    if (e == "logout") {
      signOut();
      localStorage.removeItem("token");
    }
    if (e == "Mis compras") {
      Router.push("/mis-compras");
    }
    if (e == "profile") {
      Router.push("/user");
    }
  }
  const { user, setUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [shouldRenderSwitch, setShouldRenderSwitch] = useState(false);

  useEffect(() => {
    setShouldRenderSwitch(!isMobile);
  }, []);
  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        {shouldRenderSwitch && (
        <StyledButton
          css={{ display: "flex", alignItems: "center" }}
          onClick={(e) => {
            e.preventDefault();
            Router.push("/");
          }}
        >
          <Logo />
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </StyledButton>)}
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        {navbarLinks.map((item) => (
          <Navbar.Link
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              Router.push(item.href);
            }}
            key={item.href}
            isActive={page == item.href ? true : false}
          >
            {item.nombre}
          </Navbar.Link>
        ))}
      </Navbar.Content>

      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        {shouldRenderSwitch && (
        <Switch
          checked={isDark}
          iconOff={<SunIcon filled />}
          iconOn={<MoonIcon filled />}
          size="xl"
          color="error"
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          id="navbarSwitch"
        />
      )}
        <StyledButton
          onClick={(e) => {
            e.preventDefault();
            Router.push("/cart");
          }}
        >
          <Badge color="error" content={cart.length} shape="circle">
            <CartIcon fill="currentColor" size={30} />
          </Badge>
        </StyledButton>
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                size="md"
                src={user.avatar ? user.avatar : "/avatar.png"}
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => dropdownAction(actionKey)}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text size="$xs" b color="inherit" css={{ d: "flex" }}>
                {user.username}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="Mis compras" withDivider>
              Mis Compras
            </Dropdown.Item>
            <Dropdown.Item key="logout" id="logout" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {navbarLinks.map((item) => (
          <Navbar.CollapseItem
            key={item.href}
            activeColor="secondary"
            isActive={page == item.href ? true : false}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              onClick={(e) => {
                e.preventDefault();
                Router.push(item.href);
              }}
            >
              {item.nombre}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
