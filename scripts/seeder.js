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


/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();



async function seed() {
    // create tables
    try {


        await Service.sync({ force: true })
        await Service_status.sync({ force: true })
        await Comodato.sync({ force: true })
        await Client.sync({ force: true })
        await Service_type.sync({ force: true })
        await Location.sync({ force: true })
        await Visit.sync({ force: true })
        await Employee.sync({ force: true })
        await User.sync({ force: true })
        await Role.sync({ force: true })
        await Vehicle.sync({ force: true })
        await Mobile.sync({ force: true })
        await Claim.sync({ force: true })
        await Claim_attention.sync({ force: true })
        await Used_materials_attention.sync({ force: true })
        await Installation.sync({ force: true })
        await Installation_visit.sync({ force: true })
        await Material.sync({ force: true })
        await Used_materials_installation.sync({ force: true })
        await Close_without_visit.sync({ force: true })
        await Service_data.sync({ force: true })



        //insert data
        await Promise.all([
            Client.create(
                {
                    id_client: 37,
                    name: 'Eduardo de las nieves',
                    last_name: 'Ramos',
                    dni: 3912938,
                    contact_number: 123123
                }
            ),


            Service.bulkCreate({
                id_service: 1,
                line_number: 123456789,
                service_number: 1001,
                ServiceStatusId: 1, // Relación con Service_status
                id_client: 1, // Relación con Client
                id_service_type: 1, // Relación con Service_type
                id_location: 1, // Relación con Location
            }, {
                id_service: 2,
                line_number: 123321,
                service_number: 1004,
                ServiceStatusId: 2, // Relación con Service_status
                id_client: 2, // Relación con Client
                id_service_type: 1, // Relación con Service_type
                id_location: 1, // Relación con Location
            }, {
            }),


            Comodato.create({
                id_comodato: 1,
                contract: 'Contrato de comodato en formato BLOB...',
                sign: 'Firma del contrato en formato BLOB...',
                date: new Date(),
                id_service: 1, // Relación con Service
            }),

            Service_status.bulkCreate([
                { id_service_status: 1, description: 'Activo' },
                { id_service_status: 2, description: 'Esperando instalacion' },
                { id_service_status: 3, description: 'Dado de baja, esperando equipo' },
                { id_service_status: 4, description: 'Baja finalizada con entrega de equipo' }
            ]),

            // Crear registros para Service_type
            Service_type.bulkCreate([
                { id_service_type: 1, description: 'FTTH' },
                { id_service_type: 2, description: 'FTTH + Telefono' },
                { id_service_type: 3, description: 'ADSL' },
                { id_service_type: 4, description: 'ADSL + Telefono' },
                { id_service_type: 5, description: 'Telefono' }
            ]),

            // Crear registros para Client
            Client.bulkCreate([
                { id_client: 1, name: 'Juan', last_name: 'Perez', dni: 12345678, contact_number: 154567890 },
                { id_client: 2, name: 'Mauricio', last_name: 'Chaile', dni: 39998492, contact_number: 3815524562 }
                // Agrega más registros según sea necesario
            ]),

            // Crear registros para Service


            // Crear registros para Location
            Location.bulkCreate([
                { id_location: 1, textual_direction: 'Calle 123', latitude: -26.69825, longitude: -66.04831 },
                { id_location: 2, textual_direction: 'Calle 123', latitude: -26.69825, longitude: -66.04831 }
                // Agrega más registros según sea necesario
            ]),

            // Crear registros para Visit
            Visit.bulkCreate([
                { id_visit: 1, description: 'Visita 1', picture: '...', id_claim: 1 }
                // Agrega más registros según sea necesario
            ]),

            // Crear registros para Claim
            Claim.bulkCreate([
                { id_claim: 1, observations: 'Reclamo 1', status: 'Nuevo', id_service: 1 },
                { id_claim: 2, observations: 'Reclamo 2', status: 'Nuevo', id_service: 2, id_close_without_visit: 1 },
                { id_claim: 3, observations: 'Reclamo 3', status: 'Finalizado', id_service: 2, id_close_without_visit: 1 }
                // Agrega más registros según sea necesario
            ]),

            // Crear registros para Claim_attention
            Claim_attention.bulkCreate([
                { id_claim_attention: 1, observations: 'Atención 1', picture1: '...', picture2: '...', picture3: '...', id_claim: 1 },
                { id_claim_attention: 2, observations: 'Atención 1', picture1: '...', picture2: '...', picture3: '...', id_claim: 2 },
                // Agrega más registros según sea necesario
            ]),

            // Crear registros para Installation
            Installation.bulkCreate([
                { id_installation: 1, news: 'Instalación 1', picture1: '...', picture2: '...', picture3: '...', id_service: 1 },
                { id_installation: 2, news: 'Instalación 1', picture1: '...', picture2: '...', picture3: '...', id_service: 2 }
                // Agrega más registros según sea necesario
            ]),


            Employee.bulkCreate([
                { id_employee: 1, name: 'Juan', last_name: 'Perez', dni: 12345678, },
                { id_employee: 2, name: 'María', last_name: 'González', dni: 87654321, }
            ]),

            User.bulkCreate([{
                username: 'usuario1',
                password: 'contraseña1',
                id_mobile: 1, // ID de un registro válido en la tabla Mobile
                id_role: 1 // ID de un registro válido en la tabla Role
            },
            {
                username: 'usuario2',
                password: 'contraseña2',
                id_mobile: null, // Para asignar null al campo MobileId
                id_role: 2 // ID de un registro válido en la tabla Role
            },
            ]),

            Role.bulkCreate([
                { name: 'Administrador' }, { name: 'Supervisor' }, { name: 'Técnico' }]),

            Vehicle.bulkCreate([
                {
                    id_vehicle: 1,
                    patent: 'ABC123',
                    description: 'Vehículo de servicio',
                    availability: 'Disponible'
                },
                {
                    id_vehicle: 2,
                    patent: 'XYZ789',
                    description: 'Furgoneta de transporte',
                    availability: 'Disponible'
                },
                {
                    id_vehicle: 3,
                    patent: 'DEF456',
                    description: 'Auto oficial',
                    availability: 'No disponible'
                }
            ]),

            Mobile.bulkCreate([
                { id_mobile: 1, ClaimId: 1, id_vehicle: 1 },
                { id_mobile: 2, InstallationId: 1, id_vehicle: 2 },
                // Agrega más registros según sea necesario
            ]),

            Material.bulkCreate([
                {
                    id_material: 1,
                    name: 'Fiber optic cable',
                    description: 'High-quality fiber optic cable for installations',
                    stock: 100,
                    price: 50.75
                },
                {
                    id_material: 2,
                    name: 'Connectors',
                    description: 'Various types of connectors for fiber optic cables',
                    stock: 200,
                    price: 10.25
                },
                // Agrega más registros según sea necesario
            ]),

            Used_materials_attention.bulkCreate([
                {
                    id_used_materials_attention: 1,
                    used_quantity: '10 units',
                    price: 25.5,
                    id_material: 1, // Asigna el ID correspondiente de Material
                    id_claim_attention: 1 // Asigna el ID correspondiente de Claim_attention
                },
                {
                    id_used_materials_attention: 2,
                    used_quantity: '5 meters',
                    price: 15.75,
                    id_material: 2, // Asigna el ID correspondiente de Material
                    id_claim_attention: 2 // Asigna el ID correspondiente de Claim_attention
                },
                // Agrega más registros según sea necesario
            ]),

            Used_materials_installation.bulkCreate([
                {
                    id_used_materials_installation: 1,
                    used_quantity: '20 meters',
                    price: 50.25,
                    id_material: 1, // Asigna el ID correspondiente de Material
                    id_installation: 1 // Asigna el ID correspondiente de Installation
                },
                {
                    id_used_materials_installation: 2,
                    used_quantity: '15 units',
                    price: 30.5,
                    id_material: 2, // Asigna el ID correspondiente de Material
                    id_installation: 2 // Asigna el ID correspondiente de Installation
                },
                // Agrega más registros según sea necesario
            ]),

            Close_without_visit.bulkCreate([
                {
                    id_close_without_visit: 1,
                    description: 'Cliente no disponible en el horario pactado.'
                },
                {
                    id_close_without_visit: 2,
                    description: 'Acceso no permitido al domicilio.'
                },
                // Agrega más registros según sea necesario
            ]),

            Installation_visit.bulkCreate([
                {
                    id_installation_visit: 1,
                    news: 'Instalación completada con éxito.',
                    date: '2024-07-05',
                    id_installation: 1 // Aquí se asigna el id de la instalación relacionada
                },
                {
                    id_installation_visit: 2,
                    news: 'Problemas técnicos encontrados durante la instalación.',
                    date: '2024-07-06',
                    id_installation: 2 // Aquí se asigna el id de otra instalación relacionada
                },
                // Agrega más registros según sea necesario
            ]),

            Service_data.bulkCreate([
                {
                  id_service_data: 1,
                  liston: 'Liston A',
                  borne: 123,
                  placa: 'Placa B',
                  posicion: 456,
                  caja: 'Caja C',
                  posicion_ftth: 789,
                  id_service: 1 // Asigna aquí el id del servicio relacionado
                },
                {
                  id_service_data: 2,
                  liston: 'Liston X',
                  borne: 987,
                  placa: 'Placa Y',
                  posicion: 654,
                  caja: 'Caja Z',
                  posicion_ftth: 321,
                  id_service: 2 // Asigna aquí el id de otro servicio relacionado
                },
                // Agrega más registros según sea necesario
              ]),
        ])


    } catch (error) {
        console.error('Error',error)

    } finally {
        await sequelize.close()
    }

}

