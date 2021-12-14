const Resort = require('../models/resort');

exports.postResort = async (req, res) => {
  try {
    let data = req.body;

    const resort = await Resort.create(data);
    if (resort.success) {
      return res.status(200).json({ resort: resort.resort });
    } else {
      return res.status(400).json({ message: 'Error posting resort' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error creating resort', error: error });
  }
};

exports.fetchAllResorts = async (req, res) => {
  try {
    let resorts = await Resort.fetchAll();
    if (resorts.success) {
      return res.status(200).json({ resorts: resorts.resorts });
    } else {
      return res.status(400).json({ message: 'Could not fetch all resorts' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error fetching resorts', error: error });
  }
};

exports.updateResort = async (req, res) => {
  try {
    let data = req.body;
    let resort = await Resort.update(data);
    if (resort.success) {
      return res.status(200).json({ resort: resort.resort });
    } else {
      return res.status(400).json({ message: 'failed to update resort' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating resort', error: error });
  }
};

exports.getById = async (req, res) => {
  try {
    let id = req.params.id;
    let resort = await Resort.findById(id);
    if (resort.success) {
      console.log(resort.resortRating);
      resort.resort.rating = resort.resortRating;
      return res.status(200).json({ resort: resort.resort });
    } else {
      return res.status(400).json({ message: 'Could not find resort' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error fetching resort', error: error });
  }
};

exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let resort = await Resort.delete(id);
    if (resort.success) {
      return res.status(200).json({ resort: resort.resort });
    } else {
      return res.status(400).json({ message: 'Error deleting this resort' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting resort', error: error });
  }
};
