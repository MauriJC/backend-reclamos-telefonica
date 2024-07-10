const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});


//Aca empiezo mis modelos
class Service extends Sequelize.Model { }
Service.init(
  {
    id_service: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    line_number: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    service_number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Service'
  }
);

class Service_status extends Sequelize.Model { }
Service_status.init(
  {
    id_service_status: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    description: {
      type: Sequelize.ENUM('Activo', 'Esperando instalacion', 'Dado de baja, esperando equipo', 'Baja finalizada con entrega de equipo')
    }
  },
  {
    sequelize,
    modelName: 'Service_status'
  }
);



class Comodato extends Sequelize.Model { }
Comodato.init(
  {
    id_comodato: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    contract: {
      type: Sequelize.BLOB,
      allowNull: true
    },
    sign: {
      type: Sequelize.BLOB,
      allowNull: true
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Comodato'
  }
);

class Client extends Sequelize.Model { }
Client.init(
  {
    id_client: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT(50),
      allowNull: false
    },
    last_name: {
      type: Sequelize.TEXT(50),
      allowNull: false
    },
    dni: {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique:true
    },
    contact_number: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: 'Client'
  }
);



class Service_type extends Sequelize.Model { }
Service_type.init(
  {
    id_service_type: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    description: {
      type: Sequelize.ENUM('FTTH', 'FTTH + Telefono', 'ADSL', 'ADSL + Telefono', 'Telefono'),
      allowNull: false
    },

  },
  {
    sequelize,
    modelName: 'Service_type'
  }
);


class Location extends Sequelize.Model { }
Location.init(
  {
    id_location: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    textual_direction: {
      type: Sequelize.TEXT(150),
      allowNull: false
    },
    latitude: {
      type: Sequelize.DECIMAL(9, 5),
      allowNull: true
    },
    longitude: {
      type: Sequelize.DECIMAL(9, 5),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Location'
  }
);



class Visit extends Sequelize.Model { }
Visit.init(
  {
    id_visit: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    description: {
      type: Sequelize.TEXT(200),
      allowNull: false
    },
    picture: {
      type: Sequelize.BLOB,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Visit'
  }
);


class Employee extends Sequelize.Model { }
Employee.init(
  {
    id_employee: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT(50),
      allowNull: false
    },
    last_name: {
      type: Sequelize.TEXT(50),
      allowNull: false
    },
    dni: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Employee'
  }
);



class User extends Sequelize.Model { }
User.init(
  {
    id_user: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true
  }
);



class Role extends Sequelize.Model { }
Role.init(
  {
    id_role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.ENUM("Administrador", "Supervisor", "Tecnico"),
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Role'
  }
);



class Vehicle extends Sequelize.Model { }
Vehicle.init(
  {
    id_vehicle: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    patent: {
      type: Sequelize.STRING(12),
      allowNull: true
    },
    description: {
      type: Sequelize.TEXT(150),
      allowNull: true
    },
    availability: {
      type: Sequelize.ENUM('Disponible', 'No disponible'),
      allowNull: false
    }

  },
  {
    sequelize,
    modelName: 'Vehicle'
  }
);


class Mobile extends Sequelize.Model { }
Mobile.init(
  {
    id_mobile: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  },
  {
    sequelize,
    modelName: 'Mobile'
  }
);




class Claim extends Sequelize.Model { }
Claim.init(
  {
    id_claim: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    observations: {
      type: Sequelize.TEXT(300),
      allowNull: false
    },
    visit_shedules_availability: {
      type: Sequelize.STRING(150),
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('Nuevo', 'En_progreso', 'Finalizado')
    }
  },
  {
    sequelize,
    modelName: 'Claim'
  }
);



class Claim_attention extends Sequelize.Model { }
Claim_attention.init(
  {
    id_claim_attention: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    observations: {
      type: Sequelize.STRING(250),
      allowNull: false
    },
    picture1: {
      type: Sequelize.BLOB,
      allowNull: false
    },
    picture2: {
      type: Sequelize.BLOB,
      allowNull: false
    },
    picture3: {
      type: Sequelize.BLOB,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Claim_attention'
  }
);



class Used_materials_attention extends Sequelize.Model { }
Used_materials_attention.init(
  {
    id_used_materials_attention: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    used_quantity: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: 'Used_materials_attention'
  }
);



class Installation extends Sequelize.Model { }
Installation.init(
  {
    id_installation: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    news: {
      type: Sequelize.TEXT(250),
      allowNull: false
    },
    picture1: {
      type: Sequelize.BLOB,
      allowNull: false
    },
    picture2: {
      type: Sequelize.BLOB,
      allowNull: false
    },
    picture3: {
      type: Sequelize.BLOB,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Installation'
  }
);



class Installation_visit extends Sequelize.Model { }
Installation_visit.init(
  {
    id_installation_visit: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    news: {
      type: Sequelize.TEXT(250),
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Installation_visit'
  }
);


class Material extends Sequelize.Model { }
Material.init(
  {
    id_material: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    description:{
      type: Sequelize.TEXT(250),
      allowNull: true
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price:{
      type: Sequelize.FLOAT,
      allowNull:true
    },
  },
  {
    sequelize,
    modelName: 'Material'
  }
);


class Used_materials_installation extends Sequelize.Model { }
Used_materials_installation.init(
  {
    id_used_materials_installation: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    used_quantity: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: 'Used_materials_installation'
  }
);



class Close_without_visit extends Sequelize.Model { }
Close_without_visit.init(
  {
    id_close_without_visit: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: Sequelize.TEXT(150),
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Close_without_visit'
  }
);


class Service_data extends Sequelize.Model { }
Service_data.init(
  {
    id_close_without_visit: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    liston: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    borne: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    placa: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    posicion: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    caja: {
      type: Sequelize.TEXT(9),
      allowNull: true
    },
    posicion_ftth: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    
  },
  {
    sequelize,
    modelName: 'Service_data'
  }
);



//Relaciones

// Service MtoM and 1to1
Service.hasMany(Claim, { foreignKey: 'id_service' });
Claim.belongsTo(Service, { foreignKey: 'id_service' });

Service.hasMany(Comodato, { foreignKey: 'id_service' });
Comodato.belongsTo(Service, { foreignKey: 'id_service' });

Service.hasMany(Installation, { foreignKey: 'id_service' });
Installation.belongsTo(Service, { foreignKey: 'id_service' });

Service.hasOne(Service_data, { foreignKey: 'id_service' });
Service_data.belongsTo(Service, { foreignKey: 'id_service' });

Service.hasOne(Location, { foreignKey: 'id_service' });
Location.belongsTo(Service, { foreignKey: 'id_service' });

// 1 to many to service
Service_type.hasMany(Service, { foreignKey: 'id_service_type' });
Service.belongsTo(Service_type, { foreignKey: 'id_service_type' });

Service_status.hasMany(Service, { foreignKey: 'id_service_status' });
Service.belongsTo(Service_status, { foreignKey: 'id_service_status' });

Client.hasMany(Service, { foreignKey: 'id_client' });
Service.belongsTo(Client, { foreignKey: 'id_client' });


// Claim
Claim.hasMany(Visit, { foreignKey: 'id_claim' });
Visit.belongsTo(Claim, { foreignKey: 'id_claim' });

Claim.hasOne(Close_without_visit, { foreignKey: 'id_claim' });
Close_without_visit.belongsTo(Claim, { foreignKey: 'id_claim' });

Claim.hasOne(Claim_attention, { foreignKey: 'id_claim' });
Claim_attention.belongsTo(Claim, { foreignKey: 'id_claim' });



// Installation
Installation.hasMany(Used_materials_installation, { foreignKey: 'id_installation' });
Used_materials_installation.belongsTo(Installation, { foreignKey: 'id_installation' });



Installation.hasMany(Installation_visit, { foreignKey: 'id_installation' });
Installation_visit.belongsTo(Installation, { foreignKey: 'id_installation' });


// Claim Attention
Claim_attention.hasMany(Used_materials_attention, { foreignKey: 'id_claim_attention' });
Used_materials_attention.belongsTo(Claim_attention, { foreignKey: 'id_claim_attention' });

// Materials
Material.hasMany(Used_materials_attention, { foreignKey: 'id_material' });
Used_materials_attention.belongsTo(Material, { foreignKey: 'id_material' });

Material.hasMany(Used_materials_installation, { foreignKey: 'id_material' });
Used_materials_installation.belongsTo(Material, { foreignKey: 'id_material' });

// Mobiles
Mobile.hasOne(Vehicle, { foreignKey: 'id_mobile' });
Vehicle.belongsTo(Mobile, { foreignKey: 'id_mobile' });

Mobile.hasMany(User, { foreignKey: 'id_mobile' });
User.belongsTo(Mobile, { foreignKey: 'id_mobile' });

Mobile.hasMany(Claim, { foreignKey: 'id_mobile' });
Claim.belongsTo(Mobile, { foreignKey: 'id_mobile' });

Mobile.hasMany(Installation,{foreignKey:'id_mobile'});
Installation.belongsTo(Mobile,{foreignKey:'id_mobile'});
// User
User.hasOne(Employee, { foreignKey: 'id_user' });
Employee.belongsTo(User, { foreignKey: 'id_user' });


// Role
Role.hasMany(User, { foreignKey: 'id_role' });
User.belongsTo(Role, { foreignKey: 'id_role' });


module.exports = {
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
  Service_data
};
