const router = require("express").Router();
const { BOOLEAN, DataTypes } = require("sequelize");
const { Entry } = require("../../models");

//  Get all entries
router.get("/", async (req, res) => {
  try {
    const entryData = await Entry.findAll(req.body);
    res.status(200).json(entryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

//  Add an entry
router.post("/", (req, res) => {
  Entry.create(req.body)
    .then((newEntry) => {
      res.json(newEntry);
    })
    .catch((err) => {
      res.json(err);
    });
});

// //  Create an entry 2nd method -- possible
// router.post("/", (req, res) => {
//   Entry.create({
//     id: req.body.id,
//     date: req.body.date,
//     completed: BOOLEAN,
//     habitId: DataTypes.INTEGER,
//   })
//     .then((newEntry) => {
//       res.json(newEntry);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

//  Update an entry
router.put("/:id", async (req, res) => {
  try {
    const entryData = await Entry.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!entryData[0]) {
      res.status(404).json({
        message: "There is no entry that matches that ID!  Please try again.",
      });
      return;
    }
    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  Delete an entry
router.delete("/:id", async (req, res) => {
  try {
    const entryData = await Entry.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!entryData) {
      res.status(404).json({ message: "No entry with this id!" });
      return;
    }
    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
