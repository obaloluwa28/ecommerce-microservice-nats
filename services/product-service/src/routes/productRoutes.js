const express = require("express");
const router = express.Router();
const { updateInventory } = require("../controllers/productController");

router.put("/:id/inventory", updateInventory);

module.exports = router;
