const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model')
const cors = require('cors'); // Importar cors
//const { getProfile } = require('./middleware/getProfile')

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);


const serviceRoutes = require('../routes/services');
const serviceStatusRoutes = require('../routes/serviceStatuses');
const claimRoutes = require('../routes/claims');
const clientRoutes  = require('../routes/clients');
const installationRoutes = require('../routes/installations');
const mobileRoutes = require('../routes/mobiles');

// Modelo==>Sync DB ==> Seed ==> rutas ==>LOG AL FINAL del backend ==>Front ==> 


app.use('/services',serviceRoutes);
app.use('/service-statuses',serviceStatusRoutes);
app.use('/claims',claimRoutes);
app.use('/clients', clientRoutes);
app.use('/installations',installationRoutes);
app.use('/mobiles',mobileRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = app;
