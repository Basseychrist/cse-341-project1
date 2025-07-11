const { getDb, ObjectId } = require("../dataBase/db");

const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving contacts", error: err });
  }
};

const getContactById = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    // Convert id to ObjectId
    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving contact", error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
};
