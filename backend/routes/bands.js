
const db = require("../db.json");

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Retrieves a band from the database by bandName
router.get("/bands/:name", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    const name = req.params.name;
    const band = db.bands.find((a) => a.bandName === name) || {};
    res.send(JSON.stringify(band, null, 2));
});

// Retrieves all bands from the database
router.get("/bands", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    const bands = db.bands;
    res.type("json");
    res.send(JSON.stringify(bands, null, 2));
});

// Creates a new band
router.post("/createBand", (req, res, next) => {
    const band = req.body;
    db.bands.push(band);
    res.send(JSON.stringify(band));
});

// Updates a band by id
router.put("/bands/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const bandIndex = db.bands.findIndex((a) => a.id === id);
    if (bandIndex === -1) {
        res.status(404).send("Band not found");
        return;
    }
    const updatedBand = req.body;
    db.bands[bandIndex] = {id: id, ...updatedBand};
    res.send(JSON.stringify(db.bands[bandIndex]));
});

// Deletes a band by id
router.delete("/bands/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const bandIndex = db.bands.findIndex((a) => a.id === id);
    if (bandIndex === -1) {
        res.status(404).send("Band not found");
        return;
    }
    const deletedBand = db.bands.splice(bandIndex, 1)[0];
    res.send(JSON.stringify(deletedBand));
});

// Patches a band by id
router.patch("/bands/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const bandIndex = db.bands.findIndex((a) => a.id === id);
    if (bandIndex === -1) {
        res.status(404).send("Band not found");
        return;
    }
    const updatedBand = req.body;
    db.bands[bandIndex] = {...db.bands[bandIndex], ...updatedBand};
    res.send(JSON.stringify(db.bands[bandIndex]));
});

module.exports = router
