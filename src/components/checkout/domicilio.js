import {
    Container,
    Input,
    Card,
    Button,
    Spacer,
    Text,
  } from "@nextui-org/react";
  import { UserContext } from "@/context/userContext";
  import { useContext, useState, useEffect } from "react";
  import { isMobile } from "react-device-detect";
  const API_URL = process.env.NEXT_PUBLIC_API_KEY;
  
  export default function Domicilio({ tipoEnvio }) {
    const { user, setUser } = useContext(UserContext);
    const [calle, setCalle] = useState("");
    const [altura, setAltura] = useState("");
    const [piso, setPiso] = useState("");
    const [token, setToken] = useState("");
    const [editable, setEditable] = useState(false);
  
    useEffect(() => {
      setToken(localStorage.getItem("token"));
    }, []);
  
    useEffect(() => {
      setCalle(user.adress?.calle || "");
      setAltura(user.adress?.altura || "");
      setPiso(user.adress?.piso || "");
    }, [user]);
  
    const handleEditable = () => {
      setEditable(true);
    };
  
    const handleDomicilio = async () => {
        const datos = { adress: { calle, altura, piso } };
        const body = JSON.stringify(datos);
        try {
          const response = await fetch(`${API_URL}/user/${user.username}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authentication: `${token}`,
            },
            body,
          });
          const data = await response.json();
          localStorage.setItem("token", data.token);
          setUser(data.usuario);
          setEditable(false);
        } catch (error) {
          console.log(error);
        }
      };      
  
    return (
      <Container css={{padding:"0px"}}>
        <Text size={20}>Domicilio</Text>
        <Spacer y={1} />
        <Card>
          <Card.Body>
            {tipoEnvio === "a domicilio" ? (
              <>
                <Input
                  label="Calle"
                  readOnly={!editable}
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                />
                <Spacer y={1} />
                <Container
                  css={isMobile ? {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:"space-around",
                    padding: "0px"                  
                  } : {
                    display: "flex",
                    flexWrap: "nowrap",
                    justifyContent: "space-evenly",
                    alignItems: "flex-end",
                    padding: "0px",
                  }}
                >
                  <Input
                    label="Altura"
                    readOnly={!editable}
                    value={altura}
                    width="48%"
                    onChange={(e) => setAltura(e.target.value)}
                  />
                  {!isMobile && (<Spacer x={1} />)}
                  <Input
                    label="Piso"
                    width="48%"
                    readOnly={!editable}
                    value={piso}
                    onChange={(e) => setPiso(e.target.value)}
                  />
                  <Spacer x={isMobile ? 12 : 1}/>
                  {editable ? (
                    <Button shadow onClick={handleDomicilio}>
                      Guardar domicilio
                    </Button>
                  ) : (
                    <Button shadow onClick={handleEditable}>
                      Editar
                    </Button>
                  )}
                </Container>
              </>
            ) : (
              <Container
                css={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Text blockquote css={{ width: "100%" }}>
                  No aplica
                </Text>
              </Container>
            )}
          </Card.Body>
        </Card>
      </Container>
    );
  }
  