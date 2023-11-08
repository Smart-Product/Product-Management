import AddIcon from "@mui/icons-material/Add";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Backdrop, Button, Fade, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../interface/IProduct";
import { deleteProductById, getProducts } from "../../../services/ProductServices";
import SearchBar from "../../DesignComponents/SearchBar/SearchBar";
import { PageLayout } from "../PageLayout";
import { formError, formatDate } from "../../../utils/utils";
import { useCookie } from "../../../hooks/useCookies";
import { ProtectedPage } from "../../Security/ProtectedPage/ProtectedPage";

//Row = Linha 
const Row: React.FC<{ produto: IProduct, handleOpenModal: (id: number | undefined) => void }> = ({ produto, handleOpenModal }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Function to toggle the 'open' state
  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
  }, [produto]);
  return (<>
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={toggleOpen}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        {produto.nome}
      </TableCell>
      <TableCell align="center">{produto.pesoPecaKg} kg</TableCell>
      <TableCell align="center">{produto.quantidadePeca}</TableCell>
      <TableCell align="center">{produto.precoKg}</TableCell>
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

            </Box>

            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Vencimento</TableCell>
                  <TableCell>Tipo de Carne</TableCell>
                  <TableCell>Tipo de Corte</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="right">Preço Total ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={produto.dataValidade}>
                  <TableCell component="th" scope="row">
                    {formatDate(produto.dataValidade)}
                  </TableCell>
                  <TableCell> {produto.tipoCorteCarne?.descricao} </TableCell>
                  <TableCell> {produto.tipoCorteCarne?.descricaoEspecifica} </TableCell>
                  <TableCell align="center" sx={{ width: "40%" }}>
                    {produto.descricao}
                  </TableCell>
                  <TableCell align="right">
                    {Math.round(((produto?.quantidadePeca ?? 0) * (produto?.pesoPecaKg ?? 0)) * (produto?.precoKg ?? 0) * 100) / 100}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
              <Box sx={{
                width: '100px', display: "flex",
                justifyContent: "space-between"
              }}>
                <IconButton aria-label="delete" size="medium" onClick={() => navigate(`/produto/${produto.produtoId}`)}>
                  <CreateIcon />
                </IconButton>

                <IconButton aria-label="delete" size="medium" onClick={() => handleOpenModal(produto.produtoId)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>

          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>
  );
}

export default function ProductPage() {

  const navigate = useNavigate();
  //Array que vem da API é inserido aqui
  const [produtos, setProdutos] = useState<IProduct[]>([])

  const [open, setOpen] = React.useState(false);

  const [productId, setProductId] = useState<number>();

  const [productDeleted, setProductDeleted] = useState<number>()

  const token = useCookie().getAuthCookie().token;

  const handleOpen = (productId: number | undefined) => {
    setOpen(true);
    setProductId(productId)
  }

  const handleClose = () => setOpen(false);

  async function deleteProduct(token: string | null, id: number | undefined) {
    console.log("Id delete :", productId)
    try {

      await deleteProductById(token, id);
      handleClose();
      setProductDeleted(id)
    } catch (error: any) {
      if (error.message == "Network Error") {
        localStorage.clear()
        navigate("/login")
      }
      console.error(error)
      formError("Não foi possível deletar este produto")
    }

  }

  function search(response: IProduct[]) {
    try {
      setProdutos([])
      return setProdutos(response);
    } catch (error: any) {
      if (error.message == "Network Error") {
        localStorage.clear()
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    setProdutos([])
    const getData = async () => {
      try {
        const response = await getProducts(token);
        setProdutos(response);
      } catch (error: any) {
        if (error.message == "Network Error") {
          localStorage.clear()
          navigate("/login")
        }
      }
    }
    getData();
  }, []);

  useEffect(() => {
    setProdutos([])
    const getData = async () => {
      try {
        const response = await getProducts(token);
        setProdutos(response);
      } catch (error: any) {
        if (error.message == "Network Error") {
          localStorage.clear()
          navigate("/login")
        }
      }
    }
    getData()
  }, [productDeleted]);

  return (
    <ProtectedPage>
      <PageLayout>
        <Box sx={{ mt: 2, display: "flex", gap: 2, flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <SearchBar search={search} />

            <IconButton aria-label="adicionar" size="large">
              <AddIcon onClick={() => navigate("/produto")} />
            </IconButton>
          </Box>

          <Box>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={{
                  position: 'absolute' as 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column"
                }}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    Você quer mesmo deletar este produto ?
                  </Typography>
                  <Button variant="outlined" onClick={() => deleteProduct(token, productId)} sx={{ mt: 2 }}>
                    Sim
                  </Button>
                  <Button variant="outlined" onClick={() => handleClose()} sx={{ mt: 2 }}>
                    Não
                  </Button>
                </Box>
              </Fade>
            </Modal>
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
                {produtos.map((produto) => (
                  <Row key={produto.produtoId} produto={produto} handleOpenModal={handleOpen} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PageLayout>
    </ProtectedPage>

  );
}