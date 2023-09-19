import React, { useEffect, useState } from "react";
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
import { getProducts } from "../../../services/ProductServices";
import { IProduct } from "../../../interface/IProduct";

//Row = Linha 
function Row(props: { produto: IProduct }) {
  const { produto: row } = props;
  const [open, setOpen] = useState(false);

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
          {row.nome}
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
                  Histórico
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
                    <TableRow key={row.dataValidade}>
                      <TableCell component="th" scope="row">
                        {row.dataValidade}
                      </TableCell>
                      <TableCell> {row.tipoCorteCarne?.descricao} </TableCell>
                      <TableCell> {row.tipoCorteCarne?.descricaoEspecifica} </TableCell>
                      <TableCell align="center" sx={{ width: "40%" }}>
                        {row.descricao}
                      </TableCell>
                      <TableCell align="right">
                        {Math.round(row?.quantidadePeca * row?.pesoPecaKg * 100) / 100}
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ProductPage() {
  const navigate = useNavigate();
  //Array que vem da API é inserido aqui
  const [produtos, setProdutos] = useState<IProduct[]>([])

  useEffect(() => {
    const getData = async () => {
      const response = await getProducts();
      setProdutos(response)
    }
    getData();
  }, [])

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
            {/* O map esta fazendo um loop em cada elemento do array que veio da API */}
            {produtos.map((produto) => (
              <Row key={produto.nome} produto={produto} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}