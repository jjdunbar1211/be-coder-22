const express = require('express');
const {apiRoutes} = require('./routers/index');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.use('/api/productos', apiRoutes);

const connectedServer = app.listen(PORT, ()=> {
  console.log(`Server corriendo en puerto: ${PORT}`);
});

connectedServer.on('error', error => {
  console.error('Error: ', error.message);
})
