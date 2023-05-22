import { useEffect,useContext } from 'react'
import { UserContext } from '@/context/userContext'
import {verify} from 'jsonwebtoken'
const secretKey = process.env.CLAVE_TOKEN
import Router from 'next/router'
import { useRouter } from 'next/router'
function validateToken(token){
    try{ 
        return verify(token, secretKey)
    }
    catch (err){
        return undefined
    }
}

export function CheckAuth({ children }) {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(router.pathname == '/signup' || router.pathname == '/login' ){
        }else{
            if (!token){
                Router.push('/login');
            } else{
                const decoded = validateToken(token)
                if(!decoded){
                    Router.push('/login');
                }else{
                    decoded.user.token = token;
                    setUser(decoded.user);
                }
            }
        }
      }, [router.pathname]) 
      return (
        <>
        {children}
        </>)
  }