import GiftBox from "../models/GiftBox.js"; // Your Mongoose model

// ADD NEW GIFTBOX
export const addGiftBox = async (req, res) => {
  try {
    const giftbox = new GiftBox(req.body);
    await giftbox.save();
    res.status(201).json(giftbox);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add GiftBox" });
  }
};

// GET ALL GIFTBOXES
export const getGiftBoxes = async (req, res) => {
  try {
    const giftboxes = await GiftBox.find();
    res.json(giftboxes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch GiftBoxes" });
  }
};

// GET SINGLE GIFTBOX
export const getGiftBox = async (req, res) => {
  try {
    const giftbox = await GiftBox.findById(req.params.id);
    if (!giftbox) return res.status(404).json({ message: "GiftBox not found" });
    res.json(giftbox);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch GiftBox" });
  }
};

// EDIT GIFTBOX
export const editGiftBox = async (req, res) => {
  try {
    const updatedGiftBox = await GiftBox.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedGiftBox)
      return res.status(404).json({ message: "GiftBox not found" });

    res.json(updatedGiftBox);
  } catch (err) {
    res.status(500).json({ message: "Failed to update GiftBox" });
  }
};

// DELETE GIFTBOX
export const deleteGiftBox = async (req, res) => {
  try {
    const deletedGiftBox = await GiftBox.findByIdAndDelete(req.params.id);
    if (!deletedGiftBox)
      return res.status(404).json({ message: "GiftBox not found" });

    res.json({ message: "GiftBox deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete GiftBox" });
  }
};
