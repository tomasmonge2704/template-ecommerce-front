import { useState } from "react";
import { Button, Input, Spacer,Link,Row } from "@nextui-org/react";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleMailChange = (event) => setMail(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePassword2Change = (event) => setPassword2(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password,mail }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      window.location.href = "/";
    } else {
        const res = await response.json()
        setErrorMessage(res.mensaje)
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
        <form style={{width:"20rem"}} onSubmit={handleSubmit}>
          <Input
            value={username}
            onChange={handleUsernameChange}
            status={errorMessage == "el usuario ya se encuentra registrado." ? "error" : ""}
            fullWidth
            label={errorMessage == "el usuario ya se encuentra registrado." ? errorMessage : "Ingrese el nombre de usuario"}
          />
          <Spacer y={1} />
          <Input
            value={mail}
            type="email"
            onChange={handleMailChange}
            status={errorMessage == "El correo electrónico ya se encuentra registrado." ? "error" : ""}
            fullWidth
            label={errorMessage == "El correo electrónico ya se encuentra registrado." ? errorMessage : "Ingrese su correo electronico"}
          />
          <Spacer y={1} />
          <Input.Password
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            label="Ingrese la contraseña"
          />
          <Spacer y={1} />
          <Input.Password
            value={password2}
            onChange={handlePassword2Change}
            fullWidth
            color={password !== password2 && password2 !== "" ? ("error") : ("")}
            label={password !== password2 && password2 !== "" ? ("* Las contraseñas no coinciden") : ("Ingrese nuevamente la contraseña")}
          />
          <Spacer y={1} />
          <Button
            type="submit"
            shadow
            variant="contained"
            color="success"
            css={{ width: "100%" }}
            disabled={password !== password2 || password == "" || password2 == "" ? true : false }
          >
            Registrarse
          </Button>
          <Spacer y={1} />
          <div className="separator">
            <hr className="line"/>
            <span>Or</span>
            <hr className="line"/>
          </div>
          <Spacer y={1} />
          <Row css={{alignItems:'center'}}>Ya tenes una cuenta?<Link block href="/login">Ir al Login</Link></Row>
          <Spacer y={1} />
        </form>
    </div>
  );
}
