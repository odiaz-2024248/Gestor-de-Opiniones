<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Rutas
const publicacionesRoutes = require('./routes/publicaciones');
app.use('/publicaciones', publicacionesRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

require('dotenv').config()
const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000')
});
