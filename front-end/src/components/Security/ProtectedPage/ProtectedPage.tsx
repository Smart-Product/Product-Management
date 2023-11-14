import { useNavigate } from "react-router-dom"
import { useCookie } from "../../../hooks/useCookies"
import React, {useEffect, useState} from 'react'
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"
import { LoadingError } from "../../DesignComponents/Loading/LoadingError"

const Redirecting = () => {

    const navigate = useNavigate()

    navigate("/login")

    return (
        <Box sx={{margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 3}}>
            
            <Typography variant="h4">Redirecionando ... </Typography>

            <LoadingError/>

        </Box>
    )
}

export const ProtectedPage = ({ children }: { children: JSX.Element }) => {
    const verify = useCookie().getAuthCookie()
    const [redirect, setRedirect] = useState(false)
    

    useEffect(() => {
        if (!verify.token || !verify.login) {
            setTimeout(() => {
                setRedirect(true);
                console.log("Redirecionado")
              }, 2000);
        }
    }, [])

    return verify.token ? children : <Redirecting />
}

