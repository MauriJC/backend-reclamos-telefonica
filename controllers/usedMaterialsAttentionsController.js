const { Used_materials_attention, Material, Claim_attention } = require('../src/model');

module.exports = {
  // Obtener materiales usados para una atención específica
  async getUsedMaterials(req, res) {
    try {
      const { claimAttentionId } = req.params;
      const usedMaterials = await UsedMaterialsAttention.findAll({
        where: { ClaimAttentionId: claimAttentionId },
        include: [
          {
            model: Material,
            attributes: ['id', 'name']
          },
          {
            model: Claim_attention,
            attributes: ['id']
          }
        ]
      });
      res.status(200).json(usedMaterials);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los materiales usados.' });
    }
  },

  // Agregar múltiples materiales usados a una atención específica
  async addUsedMaterials(req, res) {
    try {
      const { claimAttentionId, materials } = req.body; // materials es un array de objetos { materialId, quantity }

      const usedMaterialsData = materials.map(material => ({
        MaterialId: material.materialId,
        ClaimAttentionId: claimAttentionId,
        quantity: material.quantity
      }));

      const newUsedMaterials = await Used_materials_attention.bulkCreate(usedMaterialsData);
      res.status(201).json(newUsedMaterials);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar los materiales usados.' });
    }
  }
};
