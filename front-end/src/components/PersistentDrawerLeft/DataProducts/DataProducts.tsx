import React from 'react';
import Box from '@mui/material/Box';
import { PageLayout } from '../PageLayout';

const DataPage = () => {
  return (
    <PageLayout>
      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <h1>Datas</h1>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <video controls width={500} height={500}>
            <source src="./src/assets/video de datas.mp4" type="video/mp4" />
            Desculpe, seu navegador não suporta vídeos HTML5.
          </video>
        </Box>
      </Box>
    </PageLayout>

  );
};

export default DataPage;