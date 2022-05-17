const express = require('express');
const path = require('path');

const {apiRoutes} = require('./routers/index');


const app = express();
const PORT = process.env.PORT || 8080;

const viewsPath = path.resolve(__dirname, './views');

// Se indica directorio de almacenamiento de plantillas
app.set('views', viewsPath)
// Setear el uso del engine de pug
app.set('view engine', 'pug');

app.use(express.json()); // Indica que el body viene como JSON
app.use(express.urlencoded({ extended: true })); // Indica que el body puede tener un informacion como no string


app.use('/api', apiRoutes);

const connectedServer = app.listen(PORT, ()=> {
  console.log(`Server corriendo en puerto: ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.error('Error: ', error);
})
