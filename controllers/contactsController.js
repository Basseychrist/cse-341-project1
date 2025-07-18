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

const createContact = async (req, res) => {
  try {
    const db = getDb();
    const newContact = req.body;

    const result = await db.collection("contacts").insertOne(newContact);
    res.status(201).json({ _id: result.insertedId, ...newContact });
  } catch (err) {
    console.error("Create Contact Error:", err);
    res
      .status(500)
      .json({ message: "Error creating contact", error: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const updatedContact = req.body;

    // Convert id to ObjectId
    const result = await db
      .collection("contacts")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedContact });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating contact", error: err });
  }
};
const deleteContact = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    // Convert id to ObjectId
    const result = await db
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting contact", error: err });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
