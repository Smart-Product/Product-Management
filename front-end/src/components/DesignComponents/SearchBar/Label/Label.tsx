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
        <Box sx={{ backgroundColor: "#e6e5e5", borderRadius: "10px", width: "180px",
         display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", border: `2px solid ${color}`}}>
            <FiberManualRecordIcon htmlColor={color} sx={{ width: "15px" }} />
            <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto", fontWeight: "500" }}>
                {text}: {quantity}
            </Typography>
        </Box>
    )
}