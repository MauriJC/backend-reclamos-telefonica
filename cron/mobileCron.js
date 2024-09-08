const cron = require('node-cron');
const { deleteOldMobiles } = require('../services/mobileService'); 

cron.schedule('0 * * * *', async () => {
    console.log('Iniciando cron job para eliminar móviles viejos...');
    await deleteOldMobiles();
});
