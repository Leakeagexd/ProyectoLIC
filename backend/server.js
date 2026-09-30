const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
 
app.use(cors()); 
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Servidor de SINTEL corriendo correctamente');
});

app.get('/api/status', (req, res) => {
  res.json({
    proyecto: 'SINTEL - Soluciones Electrónicas Integrales',
    estado: 'Servidor Activo',
    fecha: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(` Servidor SINTEL activo en: http://localhost:${PORT}`);
  console.log(`=================================`);
});