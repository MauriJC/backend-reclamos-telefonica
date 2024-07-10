const { sequelize } = require('../src/model');

sequelize.sync() // O { force: true } si deseas forzar la sincronización
    .then(() => {
        console.log('Modelos sincronizados con la base de datos.');
    })
    .catch(error => {
        console.error('Error al sincronizar los modelos con la base de datos:', error);
    });