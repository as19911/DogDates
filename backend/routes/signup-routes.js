const express = require("express");
const { check } = require("express-validator");

const controller = require("../controllers/signup-controller");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

//new user sign up
router.post(
  "/",
  fileUpload.single("pictures"),
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("ownerName").not().isEmpty(),
    check("dogName").not().isEmpty(),
    check("city").not().isEmpty(),
    check("description").not().isEmpty(),
  ],
  controller.createUser
);

module.exports = router;