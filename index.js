const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// middleware
require("dotenv").config();
app.use(cors());
app.use(express.json());

async function run() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h9wahhk.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    //  names
    const featuredCollection = client
      .db("cafeRoyale")
      .collection("featuredProduct");
    // all coffee
    const all_coffee_collection = client
      .db("cafeRoyale")
      .collection("all-coffee-categories");
    // my order
    const orderdCollection = client.db("cafeRoyale").collection("orderd_list");
    // user info
    const userCollection = client.db("cafeRoyale").collection("user_info");
    app.get("/featured", async (req, res) => {
      const products = {};
      const query = await featuredCollection.find(products).toArray();
      res.send(query);
    });
    app.get("/all-categories", async (req, res) => {
      const categories = req.query.category;
      const query = { category: categories };
      const result = await all_coffee_collection.find(query).toArray();
      res.send(result);
    });
    app.get("/item-details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await all_coffee_collection.findOne(query);
      res.send(result);
    });
    app.post("/orderd", async (req, res) => {
      const order = req.body;
      const result = await orderdCollection.insertOne(order);
      res.send(result);
    });
    app.get("/orderd", async (req, res) => {
      const myallOrder = {};
      const query = await orderdCollection.find(myallOrder).toArray();
      res.send(query);
    });
    // delete a item
    app.delete("/delete-item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await orderdCollection.deleteOne(query);
      res.send(result);
    });
    // user info
    app.post("/userinfo", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.error());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// cafeRoyale
// X7ymLZ9kBh6XsUst
