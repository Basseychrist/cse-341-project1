const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
// The above code is a complete Express.js route setup for handling contacts.



















// const { ObjectId } = require('mongodb');
// const db = require('../db'); // Assumes you have a db.js that exports your MongoDB connection

// // GET all contacts
// router.get('/', async (req, res) => {
//   try {
//     const contacts = await db.collection('contacts').find().toArray();
//     res.status(200).json(contacts);
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving contacts', error: err });
//   }
// });

// // GET a single contact by id (query parameter)
// router.get('/single', async (req, res) => {
//   const id = req.query.id;
//   if (!id) {
//     return res.status(400).json({ message: 'Missing id query parameter' });
//   }
//   try {
//     const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
//     if (!contact) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }
//     res.status(200).json(contact);
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving contact', error: err });
//   }
// });

// module.exports = router;