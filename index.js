require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/taskRouter');
const {dbConnection} = require('./database/config')

const app = express(); /* creacion del servidor */

app.use(express.json()); /* lectura y parseo del body */
app.use(cors()); /* cors middleware proteccion backend */

dbConnection(); /* conectar la bd */

app.use('/tasks', tasksRouter ); /* ruta con middleware -> path/importar config */


app.use(express.static('public')); /* acceso directorio publico */

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
