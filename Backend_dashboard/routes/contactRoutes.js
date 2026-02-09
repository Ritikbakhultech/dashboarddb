const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controller/contactController");

router.post("/", createContact);
router.get("/", getContacts);
router.put("/", updateContact); 
router.delete("/", deleteContact); 

module.exports = router;
