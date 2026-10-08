const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getConnection } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Servidor SINTEL activo');
});

app.get('/api/test-db', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT TOP 5 * FROM Productos');
    
    res.json({
      mensaje: 'Conexión a BD y consulta exitosas',
      total: result.recordset.length,
      datos: result.recordset
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error en la base de datos',
      detalle: error.message
    });
  }
});

app.listen(PORT, async () => {
  console.log(`=================================`);
  console.log(` Servidor SINTEL activo en: http://localhost:${PORT}`);
  console.log(`=================================`);
  
  try {
    await getConnection();
  } catch (err) {
    console.log('Revisa la configuración en el archivo .env');
  }
});

app.get('/api/productos', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        id_producto, 
        nombre, 
        descripcion, 
        precio, 
        stock, 
        imagen 
      FROM Productos
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al consultar el catálogo' });
  }
});