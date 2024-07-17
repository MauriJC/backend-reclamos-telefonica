const {
    sequelize,
    Service,
    Service_status,
    Comodato,
    Client,
    Service_type,
    Location,
    Visit,
    Employee,
    User,
    Role,
    Vehicle,
    Mobile,
    Claim,
    Claim_attention,
    Used_materials_attention,
    Installation,
    Installation_visit,
    Material,
    Used_materials_installation,
    Close_without_visit,
    Service_data,
} = require('../src/model');

const syncDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log('Conexión con la base de datos exitosa.');
      
      await sequelize.sync({ alter: true });
      console.log('Sincronización de la base de datos exitosa.');
    } catch (error) {
      console.error('Error al sincronizar la base de datos:', error);
    } finally {
      await sequelize.close();
    }
  };
  
  syncDatabase();