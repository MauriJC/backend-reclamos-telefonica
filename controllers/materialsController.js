const { Material } = require('../src/model');

const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ error: 'Error fetching materials' });
  }
};

module.exports = {
  getAllMaterials,
};
