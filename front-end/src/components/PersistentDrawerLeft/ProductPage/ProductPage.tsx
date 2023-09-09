import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchBar from "../../DesignComponents/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

function createData(
  name: string,
  pesoPecaKg: number,
  quantidadePeca: number,
  precoKg: number,
) {
  return {
    name,
    pesoPecaKg,
    quantidadePeca,
    precoKg,
    history: [
      {
        dataValidade: "2020-01-05",
        tipoCarne: "CARNE BOVINA",
        tipoCorteCarne: "Picanha",
        descricao: " Descricao do produto",
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [num, setNum] = useState(0);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.pesoPecaKg} kg</TableCell>
        <TableCell align="center">{row.quantidadePeca}</TableCell>
        <TableCell align="center">{row.precoKg}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>

                <IconButton aria-label="delete" size="medium">
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Tipo de Carne</TableCell>
                    <TableCell>Tipo de Corte</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="right">Preço Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.dataValidade}>
                      <TableCell component="th" scope="row">
                        {historyRow.dataValidade}
                      </TableCell>
                      <TableCell> {historyRow.tipoCarne} </TableCell>
                      <TableCell> {historyRow.tipoCorteCarne} </TableCell>
                      <TableCell align="center" sx={{ width: "40%" }}>
                        {historyRow.descricao}
                      </TableCell>
                      <TableCell align="right">
                        {Math.round(row.quantidadePeca * row.pesoPecaKg * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Picanha", 10, 6, 80),
  createData("Picanha", 10, 6, 80),
  createData("Picanha", 10, 6, 80),
  createData("Picanha", 10, 6, 80),
];

export default function ProductPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 2, display: "flex", gap: 2, flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBar />

        <IconButton aria-label="delete" size="large">
          <AddIcon onClick={() => navigate("/adicionar_produto")} />
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Seus Produtos</TableCell>
              <TableCell align="center">Peso/kg</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
