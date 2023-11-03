import { useNavigate } from "react-router-dom"
import { useCookie } from "../../../hooks/useCookies"
import React, {useEffect} from 'react'

export const ProtectedPage = ({ children }: { children: JSX.Element }) => {
    const verify = useCookie().getAuthCookie()
    const navigate = useNavigate()

    useEffect(() => {
        if (!verify.token || !verify.login) {
            navigate("/login")
        }
    }, [])

    return children
}

