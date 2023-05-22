import { Container,Text,Spacer,Link } from "@nextui-org/react"
export default function Page404() {
    return (
        <Container display="grid" justify="center" css={{textAlign:"center",alignContent:"center"}}>
            <Spacer y={5} />
           <Text
                h1
                size={100}
                color='error'
                weight="bold"
            >
                404
            </Text>
            <Text h1>Page not found.</Text>
            <Spacer y={1} />
            <Container>
            <Link block href="/">Volver</Link>
            </Container>
        </Container>
    )
}