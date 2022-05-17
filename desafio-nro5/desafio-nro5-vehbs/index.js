const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const {apiRoutes} = require('./routers/index');


const app = express();
const PORT = process.env.PORT || 8080;

const layoutDirPath = path.resolve(__dirname, './views/layouts');
const defaultLayerPth = path.resolve(__dirname, './views/main.hbs');

// Setear el uso del engine de handlebars
app.set('view engine', 'hbs');

// Configuraciones de handlebars como la extension y los directorios del layout y default
app.engine(
	'hbs',
	handlebars({
		layoutsDir: layoutDirPath,
		defaultLayout: defaultLayerPth,
		extname: 'hbs',
	})
);

app.use(express.json()); // Indica que el body viene como JSON
app.use(express.urlencoded({ extended: true })); // Indica que el body puede tener un informacion como no string


app.use('/api', apiRoutes);

const connectedServer = app.listen(PORT, ()=> {
  console.log(`Server corriendo en puerto: ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.error('Error: ', error);
})
