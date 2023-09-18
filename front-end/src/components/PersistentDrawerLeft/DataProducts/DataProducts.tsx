import React from 'react';
import Box from '@mui/material/Box';

const DataProducts = () => {
  return (
    <Box display="flex" justifyContent="center">
      <div>
        <h1>Datas</h1>
        <video controls>
          <source src="./src/assets/video de datas.mp4" type="video/mp4" />
          Desculpe, seu navegador não suporta vídeos HTML5.
        </video>
      </div>
    </Box>
  );
};

export default DataProducts;