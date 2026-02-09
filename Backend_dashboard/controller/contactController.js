const Contact = require("../models/Contact");


const createContact = async (req, res) => {
  try {
    const { name, email, phone, image, message } = req.body;

    const newContact = await Contact.create({
      name,
      email,
      phone,
      image,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - update contact (using ID from body)
const updateContact = async (req, res) => {
  try {
    const { id, name, email, phone, image, message } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Contact ID is required" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone, image, message },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - delete contact (using ID from body)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Contact ID is required" });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact, getContacts, updateContact, deleteContact };
