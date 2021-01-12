var express = require("express");
var router = express.Router();
const Item = require("../models/Item");
const fileUploader = require("../config/cloudinary");

console.log(fileUploader);

router.get("/", (req, res, next) => {
  Item.find()
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/", fileUploader.single("image"), (req, res, next) => {
  const newItem = { ...req.body };
  if (req.file) newItem.image = req.file.path;
  Item.create(newItem)
    .then((newItem) => {
      res.status(201).json(newItem);
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
