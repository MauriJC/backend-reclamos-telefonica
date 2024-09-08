const { Mobile } = require('../src/model');
const { Op } = require('sequelize');

const deleteOldMobiles = async () => {
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const result = await Mobile.destroy({
            where: {
                createdAt: {
                    [Op.lte]: yesterday
                }
            }
        });

        console.log(`Móviles eliminados: ${result}`);
    } catch (error) {
        console.error('Error eliminando móviles:', error);
    }
};

module.exports = { deleteOldMobiles };