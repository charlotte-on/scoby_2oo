var express = require("express");
var router = express.Router();
const Item = require("../models/Item");
const fileUploader = require("../config/cloudinary");

router.get("/", (req, res, next) => {
  Item.find()
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/", fileUploader.single("profileImg"), (req, res, next) => {
  Item.create(req.body)
    .then((itemDocument) => {
      res.status(201).json(itemDocument);
      if (req.file) newUser.profileImg = req.file.path;
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", function (req, res, next) {
  Item.findById(req.params.id)
    .then((itemDocument) => {
      res.status(200).json(itemDocument);
    })
    .catch((error) => {
      next(error);
    });
});

router.patch("/:id", (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((itemDocument) => {
      res.status(200).json(itemDocument);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", (req, res, next) => {
  Item.findByIdAndRemove(req.params.id)
    .then((itemDocument) => {
      res.status(204).json({
        message: "Successfuly deleted !",
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
