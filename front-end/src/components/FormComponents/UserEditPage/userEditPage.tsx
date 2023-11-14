import Box from "@mui/material/Box"
import { PageLayout } from "../../PersistentDrawerLeft/PageLayout"
import { UserImage } from "./userEdit.styles"
import { Label } from "../../DesignComponents/SearchBar/Label/Label"
import { tokenColors } from "../../../../token"
import { Avatar, Divider, Typography } from "@mui/material"
import { useCookie } from "../../../hooks/useCookies"

export const UserEditPage = () => {
    return (
        <PageLayout>
            <Box sx={{
                margin: "15px", padding: "20px", display: "flex", justifyContent: "start", alignItens: "center",backgroundColor: "#fff", borderRadius: "15px",
            }}>
                <Box sx={{ width: "50%", padding: "10px",textAlign: 'center', display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', gap: "20px" }}>
                    <Avatar src={useCookie().getAuthCookie().login} alt={useCookie().getAuthCookie().login} sx={{width: "200px", height: "200px", fontSize: "200%"}}/>
                    <Typography variant="h5">Produtos</Typography>

                    <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: "row", gap: "12px" }}>
                        <Label text="Total" color={tokenColors.primary} quantity={50} />
                        <Label text="Á vencer" color={tokenColors.secondary} quantity={25} />
                        <Label text="Vencidos" color={tokenColors.error} quantity={10} />
                         
                    </Box>
                </Box>

                 <Box>
                    Formulário
                 </Box>
            </Box>
        </PageLayout>
    )
}