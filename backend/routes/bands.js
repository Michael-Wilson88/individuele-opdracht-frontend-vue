// const http = require("http");
const db = require("../db.json");

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get("/bands/:id", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    const id = parseInt(req.params.id);
    const band = db.bands.find((a) => a.id === id) || {};
    res.send(JSON.stringify(band, null, 2));
});

router.get("/bands", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    const bands = db.bands;
    res.type("json");
    res.send(JSON.stringify(bands, null, 2));
});

router.post("/createBand", (req, res, next) => {
    const band = req.body;
    db.bands.push(band);
    res.send(JSON.stringify(band));
});

//Button for creating a band
router.get("/newBand", (req, res, next) => {
    console.log("Route:/ ,bands form");
    res.send(
        '<form action="/bands" method="post">' +
        '<input type="text" name="bandName">' +
        '<input type="text" name="city">' +
        '<input type="text" name="genre">' +
        '<input type="text" name="albums">' +
        '<button type="submit">Create band</button>' +
        "</form>"
    );
});

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
