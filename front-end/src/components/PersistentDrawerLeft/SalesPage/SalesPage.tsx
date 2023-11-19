import React from 'react';
import Box from '@mui/material/Box';
import { PageLayout } from '../PageLayout';
import { ProtectedPage } from '../../Security/ProtectedPage/ProtectedPage';

const SalesPage = () => {
  return (
      <PageLayout>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <h1>Vendas</h1>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <video controls width={500} height={500}>
              <source src="./src/assets/video de vendas.mp4" type="video/mp4" />
              Desculpe, seu navegador não suporta vídeos HTML5.
            </video>
          </Box>
        </Box>
      </PageLayout>


  );
};

export default SalesPage;