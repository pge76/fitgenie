import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const COLLECTION_EXERCISES = "exercises"

router.get("/", async (req, res) => {
    let collection = await db.collection(COLLECTION_EXERCISES);
    let results = await collection.find({})
        .toArray();

    res.send(results).status(200);
});

router.post("/", async (req, res) => {
    let collection = await db.collection(COLLECTION_EXERCISES);
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };

    const collection = db.collection(COLLECTION_EXERCISES);
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;