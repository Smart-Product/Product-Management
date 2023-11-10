import { Box, FormLabel, Typography } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { number } from "joi";


interface Label {
    text: string;
    color: string;
    quantity?: number;
}

export const Label = ({ text, color, quantity }: Label) => {

    return (
        <Box sx={{ backgroundColor: "#e6e5e5", borderRadius: "20px", width: "180px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px"}}>
            <FiberManualRecordIcon htmlColor={color} sx={{ width: "15px" }} />
            <Typography variant="body2" sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto" }}>
                {text}: {quantity}
            </Typography>
        </Box>
    )
}