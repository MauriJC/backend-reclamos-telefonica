const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

class Profile extends Sequelize.Model { }
Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2)
    },
    type: {
      type: Sequelize.ENUM('client', 'contractor')
    }
  },
  {
    sequelize,
    modelName: 'Profile'
  }
);

class Contract extends Sequelize.Model { }
Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('new', 'in_progress', 'terminated')
    }
  },
  {
    sequelize,
    modelName: 'Contract'
  }
);

class Job extends Sequelize.Model { }
Job.init(
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    },
    paid: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    paymentDate: {
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    modelName: 'Job'
  }
);

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
      allowNull: false
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
      allowNull: false
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
      type: DataTypes.DECIMAL(9, 5),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 5),
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







Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
Contract.belongsTo(Profile, { as: 'Contractor' })
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })
Contract.belongsTo(Profile, { as: 'Client' })
Contract.hasMany(Job)
Job.belongsTo(Contract)


//Aca hago mis relaciones

//Service MtoM and 1to1
Service.hasMany(Claim)
Claim.belongsTo(Service)

Service.hasMany(Comodato)
Comodato.belongsTo(Service)

Service.hasMany(Installation)
Installation.belongsTo(Service)

Service.hasOne(Service_data)
Service_data.belongsTo(Service)

Service.hasOne(Location)
Location.belongsTo(Location)

//1 to many to service
Service_type.hasMany(Service)
Service.belongsTo(Service_type)

Service_status.hasMany(Service)
Service.belongsTo(Service_status)

Client.hasMany(Service)
Service.belongsTo(Client)


//Claim
Claim.hasMany(Visit)
Visit.belongsTo(Claim)

Claim.hasOne(Close_without_visit)
Close_without_visit.belongsTo(Claim)

Claim.hasOne(Claim_attention)
Claim_attention.belongsTo(Claim)

Claim.hasOne(Mobile)
Mobile.belongsTo(Claim)

//Installation
Installation.hasMany(Used_materials_installation)
Used_materials_installation.belongsTo(Installation)

Installation.hasOne(Mobile)
Mobile.belongsTo(Installation)

Installation.hasMany(Installation_visit)
Installation_visit.belongsTo(Installation)


//Claim Attention
Claim_attention.hasMany(Used_materials_attention)
Used_materials_attention.belongsTo(Claim_attention)

//Materials
Material.hasMany(Used_materials_attention)
Used_materials_attention.belongsTo(Material)

Material.hasMany(Used_materials_installation)
Used_materials_installation.belongsTo(Material)

//Mobiles
Mobile.hasOne(Vehicle)
Vehicle.belongsTo(Mobile)

Mobile.hasMany(User)
User.belongsTo(Mobile)


//User
User.hasOne(Employee)
Employee.belongsTo(User)


//Role
Role.hasMany(User)
User.belongsTo(Role)



module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
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
