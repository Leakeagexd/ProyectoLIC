const sql = require('mssql');
require('dotenv').config();

//construye la configuración de conexión a la base de datos para cada maquina
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'SintelDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  },
  connectionTimeout: 30000
};

if (process.env.DB_PORT) {
  dbConfig.port = parseInt(process.env.DB_PORT, 10);
}

if (process.env.DB_INSTANCE) {
  dbConfig.options.instanceName = process.env.DB_INSTANCE;
}

async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log(' Conexión exitosa a Microsoft SQL Server');
    return pool;
  } catch (error) {
    console.error(' Error al conectar a la base de datos:', error.message);
    throw error;
  }
}

module.exports = {
  sql,
  getConnection
};