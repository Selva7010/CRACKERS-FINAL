
import Cracker from "../models/Crackers.js";

// Public: list crackers
export const listCrackers = async (req, res) => {
  try {
    const q = req.query.q || "";
    const cat = req.query.category;

    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (cat) filter.category = cat;

    const crackers = await Cracker.find(filter).sort({ createdAt: -1 });
    res.json(crackers);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: add cracker
export const addCracker = async (req, res) => {
  try {
    const c = new Cracker(req.body);
    await c.save();

    res.json({ message: "Cracker added", cracker: c });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: update cracker
export const updateCracker = async (req, res) => {
  try {
    const cracker = await Cracker.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ message: "Updated", cracker });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: delete cracker
export const deleteCracker = async (req, res) => {
  try {
    await Cracker.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single cracker by ID
export const getCrackerById = async (req, res) => {
  try {
    const c = await Cracker.findById(req.params.id);
    if (!c) return res.status(404).json({ message: "Not found" });

    res.json(c);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
