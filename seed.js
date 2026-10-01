// Optional Node.js seed script.
// npm init -y
// npm install mongodb
//
// Set MONGODB_URI before running:
// Windows PowerShell:
// $env:MONGODB_URI="mongodb://127.0.0.1:27017"
// node seed.js

import { MongoClient } from "mongodb";
import fs from "fs";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function Seed() {
    try {
        await client.connect();

        const db = client.db("campusconnect");
        const collection = db.collection("complaints");

        const raw = fs.readFileSync("./complaints.json", "utf-8");
        const complaints = JSON.parse(raw);

        await collection.deleteMany({});
        const result = await collection.insertMany(complaints);

        console.log(`${result.insertedCount} complaints inserted.`);
        console.log("Database:", db.databaseName);
    } finally {
        await client.close();
    }
}

seed();
