const { Claim, Mobile, User, Employee, Vehicle, sequelize } = require('../src/model');

async function getClaimsByMobile(req, res) {
    const { id_mobile } = req.params;

    try {
        // Obtener los claims asignados al mobile específico
        const assignedClaims = await Claim.findAll({
            where: {
                id_mobile: id_mobile
            }
        });

        // Obtener los claims no asignados al mobile específico
        const unassignedClaims = await Claim.findAll({
            where: {
                id_mobile: null,
            },
        });

        res.json({
            assignedClaims,
            unassignedClaims,
        });
    } catch (error) {
        console.error('Error al obtener los moviles:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

async function assignMobile(req, res) {
    const t = await sequelize.transaction();
    try {
        const { id_employees, id_vehicle } = req.body;

        if (!Array.isArray(id_employees) || id_employees.length === 0 || !id_vehicle) {
            return res.status(400).json({ message: 'Invalid input. Please provide an array of employee IDs and a vehicle ID.' });
        };

        const mobile = await Mobile.create({}, { transaction: t });

        const employees = await Employee.findAll({
            where: { id_employee: id_employees },  // id_employees es un array
            include: {
                model: User,  // Asumiendo que tienes una relación Employee -> User
                as: 'User'    // Asegúrate de que el alias coincide con la relación definida
            },
            transaction: t
        });

        for (const employee of employees) {
            await User.update(
                { id_mobile: mobile.id_mobile },
                { where: { id_user: employee.User.id_user }, transaction: t }
            );
        }

        await Vehicle.update(
            { id_mobile: mobile.id_mobile },
            { where: { id_vehicle }, transaction: t }
        );

        await t.commit();
        console.log('Finalizando asignacion')
        res.status(200).json({ message: 'Movil asignado correctamente!' });

    } catch (error) {
        await t.rollback();
        console.error('Error assigning mobile:', error);
        res.status(500).json({ message: 'Error assigning mobile', error });
    }
};


module.exports = {
    getClaimsByMobile,
    assignMobile
};
