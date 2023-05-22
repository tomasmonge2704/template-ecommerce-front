import { UserContext } from "@/context/userContext";
import React from "react";
import MisComprasContenedor from "@/components/compras/contenedor";
import {
  Avatar,
  Container,
  Spacer,
  Grid,
  Text,
  Collapse,
  Input,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { IconButton } from "@/components/icons/iconButton";
import { EditIcon } from "@/components/icons/editIcon";
import { isMobile } from "react-device-detect";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;
export default function App() {
  const { user, setUser } = React.useContext(UserContext);
  const [editableTelefono, setEditableTelefono] = React.useState(false);
  const [editableMail, setEditableMail] = React.useState(false);
  const [mailError,setMailError] = React.useState(false);
  const [telefono, setTelefono] = React.useState('');
  const [mail, setMail] = React.useState('');
  const handleUpdateTelefono = async () => {
    try {
      const response = await fetch(`${API_URL}/user/${user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authentication: `${localStorage.getItem("token")}`,
        },
        body:JSON.stringify({
          telefono:telefono
        })
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setEditableTelefono(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateMail = async () => {
    try {
      const response = await fetch(`${API_URL}/user/${user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authentication: `${localStorage.getItem("token")}`,
        },
        body:JSON.stringify({
          mail:mail
        })
      });
      const data = await response.json();
      if(data.error){
        setMailError(true)
      }else{
        localStorage.setItem("token", data.token);
        setEditableMail(false);
      }
    } catch (error) {
      alert(error);
    }
  };
  React.useEffect(() => {
    setTelefono(user.celular || "");
    setMail(user.mail || "");
  }, [user]);
  const handleEditableTelefono = () => {
    setEditableTelefono(true);
  };
  const handleEditableMail = () => {
    setEditableMail(true);
  };
  const handleEditableTelefonoClose = () => {
    setEditableTelefono(false);
  };
  const handleEditableMailClose = () => {
    setEditableMail(false);
  };
  return (
    <>
      <Spacer y={2} />
      <Container css={{ display: "flex", justifyContent: "center" }}>
        <Grid.Container gap={isMobile ? 0 : 2}>
          <Grid xs={12}>
            <Collapse.Group splitted css={{ width: "100%" }}>
              <Collapse
                title={<Text h4>{user.username}</Text>}
                subtitle="Datos personales"
                contentLeft={
                  <Avatar
                    size="lg"
                    src={user.avatar}
                    color="secondary"
                    bordered
                    squared
                  />
                }
              >
                <Input
                  readOnly
                  label="Username"
                  fullWidth
                  initialValue={user.username}
                />
                <Spacer y={1} />
                {user.role == "admin" ? (
                  <>
                    <Input
                      readOnly
                      label="Rol"
                      fullWidth
                      initialValue={user.role}
                    />
                    <Spacer y={1} />
                  </>
                ) : (
                  <></>
                )}
                {editableMail == true ? (
                  <Grid.Container gap={2}>
                    <Grid xs={isMobile ? 12 : 7}>
                      <Input
                        label={mailError == true ? "El mail ya se encuentra registrado." : "Mail"}
                        fullWidth
                        status={mailError == true ? "error" : "primary"}
                        initialValue={mail}
                        onChange={(e) => setMail(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={isMobile ? 12 : 5}>
                      <Container css={{display:"flex",justifyContent:"space-between",alignContent:"flex-end" }}>
                      <Button onClick={handleUpdateMail}>Guardar Cambios</Button>
                      <Spacer y={isMobile ? 1 : 0}/>
                      <Button onClick={handleEditableMailClose}>Cancelar</Button>
                      </Container>
                    </Grid>
                  </Grid.Container>
                ) : (
                  <Input
                    label="Mail"
                    fullWidth
                    readOnly
                    initialValue={mail}
                    contentRightStyling={false}
                    contentRight={
                      <Container>
                        <Tooltip content="Edit user">
                          <IconButton onClick={handleEditableMail}>
                            <EditIcon size={20} fill="#979797" />
                          </IconButton>
                        </Tooltip>
                      </Container>
                    }
                  />
                )}

                <Spacer y={1} />
                {editableTelefono == true ? (
                  <Grid.Container gap={2}>
                    <Grid xs={isMobile ? 12 : 7}>
                      <Input
                        label="Telefono"
                        fullWidth
                        onChange={(e) => setTelefono(e.target.value)}
                        status="primary"
                        initialValue={telefono}
                      />
                    </Grid>
                    <Grid xs={isMobile ? 12 : 5}>
                      <Container css={{display:"flex",justifyContent:"space-between",alignContent:"flex-end" }}>
                      <Button onClick={handleUpdateTelefono}>Guardar Cambios</Button>
                      <Spacer y={isMobile ? 1 : 0}/>
                      <Button onClick={handleEditableTelefonoClose}>Cancelar</Button>
                      </Container>
                    </Grid>
                  </Grid.Container>
                ) : (
                  <Input
                    label="Telefono"
                    fullWidth
                    readOnly
                    initialValue={telefono}
                    contentRightStyling={false}
                    contentRight={
                      <Container>
                        <Tooltip content="Edit user">
                          <IconButton onClick={handleEditableTelefono}>
                            <EditIcon size={20} fill="#979797" />
                          </IconButton>
                        </Tooltip>
                      </Container>
                    }
                  />
                )}
              </Collapse>
              <Collapse title="Mis compras">
                <MisComprasContenedor />
              </Collapse>
            </Collapse.Group>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
}
