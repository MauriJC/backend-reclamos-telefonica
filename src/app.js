const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const cors = require('cors');

const app = express();
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

//Middlewares
const tokenAuth = require('./middleware/authenticateToken');
const authorizeRoles = require('./middleware/authorizeRoles');

const serviceRoutes = require('../routes/services');
const serviceStatusRoutes = require('../routes/serviceStatuses');
const claimRoutes = require('../routes/claims');
const clientRoutes  = require('../routes/clients');
const installationRoutes = require('../routes/installations');
const mobileRoutes = require('../routes/mobiles');
const materialRoutes = require('../routes/materials');
const usedMaterialsAttentionsRoutes = require('../routes/usedMaterialsAttentions');
const authRoutes = require('../routes/auth');

// Modelo==>Sync DB ==> Seed ==> rutas ==>LOG AL FINAL del backend ==>Front ==> 


app.use('/services',serviceRoutes);
app.use('/service-statuses',serviceStatusRoutes);
app.use('/claims',claimRoutes);
app.use('/clients', clientRoutes);
app.use('/installations',installationRoutes);
app.use('/mobiles',mobileRoutes);
app.use('/materials',materialRoutes);
app.use('/usedMaterialsAttentions',usedMaterialsAttentionsRoutes);
app.use('/auth',authRoutes);




// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = app;