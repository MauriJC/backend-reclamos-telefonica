const { Employee, Mobile, User, Role } = require('../src/model');

// Crear un nuevo empleado
exports.createEmployee = async (req, res) => {
    try {
        const { name, last_name, dni } = req.body;
        const newEmployee = await Employee.create({ name, last_name, dni });
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error });
    }
};

// Obtener todos los empleados
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: {
                model: User,
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: Mobile
                    },
                    {
                        model: Role,
                    },
                ]

            }
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
};


// Obtener todos los empleados
exports.getAllAvailableTechnicians = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: {
                model: User,
                where:{id_mobile: null},
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: Mobile
                    },
                    {
                        model: Role,
                        where: { name: 'Técnico' }
                    },
                ]
            },
            where: {
                '$User.Role.name$': 'Técnico',
            }
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Technicians', error });
    }
};


// Obtener un empleado por ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error });
    }
};

// Actualizar un empleado por ID
exports.updateEmployee = async (req, res) => {
    try {
        const { name, last_name, dni } = req.body;
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            await employee.update({ name, last_name, dni });
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
};

// Eliminar un empleado por ID
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            await employee.destroy();
            res.status(204).json({ message: 'Employee deleted' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
};
