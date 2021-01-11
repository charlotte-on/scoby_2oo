const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fileUploader = require("../config/cloudinary");

router.get("/:id", function (req, res, next) {
  User.findById(req.session.currentUser)
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

router.patch("/me", function (req, res, next) {
  User.findByIdAndUpdate(req.session.currentUser, req.body, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
