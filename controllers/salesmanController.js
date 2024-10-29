const Salesman = require('../models/salesman');

exports.getAllSalesmen = async (req, res) => {
  try {
    const salesmen = await Salesman.getAll();
    res.status(200).json(salesmen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalesmanById = async (req, res) => {
  try {
    const salesman = await Salesman.getById(req.params.id);
    if (!salesman) return res.status(404).json({ message: 'Salesman not found' });
    res.status(200).json(salesman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSalesman = async (req, res) => {
  try {
    const salesman = await Salesman.create(req.body);
    res.status(201).json(salesman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSalesman = async (req, res) => {
  try {
    const salesman = await Salesman.update(req.params.id, req.body);
    if (!salesman) return res.status(404).json({ message: 'Salesman not found' });
    res.status(200).json(salesman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSalesman = async (req, res) => {
  try {
    const deleted = await Salesman.delete(req.params.id);
    if (deleted === 0) return res.status(404).json({ message: 'Salesman not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
