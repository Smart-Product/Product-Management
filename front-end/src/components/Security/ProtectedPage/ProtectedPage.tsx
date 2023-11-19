import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"
import { useCookie } from "../../../hooks/useCookies"
import { LoadingProgress } from "../../DesignComponents/Loading/LoadingProgress"

const Redirecting = () => {

    const navigate = useNavigate()

    setTimeout(() => {
        navigate("/login")
      }, 2000);
    

    return (
        <Box sx={{margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 3}}>
            
            <Typography variant="h4">Erro de Autenticação </Typography>

            <LoadingProgress/>

        </Box>
    )
}

export const ProtectedPage = ({ children }: { children: JSX.Element }) => {
    const verify = useCookie().getAuthCookie()

    return verify.token ? children : <Redirecting />
}