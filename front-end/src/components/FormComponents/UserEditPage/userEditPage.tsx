import Box from "@mui/material/Box"
import { PageLayout } from "../../PersistentDrawerLeft/PageLayout"
import { UserImage } from "./userEdit.styles"
import { Label } from "../../DesignComponents/SearchBar/Label/Label"
import { tokenColors } from "../../../../token"
import { Divider } from "@mui/material"

export const UserEditPage = () => {
    return (
        <PageLayout>
            <Box sx={{
                margin: "15px", padding: "20px", display: "flex", justifyContent: "start", alignItens: "center",
                backgroundColor: "#fff", borderRadius: "15px"
            }}>
                <Box sx={{ width: "50%", padding: "10px",textAlign: 'center' }}>
                    <UserImage src="https://images.unsplash.com/photo-1691874683123-5d7bf8d79df1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" />

                    <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: "row", gap: "12px" }}>
                        <Label text="Total de Produtos" color={tokenColors.primary} quantity={50} />
                        <Label text="Á vencer" color={tokenColors.secondary} quantity={25} />
                        <Label text="Vencidos" color={tokenColors.error} quantity={10} />
                        <Divider orientation="vertical"/>    
                    </Box>
                    

                </Box> 
            </Box>
        </PageLayout>
    )
}