const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const cors = require('cors');
const mobileCron = require('../cron/mobileCron');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
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
const clientRoutes = require('../routes/clients');
const installationRoutes = require('../routes/installations');
const mobileRoutes = require('../routes/mobiles');
const materialRoutes = require('../routes/materials');
const usedMaterialsAttentionsRoutes = require('../routes/usedMaterialsAttentions');
const userRoutes = require('../routes/user');
const serviceTypesRoutes = require('../routes/serviceTypes');
const vehicleRoutes = require('../routes/vehicles');
const employeesRoutes = require('../routes/employees')

// Modelo==>Sync DB ==> Seed ==> rutas ==>LOG AL FINAL del backend ==>Front ==> 



app.use('/services', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), serviceRoutes);
app.use('/service-statuses', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), serviceStatusRoutes);
app.use('/claims', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), claimRoutes);
app.use('/clients', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), clientRoutes);
app.use('/installations', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), installationRoutes);
app.use('/mobiles', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), mobileRoutes);
app.use('/materials', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), materialRoutes);
app.use('/usedMaterialsAttentions', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), usedMaterialsAttentionsRoutes);
app.use('/users', userRoutes);
app.use('/servicetypes', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), serviceTypesRoutes);
app.use('/vehicles', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), vehicleRoutes);
app.use('/employees', tokenAuth, authorizeRoles(['Técnico', 'Supervisor', 'Administrador']), employeesRoutes);





// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = app;